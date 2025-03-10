import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import {
  handleNotFound,
  handleRoot,
  handleUnauthorized,
  baseForwarding,
} from "./base.ts";
import { providerConfig, ProviderKeys } from "../config/provider.config.ts";

const providers = Object.keys(providerConfig) as ProviderKeys[];
const API_KEY = Deno.env.get("API_KEY");

if (!API_KEY) {
  throw new Error("API_KEY is not set in the environment variables");
}

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const filePath = url.pathname;
  const authHeader = request.headers.get("Authorization");

  if (authHeader !== `Bearer ${API_KEY}`) {
    return handleUnauthorized();
  }

  if (filePath === "/") {
    return handleRoot();
  }

  for (const provider of providers) {
    const providerPath = `/${provider}`;
    if (filePath.startsWith(providerPath)) {
      return await baseForwarding({ request, providerName: provider });
    }
  }

  return handleNotFound();
};

export default handler;

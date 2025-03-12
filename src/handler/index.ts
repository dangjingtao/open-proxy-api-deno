import "https://deno.land/x/dotenv@v3.2.2/load.ts";
// import { verify } from "https://deno.land/x/djwt@v2.4/mod.ts";
import {
  handleOPTIONS,
  handleNotFound,
  handleRoot,
  handleUnauthorized,
  handleLogin,
  baseForwarding,
} from "./base.ts";
import { providerConfig } from "../config/provider.config.ts";
import { allowedOrigins } from "../config/origin.config.ts";

const API_KEY = Deno.env.get("API_KEY");

if (!API_KEY) {
  throw new Error("API_KEY is not set in the environment variables");
}

const handler = async (request: Request): Promise<Response> => {
  const origin = request.headers.get("Origin");
  const headers = new Headers();

  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  if (request.method === "OPTIONS") {
    return handleOPTIONS(headers);
  }

  const url = new URL(request.url);
  const filePath = url.pathname;
  const authHeader = request.headers.get("Authorization");

  if (authHeader !== `Bearer ${API_KEY}`) {
    return handleUnauthorized();
  }

  if (filePath.startsWith("/login")) {
    return handleLogin();
  }

  if (filePath === "/") {
    return handleRoot();
  }

  for (const provider of providerConfig) {
    const providerPath = `/${provider.provider_name}`;
    if (filePath.startsWith(providerPath)) {
      return await baseForwarding({ request, provider });
    }
  }

  return handleNotFound();
};

export default handler;

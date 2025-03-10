import { modifyUrlPath } from "../lib/urlUtils.ts";
import { providerConfig, ProviderKeys } from "../config/provider.config.ts";

const TEXT_PLAIN = { "content-type": "text/plain" };

export const handleRoot = (): Response => {
  return new Response("Hello, open-proxy-api-deno!", {
    status: 200,
    headers: TEXT_PLAIN,
  });
};

export const handleNotFound = (): Response => {
  return new Response("Not Found", {
    status: 404,
    headers: TEXT_PLAIN,
  });
};

export const handleUnauthorized = (): Response => {
  return new Response("Unauthorized", {
    status: 401,
    headers: TEXT_PLAIN,
  });
};

export const baseForwarding = async ({
  request,
  providerName,
}: {
  request: Request;
  providerName: ProviderKeys;
}) => {
  const realUrlPath = modifyUrlPath(request.url, providerName);

  const API_HOST = providerConfig[providerName].api_host;

  // url.host = OPENAI_API_HOST;
  const API_KEY = Deno.env.get(`${providerName.toUpperCase()}_API_KEY`);

  const authHeaders = new Headers(request.headers);
  authHeaders.set("Authorization", `Bearer ${API_KEY}`);

  const currentUrl = API_HOST + realUrlPath;

  const newRequest = new Request(currentUrl, {
    headers: authHeaders,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });

  return await fetch(newRequest);
};

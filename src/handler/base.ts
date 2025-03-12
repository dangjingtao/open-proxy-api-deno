// import { verify } from "https://deno.land/x/djwt@v2.4/mod.ts";
import { modifyUrlPath } from "../lib/urlUtils.ts";
import { ProviderConfigItem } from "../config/provider.config.ts";

const getBaseHeaders = () => {
  const headers = new Headers();
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "*");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Content-Type", "text/plain");
  return headers;
};

export const handleOPTIONS = (headers: Headers): Response => {
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "*");
  headers.set("Access-Control-Allow-Credentials", "true");
  return new Response("", { headers, status: 200 });
};

export const handleLogin = (): Response => {
  const headers = new Headers();
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "*");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Content-Type", "text/plain");
  return new Response("Hello, open-proxy-api-deno!", {
    status: 200,
    headers: headers,
  });
};

export const handleRoot = (): Response => {
  return new Response("Hello, open-proxy-api-deno!", {
    status: 200,
    headers: getBaseHeaders(),
  });
};

export const handleNotFound = (): Response => {
  return new Response("Not Found", {
    status: 404,
    headers: getBaseHeaders(),
  });
};

export const handleUnauthorized = (): Response => {
  return new Response("Unauthorized", {
    status: 401,
    headers: getBaseHeaders(),
  });
};

export const baseForwarding = async ({
  request,
  provider,
}: {
  request: Request;
  provider: ProviderConfigItem;
}) => {
  try {
    const { provider_name, api_host, require_api_key } = provider;
    const realUrlPath = modifyUrlPath(request.url, provider_name);
    const API_HOST = api_host;
    const API_KEY = Deno.env.get(`${provider_name.toUpperCase()}_API_KEY`);

    const authHeaders = new Headers(request.headers);

    if (require_api_key) {
      authHeaders.set("Authorization", `Bearer ${API_KEY}`);
    } else {
      authHeaders.delete("Authorization");
    }

    const currentUrl = API_HOST + realUrlPath;
    console.log(currentUrl);

    const newRequest = new Request(currentUrl, {
      headers: authHeaders,
      method: request.method,
      body: request.body,
      redirect: "follow",
    });

    const result = await fetch(newRequest);
    return result;
  } catch (error) {
    console.error("Error in baseForwarding:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

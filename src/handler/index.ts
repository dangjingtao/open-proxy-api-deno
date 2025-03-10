import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import groqHandler from "./groq.ts";

const handler = (request: Request): Response => {
  const apiKey = Deno.env.get("API_KEY");
  const url = new URL(request.url);

  // 处理主页面
  const filePath = url.pathname;
  const authHeader = request.headers.get("Authorization");

  if (authHeader === `Bearer ${apiKey}`) {
    if (filePath === "/") {
      return new Response("Hello, open-proxy-api-deno!", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    } else if (filePath.startsWith("/groq")) {
      return groqHandler(request);
    } else {
      return new Response("Not Found", {
        status: 404,
        headers: { "content-type": "text/plain" },
      });
    }
  } else {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "content-type": "text/plain" },
    });
  }
};

export default handler;

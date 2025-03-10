import { modifyUrlPath } from "../lib/urlUtils.ts";
const OPENAI_API_HOST = "https://api.groq.com";

const groqHandler = async (request: Request) => {
  const realUrlPath = modifyUrlPath(request.url, "groq");
  console.log("------------>", realUrlPath);
  // const url = new URL(OPENAI_API_HOST + realUrlPath);
  // console.log("------------>", url);

  // url.host = OPENAI_API_HOST;
  const API_KEY = Deno.env.get("GROQ_API_KEY");
  // console.log("API_KEY------------>", API_KEY);

  const authHeaders = new Headers(request.headers);
  authHeaders.set("Authorization", `Bearer ${API_KEY}`);

  const currentUrl = OPENAI_API_HOST + realUrlPath;

  // console.log("<<<<<<<<<<<<<<<<", currentUrl);

  const newRequest = new Request(currentUrl, {
    headers: authHeaders,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });

  return await fetch(newRequest);
};

export default groqHandler;

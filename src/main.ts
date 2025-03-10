// main.ts
import indexHandler from "./handler/index.ts";

console.log("Listening on http://localhost:8080");
Deno.serve(indexHandler, { addr: ":8080" });

// const OPENAI_API_HOST = "api.groq.com";

// Deno.serve(async (request) => {
//   const url = new URL(request.url);
//   url.host = OPENAI_API_HOST;
//   const API_KEY = Deno.env.get("GROQ_API_KEY");
//   const authHeaders = new Headers(request.headers);
//   authHeaders.set("Authorization", `Bearer ${API_KEY}`);

//   const newRequest = new Request(url.toString(), {
//     headers: authHeaders,
//     method: request.method,
//     body: request.body,
//     redirect: "follow",
//   });
//   return await fetch(newRequest);
// });

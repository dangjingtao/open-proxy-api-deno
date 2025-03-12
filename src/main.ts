// main.ts
// import { Application } from "jsr:@oak/oak";
import indexHandler from "./handler/index.ts";
// import router from "./router/index.ts";
// import auth from "./middlewares/auth.ts";
// const app = new Application();

// app.use(router.routes());
// app.use(router.allowedMethods());
// // app.use(auth);

// await app.listen({ port: 8001 });

// app.use(async (context, next) => {
//   const authHeader = context.request.headers.get("Authorization");
//   if (authHeader !== `Bearer ${API_KEY}`) {
//     // context.response.body = handleUnauthorized();
//     return;
//   }
//   await next();
// });

// console.log("Listening on http://localhost:8080");
Deno.serve(indexHandler);

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

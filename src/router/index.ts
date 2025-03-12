import { Router } from "jsr:@oak/oak";

import {
  handleOPTIONS,
  handleUnauthorized,
  // handleLogin,
  handleRoot,
  handleNotFound,
  baseForwarding,
} from "../handler/base.ts";
import handleLogin from "../handler/login.ts";

const router = new Router();

// router.options("/", (context) => {
//   context.response.body = handleOPTIONS(context.request.headers);
// });

// router.get("/", (context) => {
//   context.response.body = handleRoot();
// });

router.post("/login", handleLogin);

// router.get("/:provider(.*)", async (context) => {
//   const provider = context.params.provider;
//   if (providers.includes(provider)) {
//     context.response.body = await baseForwarding({
//       request: context.request,
//       providerName: provider,
//     });
//   } else {
//     context.response.body = handleNotFound();
//   }
// });

export default router;

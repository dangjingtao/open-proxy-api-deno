import { Context } from "jsr:@oak/oak";
import { handleUnauthorized } from "../handler/base.ts";
import { verify } from "https://deno.land/x/djwt/mod.ts";

const auth = async (
  context: Context,
  next: () => Promise<void>
): Promise<void> => {
  const authHeader = context.request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    context.response.status = 401;
    context.response.body = { message: "Unauthorized" };
    return;
  }

  const jwt = authHeader.split(" ")[1];
  try {
    const key = Deno.env.get("API_KEY")!;
    await verify(jwt, key, "HS256");
    await next();
  } catch (_err) {
    context.response.status = 401;
    context.response.body = { message: "Unauthorized" };
  }
};

export default auth;

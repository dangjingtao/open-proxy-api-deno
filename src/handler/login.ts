import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import { Context } from "jsr:@oak/oak";

const handleLogin = async (context: Context) => {
  // console.log(">>>>>>>>>>>>>>>", await context.request.body.json());

  const { invitationCode } = await context.request.body.json();
  const INVITATION_CODE = "4321";

  // 验证用户名和密码（这里假设用户名和密码是 "username" 和 "password"）
  if (invitationCode === INVITATION_CODE) {
    const key = Deno.env.get("API_KEY");
    const cryptoKey = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"]
    );
    const jwt = await create(
      { alg: "HS512", typ: "JWT" },
      { exp: getNumericDate(60 * 60), key },
      cryptoKey
    );
    // const jwt = await create(
    //   { alg: "HS256", typ: "JWT" },
    //   { exp: getNumericDate(60 * 60) },
    //   key
    // );

    context.response.body = { token: jwt };
  } else {
    context.response.status = 401;
    context.response.body = { message: "Invalid username or password" };
  }
};

export default handleLogin;

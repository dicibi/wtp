import { Response } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export default (ctx: { response: Response }) => {
  ctx.response.body = `<!DOCTYPE html>
  <html>
    <head><title>Hello oak!</title><head>
    <body>
      <h1>HI mom!</h1>
    </body>
  </html>
`;
};

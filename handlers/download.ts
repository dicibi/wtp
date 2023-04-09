import { RouterContext, State } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export default async (
  ctx: RouterContext<
    "/download/:path",
    {
      path: string;
    } & Record<string | number, string | undefined>,
    State
  >
) => {
  try {
    const root = `${Deno.cwd()}`;
    return await ctx.send({ root });
  } catch (e) {
    console.log(e);
    return (ctx.response.body = "error download pdf");
  }
};

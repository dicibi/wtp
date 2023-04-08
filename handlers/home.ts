import { Context, send } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export default async (ctx: Context, next: () => Promise<unknown>) => {
  const root = Deno.cwd();
  try {
    await ctx.send({ root: `${root}/public`, index: "index.html" });
  } catch (e) {
    await next();
    console.log(e);
  }
};

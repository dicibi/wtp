import { Context } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export default async (ctx: Context) => {
  await ctx.send({
    root: `${Deno.cwd()}`,
  });
};

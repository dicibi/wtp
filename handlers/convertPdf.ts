import { Context } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { createNameFile } from "../services/createName.ts";
import { downloadPdf } from "../services/createPdf.ts";

export default async (ctx: Context) => {
  const body = ctx.request.body();

  const data = await body.value;
  let url = data.get("link");

  if (url === null) {
    return (ctx.response.body = "invalid parsing");
  }

  try {
    url = new URL(url);
  } catch {
    return (ctx.response.body = "invalid url");
  }

  try {
    console.log("please wait...");
    const name = createNameFile();
    downloadPdf(name, url);

    ctx.response.body = {
      req_id: name,
    };
  } catch {
    ctx.response.body = `error convert pdf`;
  }
};

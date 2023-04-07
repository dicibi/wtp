import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { createNameFile } from "./services/createName.ts";
import { downloadPdf } from "./services/createPdf.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>HI mom!</h1>
      </body>
    </html>
  `;
  })
  .get("/download/:path", async (ctx) => {
    const root = `${Deno.cwd()}`;
    if (Deno.ppid)
      try {
        return await ctx.send({ root });
      } catch (e) {
        console.log(e);
        return (ctx.response.body = "error");
      }
    ctx.response.body = { paths: ctx.params.path };
  })
  .post("/convertpdf", async (ctx) => {
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
      console.log("finish");

      ctx.response.body = {
        req_id: name,
      };
    } catch (e) {
      console.error(e);
      ctx.response.body = `error convert pdf`;
    }
  });

export default router;

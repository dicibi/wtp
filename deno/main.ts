import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";

const PORT = 8000;
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>HI mom!</h1>
      </body>
    </html>
  `;
});

async function createFolder() {
  const folder = crypto.randomUUID();
  await Deno.mkdir(`./download/${folder}`, { recursive: true });
  return folder;
}

async function downloadPdf(folder: string, url: string) {
  const convertPdf = [
    "./latest/chrome",
    "--headless",
    "--no-sandbox",
    `--print-to-pdf=./download/${folder}/output.pdf`,
    "--print-paper-size=Letter",
    "--no-header",
    "--margin-left=0",
    "--margin-right=0",
    "--margin-top=0",
    "--margin-bottom=0",
    url,

  ];
  const p2 = Deno.run({ cmd: convertPdf });
  const { code } = await p2.status();
  if (code === 0) {
    p2.close();
  }
  return { folder: folder, link: url, status: "success" };
}

router.post("/convertpdf", async (ctx) => {
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
    const folder = await createFolder();
    downloadPdf(folder, url);
    console.log("finish");

    ctx.response.body = {
      req_id:folder
    };
  } catch (e) {
    console.error(e);
    ctx.response.body = `error convert pdf`;
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: PORT });
console.log(`run on localhost:${PORT}`);

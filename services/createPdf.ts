import { APP_CHROME } from "../config.ts";
export async function downloadPdf(name: string, url: string) {
  const convertPdf = [
    APP_CHROME,
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    `--print-to-pdf=./download/${name}.pdf`,
    "--print-paper-size=Letter",
    "--no-header",
    "--margin-left=0",
    "--margin-right=0",
    "--margin-top=0",
    "--margin-bottom=0",
    url,
  ];

  const p2 = Deno.run({ cmd: convertPdf, stderr: "piped" });
  const { code } = await p2.status();

  if (code === 0) {
    console.log({ output: name, link: url.toString(), status: "success" });
    return { output: name, link: url.toString(), status: "success" };
  } else {
    return { output: name, link: url.toString(), status: "fail" };
  }
}

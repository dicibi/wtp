export async function downloadPdf(name: string, url: string) {
  const CHROME = "google-chrome-stable"; //"./latest/chrome"
  const convertPdf = [
    CHROME,
    "--headless",
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
  const p2 = Deno.run({ cmd: convertPdf });
  const { code } = await p2.status();
  if (code === 0) {
    p2.close();
  }
  return { output: name, link: url, status: "success" };
}
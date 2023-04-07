import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import home from "./handlers/home.ts";
import download from "./handlers/download.ts";
import convertPdf from "./handlers/convertPdf.ts";

const router = new Router();

router
  .get("/", home)
  .get("/download/:path", download)
  .post("/convertpdf", convertPdf);

export default router;

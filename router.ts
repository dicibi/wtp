import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import home from "./handlers/home.ts";
import download from "./handlers/download.ts";
import convertPdf from "./handlers/convertPdf.ts";
import staticServe from "./handlers/staticServe.ts";

const router = new Router();

router
  .get("/", home)
  .get("/public/:path+", staticServe)
  .get("/download/:path", download)
  .post("/convertpdf", convertPdf);

export default router;

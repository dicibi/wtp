# README

## live demo

<https://api-convertpdf-cpxehuk7za-et.a.run.app>

## deploy in cloud run

minimal ram to run this app is 1gb under than the app will terminated

steps:

1. build container with cloud build
2. image will store in container registry
3. deploy app with cloud run use image from container registry

## run application

show home

```bash
curl localhost:8000
```

convert html to pdf

```bash
curl -d "link=<url>" localhost:8000/convertpdf
```

download result pdf

```bash
curl localhost:8000/download/<req_id>.pdf
```

getting started

setup environment deno in vscode
<https://stackoverflow.com/questions/65115527/how-can-i-avoid-the-an-import-path-cannot-end-with-ts-extension-error-in-vsco>

install denon to watch change of deno
<https://github.com/denosaurs/denon>

```bash
denon run -A  index.ts
```

## run with docker compose

```bash
docker compose down && docker compose up --build -d
```

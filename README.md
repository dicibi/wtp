# README

## live demo

<https://lively-leaf-4430.fly.dev/>

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
denon run --allow-net --allow-run --allow-write --allow-env --allow-read  index.ts
```

## run with doceker

build docker image

```bash
docker build -t app .
```

run docker

```bash
docker run -e TINI_SUBREAPER=true -it --init -p 8000:8000 app
```

## run with docker compose

```bash
docker compose up --build -d
```

alternative run docker compose if there's a error

```bash
docker compose down --remove-orphans && docker compose up --build
```

## deploy with fly.io

```bash
curl -L https://fly.io/install.sh | sh

flyctl deploy
```

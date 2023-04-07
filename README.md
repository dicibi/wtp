# README

getting started

setup environment deno in vscode
<https://stackoverflow.com/questions/65115527/how-can-i-avoid-the-an-import-path-cannot-end-with-ts-extension-error-in-vsco>

install denon to watch change of deno
<https://github.com/denosaurs/denon>

```bash
denon run --allow-net --allow-run --allow-write  main.ts
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

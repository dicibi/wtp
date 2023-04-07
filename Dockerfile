FROM denoland/deno:1.32.3

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

# install system depedencies
RUN apt-get update && apt-get install -y

# install chrome stable
RUN apt-get install -y curl unzip bash
RUN curl -L https://raw.githubusercontent.com/scheib/chromium-latest-linux/master/update.sh | bash

RUN apt-get update -qqy \
  && apt-get -qqy install libnss3 libnss3-tools libfontconfig1 wget ca-certificates apt-transport-https inotify-tools unzip \
  libpangocairo-1.0-0 libx11-xcb-dev libxcomposite-dev libxcursor1 libxdamage1 libxi6 libgconf-2-4 libxtst6 libcups2-dev \
  libxss-dev libxrandr-dev libasound2-dev libatk1.0-dev libgtk-3-dev ttf-ancient-fonts libappindicator3-1 \
  libxcb-dri3-0 libgbm1 \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# create user deno
RUN chown deno .
USER deno
RUN mkdir download

COPY . .

# These steps will be re-run upon each file change in your working directory:
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["deno","run", "--allow-net", "--allow-run", "--allow-write", "index.ts"]
FROM python:3.10.7-slim-buster

WORKDIR /usr/src/app

# install system depedencies
RUN apt-get update && apt-get install -y

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app

CMD ["gunicorn","-w 4", "app:app" ,"-b 0.0.0.0:8000"]
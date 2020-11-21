FROM python:3.9-alpine

EXPOSE 8000

RUN apk add --no-cache gcc python3-dev musl-dev

ADD . /bupazarapp

WORKDIR /bupazarapp

RUN pip3 install -r requirements.txt

RUN python manage.py makemigrations

RUN python manage.py migrate

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
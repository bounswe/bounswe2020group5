FROM python:3.9-alpine

EXPOSE 8000
ARG KEY

COPY requirements.txt ./
RUN set -e; \
  apk update \
  && apk add --virtual .build-deps gcc python3-dev musl-dev libffi-dev \
  # TODO workaround start
  && apk del libressl-dev \
  && apk add openssl-dev \
  && pip3 install cryptography==2.2.2 \  
  && apk del openssl-dev \
  && apk add libressl-dev \
  # TODO workaround end
  && apk add postgresql-dev \
  && pip3 install -r requirements.txt \
  && apk del .build-deps
ADD . /bupazarapp

WORKDIR /bupazarapp

RUN python bupazar_config.py 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='

RUN python manage.py makemigrations

RUN python manage.py migrate

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
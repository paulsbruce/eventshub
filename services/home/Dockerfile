FROM node:10-alpine as base

RUN apk add --no-cache python python-dev python3 python3-dev \
    linux-headers build-base bash git ca-certificates && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    rm -r /root/.cache


RUN set -ex \
    && addgroup -S app \
    && adduser -S -G app app \
    && chmod g+w /etc/passwd \
    && chgrp 0 /home/app \
    && chmod g=rwx /home/app \
    && apk --no-cache add ttf-dejavu


#Alpine put suid bit on home directory. So the right inherit from parent directory. We prefer to use the GID of process for new files.
#We need to accept that entrypoin.sh changes the /etc/passwd.

FROM base as deps
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

FROM deps as app
COPY api/ api/
COPY public/ public/
COPY src/ src/
COPY server/ server/

RUN cd /app/api/ && pip install flask python-dotenv setuptools -q
RUN cd /app/api/ && python3 setup.py install

# production
#RUN cd /app/ && npm run build
#RUN npm install -g serve

RUN cd /app/

EXPOSE 3000
EXPOSE 5000

RUN touch /app/public/dt.js && chown app:app /app/public/dt.js

USER app
#PROD# RUN serve -s build
ENTRYPOINT ["npm", "run-script", "prod"]

FROM node:14.10.0

RUN ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

RUN echo "America/Sao_Paulo" > /etc/timezone

WORKDIR /ms-general

COPY microservices/ms-general/package.json /ms-general

RUN yarn install

COPY microservices/ms-general /ms-general

COPY microservices/ms-general/.env /ms-general/.env

EXPOSE 3000

EXPOSE 9229

CMD [ "yarn", "debug" ]

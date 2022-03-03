FROM node:16.14.0

RUN ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

RUN echo "America/Sao_Paulo" > /etc/timezone

WORKDIR /ms-general

COPY microservices/ms-general/package.json /ms-general

RUN yarn install

COPY microservices/ms-general /ms-general

EXPOSE 3000

EXPOSE 9229

EXPOSE 4000

CMD [ "yarn", "debug" ]

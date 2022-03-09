FROM node:14.10.0

RUN ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

RUN echo "America/Sao_Paulo" > /etc/timezone

WORKDIR /ms-user

COPY microservices/ms-user/package.json /ms-user

RUN yarn install

COPY microservices/ms-user /ms-user

COPY microservices/ms-general/.env /ms-user/.env

EXPOSE 3000

EXPOSE 9229

CMD [ "yarn", "debug" ]

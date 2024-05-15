FROM node:20.12-alpine3.18

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN apk add --no-cache python3 build-base 

COPY package*.json ./

RUN npm i

COPY start.sh ./

COPY --chown=node:node . .

RUN chmod +x start.sh

CMD [ "./start.sh" ]
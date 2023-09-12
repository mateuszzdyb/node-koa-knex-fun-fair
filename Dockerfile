# Install Node image
FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
# Copy src to workdir/src
COPY ./src ./src

# install packages
RUN npm install

CMD npm run develop
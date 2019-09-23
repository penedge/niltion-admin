FROM node:10.16.3

# Create app directory
RUN mkdir -p /usr/src/niltion-admin
WORKDIR /usr/src/niltion-admin

# Install app dependencies
COPY package.json /usr/src/niltion-admin
RUN yarn install

# Bundle app source
COPY . /usr/src/niltion-admin
RUN yarn build

EXPOSE 80
CMD [ "yarn", "dev" ]
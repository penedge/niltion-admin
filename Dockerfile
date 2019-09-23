FROM node:10.16.3

# Create app directory
RUN mkdir -p /niltion-admin
WORKDIR /niltion-admin

# Install app dependencies
COPY package.json /niltion-admin/
RUN yarn install

# Bundle app source
COPY . ./
RUN yarn build

EXPOSE 80
CMD [ "yarn", "dev" ]
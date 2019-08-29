FROM node:10.16.3

# Create app directory
RUN mkdir -p /admin
WORKDIR /admin

# Install app dependencies
COPY package.json /admin/
RUN yarn install
RUN yarn build

# Bundle app source
COPY . ./

EXPOSE 80
CMD [ "yarn", "dev" ]
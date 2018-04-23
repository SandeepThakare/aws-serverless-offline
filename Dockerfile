FROM node:latest

ENV http_proxy 127.0.0.1:8000
ENV https_proxy 127.0.0.1:8000

# RUN apt-get update

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Copy the current directory contents into the container at /app
ADD . /app
ADD . /database/dir

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

#Add jdk dependancy
RUN apk --update add openjdk7-jre

#Install serverless dependancy
RUN npm install serverless -g

#Install dynamodb locally
RUN sls dynamodb install --stage dev

# RUN export PATH=/usr/local/bin:$PATH

# Bundle app source
COPY . .

EXPOSE 8000

CMD [ "sls", "dynamodb", "start", "-p", "8000", "--migrate", "true", "--stage", "dev"]
# CMD [ "sls", "offline", "start", "-r", "us-east-1", "--noTimeout"]
# sls offline start -r us-east-1 --noTimeout
FROM node:carbon

# Create app directory
WORKDIR /app

#Add jdk dependancy
# ENV DEBIAN_FRONTEND=noninteractive
# ENV SERVERLESS serverless@{{ version }}

#Install default jre for serverless-offline
RUN apt-get update \
    && apt-get install -y default-jre

#Install serverless dependancy
RUN npm install serverless -g

# Install app dependencies
COPY package*.json ./

#Install packages from package.json
RUN npm install

# Bundle app source
COPY . .

#Install dynamodb locally
RUN sls dynamodb install --stage dev

#Proxy setup only for ubuntu
# ENV http_proxy 0.0.0.0:8000
# ENV https_proxy 0.0.0.0:8000

#Ready 8000 port for run
# EXPOSE 8000
EXPOSE 3000

# Command for run dynamodb offline
CMD [ "sls", "offline", "start", "-r", "us-east-1", "--noTimeout", "--stage", "dev" ]
# CMD [ "sls", "offline", "start", "-r", "us-east-1", "--noTimeout"]
# sls offline start -r us-east-1 --noTimeout
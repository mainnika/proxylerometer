FROM node:latest

RUN apt-get update 
RUN apt-get install ruby ruby-sass -y
RUN apt-get clean
RUN npm install -g grunt-cli
RUN npm install -g typings
RUN npm install -g bower

RUN useradd -m proxylerometer

USER proxylerometer

WORKDIR /home/proxylerometer
COPY . /home/proxylerometer

RUN npm install
RUN typings install
RUN bower install 
RUN grunt --force

EXPOSE 9000

CMD [ "npm", "start" ]


# case sensitive  
FROM node:20-alpine  
 # node js v-20 installed on alipne lightweight linux (base image  needed everytime) at top 

WORKDIR /app     
 #creates working dir app inside container

COPY package*.json ./  
 #copy packages or deps from package*.json (*) wildcard means file s starting from package ending at .json

RUN npm install  
 #install all deps in container during build time

RUN npm install -g nodemon  
# install nodemon globally in container to run server with hot reload

COPY . .     
 # copy all app files from src to dest i.e. app dir

EXPOSE 3000  
 # exposing 3000 port

CMD ["node","server.js"] 

 # run the command   

# docker build -t mern-backend .  means

# 1. Look in current folder (.)
# 2. Find Dockerfile
# 3. Execute instructions (FROM, COPY, RUN, EXPOSE, CMD)
# 4. Build image
# 5. Tag it as "mern-backend"
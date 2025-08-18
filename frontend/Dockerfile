# js image
FROM node:20-alpine

#WORKING DIR
WORKDIR /app

#copy application file
COPY package.json package-lock.json ./

#install dependencies
RUN npm install

#copy application code
COPY . .

#build application
RUN npm run build

#expose port 
EXPOSE 3000

#run application
CMD ["npm", "run", "dev"]
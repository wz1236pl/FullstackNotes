FROM node:18-alpine
WORKDIR /notes-fe
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]

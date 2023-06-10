FROM node:18-alpine

WORKDIR /app

COPY . .

# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm install

CMD ["npm", "start"]
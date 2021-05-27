FROM node:12.22.1-alpine
WORKDIR /workspace
COPY index.js package.json package-lock.json ./
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]
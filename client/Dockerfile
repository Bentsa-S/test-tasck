FROM node:22-alpine

WORKDIR /app

# Copy root package files if needed, but for now we'll just focus on the client
# If we want a proper monorepo build, we'd copy root package.json and workspace package.json
# To keep it simple and isolated:
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Vite needs --host to be accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host"]

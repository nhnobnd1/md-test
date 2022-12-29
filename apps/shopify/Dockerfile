FROM node:18-alpine

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY
EXPOSE 8081
WORKDIR /app
COPY web .
RUN yarn --frozen-lockfile
RUN cd frontend && yarn --frozen-lockfile && yarn build
CMD ["yarn", "serve"]

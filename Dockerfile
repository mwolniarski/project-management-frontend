FROM node:18-alpine

COPY ./dist /dist/

RUN npm install -g http-server-spa

EXPOSE 4200

CMD ["http-server-spa", "/dist/project-management-official", "index.html", "4200"]

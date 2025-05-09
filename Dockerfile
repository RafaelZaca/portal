FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration production 

FROM nginx:latest

# Copia o arquivo de configuração customizado do Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos do Angular para o diretório do Nginx
COPY --from=build /app/dist/wcs-pg/browser /usr/share/nginx/html

EXPOSE 80

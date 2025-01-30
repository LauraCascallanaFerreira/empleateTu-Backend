# CREACION DEL PROYECTO

### Comandos bash 
- npm init -y
- npm i -D typescript tsx @types/node
- npx tsc -init
- npm i express
- npm i --save-dev @types/express
- npm i -D @swc/core @swc/cli
  
COMANDO PARA CONSTRUIR LA APP --> npm run build
COMANDO PARA EJECUTAR --> npm run dev

COMANDO PARA BBDD --> npm i prisma @prisma/client
COMANDO PARA INICIALIZAR PRISMA --> npm run prisma:inir
  
### Crear archivo .swcrc
- Rellenar el archivo .swcrc

### Configurar el tsconfig.json
- Copiar del aprendeTu

### Configurar package.json

- cambiar en el main -> "main": "server.js"
- "dev": "tsx watch src/server.ts"
- "build": "swc src -d dist --source-maps --copy-files"
- "start": "node dist/src/server.js"

### Crear .gitignore
- node-modules
- .env
- dist

### Creamos app.ts
- Configuramos el archivo
- Nos enviamos los endpoints del server.ts a app.ts
- Cambiamos el puerto por una variable y la ponemos en .env

### Dentro de src
- Creacion carpeta routes para las rutas
- Creacion carpeta services para los servicios
- Creacion carpeta controllers

# REGISTROS USUARIO

- Creamos un archivo en routes para las rutas llamado auth.routes.ts
# Meeti App
Esta app esta usando la version ```1.0.0-beta.16-ea816b6``` de drizzle ORM. Cuando se actualice a la version estable, se actualizara esta app. Mientras tanto cuando instales los paquetes en modo desarrollo, es necesario usar el flag ```--legacy-peer-deps``` para evitar conflictos con las dependencias de peer que tiene drizzle ORM.
```
npm i --legacy-peer-deps
```

Arranca el modo desarrollo con el comando ```npm run dev``` y abre tu navegador en la url ```http://localhost:3000``` 

# Variables de entorno
Clona el archivo ```.env.example``` y renombralo a ```.env```. Luego, llena las variables de entorno con los valores correspondientes.

# Base de datos
Limpiar la DB de desarrollo:
1. Detener el contenedor de la DB ```docker stop meeti_app```
2. Eliminar la carpeta bind Volume llamada postgres que se encuentra en la raiz del proyecto
3. Inicar el contenedor de la DB ```docker start meeti_app```
4. Crear tablas ```npx drizzle-kit push```

# Seed
Categorias: ```npm run seed:categories``` 

# API
* Obtener todas las categorias: ```GET /api/categories```
* Obtener comunidades ```GET /api/communities```
* Obtener notificaciones de un usuario: ```GET /api/notifications```



## Generar secret desde la terminal con node:
```
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
# api-sistema-logistico
Api para el sistema logistico y de envios en coordinadora


## Getting Started

Sigue estos pasos para ejecutar el proyecto en modo desarrollo:

1. Descarga o clona este repositorio desde GitHub.

2. Abre Visual Studio Code y carga la carpeta del proyecto.

3. Abre una terminal y ejecuta el comando npm install para instalar las dependencias necesarias.

4. Asegúrate de tener instalado Docker Desktop en tu máquina para ejecutar el servidor de Redis.
5. Inicia el servidor de Redis desde PowerShell con el siguiente comando: docker run --name redis-server -p 6379:6379 -d redis

5. Una vez finalizada la instalación, ejecuta npm run dev para iniciar el servidor de desarrollo local.
6. El servidor se iniciará en http://localhost:3002. Abre esa URL en tu navegador para ver la aplicación en funcionamiento.

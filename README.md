# [Nuwe] 🤖 Week 4

[![CodeFactor](https://www.codefactor.io/repository/github/albertolinde/nuwe-nested-promises/badge?s=63be1bd8130657c0f3b2e333c8df2af1fcdac739)](https://www.codefactor.io/repository/github/albertolinde/nuwe-nested-promises)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AlbertoLinde_Nuwe-Nested-Promises&metric=alert_status)](https://sonarcloud.io/dashboard?id=AlbertoLinde_Nuwe-Nested-Promises)
------------

Este proyecto consiste en la realización de una serie de tareas que se han propuesto. Es el último de una serie de retos semanales que se están realizando en la plataforma [Nuwe](https://nuwe.io/).

------------

## Construido con 🛠️

* [Node.js](https://nodejs.org/es/)
* [Google API](https://developers.google.com/drive/api/v3/about-sdk)
* [CSV to JSON](https://github.com/Keyang/node-csvtojson)
* [Inquirer](https://github.com/SBoudrias/Inquirer.js)
* [FileSamples](https://filesamples.com/formats/txt) Para descargar ficheros de prueba.
* [JavasCript]()

------------

## Instalación (Local)

1. Comprueba que tienes en tu equipo instalado Node. Abre CMD o PowerShell y escribe:

   ```sh

     node -v

   ```

2. Clona este repositorio

   ```sh

     git clone https://github.com/AlbertoLinde/Nuwe-Nested-Promises

   ```

3. Instala todas las dependencias necesarias

   ```sh

     cd folder/project

     npm install

   ```

4. Para poder probar por tu cuenta esta aplicación tendrás que crear un proyecto nuevo en [Google Cloud Console](https://console.cloud.google.com/) y en la sección de credenciales tendrás que crear un ID de cliente OAuth. 

5. Renombra el fichero llamado .env(template) => .env y en su interior coloca el valor de tus elementos. Para las pruebas se ha utilizado [Google OAuthPlayground](https://developers.google.com/oauthplayground/) Tendrás que introducir tus datos y recoger el Token que este te genera para hacer las pruebas.

6. Por último colocate sobre SRC y utiliza ```node .```

------------

## Features 🔨

* ✅ **Task-1**: Configurar método Auth. (Sin login especifico a través de los credenciales de la aplicación en Playground)
* ✅ **Task-2**: Crear una función que pasándo el link del archivo permita descargarlo de forma local (Archivos de tipo CSV/TXT o JSON), no es necesario que permita descargar todo tipo de archivos.
* ✅ **Task-3**: Para los archivos de tipo CSV, crear una función que una vez descargado el archivo, lo pase a JSON y lo devuelva como parámetros.
* ✅ **Task-4**: Cread un comando por terminal que permita convertir un archivo cualquiera de CSV a JSON (indicando la ruta al arhivo)
* ✅❗ **Task-5**: Descargar archivo desde Google Drive. (50%. Se accede a la cuenta y se listan todos los archivos recuperando su ID para posteriormente descargarlo. ERROR: Existe un error 403 pendiente de solucionar en la descarga).

## Features || Ideas Pendientes 🔨

* ❗ Realizar Auth de una forma mejor introduciendo credenciales de usuario.
* ❗ Refactorizar
* ❗ Realizar Test
* ❗ Reorganizar el código
  
------------


## Comandos

### Login with Google

![Login](https://user-images.githubusercontent.com/44638858/129464468-e30eba8a-c862-4bef-ab8b-cf1e7531ea91.gif)

### Download File

![2 (1)](https://user-images.githubusercontent.com/44638858/129464467-08c87d03-09d3-4675-a24d-aed509dafc02.gif)


### CSV to JSON - Local File

![3](https://user-images.githubusercontent.com/44638858/129464470-21d3e3ee-a37c-4658-92d7-c51fa693c852.gif)

### Download CSV and convert to JSON

![4](https://user-images.githubusercontent.com/44638858/129464471-060903d6-6f64-4856-ab8c-0f12f95f22eb.gif)

### Download file from Google Drive

![5](https://user-images.githubusercontent.com/44638858/129464469-8aec274c-995f-4403-9abe-69f6b0870b1c.gif)

------------

## Contacto 📩

[LinkedIn](www.linkedin.com/in/albertolinde "LinkedIn") - [Twitter](https://twitter.com/AlberALinde "Twitter") - [Web](https://www.albertolinde.com/ "Web") - [✉](abreulindealberto@gmail.com)

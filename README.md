# CuentasClaras-app

Aplicación para administrar gastos personales.

## Table of Contents

* [Background / Overview](#background--overview)
* [Features](#features)
* [Documentation](#documentation)
* [Dependencies](#dependencies)
* [Todo](#todo)
* [How to use locally](#How-to-use-locally)
* [Release History](#release-history)
* [Authors](#authors)
* [License](#License)




## Background / Overview

Una aplicación web para administrar gastos personales. Esta construido con el stack MERN (MySQL) y el sistema de login/registro se implemento con JWT.
Las operaciones y los usuarios se almacenan en una base de datos MySQL en clever-cloud.
Para el front-end se utilizo mas que nada React-js y Bootstrap para los estilos. El back-end esta hecho con Node.js con ayuda de Express para
realizar la estructura del mismo, la base de datos se conecta con Node.js gracias a sequelize.
La versión de producción se encuentra en el siguiente link (https://cuentas-claras-app.herokuapp.com/).

## Features

* Operaciones
  * Agregar,Modificar y Borrar posteos, esta función esta solo habilitada para aquellas personas con usuarios registrados.
* Login/registro
 * Se implementó JWT para autorizar a los usuarios a realizar las operaciones. Es un sistema sencillo por lo tanto se requieren solo 3 datos y no necesitan ser verificados.



## Dependencies

List of dependencies used in the project

* [React.js] - (https://es.reactjs.org/) - Una biblioteca de JavaScript para construir interfaces de usuario.
* [React - Bootstrap] (https://react-bootstrap.github.io/) - UI framework for modern web apps.
* [React - Redux] (https://react-redux.js.org/) - Official React bindings for Redux.
* [redux-logger] (https://www.npmjs.com/package/redux-logger) - LogRocket is a production Redux logging tool that lets you replay problems as if they happened in your own browser.
* [redux-thunk] (https://www.npmjs.com/package/redux-thunk) - Thunk middleware for Redux.
* [Node.js] (https://nodejs.org/es/) - Node.js® es un entorno de ejecución para JavaScript.
* [express] (https://expressjs.com/es/) - Infraestructura web rápida, minimalista y flexible para Node.js.
* [mysql2] (https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression.
* [sequelize] (https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.




## Todo

List of things to fix or add

- [ ] Add documentation
- [ ] Add Unit tests

## How to use locally

At the root of the project
### `npm install`

Then
### `cd client/`

And 
### `npm install`

We have to assign 5 environment variables

- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- DB_HOST
- SECRET_JWT

On "./database/db/config-Local" We have an example for the 4 variables for the database, if we follow the example our .env file would look like this.

* DB_USERNAME=root
* DB_PASSWORD= *If the database has a password, we must complete this variable otherwise it may be empty*
* DB_NAME=alkemy_test *This database must be created from the command line*
* DB_HOST=localhost
* SECRET_JWT= *It can be anything we want, maybe the lyrics of a song*


<h2>And voila, we can now use CuentasClaras-app locally</h2>

- At the root of the project, we can execute the back in two ways

### `npm run dev`

Or

### `npm start`

- For the front, from the root of the project

### `cd client/`

And

### `npm start`



## Release History

* 1.0.0 - Initial release
  * Primera version de la aplicación.


## Authors

* [**Joaquin Seita**](https://github.com/JoaquinDamianSeita)

## License

Copyright (c) 2021 Joaquin Seita

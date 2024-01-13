# GOTO

    -> cmd `D:\Web_dev_pra\back_sanket\AirlineManagementProject`
    -> make a folder `AuthService`
    -> inside `AuthService` run
    -> `npm init`

## Install some packages

- -> `npm i express`
  -> `npm i body-parser`
  -> `npm i dotenv`
  -> `npm i nodemon`

## lets setup

- -> goto `src`
  -> create a file `index.js`
  -> inside it require `express`
  -> and setup express
- Goto
  -> root level;
  -> create `.env`
  -> set `PORT`
  -> goto `src`
  -> crate a folder `config`
  -> inside folder create `serverConfig.js`
  -> require `dotenv`
  -> setup `dotenv`
  -> export it
  -> `module.exports = {PORT: process.env.PORT}`

- Goto
  -> `src/index.js`
  -> require `const {PORT} = require('./config/serverConfig');`
  -> Done

# Setup Sequelize

- GOTO
  -> cmd root level
  -> `npm i sequelize`
  -> `npm i sequelize-cli`
  -> `npm i mysql2`
  -> nothing will happen except installing
- NOW
  -> `npx sequelize init`
  -> created root level folders
  -> `config`
  -> `migrations`
  -> `models`
  -> `seeders`

## Setup folders

- -> open `config` folder
  -> inside `config.json` file
  -> bring it to `src/config` folder
  -> and delete `config` folder root
  -> `migrations`
  -> `models`
  -> `seeders`
  -> bring these file inside `src` folder

## create some folders

- -> inside `src`
  -> `controlles`
  -> `middlewares`
  -> `repository`
  -> `routes`
  -> `services`
  -> `utils`

## Create a database

- -> goto `config` folder
  -> inside `config.json`
  -> set `password` and `database:<name>`
  -> `npx sequelize db:create`
  -> created db `AUTH_DB_DEV`

### -<Project Skeleton Done

# Creating a User Model

- GOTO
  -> `authservice/src`
  -> `npx sequelize model:generate --name User --attributes email:String,password:String`
  -> it will create to file
  -> 1st inside `models/user.js`
  -> 2nd inside `migrations/129-create-user.js`
  -> add some contrains/validates
  -> Then `npx sequelize db:migrate`

- NOW
  -> goto `repository` folder
  -> create a file `user-repository.js`
  -> `const  {User} = require('../models index');`
  -> prepare a class `UserRepository`
  -> inside this class make multiple method
  -> like create user delete user etc.
  -> and then `export` it

- GOTO
  -> goto `services` folder
  -> create a file `user-service.js`
  -> `const UserRepository = require('../repository/user-repository');`
  -> prepare a class `UserService`
  -> inside class make a constructor
  -> `constructor (){thisuserRepository=newUserRepository();}`
  -> and make multiple function
  -> and then `export` it

- GOTO
  -> goto `controllers` folder
  -> create a file `user-controller.js`
  -> `const UserService = require('../services/user-service');`
  -> `const userService = new UserService();`
  -> and make multiple function
  -> create , delete, update etc.
  -> module.exports = {
  create
  }

- GOTO
  -> `routes` folder inside
  -> create a file `index.js`
  -> create a folder `v1`
  -> inside `v1` create `index.js`
  -> setup routes
  -> exports
- THEN
  -> goto `routes>index.js`
  -> setup routes
  -> exports
- GOTO
  -> root level `index.js`
  -> setup `body-parser`
  -> `app.use('/api', apiRoutes);`

## -<Done Api

# Decrypte password

- -> `npm i bcrypt`
  -> goto `config>serverConfig.js`
  -> `const bcrypt = require('bcrypt');`
  -> `module.exports = {PORT: process.env.PORT,SALT: bcrypt.genSaltSync(10)}`
  -> goto `models>user.js` file
  -> require `const bcrypt = require('bcrypt');`
  -> `const {SALT} = require('../config/serverConfig')`

## User.beforeCreate((user) => {

    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;

## });`

### -<Done lec-8

-GOTO
-> `user-repository.js` file
-> create a method `getById`
-> you can set `attributes` to find perticuler table data
-> like findByPk(userId, {
`attributes: ['email', 'id']`
})
->
-> added get user by id in repo `DONE`

# NOW setup a new API for Signin

## JWT

- -> `npm i jsonwebtoken`
  -> goto `user-service.js`
  -> `const jwt = require('jsonwebtoken');`
  -> goto `.env` file
  -> set `JWT_KEY=<any-string>`
  -> goto `config/serverConfig` file
  -> exports `JWT_KEY: process.env.JWT_KEY`
  -> come inside `user-service.js`
  -> `const {JWT_KEK} = require('../config/serverConfig');`

- NOW
  -> create method `createToken`
  -> and `verifyToken`
  -> and also `checkPassword`
  -> then create `async signIn`

- GOTO
  -> `user-repository.js` file
  -> create `getByEmail`
  -> and `getById`

- GOTO
  -> services write some logic

### -<basically ...write a Api

#### write middlewares to valideds our request

- GOTO
  -> inside `middlewares`
  -> make two file `index.js`
  -> 2nd is `auth-request-validators.js`
  -> inside `auth-request-validators.js`
  -> write a function `validateUserAuth`
  -> and export it
  -> goto `routes>v1>index.js`
  -> setup middleware
  -> `router.post('/signup'AuthRequestvalidator.validateUserAuth, UserController.create);`
  -> `router.post('/signin', AuthRequestvalidator.validateUserAuth, UserController.signIn);`
  ->validation DONE for incoming request

#### -<Done 9 lec

# Creating Role model -user-customer-admin
- GOTO
  -> inside `authservice/src`
  -> `npx sequelize model:generate`
  -> it will create two file 
  -> `migrations>41-create-role.js`
  -> `models>role.js`
  -> set association 
  -> goto `user.js` model
  -> set these value inside associate method
  -> `this.belongsToMany(models.Role,       {through: 'User_Roles'})`
  -> then goto `role.js` model
  -> set these value inside associate method
  -> `this.belongsToMany(models.User, {through: 'User_Roles'})`

- THEN
  -> sync your db 
  -> how ?
  -> goto `.env` file
  -> set `DB_SYNC=true`
  -> goto `src/index.js` file
  -> require `db` from `models/index`
  -> set these value `if(process.env.DB_SYNC){db.sequelize.sync({alter: true});}`
  -> and start the server.

## insert some dummy data inside role database
- HOW
  -> goto cmd `npx sequelize seed:generate --name add-roles`
  -> it will create a file inside `seeders`
  -> `237-add-roles.js`
  -> set some role `Admin`,`Customer` and `Airline_bussiness`
  -> `npx sequelize db:seed --seed 20240102064237-add-roles.js`
  -> add data inside role table.DB
  


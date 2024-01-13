const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');

const UserRepository = require('../repository/user-repository');

const {JWT_KEY} = require('../config/serverConfig');

class UserService {
    constructor (){
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("something went wrong in user service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try {
            //step 1-> fatch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step 2-> compare incoming paln password with store encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            //step 3-> 
            if(!passwordMatch){
                console.log("password doesn match");
                throw {error: "incorrect password"};
            }
            // step 4-> if password match the create a token and sent it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;

        } catch (error) {
            if(error.name == 'AttributeNotFound'){
                throw error;
            }
            console.log("something went wrong in signIn process");
            throw erro 
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error: "no user with the corresponding token exits"};
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in Auth process");
            throw error
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("something went wrong token creation");
            throw error
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation", error);
            throw error
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
           return bcrypt.compareSync(userInputPlainPassword, encryptedPassword); 
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw error;
        }
    }

    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }

}

module.exports = UserService;
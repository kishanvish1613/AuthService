const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index')

const db = require('./models/index');

const app = express();


const prepareAndStartServer = async () => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at ${PORT}`);
        // const service = new UserService();
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        // const newToken = service.createToken({email: 'jd@gmail.com', id: 2});
        // console.log("new token is", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpkQGdtYWlsLmNvbSIsImlkIjoyLCJpYXQiOjE3MDM5MjA3ODUsImV4cCI6MTcwMzkyMDgxNX0.BWx97QkFAakjdvyD_e7fRQREa6PDR5AcUEUos9ng1DA';
        // const res = service.verifyToken(token)
        // console.log(res);
    });
}

prepareAndStartServer();
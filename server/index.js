const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const csrf = require('csurf');
const { config: _config } = require('dotenv');
const sequelize = require('./sequelize');
const userRouter = require('./router/user.router');
const postRouter = require('./router/post.router');
const jobRouter = require('./router/job.router');
const productRouter = require('./router/product.router');
const OrderRouter = require('./router/order.router')
const CollectionRouter = require('./router/collection.router')
const InstagramRouter = require('./router/instagram.router');
const ContactusRouter = require('./router/contactus.router');
const Razorpay = require('razorpay')
const csrfProtection = csrf({ cookie: true });
const dotenv = require('dotenv');

dotenv.config();

// const instance = new Razorpay({
//     'key_id': 'rzp_test_3NEUNSDcst96jb',
//     'key_secret': 'MMNoN9x3K6JWQgCam4lLcqPz',
// })


class App{
    constructor(){
        this.app = express();
        this.intializeMiddlewares();
    }

    intializeMiddlewares(){
        this.app.use(cors());
        // this.app.use(function(req,res,next){
        //     var token = req.csrfToken();
        //     res.cookie('XSRF-TOKEN', token);
        //     res.locals.csrfToken = token;
        //     next();
        // })
        this.app.use(bodyParser.json());
        this.initializeRouter();
    };

    initializeRouter(){
        this.app.get('/', (req, res) => {
            res.status(200).send('Backend is running on port 5000');
        });
        this.app.use('/users', userRouter);
        this.app.use('/posts', postRouter);
        this.app.use('/jobs', jobRouter);
        this.app.use('/products',productRouter);
        this.app.use('/orders', OrderRouter);
        this.app.use('/collections', CollectionRouter);
        this.app.use('/instagram', InstagramRouter);
        this.app.use('/contactus', ContactusRouter);
        this.app.get('/get-razor-pay-key', (req, res) => res.status(200).json({ key: process.env.RAJORPAY_KEY_ID }))
    }

    startServer(){
        const PORT  = process.env.PORT||5000;
        this.app.listen(PORT, ()=>{
            console.log(`Server is running at ${PORT}`)
        })
    }
}

const app = new App()
app.startServer();

// module.exports = {instance}

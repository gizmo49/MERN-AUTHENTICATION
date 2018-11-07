const express = require('express');
const userRoutes = require('./api/routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyPaser = require('body-parser');
const passport = require('./passport');
const PORT = 3027;

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());



mongoose.connect('mongodb://node-shop:node-shop@cluster0-shard-00-00-vdcp8.mongodb.net:27017,cluster0-shard-00-01-vdcp8.mongodb.net:27017,cluster0-shard-00-02-vdcp8.mongodb.net:27017/meetup?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true' 
    + {  useMongoClient: true }, (err, db) => {
        if (err) {
        console.log("Couldn't connect to database");
        } else {
        console.log(`Connected To Database`);
        }
  }
);



//handling cors errors

app.use((req,res,next) => {
	res.header(
		"Access-Control-Allow-Origin", "*"
	);
	res.header("Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-type, Accept, Authorization"
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
    }
    
	next();

});

// initialize cookie-parser to allow us access the cookies stored in the browser. 


// initialize express-session to allow us track the logged-in user across sessions.

app.use(bodyPaser.urlencoded({extended:false}));
app.use(bodyPaser.json());

app.use('/users', userRoutes);



//app.listen(process.env.PORT || 3027)

app.listen(PORT, () => {
    console.log(`app running port ${PORT}`)
  })
console.log('Server running on port 3027')
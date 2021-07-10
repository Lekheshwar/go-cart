const app = require('./app')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// setting up config file
dotenv.config({path: 'backend/config/config.env'})

// Connection to Data Base
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to the Database!!")
}).catch(err => console.log(`Data base connection error : ${err}`));


app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`)
});
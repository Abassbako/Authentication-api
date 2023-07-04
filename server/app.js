const express = require('express');
const dotenv = require('dotenv').config();
const userRotes = require('./routers/userRoutes');

const cors = require('cors');
const { default: mongoose } = require( 'mongoose' );

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(cors());
app.use('/api/v1/user', userRotes);

const PORT = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(PORT, () => {
    console.log(`app listening on port ${ PORT }`);
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log(`MongoDB Connection Successful`);
})
.catch((e) => {
    console.error(new Error(`MongoDB Connection Failed: ${ e.message }`));
});
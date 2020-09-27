// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workShift', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./models/user');
require('./models/task');

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/task'))
// app.use(require('./routes/flight'))
// app.use(require('./routes/user'))


app.listen(PORT, console.log(`Server is starting at ${PORT}`));






// const express = require('express');
// const mongoose = require('mongoose')
// const {MONGOURI} = require('./config/key')
// const app = express();

// const PORT = process.env.PORT || 5000; 

// mongoose.connect(MONGOURI , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is connected!!!!');
// });
// mongoose.connection.on('error',(err)=>{
//     console.log("err connecting",err)
// })

// require('./models/user');
// require('./models/post');

// app.use(express.json())
// app.use(require('./routes/auth'))
// app.use(require('./routes/post'))
// app.use(require('./routes/user'))


// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }


// app.listen(PORT, console.log(`Server is starting at ${PORT}`));
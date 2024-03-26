
// // const express = require('express');
// // var app = express();
// // const bodyParser = require('body-parser');
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// // const cors = require('cors');
// // app.use(cors());

// // const customEnv = require('custom-env');
// // customEnv.env(process.env.NODE_ENV,'./config');

// // console.log(process.env.CONNECTION_STRING);
// // console.log(process.env.PORT);

// // const mongoose = require('mongoose');
// // mongoose.connect(process.env.CONNECTION_STRING,{
// //         useNewUrlParser: true,
// //         useUnifiedTopology: true
// //      });

// //      app.use(express.static('public'));
   
// //      const posts=require('./routes/posts');
// //      app.use('/posts',posts);
// //      app.listen(process.env.PORT)


// // const token = require('./routes/token');
// // app.use('api/token',token);


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const customEnv = require('custom-env');

// const tokenRoute = require('./routes/token');

// customEnv.env(process.env.NODE_ENV, './config');

// const app = express();
// const PORT = process.env.PORT || 8080;
// const CONNECTION_STRING = process.env.CONNECTION_STRING;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect(CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// app.use(express.static('public'));

// app.use('/api/token', tokenRoute); // Prefix route with /api

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const customEnv = require('custom-env');
const Post = require('./models/posts');

// Import user routes
const userRoute = require('./routes/users');
const tokenRoute = require('./routes/token');

customEnv.env(process.env.NODE_ENV, './config');

const app = express();
const PORT = process.env.PORT || 8080;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(cors());

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static('public'));

// Use user routes
app.use('/api/users', userRoute);

// Use token routes
app.use('/api/token', tokenRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
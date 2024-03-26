

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const customEnv = require('custom-env');
const Post = require('./models/posts');

// Import user routes
const userRoute = require('./routes/users');
const tokenRoute = require('./routes/token');
const postsRouter = require('./routes/posts');

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

app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


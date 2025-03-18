const express = require('express');
const dotenv = require('dotenv');
const blog = require('./routes/blog');
const cors = require('cors');
const connectdb = require('./db/db');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectdb();

app.use(express.json());
app.use(cors());

app.use('/api/blog', blog);

app.listen(port, () => {  
  console.log(`Server is running on port: ${port}`);
});
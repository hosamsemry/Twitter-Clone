const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/tweets', require('./routes/tweets'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/tweets', require('./routes/tweets'));
app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/feed'));
app.use('/api', require('./routes/search'))
app.use('/api', require('./routes/trending'))
app.use('/api', require('./routes/notifications'))
app.use('/api', require('./routes/bookmarks'))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

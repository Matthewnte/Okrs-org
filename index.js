const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const BaseRoutes = require('./src/routes');
const logger = require('./src/config/winston');
const mongoConnection = require('./src/database/mongoose');

dotenv.config();
mongoConnection();

const PORT = process.env.PORT || 6000;
const { json, urlencoded } = express;

const app = express();

app.use(morgan('combined'));
app.use(json());
app.use(
  cors({
    credentials: true, // In other to receive cookie and other credential from cross origin
  }),
);
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

app.use('/', BaseRoutes);
app.use('/docs', express.static('dist/docs'));
app.use('*', (request, response) => {
  response.status(404).send('Route not Found!');
});

app.use(helmet());

app.listen(PORT, () => {
  logger.info(`Server running on Port ${PORT}`);
});

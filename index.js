const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const BaseRoutes = require('./src/api/routes');
const keyResultRoutes = require('./src/api/routes/keyResult');
const logger = require('./src/config/winston');
const mongoConnection = require('./src/database/mongoose');
const errorHandler = require('./src/api/middleware/errorHandler');
const Exception = require('./src/helpers/exception');

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

app.use('/keyResults', keyResultRoutes);
app.use('/', BaseRoutes);
app.use('/docs', express.static('dist/docs'));
app.all('*', (request, response, next) => {
  next(new Exception('Route not Found!', 404));
});

app.use(helmet());

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on Port ${PORT}`);
});

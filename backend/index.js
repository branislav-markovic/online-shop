const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require("./models");
const bodyParser = require('body-parser');

const app = express();

dotenv.config();

var corsOptions = {
  origin: `http://localhost:${process.env.APP_PORT}`
};

app.use(cors(corsOptions));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
  extended: true
}));

// support parsing of application/json type post data
app.use(bodyParser.json());

db.mongoose
  .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

require("./routes/auth.route")(app);
require("./routes/product.route")(app);
require("./routes/user.route")(app);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server started...');
});

app.get('/', (req, res) => {
    res.send('Welcome');
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

app.get('/', (req, res) => {
    res.json({message: 'Welcome'});
});

require('./routes/tutorial.routes')(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
require('dotenv').config()
const app = require("express")();
const bodyParser = require('body-parser');
const connection = require('./database/db')
const routes = require('./routes/route')
const cors = require('cors')
connection();
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on post ${process.env.PORT}...`);
})
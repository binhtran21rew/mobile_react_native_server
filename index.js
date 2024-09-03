require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Todorouter = require('./routers/todo.router');
const Authentication = require('./routers/authen.router');
const ChatRouter = require('./routers/chat.router');
require('./socket/socket.io');



const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', Todorouter);
app.use('/api/auth', Authentication);
app.use('/api/chat', ChatRouter);


app.listen(process.env.PORT, () => {
    console.log("listening on port localhost:", process.env.PORT);
})
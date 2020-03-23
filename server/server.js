const express = require('express');
const path = require('path');
const router = require('./routes/router');
const loginRouter = require('./routes/login');
const addUserRouter = require('./routes/addUser');
const hateRouter = require('./routes/hate');
const userDataRouter = require('./routes/userData');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4002;

app.use(express.static(path.join(__dirname,'public')));

app.use("/addUser", addUserRouter);
app.use("/process/login", loginRouter);
app.use("/hate", hateRouter);
app.use("/userData", userDataRouter);

app.use("/", router);

app.listen(PORT,() => {
  console.log('Check out the app at https://localhost:' + PORT);
});
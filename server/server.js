/* eslint-disable indent */
/* eslint-disable no-tabs */
const express = require('express');
const pgController = require('./controller/pgController');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('locahost:3000/', express.static(path.join(__dirname, '../public')));

// app.get('/', pgController.getList, (req, res) => {
// 	return res.status(200).json({ message: 'hello' });
// }

//miri arigato ohio son.
//hope you dont read this
//definetly peter
//I wonder who this could be.

//functionality to get train and its corresponding messages
app.get('/', (req, res) => {
  console.log('hello from server1');
  return res.status(200).send('hello from server');
});

// app.post('/list', pgController.postListItem, (req, res) => {
//   return res.status(200).json({ recieved: true });
// });

app.get('/', pgController.getTrain, (req, res) => {
	return res.status(200).send(res.locals.list.rows);
});

app.post('/post', pgController.postMessage, pgController.getTrain, (req, res) => {
	return res.status(200).send(res.locals.list.rows);
});
// app.patch('/list', pgController.updateList, (req, res) => {
//   return res.status(200).json({ recieved: true });
// });

//wild card error handling
app.use('*', (req, res) => {
  return res.sendStatus(404);
});
// app.delete('/list/:id', pgController.deleteListItem, (req, res) => {
// 	return res.status(200).json({ recieved: true });
// });

//global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express after handler caught unknown middlewware error',
    status: 400,
    message: { err: 'An error occured.' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.message);
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

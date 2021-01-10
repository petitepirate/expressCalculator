const express = require('express');
const { validateAndReturnNumsArray, findMean, findMedian, findMode } = require('./helpers');  //destructuring

const app = express();

app.use(express.json());  //explicitly tell express to use Json


//mean route
app.get('/mean', function(req, res, next) {
  const operation = 'mean';
  try {  //error handeling
    const nums = validateAndReturnNumsArray(req.query.nums);
    const value = findMean(nums);
    return res.json({operation, value});  //return json
  } catch(e) {
    return next(e);
  }
});

//median route
app.get('/median', function(req, res, next) {
  const operation = 'median';
  try {
    const nums = validateAndReturnNumsArray(req.query.nums);
    const value = findMedian(nums);
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

//mode route
app.get('/mode', function(req, res, next) {
  const operation = 'mode';
  try {
    const nums = validateAndReturnNumsArray(req.query.nums);
    const value = findMode(nums);
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

//error handeling - default
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
})

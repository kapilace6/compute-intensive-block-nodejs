var express = require('express');
var router = express.Router();

/* Naive Promise Fib */
async function promiseFib(n) {
  return new Promise((resolve, reject) => {
    if (n < 2)
      return resolve(1);

    let fn1 = promiseFib(n - 1);
    let fn2 = promiseFib(n - 2);

    Promise.all([fn1, fn2]).then((result) => {
      let kn = result[0] + result[1];
      resolve(kn);
    });
  });

}
router.get('/api/promise/fib/:n', function (req, res, next) {
  let n = req.params['n'];

  promiseFib(n)
    .then((result) => {
      return res.json({ "data": result });
    });
});

/* Set Immediate Fib */
async function immediateFib(n) {
  if (n < 2)
    return 1;

  let fn1 = await new Promise((resolve) => {
    setImmediate(() => { 
      resolve(immediateFib(n - 1));
    });
  });
  let fn2 = await new Promise((resolve) => {
    setImmediate(() => { 
      resolve(immediateFib(n - 2));
    });
  });

  return fn1 + fn2;
}
router.get('/api/immediate/fib/:n', async function (req, res, next) {
  let n = req.params['n'];

  let kn = await immediateFib(n);
  return res.json({"data": kn})
});

router.get('/api/health', function (req, res, next) {
  return res.json({ "message": "hello health" });
});

module.exports = router;

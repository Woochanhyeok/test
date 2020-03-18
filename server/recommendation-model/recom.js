const { PythonShell } = require('python-shell');

PythonShell.runString('x=1+1;print(x)', null, (err, result) => {
  if(err) throw err;
  console.log(result);
});
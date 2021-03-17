const express = require('express');
const bodyParser = require('body-parser');
const { static, request } = require('express');
const https = require('https');
//Import PythonShell module.
const { PythonShell } = require('python-shell');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/', function (req, res) {
  // res.send('sai h');
  res.render('index.ejs');
  // res.sendFile(__dirname+"/index.html");
});

app.post('/', function (req, res) {
  console.log(req.body);
  var selected_File = req.body.song;

  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    // scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
    args: [selected_File], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run('python_test.py', options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    console.log('result: ', result.toString());
    // res.send(result.toString());
    var Image = "graph/"+selected_File+".png";



    res.render('graph.ejs',{userName:selected_File , corrValue:result.toString() , userNameImage:Image});
  });

  // res.send(result.toString())
  // res.send("received");

  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000!');
});

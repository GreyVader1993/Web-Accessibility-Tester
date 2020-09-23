const http = require('http');
const { parse } = require('querystring');
function execute(command) {
    const exec = require('child_process').exec
  
    exec(command, (err, stdout, stderr) => {
      process.stdout.write(stdout)
    })
  }

// function openInNewTab(url) {
//    open( url, function (err) {
//    if ( err ) throw err;    
// });
// }
var temp;
var text;
//var cwd = process.cwd() + '\\' + 'results.html';

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            console.log(cwd);
            console.log("HELLO");
            temp = result.InputLabelURL;
            text = 'pa11y --reporter html ' + temp +' > results.html';
            execute(text);
            res.end(`Parsed data belonging to ${result.InputLabelURL}`);
            //openInNewTab(cwd);
        });
    } 
    else {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Web Accessibility</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display"/>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap" rel="stylesheet"> 
        </head>
        <body>
        
        <div class="text-center" style="background-color: black; padding: 2em;">
          <h1 style="color: white; font-family: Playfair Display SC;">Web Accessibility Test</h1>
        </div>
          
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
                <form action="/" method="post">
                    <div class="form-group">
                      <label for="inputlabel1" style="padding-top: 3em; font-family: Calibri; font-size: x-large;">Enter URL</label>
                      <input type="url" class="form-control" name="InputLabelURL" id="InputLabelURL" aria-describedby="InputLabelURL" placeholder="Enter URL here... (https://example.com)">
                    </div>
                    <button type="submit" class="btn btn-primary" style="padding-left: 2em; padding-right: 2em; font-family: Calibri; font-size: larger; background-color: #6320EE;"><strong>Go!</strong></button>
                </form>
        
                <h4 style="padding-top:2em; font-family: Playfair Display SC; font-size: xx-large;">What is Web Accessibility?</h4>
                <h5 style="padding-top:1em; font-family: Playfair Display; font-size: x-large;">Web accessibility testing is a subset of usability testing where the users under consideration have disabilities 
                    that affect how they use the web. The end goal, in both usability and accessibility, is to discover how easily people 
                    can use a web site and feed that information back into improving future designs and implementations.</h5>          
            </div>
          </div>
        </div>
        </body>
            </html>
        `);
    }
});
server.listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
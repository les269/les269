var express = require('express');
var interceptor = require('express-interceptor');
var app = express();


var finalParagraphInterceptor = interceptor(function(req, res,next){
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function(){
      return req.url.startsWith('/disk/list');
    },
    // Appends a paragraph at the end of the response body
    intercept: function(body, send)  {
        res.writeHead(301, {
          Location: 'http://192.168.0.193:8080/'+req.url
        });
        res.end();
    }
  };
})

app.use(finalParagraphInterceptor);

app.use(express.static('public'));
// app.get('/disk/list', function (req, res) {
//   res.redirect('http://192.168.0.193:8080//disk/list')
// });

app.listen(5000);
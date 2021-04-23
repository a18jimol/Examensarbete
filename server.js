var connect = require('connect'),
serveStatic = require('serve-static');

var app = connect();


app.use(serveStatic("../examensarbete-master"));
app.use(serveStatic("AngularJS"));
app.use(serveStatic("vue/dist"));

app.listen(5000);
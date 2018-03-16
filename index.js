var jsonfile = require('jsonfile');

var jsonfile = require('jsonfile');

var file = "./donnees.json";

var stocks = jsonfile.readFileSync(file);


var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({  // default is fine for me, change as you see fit
    host: 'localhost:9200',
    log: 'trace'
});

var body = [];
for (var i = 0; i < stocks.length; i++ ) {
    delete stocks[i]._id;
    var config = { index:  { _index: 'stocks', _type: 'stock', _id: i } };
    body.push(config);
    body.push(stocks[i]);
}

client.bulk({
    body: body
}, function (error, response) {
    if (error) {
        console.error(error);
        return;
    }
    else {
        console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
    }
});

/*
client.delete({
    index: "stocks", // name your index
    type: "stock",
    id: 0
}, function(error, response) {
    if (error) {
        console.error(error);
        return;
    }
    else {
        console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
    }
});
*/

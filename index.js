var jsonfile = require('jsonfile');

var jsonfile = require('jsonfile');

var file = "./donnees.json";

var dblps = jsonfile.readFileSync(file);


var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({  // default is fine for me, change as you see fit
    host: 'localhost:9200',
    log: 'trace'
});

var body = [];
for (var i = 0; i < dblps.length; i++ ) {
    delete dblps[i]._id;
    var config = { index:  { _index: 'dblps', _type: 'dblp', _id: i } };
    body.push(config);
    body.push(dblps[i]);
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
    index: "dblps", // name your index
    type: "dblp",
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

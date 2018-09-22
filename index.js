var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function() {});

var bookSchema = mongoose.Schema(
{
	title: String,
	author: String,
	year: Number,
	price: Number,
	amount: Number
});
var Book = mongoose.model('Book', bookSchema);


app.use(bodyParser.urlencoded({
    extended : true,
    limit : '50mb'
}));
app.use(bodyParser.json({
    limit : '50mb'
}));


var GetBooks = function(req,res) {
	res.send(books);
};

var BookADD = function(req,res) {
	var book = {
		id: req.body.id,
		name: req.body.name,
		avtor: req.body.avtor
	};

	if (!book.id || !book.name || !book.avtor) {
		return res.send("INVALID BODY");
	}
	books.push(book);
	res.send("Book Add");
};

var BookEdit = function(req,res) {
	var bookid = Number(req.params.bookID);
	for (let i = 0; i < books.length; i++)
		if (books[i].id === bookid)
		{
			books[i].name = req.body.name;
			books[i].avtor = req.body.avtor;
			return res.send(`Book edit!`);

		}
		
		res.send('there is no such book');
		
};


app.get('/books',GetBooks);
app.post('/books', BookADD);
app.put('/books/:bookID', BookEdit);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



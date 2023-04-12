const express = require('express');

const app = express();

const exphbs = require('express-handlebars');

app.use(express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(5000, () => console.log(`Sever started on http://localhost:5000`));

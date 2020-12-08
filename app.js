const express = require('express');
const app = express();
const port = 3000
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));


// Rutas
app.get('/', function (req, res) {
    res.send('hello con babel');
  });
  
  // Middleware para Vue.js router modo history
  const history = require('connect-history-api-fallback');
  app.use(history());
  app.use(express.static(path.join(__dirname, 'public')));

// app.set('puerto', process.env.PORT || 3000);
app.listen(port, ()=>{
console.log('en escucha ahora en :  ', port)
})
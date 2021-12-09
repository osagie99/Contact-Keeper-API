// Bring in express
const express = require ('express');
const app = express();
// specify port to listen on 
const PORT = process.env.PORT || 4000;

app.get('/', (req, res)=> res.json({msg: 'Welcome to Contact Keeper Api'}));
//  Define our routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
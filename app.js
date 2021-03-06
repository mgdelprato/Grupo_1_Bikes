//Todos los requires
const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path'); // Este modulo me va a permitir escribir rutas de manera correcta sin la necesidad de concatenar...
const productsRouter = require('./src/routes/products');
const usersRouter = require('./src/routes/users')
const adminRouter = require('./src/routes/admin')
const apiRouter = require('./src/routes/api')
const methodOverride = require('method-override');
const mainRouter = require('./src/routes/index')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const remembermeController = require('./src/controllers/remembermeController');
const productsController = require('./src/controllers/productsController');

// Esta linea aclara que vamos a disponibilizar una carpeta para que sea pública para que el navegador pueda acceder...
app.use(cors())
app.use(express.static( path.join(__dirname, './public') ) )
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Method-Override para metodos PUT Y DELETE
app.use(methodOverride('_method'));

/*---------------------------------------------------------------------------------- */
/* SESSION */
app.use(session({secret: "Esta es la clave secreta"}))
app.use(remembermeController.session)

//COOKIES
app.use(cookieParser())
app.use(remembermeController.cookie)
 

/* HOME */
app.get('/', mainRouter)

/* USUARIOS */
app.use('/users', usersRouter);

/* PRODUCTS */
app.use('/products',productsRouter);

/* ADMIN */
app.use('/admin',adminRouter);

/* APIs */
app.use('/api', apiRouter);


/* Esto se agrega para cuando trabajamos con metodos http*/

app.use(express.urlencoded({extended: false}));
app.use(express.json())
/*---------------------------------------------------------------------------------- */



/*Inicializar puerto de escucha del servidor*/
app.listen(process.env.PORT || 5000, function() {
  console.log(`Servidor corriendo en el puerto 5000`);
  console.log(`http://localhost:5000`);
})

/*EJS*/
app.set('view engine', 'ejs');
/*---------------------------------------------------------------------------------- */

app.use(
  (req,res,next) =>{
    res.status(400).render(path.join(__dirname, '/src/views/users/notfound.ejs'))
      
  }
)

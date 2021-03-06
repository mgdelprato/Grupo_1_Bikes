const express = require('express');
const router = express.Router();
const multer = require('multer');
const productsController = require('../controllers/productsController');
const path = require('path');
const adminMiddleware = require('../middlewares/adminMiddleware');
const productCreateValidator = require('../validators/productCreateValidator');
const productEditValidator = require('../validators/productEditValidator');

//Multer para guardar las imagenes de productos
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function (req, file, cb) {
        console.log()
        cb(null, req.body.producto + '-' + Date.now() + path.extname(file.originalname))
        req.body.fileExtension = path.extname(file.originalname).toLowerCase()
    }
})


var upload = multer({ storage: storage })
/***********
 LAS SIGUIENTES RUTAS SOLO PODRÁN SER ACCEDIDAS SI TE ENCONTRAS LOGUEADO CON USUARIO ADMIN 
************/

//Creación de un producto
router.get('/products/productCreate',adminMiddleware.adminUser, productsController.crearProducto);
router.post('/products/productCreate', upload.any(),productCreateValidator.productCreateCheck, productsController.grabarProducto);
//Edición de un producto
router.get('/products/productEdit/:id',adminMiddleware.adminUser, productsController.editarProducto);
router.put('/products/productEdit/:id',upload.any(), productEditValidator.productEditCheck, productsController.actualizarProducto); 
//Eliminación de un producto
router.delete('/products/delete/:id',adminMiddleware.adminUser,productsController.borrarProducto);
//Listado de productos
router.get('/products/productList',adminMiddleware.adminUser,productsController.listarProducto); // Trae listado de productos


module.exports = router;
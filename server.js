const express = require('express');
const path = require('path');
const { sequelize } = require('./config/db'); 
const Curso = require('./models/Curso');
const Estudiante = require('./models/Estudiante');
const CursoEstudiante = require('./models/CursoEstudiante');
const Profesor = require('./models/Profesor');
const User = require('./models/User'); // Importa el modelo User
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const Routes = require('./routes/Routes');

// Configurar la aplicación Express
const app = express();

// Middleware para manejar JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Configuración de sesión y Passport
app.use(session({
    secret: 'secreto_para_el_sistema_de_autenticacion',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configurar mensajes flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Configurar Passport
require('./config/passport')(passport);

// Sincronizar los modelos con la base de datos
sequelize.sync({ alter: true }).then(() => {
    console.log("Todos los modelos se sincronizaron exitosamente con alteraciones.");
}).catch(error => {
    console.error("Error al sincronizar los modelos con alteraciones:", error);
});

// Registrar rutas
app.use('/', Routes);

// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const express = require('express');
const path = require('path');
const authController = require('../controllers/authController'); // Aseg�rate de que esta ruta sea correcta
const cursoController = require('../controllers/cursosController');
const router = express.Router();

// P�gina de inicio de sesi�n
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

// Procesar inicio de sesi�n
router.post('/login', authController.login); // Aseg�rate de que authController.login est� definido

// P�gina de registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});

// P�gina de Dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
});

// Opciones del profesor
router.get('/professor/availability', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'crear-cita.html'));
});

router.get('/professor/appointments', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'ver-citas.html'));
});

router.get('/professor/students', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'ver-estudiantes.html'));
});

// Opciones del estudiante
router.get('/student/appointments', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'solicitar-cita.html'));
});

router.get('/student/my-appointments', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'mis-citas.html'));
});

// Opciones del administrador
router.get('/admin/courses', async (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'gestionar-cursos.html'));
});

router.get('/admin/professors', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'asignar-profesor.html'));
});

router.get('/admin/students', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'asignar-estudiantes.html'));
});

router.get('/admin/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin-settings.html'));
});  // <-- Aqu� estaba el par�ntesis faltante

router.get('/admin/reports', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin-reports.html'));
});

// API para obtener datos 
router.get('/api/user-info', (req, res) => {
    res.json({ name: req.user.nombre, role: req.user.role }); // Env�a datos JSON
});

router.get('/admin/courses', async (req, res) => {
    const estudiantes = await Estudiante.findAll(); // Obtener la lista de estudiantes desde la base de datos
    res.render('asignar-curso', { estudiantes }); // Renderiza la vista con la lista de estudiantes
});

// Procesar solicitudes POST
router.post('/dashboard', authController.register);
// Procesar la asignaci�n de un profesor a un curso
router.post('/professor/availability', authController.register);
router.post('/student/appointments', authController.register);
router.post('/solicitar-cita', authController.register);
router.post('/register', authController.register);

// Cerrar sesi�n
router.get('/logout', authController.logout); // Aseg�rate de que authController.logout est� definido

module.exports = router;

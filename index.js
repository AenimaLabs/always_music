const { Client } = require('pg');

const client = new Client({
    user: 'postgres',     // Reemplaza con tu usuario de PostgreSQL
    host: 'localhost',
    database: 'always_music',
    password: '11235', // Reemplaza con tu contraseña de PostgreSQL
    port: 5432,
});

client.connect();

async function agregarEstudiante(nombre, rut, curso, nivel) {
    try {
        const res = await client.query('INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)', [nombre, rut, curso, nivel]);
        console.log('Estudiante agregado:', res);
    } catch (err) {
        console.error('Error agregando estudiante:', err);
    }
}

async function consultarEstudiantePorRut(rut) {
    try {
        const res = await client.query('SELECT * FROM estudiantes WHERE rut = $1', [rut]);
        console.log('Estudiante:', res.rows[0]);
    } catch (err) {
        console.error('Error consultando estudiante:', err);
    }
}

async function consultarEstudiantes() {
    try {
        const res = await client.query('SELECT * FROM estudiantes');
        console.log('Estudiantes:', res.rows);
    } catch (err) {
        console.error('Error consultando estudiantes:', err);
    }
}

async function actualizarEstudiante(nombre, rut, curso, nivel) {
    try {
        const res = await client.query('UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4', [nombre, curso, nivel, rut]);
        console.log('Estudiante actualizado:', res);
    } catch (err) {
        console.error('Error actualizando estudiante:', err);
    }
}

async function eliminarEstudiante(rut) {
    try {
        const res = await client.query('DELETE FROM estudiantes WHERE rut = $1', [rut]);
        console.log('Estudiante eliminado:', res);
    } catch (err) {
        console.error('Error eliminando estudiante:', err);
    }
}

const [,, command, ...args] = process.argv;

switch (command) {
    case 'agregar':
        agregarEstudiante(args[0], args[1], args[2], parseInt(args[3]));
        break;
    case 'consultar':
        consultarEstudiantes();
        break;
    case 'consultar-rut':
        consultarEstudiantePorRut(args[0]);
        break;
    case 'actualizar':
        actualizarEstudiante(args[0], args[1], args[2], parseInt(args[3]));
        break;
    case 'eliminar':
        eliminarEstudiante(args[0]);
        break;
    default:
        console.log('Comando no reconocido');
}




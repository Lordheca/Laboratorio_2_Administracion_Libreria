"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biblioteca_1 = require("./biblioteca");
var Interfaces_1 = require("./Interfaces");
function main() {
    console.log("===== SISTEMA DE BIBLIOTECA =====");
    // Crear biblioteca
    var biblioteca = new biblioteca_1.Biblioteca("Biblioteca Central");
    // ==============================
    // REGISTRAR USUARIOS
    // ==============================
    var u1 = biblioteca.Registrar_Usuario("Juan Perez", "juan@email.com", Interfaces_1.Tipo_Usuario.Estudiante);
    var u2 = biblioteca.Registrar_Usuario("Maria Lopez", "maria@email.com", Interfaces_1.Tipo_Usuario.Profesor);
    var u3 = biblioteca.Registrar_Usuario("Carlos Admin", "admin@email.com", Interfaces_1.Tipo_Usuario.Administrador);
    console.log("\nUsuarios registrados:");
    console.log(u1.Obtener_Informacion());
    console.log(u2.Obtener_Informacion());
    console.log(u3.Obtener_Informacion());
    // ==============================
    // AGREGAR LIBROS
    // ==============================
    biblioteca.Agregar_Libro("9780001", "El Señor de los Anillos", "J.R.R. Tolkien", Interfaces_1.Categoria_Libro.Ficcion, "1954", 3);
    biblioteca.Agregar_Libro("9780002", "Clean Code", "Robert C. Martin", Interfaces_1.Categoria_Libro.Tecnologia, "2008", 2);
    biblioteca.Agregar_Libro("9780003", "Breve Historia del Tiempo", "Stephen Hawking", Interfaces_1.Categoria_Libro.Ciencia, "1988", 1);
    // ==============================
    // BÚSQUEDAS
    // ==============================
    console.log("\nLibros de Tecnología:");
    var tecnologia = biblioteca.Buscar_Libros_Por_Categoria(Interfaces_1.Categoria_Libro.Tecnologia);
    tecnologia.forEach(function (libro) {
        console.log(libro.obtenerInformacion());
    });
    console.log("\nLibros de Tolkien:");
    var tolkien = biblioteca.Buscar_Libros_Por_Autor("Tolkien");
    tolkien.forEach(function (libro) {
        console.log(libro.obtenerInformacion());
    });
    // ==============================
    // REALIZAR PRESTAMOS
    // ==============================
    console.log("\n===== PRÉSTAMOS =====");
    var p1 = biblioteca.Realizar_Prestamo(u1.Id, "9780001");
    var p2 = biblioteca.Realizar_Prestamo(u2.Id, "9780002");
    var p3 = biblioteca.Realizar_Prestamo(u1.Id, "9780002");
    if (p1)
        console.log(p1.Obtener_Informacion());
    if (p2)
        console.log(p2.Obtener_Informacion());
    if (p3)
        console.log(p3.Obtener_Informacion());
    // ==============================
    // DEVOLUCIONES
    // ==============================
    console.log("\n===== DEVOLUCIONES =====");
    if (p1) {
        biblioteca.Devolver_Prestamo(p1.Id);
    }
    // ==============================
    // REPORTES
    // ==============================
    console.log("\n===== REPORTES =====");
    biblioteca.Generar_Reporte_Libros_Mas_Prestados(5);
    biblioteca.Generar_Estadisticas_Generales();
}
// ejecutar programa
main();

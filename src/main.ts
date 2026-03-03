import { Biblioteca } from "./biblioteca";
import { Tipo_Usuario, Categoria_Libro } from "./Interfaces";

function main(): void {

    console.log("===== SISTEMA DE BIBLIOTECA =====");

    // Crear biblioteca
    const biblioteca = new Biblioteca("Biblioteca Central");

    // ==============================
    // REGISTRAR USUARIOS
    // ==============================

    const u1 = biblioteca.Registrar_Usuario(
        "Juan Perez",
        "juan@email.com",
        Tipo_Usuario.Estudiante
    );

    const u2 = biblioteca.Registrar_Usuario(
        "Maria Lopez",
        "maria@email.com",
        Tipo_Usuario.Profesor
    );

    const u3 = biblioteca.Registrar_Usuario(
        "Carlos Admin",
        "admin@email.com",
        Tipo_Usuario.Administrador
    );

    console.log("\nUsuarios registrados:");
    console.log(u1.Obtener_Informacion());
    console.log(u2.Obtener_Informacion());
    console.log(u3.Obtener_Informacion());


    // ==============================
    // AGREGAR LIBROS
    // ==============================

    biblioteca.Agregar_Libro(
        "9780001",
        "El Señor de los Anillos",
        "J.R.R. Tolkien",
        Categoria_Libro.Ficcion,
        "1954",
        3
    );

    biblioteca.Agregar_Libro(
        "9780002",
        "Clean Code",
        "Robert C. Martin",
        Categoria_Libro.Tecnologia,
        "2008",
        2
    );

    biblioteca.Agregar_Libro(
        "9780003",
        "Breve Historia del Tiempo",
        "Stephen Hawking",
        Categoria_Libro.Ciencia,
        "1988",
        1
    );


    // ==============================
    // BÚSQUEDAS
    // ==============================

    console.log("\nLibros de Tecnología:");

    const tecnologia = biblioteca.Buscar_Libros_Por_Categoria(Categoria_Libro.Tecnologia);

    tecnologia.forEach(libro => {
        console.log(libro.obtenerInformacion());
    });

    console.log("\nLibros de Tolkien:");

    const tolkien = biblioteca.Buscar_Libros_Por_Autor("Tolkien");

    tolkien.forEach(libro => {
        console.log(libro.obtenerInformacion());
    });


    // ==============================
    // REALIZAR PRESTAMOS
    // ==============================

    console.log("\n===== PRÉSTAMOS =====");

    const p1 = biblioteca.Realizar_Prestamo(u1.Id, "9780001");
    const p2 = biblioteca.Realizar_Prestamo(u2.Id, "9780002");
    const p3 = biblioteca.Realizar_Prestamo(u1.Id, "9780002");
    

    if (p1) console.log(p1.Obtener_Informacion());
    if (p2) console.log(p2.Obtener_Informacion());
    if (p3) console.log(p3.Obtener_Informacion());

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
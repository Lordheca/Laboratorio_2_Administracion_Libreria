import { Libro } from "./clases";
import { Categoria_Libro, Tipo_Usuario } from "./Interfaces";
import { Usuario } from "./clases";

const estudiante = new Usuario(
    1,
    "Juan Pérez",
    "juan.perez@email.com",
    Tipo_Usuario.Estudiante
);




const libro1 = new Libro(
    "978-1234567890",
    "Clean Code",
    "Robert C. Martin",
    Categoria_Libro.Tecnologia,
    "2008",
    5
);

console.log(libro1);

libro1.prestarCopia();
console.log("Copias disponibles:", libro1.Copias_Disponibles);

libro1.devolverCopia();
console.log("Copias disponibles:", libro1.Copias_Disponibles);

console.log("--- Información del Usuario ---");
console.log(estudiante.Obtener_Informacion());
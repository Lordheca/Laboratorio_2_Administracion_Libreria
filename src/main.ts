import { Libro } from "./clases";
import { Categoria_Libro } from "./Interfaces";

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
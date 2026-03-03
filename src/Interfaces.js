"use strict";
//* INTERFACES DEL SISTEMA
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estado_Prestamo = exports.Estado_Libro = exports.Categoria_Libro = exports.Tipo_Usuario = void 0;
var Tipo_Usuario;
(function (Tipo_Usuario) {
    Tipo_Usuario[Tipo_Usuario["Estudiante"] = 0] = "Estudiante";
    Tipo_Usuario[Tipo_Usuario["Profesor"] = 1] = "Profesor";
    Tipo_Usuario[Tipo_Usuario["Administrador"] = 2] = "Administrador";
})(Tipo_Usuario || (exports.Tipo_Usuario = Tipo_Usuario = {})); //? Enumeracion: Es una serie de constantes que alojan un valor numerico 0....n
var Categoria_Libro;
(function (Categoria_Libro) {
    Categoria_Libro[Categoria_Libro["Ficcion"] = 0] = "Ficcion";
    Categoria_Libro[Categoria_Libro["No_Ficcion"] = 1] = "No_Ficcion";
    Categoria_Libro[Categoria_Libro["Ciencia"] = 2] = "Ciencia";
    Categoria_Libro[Categoria_Libro["Tecnologia"] = 3] = "Tecnologia";
    Categoria_Libro[Categoria_Libro["Historia"] = 4] = "Historia";
    Categoria_Libro[Categoria_Libro["Arte"] = 5] = "Arte";
})(Categoria_Libro || (exports.Categoria_Libro = Categoria_Libro = {}));
var Estado_Libro;
(function (Estado_Libro) {
    Estado_Libro[Estado_Libro["Disponible"] = 0] = "Disponible";
    Estado_Libro[Estado_Libro["Prestado"] = 1] = "Prestado";
    Estado_Libro[Estado_Libro["Reservado"] = 2] = "Reservado";
    Estado_Libro[Estado_Libro["Mantenimiento"] = 3] = "Mantenimiento";
})(Estado_Libro || (exports.Estado_Libro = Estado_Libro = {}));
var Estado_Prestamo;
(function (Estado_Prestamo) {
    Estado_Prestamo["Activo"] = "Activo";
    Estado_Prestamo["Devuelto"] = "Devuelto";
    Estado_Prestamo["Vencido"] = "Vencido";
})(Estado_Prestamo || (exports.Estado_Prestamo = Estado_Prestamo = {}));

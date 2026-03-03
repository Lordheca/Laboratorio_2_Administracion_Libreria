"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca = void 0;
var Interfaces_1 = require("./Interfaces");
var clases_1 = require("./clases");
var Biblioteca = /** @class */ (function () {
    function Biblioteca(nombre) {
        this.nombre = nombre;
        //* Propiedades privadas y Map's para las variables solicitadas
        this.Usuarios = new Map();
        this.Libros = new Map();
        this.Prestamos = new Map();
        this.Contador_Prestamos = 1;
    }
    //? Gestion de Usuarios
    Biblioteca.prototype.Registrar_Usuario = function (nombre, email, tipo) {
        var Id = this.Usuarios.size + 1;
        var Nuevo_Usuario = new clases_1.Usuario(Id, nombre, email, tipo);
        this.Usuarios.set(Id, Nuevo_Usuario);
        console.log("Nuevo Usuario Registrado: ".concat(nombre, " con el ID: ").concat(Id));
        return Nuevo_Usuario;
    };
    Biblioteca.prototype.Obtener_Usuario = function (id) {
        return this.Usuarios.get(id);
    };
    //? Gestion de Libros
    Biblioteca.prototype.Agregar_Libro = function (ISBN, Titulo, Autor, Categoria, Anio, Copias) {
        var Nuevo_Libro = new clases_1.Libro(ISBN, Titulo, Autor, Categoria, Anio, Copias);
        this.Libros.set(ISBN, Nuevo_Libro);
        console.log("Nuevo Libro Registrado: ".concat(Titulo, " con el ISBN: ").concat(ISBN));
        return Nuevo_Libro;
    };
    Biblioteca.prototype.Obtener_Libro = function (ISBN) {
        return this.Libros.get(ISBN);
    };
    Biblioteca.prototype.Buscar_Libros_Por_Categoria = function (Categoria) {
        return Array.from(this.Libros.values()).filter(function (lib) { return lib.Categoria === Categoria; });
    };
    Biblioteca.prototype.Buscar_Libros_Por_Autor = function (Autor) {
        return Array.from(this.Libros.values()).filter(function (lib) { return lib.Autor.toLowerCase().includes(Autor.toLowerCase()); });
        //? Uso de Lower case para ser case-insensitive
    };
    //? Gestion de Prestamos
    Biblioteca.prototype.Realizar_Prestamo = function (Id_Usuario, ISBN, Dias_Prestamo) {
        if (Dias_Prestamo === void 0) { Dias_Prestamo = 14; }
        var Usuario = this.Obtener_Usuario(Id_Usuario);
        var Libro = this.Obtener_Libro(ISBN);
        //* Validaciones
        if (!Usuario || !Libro || !Usuario.puedeRealizarPrestamo() || !Libro.estaDisponible()) {
            console.log("No se puede realizar el prestamo, verifique disponibilidad o limite");
            return null;
        }
        //* En caso de pasar validaciones...
        var Nuevo_Prestamo = new clases_1.Prestamo(this.Contador_Prestamos++, Usuario, Libro, Dias_Prestamo);
        this.Prestamos.set(Nuevo_Prestamo.Id, Nuevo_Prestamo);
        //* Actualizar Libros y contador de prestamos
        Libro.prestarCopia();
        Usuario.Contador_Prestamos_Activos++;
        console.log("Prestamo exitoso con ID:".concat(Nuevo_Prestamo.Id, " registrado para ").concat(Usuario.Nombre));
        return Nuevo_Prestamo;
    };
    Biblioteca.prototype.Devolver_Prestamo = function (Id_Prestamo) {
        var Prestamo = this.Prestamos.get(Id_Prestamo);
        //* Validaciones
        if (!Prestamo || Prestamo.Estado_Prestamo === Interfaces_1.Estado_Prestamo.Devuelto) {
            console.log("Prestamo no encontrado o ya esta devuelto");
            return;
        }
        //* Validaciones aceptadas
        Prestamo.Realizar_Devolucion();
        Prestamo.Libro.devolverCopia();
        Prestamo.Usuario.Contador_Prestamos_Activos--;
        console.log("Devoluci\u00F3n exitosa del pr\u00E9stamo con ID:".concat(Id_Prestamo));
        var multa = Prestamo.Calcular_Multa();
        if (multa > 0) {
            console.log("ATENCI\u00D3N: El usuario tiene una multa acumulada de $".concat(multa));
        }
    };
    //* Seccion de Reportes
    Biblioteca.prototype.Generar_Reporte_Libros_Mas_Prestados = function (n) {
        if (n === void 0) { n = 5; }
        var Conteo = new Map();
        this.Prestamos.forEach(function (p) {
            var Titulo = p.Libro.Titulo;
            Conteo.set(Titulo, (Conteo.get(Titulo) || 0) + 1);
        });
        var Top = Array.from(Conteo.entries())
            .sort(function (a, b) { return b[1] - a[1]; })
            .slice(0, n);
        console.log("\n TOP ".concat(n, " Libros Mas Prestados"));
        Top.forEach(function (_a, i) {
            var Titulo = _a[0], cant = _a[1];
            console.log("".concat(i + 1, ". ").concat(Titulo, " - ").concat(cant, " prestamos"));
        });
    };
    Biblioteca.prototype.Generar_Estadisticas_Generales = function () {
        //? Cambio a Arrays para filtros
        var Usuarios_Arr = Array.from(this.Usuarios.values());
        var Libros_Arr = Array.from(this.Libros.values());
        var Prestamos_Arr = Array.from(this.Prestamos.values());
        //? Usuarios por Tipo
        var Estudiantes = Usuarios_Arr.filter(function (u) { return u.Tipo_Usuario === Interfaces_1.Tipo_Usuario.Estudiante; }).length;
        var Profesores = Usuarios_Arr.filter(function (u) { return u.Tipo_Usuario === Interfaces_1.Tipo_Usuario.Profesor; }).length;
        var Admins = Usuarios_Arr.filter(function (u) { return u.Tipo_Usuario === Interfaces_1.Tipo_Usuario.Administrador; }).length;
        //? Copias Presatdas y Dispo
        var Total_Copias_Disponibles = Libros_Arr.reduce(function (acc, Libro) { return acc = Libro.Copias_Disponibles; }, 0);
        var Total_Copias_Existentes = Libros_Arr.reduce(function (acc, Libro) { return acc = Libro.Copias_Totales; }, 0);
        var Total_Copias_Prestadas = Total_Copias_Existentes - Total_Copias_Disponibles;
        //? Prestamos
        var Activos = Prestamos_Arr.filter(function (p) { return p.Estado_Prestamo === Interfaces_1.Estado_Prestamo.Activo; }).length;
        var Devueltos = Prestamos_Arr.filter(function (p) { return p.Estado_Prestamo === Interfaces_1.Estado_Prestamo.Devuelto; }).length;
        var Vencidos = Prestamos_Arr.filter(function (p) { return p.Estado_Prestamo === Interfaces_1.Estado_Prestamo.Vencido; }).length;
        //? Calculo de totales
        var Total_Libros = Libros_Arr.length;
        var Total_Usuarios = Usuarios_Arr.length;
        var Total_Prestamos = Prestamos_Arr.length;
        //? Tasa de uso
        var Tasa_Uso = Total_Libros > 0 ? (Total_Prestamos / Total_Libros) * 100 : 0;
        var Promedio_Prestamos = Total_Usuarios > 0 ? (Total_Prestamos / Total_Usuarios) : 0;
        //? Formato del Reporte
        console.log(" REPORTE GENERAL:\n        \n        USUARIOS:\n        ==========================================\n        \u2022 Estudiantes:   ".concat(Estudiantes, "\n        \u2022 Profesores:    ").concat(Profesores, "\n        \u2022 Administradores: ").concat(Admins, "\n        \u2022 TOTAL:         ").concat(Total_Usuarios, "\n\n        LIBROS:\n        ==========================================\n        \u2022 T\u00EDtulos en cat\u00E1logo: ").concat(Total_Libros, "\n        \u2022 Copias Disponibles:  ").concat(Total_Copias_Disponibles, " \n        \u2022 Copias Prestadas:    ").concat(Total_Copias_Prestadas, " \n        \u2022 Total:               ").concat(Total_Copias_Existentes, "\n\n        PRESTAMOS:\n        ==========================================\n        \u2022 Activos:   ").concat(Activos, " \u23F3\n        \u2022 Devueltos: ").concat(Devueltos, " \u2705\n        \u2022 Vencidos:  ").concat(Vencidos, " \u26A0\uFE0F\n        \u2022 TOTAL:     ").concat(Total_Prestamos, "\n\n        INDICADORES\n        ==========================================\n        \u2022 Tasa de Uso:          ").concat(Tasa_Uso.toFixed(2), "%\n        \u2022 Promedio Pr\u00E9stamos/U: ").concat(Promedio_Prestamos.toFixed(1), "\n        "));
    };
    return Biblioteca;
}());
exports.Biblioteca = Biblioteca;

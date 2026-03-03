"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prestamo = exports.Libro = exports.Usuario = void 0;
var Interfaces_1 = require("./Interfaces");
var Usuario = /** @class */ (function () {
    function Usuario(id, nombre, email, tipoUsuario) {
        this.Id = id;
        this._Nombre = nombre;
        this._Email = email;
        this.Tipo_Usuario = tipoUsuario;
        //inicializar fecha y contador
        this.Fecha_Registro = new Date();
        this.Contador_Prestamos_Activos = 0;
    }
    Object.defineProperty(Usuario.prototype, "Nombre", {
        // Getters
        get: function () {
            if (this._Nombre.length < 3) {
                throw new Error("El nombre debe tener al menos 3 caracteres");
            }
            return this._Nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "Email", {
        get: function () {
            return this._Email;
        },
        set: function (nuevoEmail) {
            //expresion regular basica para validar formato de email
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(nuevoEmail)) {
                throw new Error("El formato del email no es válido.");
            }
            this._Email = nuevoEmail;
        },
        enumerable: false,
        configurable: true
    });
    //Metodo para obtener informacion - retornar cadena en formato "Usuario #[id]: [nombre] ([tipo]) - [email]"
    Usuario.prototype.Obtener_Informacion = function () {
        return "Usuario #".concat(this.Id, ": ").concat(this.Nombre, " (").concat(Interfaces_1.Tipo_Usuario[this.Tipo_Usuario], ") - ").concat(this.Email);
    };
    //Metodo para prestamo segun el tipo de usuario
    Usuario.prototype.puedeRealizarPrestamo = function () {
        var _a;
        var limites = (_a = {},
            _a[Interfaces_1.Tipo_Usuario.Estudiante] = 3,
            _a[Interfaces_1.Tipo_Usuario.Profesor] = 5,
            _a[Interfaces_1.Tipo_Usuario.Administrador] = 10,
            _a);
        var limiteMaximo = limites[this.Tipo_Usuario];
        return this.Contador_Prestamos_Activos < limiteMaximo;
    };
    return Usuario;
}()); //fin del usuarios 
exports.Usuario = Usuario;
var Libro = /** @class */ (function () {
    function Libro(ISBN, Titulo, Autor, Categoria, Year_Publicacion, Copias_Totales) {
        this.ISBN = ISBN;
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Categoria = Categoria;
        this.Year_Publicacion = Year_Publicacion;
        this.Copias_Totales = Copias_Totales;
        this._Copias_Disponibles = Copias_Totales;
        this.Estado_Actual = Interfaces_1.Estado_Libro.Disponible;
    }
    Object.defineProperty(Libro.prototype, "Copias_Disponibles", {
        // getter obligatorio (sin setter)
        get: function () {
            return this._Copias_Disponibles;
        },
        enumerable: false,
        configurable: true
    });
    // verificar disponibilidad
    Libro.prototype.estaDisponible = function () {
        return this._Copias_Disponibles > 0;
    };
    // prestar copia
    Libro.prototype.prestarCopia = function () {
        if (!this.estaDisponible()) {
            return false;
        }
        this._Copias_Disponibles--;
        if (this._Copias_Disponibles === 0) {
            this.Estado_Actual = Interfaces_1.Estado_Libro.Prestado;
        }
        return true;
    };
    // devolver copia
    Libro.prototype.devolverCopia = function () {
        if (this._Copias_Disponibles < this.Copias_Totales) {
            this._Copias_Disponibles++;
        }
        if (this._Copias_Disponibles > 0) {
            this.Estado_Actual = Interfaces_1.Estado_Libro.Disponible;
        }
    };
    // resumen formateado con template strings
    Libro.prototype.obtenerInformacion = function () {
        return "\n        LIBRO\n        ISBN: ".concat(this.ISBN, "\n        T\u00EDtulo: ").concat(this.Titulo, "\n        Autor: ").concat(this.Autor, "\n        Categor\u00EDa: ").concat(Interfaces_1.Categoria_Libro[this.Categoria], "\n        A\u00F1o: ").concat(this.Year_Publicacion, "\n        Copias: ").concat(this._Copias_Disponibles, "/").concat(this.Copias_Totales, "\n        Estado: ").concat(Interfaces_1.Estado_Libro[this.Estado_Actual], "\n                ");
    };
    return Libro;
}());
exports.Libro = Libro;
var Prestamo = /** @class */ (function () {
    function Prestamo(id, usuario, libro, diasPrestamo) {
        if (diasPrestamo === void 0) { diasPrestamo = 14; }
        this.Id = id;
        this.Usuario = usuario;
        this.Libro = libro;
        this.Fecha_Prestamo = new Date();
        this.Fecha_Esperada_Devolucion = new Date(this.Fecha_Prestamo);
        this.Fecha_Esperada_Devolucion.setDate(this.Fecha_Prestamo.getDate() + diasPrestamo);
        this._Estado_Prestamo = Interfaces_1.Estado_Prestamo.Activo;
    }
    Object.defineProperty(Prestamo.prototype, "Estado_Prestamo", {
        //* Getter que actualiza el estado antes de devolverlo
        get: function () {
            this.Actualizar_Estado();
            return this._Estado_Prestamo;
        },
        enumerable: false,
        configurable: true
    });
    Prestamo.prototype.Actualizar_Estado = function () {
        var Fecha_Actual = new Date();
        if (this._Estado_Prestamo != Interfaces_1.Estado_Prestamo.Devuelto && Fecha_Actual > this.Fecha_Esperada_Devolucion) {
            this._Estado_Prestamo = Interfaces_1.Estado_Prestamo.Vencido;
        }
    };
    Prestamo.prototype.Realizar_Devolucion = function () {
        this.Fecha_Real_Devolucion = new Date();
        this._Estado_Prestamo = Interfaces_1.Estado_Prestamo.Devuelto;
    };
    Prestamo.prototype.Dias_Retraso = function () {
        //* Usar fecha real de dveolucion o la fecha de hoy de ser necesario
        var Fecha_Final = this.Fecha_Real_Devolucion || new Date();
        var dif_ms = Fecha_Final.getTime() - this.Fecha_Esperada_Devolucion.getTime();
        var dias = Math.ceil(dif_ms / (1000 * 60 * 60 * 24)); //? Obtener dias de diferencia
        return dias > 0 ? dias : 0; //? Regresa 0 si el libro de entrego a tiempo o temprano
    };
    Prestamo.prototype.Calcular_Multa = function (tarifaDiaria) {
        if (tarifaDiaria === void 0) { tarifaDiaria = 10; }
        return this.Dias_Retraso() * tarifaDiaria;
    };
    Prestamo.prototype.Obtener_Informacion = function () {
        var multa = this.Calcular_Multa();
        var estado = this.Estado_Prestamo;
        return "Pr\u00E9stamo #".concat(this.Id, " | Estado: ").concat(estado, " | Multa: ").concat(multa);
    };
    return Prestamo;
}());
exports.Prestamo = Prestamo;

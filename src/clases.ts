import { 
    I_Usuario,
    I_Libro, 
    Categoria_Libro, 
    Estado_Libro, 
    I_Prestamo,
    Estado_Prestamo,
    Tipo_Usuario
} from "./Interfaces";

export class Usuario implements I_Usuario {

    // readonly obligatorio por interfaz
    readonly Id: number;

    //privado obligatorio por modificadores
        private _Nombre : string;
        private _Email : string;
        
        Tipo_Usuario : Tipo_Usuario;
        Fecha_Registro : Date;
        Contador_Prestamos_Activos : number;

    constructor(id: number, nombre: string, email: string, tipoUsuario: Tipo_Usuario) {
        this.Id = id;
        this._Nombre = nombre;
        this._Email = email;
        this.Tipo_Usuario = tipoUsuario;

        //inicializar fecha y contador
        this.Fecha_Registro = new Date();
        this.Contador_Prestamos_Activos = 0;
    }

    // Getters
    get Nombre(): string {
        if(this._Nombre.length < 3){
            throw new Error("El nombre debe tener al menos 3 caracteres");
        }
        return this._Nombre;
    }

    get Email(): string {
        return this._Email;
    }

    set Email(nuevoEmail: string) {

        //expresion regular basica para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(nuevoEmail)) {
            throw new Error("El formato del email no es válido.");
        }
        this._Email = nuevoEmail;
    }

    //Metodo para obtener informacion - retornar cadena en formato "Usuario #[id]: [nombre] ([tipo]) - [email]"
    Obtener_Informacion(): string {
        return `Usuario #${this.Id}: ${this.Nombre} (${Tipo_Usuario[this.Tipo_Usuario]}) - ${this.Email}`;
    }


    //Metodo para prestamo segun el tipo de usuario
    puedeRealizarPrestamo(): boolean {
        const limites: Record<Tipo_Usuario, number> = {
            [Tipo_Usuario.Estudiante]: 3,
            [Tipo_Usuario.Profesor]: 5,
            [Tipo_Usuario.Administrador]: 10
        };

        const limiteMaximo = limites[this.Tipo_Usuario];
        return this.Contador_Prestamos_Activos < limiteMaximo;
    }

    //prestamo por usuario
 }  //fin del usuarios 


export class Libro implements I_Libro {

    // readonly obligatorio por interfaz
    readonly ISBN: string;

    Titulo: string;
    Autor: string;
    Categoria: Categoria_Libro;
    Year_Publicacion: string;
    Copias_Totales: number;
    Estado_Actual: Estado_Libro;

    // propiedad privada (requisito de modificadores)
    private _Copias_Disponibles: number;

    constructor(
        ISBN: string,
        Titulo: string,
        Autor: string,
        Categoria: Categoria_Libro,
        Year_Publicacion: string,
        Copias_Totales: number
    ) {
        this.ISBN = ISBN;
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Categoria = Categoria;
        this.Year_Publicacion = Year_Publicacion;
        this.Copias_Totales = Copias_Totales;

        this._Copias_Disponibles = Copias_Totales;
        this.Estado_Actual = Estado_Libro.Disponible;
    }

    // getter obligatorio (sin setter)
    get Copias_Disponibles(): number {
        return this._Copias_Disponibles;
    }

    // verificar disponibilidad
    estaDisponible(): boolean {
        return this._Copias_Disponibles > 0;
    }

    // prestar copia
    prestarCopia(): boolean {

        if (!this.estaDisponible()) {
            return false;
        }

        this._Copias_Disponibles--;

        if (this._Copias_Disponibles === 0) {
            this.Estado_Actual = Estado_Libro.Prestado;
        }

        return true;
    }

    // devolver copia
    devolverCopia(): void {

        if (this._Copias_Disponibles < this.Copias_Totales) {
            this._Copias_Disponibles++;
        }

        if (this._Copias_Disponibles > 0) {
            this.Estado_Actual = Estado_Libro.Disponible;
        }
    }

    // resumen formateado con template strings
    obtenerInformacion(): string {

        return `
        LIBRO
        ISBN: ${this.ISBN}
        Título: ${this.Titulo}
        Autor: ${this.Autor}
        Categoría: ${Categoria_Libro[this.Categoria]}
        Año: ${this.Year_Publicacion}
        Copias: ${this._Copias_Disponibles}/${this.Copias_Totales}
        Estado: ${Estado_Libro[this.Estado_Actual]}
                `;
    }
}

export class Prestamo implements I_Prestamo {
    //? Variables
    readonly Id : number;
    Usuario : I_Usuario;
    Libro : I_Libro;
    Fecha_Prestamo : Date;
    Fecha_Esperada_Devolucion : Date;
    Fecha_Real_Devolucion? : Date;
    private _Estado_Prestamo : Estado_Prestamo;

    constructor(id: number, usuario: I_Usuario, libro: I_Libro, diasPrestamo: number = 14) {
        this.Id = id;
        this.Usuario = usuario;
        this.Libro = libro;
        this.Fecha_Prestamo = new Date();
        this.Fecha_Esperada_Devolucion = new Date(this.Fecha_Prestamo);
        this.Fecha_Esperada_Devolucion.setDate(this.Fecha_Prestamo.getDate() + diasPrestamo);
        this._Estado_Prestamo = Estado_Prestamo.Activo;
    }

    //* Getter que actualiza el estado antes de devolverlo
    get Estado_Prestamo(): Estado_Prestamo {
        this.Actualizar_Estado();
        return this._Estado_Prestamo;
    }

    private Actualizar_Estado(): void {
        const Fecha_Actual = new Date();
        if (this._Estado_Prestamo != Estado_Prestamo.Devuelto && Fecha_Actual > this.Fecha_Esperada_Devolucion){
            this._Estado_Prestamo = Estado_Prestamo.Vencido   
        }
    }

    public Realizar_Devolucion(): void {
        this.Fecha_Real_Devolucion = new Date();
        this._Estado_Prestamo = Estado_Prestamo.Devuelto;
    }

    public Dias_Retraso(): number {
        //* Usar fecha real de dveolucion o la fecha de hoy de ser necesario
        const Fecha_Final = this.Fecha_Real_Devolucion || new Date();
        const dif_ms = Fecha_Final.getTime() - this.Fecha_Esperada_Devolucion.getTime();
        const dias= Math.ceil(dif_ms / (1000*60*60*24)); //? Obtener dias de diferencia
        return dias > 0 ? dias : 0 //? Regresa 0 si el libro de entrego a tiempo o temprano
    }

    public Calcular_Multa(tarifaDiaria: number = 10): number {
        return this.Dias_Retraso() * tarifaDiaria;
    }

    public Obtener_Informacion(): string {
        const multa = this.Calcular_Multa();
        const estado = this.Estado_Prestamo; 
        return `Préstamo #${this.Id} | Estado: ${estado} | Multa: ${multa}`;
    }
}
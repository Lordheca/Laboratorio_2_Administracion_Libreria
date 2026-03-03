//* INTERFACES DEL SISTEMA

export enum Tipo_Usuario {Estudiante, Profesor,Administrador} //? Enumeracion: Es una serie de constantes que alojan un valor numerico 0....n
export enum Categoria_Libro {Ficcion, No_Ficcion, Ciencia, Tecnologia,Historia,Arte}
export enum Estado_Libro {Disponible, Prestado, Reservado, Mantenimiento}
export enum Estado_Prestamo {Activo = "Activo", Devuelto="Devuelto", Vencido="Vencido"}

export interface I_Usuario {
    readonly Id : number;
    Nombre : string;
    Email : string;
    Tipo_Usuario : Tipo_Usuario;
    Fecha_Registro : Date;
    Contador_Prestamos_Activos : number;
    Obtener_Informacion(): string;
    puedeRealizarPrestamo(): boolean ;
}

export interface I_Libro{
    readonly ISBN : string;
    Titulo : string;
    Autor : string;
    Categoria : Categoria_Libro;
    Year_Publicacion : string;
    Copias_Disponibles : number;
    Copias_Totales : number;
    Estado_Actual : Estado_Libro;

    estaDisponible(): boolean;
    prestarCopia(): boolean;
    devolverCopia(): void;
    obtenerInformacion(): string;
}

export interface I_Prestamo{
    readonly Id : number;
    Usuario : I_Usuario;
    Libro : I_Libro;
    Fecha_Prestamo : Date;
    Fecha_Esperada_Devolucion : Date;
    Fecha_Real_Devolucion? : Date;
    Estado_Prestamo : Estado_Prestamo;

    Realizar_Devolucion(): void;
    Dias_Retraso(): number;
    Calcular_Multa(tarifaDiaria?: number): number;
    Obtener_Informacion(): string;
}
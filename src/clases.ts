import { 
    I_Libro, 
    Categoria_Libro, 
    Estado_Libro 
} from "./Interfaces";

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
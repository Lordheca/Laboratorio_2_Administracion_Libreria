import { 
    Categoria_Libro, 
    Estado_Prestamo,
    Tipo_Usuario
} from "./Interfaces";

import { 
    Usuario,
    Libro,
    Prestamo
 } from "./clases";

 export class Biblioteca{
    //* Propiedades privadas y Map's para las variables solicitadas
    private Usuarios: Map<number, Usuario> = new Map();
    private Libros: Map<string, Libro> = new Map();
    private Prestamos: Map<number, Prestamo> = new Map();
    private Contador_Prestamos: number;

    constructor(private nombre:string){
        this.Contador_Prestamos = 1;
    }

    //? Gestion de Usuarios

    Registrar_Usuario(nombre : string, email:string, tipo:any): Usuario {
        const Id = this.Usuarios.size + 1;
        const Nuevo_Usuario = new Usuario(Id,nombre,email,tipo);
        this.Usuarios.set(Id,Nuevo_Usuario);
        console.log(`Nuevo Usuario Registrado: ${nombre} con el ID: ${Id}`);
        return Nuevo_Usuario;
    }

    Obtener_Usuario(id:number): Usuario | undefined{
        return this.Usuarios.get(id);
    }

    //? Gestion de Libros

    Agregar_Libro(ISBN:string, Titulo:string, Autor: string, Categoria: Categoria_Libro, Anio: string, Copias: number):Libro{
        const Nuevo_Libro = new Libro(ISBN, Titulo, Autor, Categoria, Anio, Copias);
        this.Libros.set(ISBN,Nuevo_Libro);
        console.log(`Nuevo Libro Registrado: ${Titulo} con el ISBN: ${ISBN}`);
        return Nuevo_Libro;
    }

    Obtener_Libro(ISBN:string):Libro | undefined{
        return this.Libros.get(ISBN);
    }

    Buscar_Libros_Por_Categoria(Categoria:Categoria_Libro): Libro[] {
        return Array.from(this.Libros.values()).filter( lib => lib.Categoria === Categoria);
    }

    Buscar_Libros_Por_Autor(Autor:string): Libro[] {
        return Array.from(this.Libros.values()).filter( lib => lib.Autor.toLowerCase().includes(Autor.toLowerCase()));
        //? Uso de Lower case para ser case-insensitive
    }

    //? Gestion de Prestamos

    Realizar_Prestamo(Id_Usuario: number, ISBN: string, Dias_Prestamo: number = 14): Prestamo | null{
        const Usuario = this.Obtener_Usuario(Id_Usuario);
        const Libro = this.Obtener_Libro(ISBN);

        //* Validaciones
        if(!Usuario || !Libro || !Usuario.puedeRealizarPrestamo() || !Libro.estaDisponible()){
            console.log("No se puede realizar el prestamo, verifique disponibilidad o limite");
           return null;
        }

        //* En caso de pasar validaciones...
        const Nuevo_Prestamo = new Prestamo(this.Contador_Prestamos++,Usuario,Libro,Dias_Prestamo);
        this.Prestamos.set(Nuevo_Prestamo.Id, Nuevo_Prestamo);

        //* Actualizar Libros y contador de prestamos
        Libro.prestarCopia();
        Usuario.Contador_Prestamos_Activos++;

        console.log(`Prestamo exitoso con ID:${Nuevo_Prestamo.Id} registrado para ${Usuario.Nombre}`);
        return Nuevo_Prestamo;
    }

    Devolver_Prestamo(Id_Prestamo : number):void{
        const Prestamo = this.Prestamos.get(Id_Prestamo);
        //* Validaciones
        if(!Prestamo || Prestamo.Estado_Prestamo === Estado_Prestamo.Devuelto){
            console.log("Prestamo no encontrado o ya esta devuelto");
            return;
        }

        //* Validaciones aceptadas
        Prestamo.Realizar_Devolucion();
        Prestamo.Libro.devolverCopia();
        Prestamo.Usuario.Contador_Prestamos_Activos--;

        console.log(`Devolución exitosa del préstamo con ID:${Id_Prestamo}`);

        const multa = Prestamo.Calcular_Multa();
        if (multa > 0) {
            console.log(`ATENCIÓN: El usuario tiene una multa acumulada de $${multa}`);
        }
    }

     //* Seccion de Reportes
    Generar_Reporte_Libros_Mas_Prestados(n:number=5):void{
        const Conteo = new Map<String,number>()

        this.Prestamos.forEach(p => {
            const Titulo = p.Libro.Titulo;
            Conteo.set(Titulo,(Conteo.get(Titulo) || 0) + 1);
        });

        const Top = Array.from(Conteo.entries())
        .sort((a,b) => b[1] - a[1])
        .slice(0,n);
        
        console.log(`\n TOP ${n} Libros Mas Prestados`);
        Top.forEach(([Titulo, cant], i) => {
            console.log(`${i+1}. ${Titulo} - ${cant} prestamos`);
        });
    }

    Generar_Estadisticas_Generales():void {
        
        //? Cambio a Arrays para filtros
        const Usuarios_Arr = Array.from(this.Usuarios.values());
        const Libros_Arr = Array.from(this.Libros.values());
        const Prestamos_Arr = Array.from(this.Prestamos.values());

        //? Usuarios por Tipo
        const Estudiantes = Usuarios_Arr.filter(u => u.Tipo_Usuario === Tipo_Usuario.Estudiante).length;
        const Profesores = Usuarios_Arr.filter(u => u.Tipo_Usuario === Tipo_Usuario.Profesor).length;
        const Admins = Usuarios_Arr.filter(u => u.Tipo_Usuario === Tipo_Usuario.Administrador).length;

        //? Copias Prestadas y Dispo
        const Total_Copias_Disponibles = Libros_Arr.reduce((acc,Libro) => acc + Libro.Copias_Disponibles,0);
        const Total_Copias_Existentes = Libros_Arr.reduce((acc,Libro) => acc + Libro.Copias_Totales,0);
        const Total_Copias_Prestadas = Total_Copias_Existentes - Total_Copias_Disponibles;  

        //? Prestamos
        const Activos = Prestamos_Arr.filter(p => p.Estado_Prestamo === Estado_Prestamo.Activo).length;
        const Devueltos = Prestamos_Arr.filter(p => p.Estado_Prestamo === Estado_Prestamo.Devuelto).length;
        const Vencidos = Prestamos_Arr.filter(p => p.Estado_Prestamo === Estado_Prestamo.Vencido).length;
        
        //? Calculo de totales
        const Total_Libros = Libros_Arr.length;
        const Total_Usuarios = Usuarios_Arr.length;
        const Total_Prestamos = Prestamos_Arr.length;

        //? Tasa de uso
        const Tasa_Uso = Total_Libros > 0 ? (Total_Prestamos / Total_Libros) * 100 : 0;
        const Promedio_Prestamos = Total_Usuarios > 0 ? (Total_Prestamos / Total_Usuarios) : 0;

        //? Formato del Reporte
        console.log(` REPORTE GENERAL:
        
        USUARIOS:
        ==========================================
        • Estudiantes:   ${Estudiantes}
        • Profesores:    ${Profesores}
        • Administradores: ${Admins}
        • TOTAL:         ${Total_Usuarios}

        LIBROS:
        ==========================================
        • Títulos en catálogo: ${Total_Libros}
        • Copias Disponibles:  ${Total_Copias_Disponibles} 
        • Copias Prestadas:    ${Total_Copias_Prestadas} 
        • Total:               ${Total_Copias_Existentes}

        PRESTAMOS:
        ==========================================
        • Activos:   ${Activos}
        • Devueltos: ${Devueltos}
        • Vencidos:  ${Vencidos} 
        • TOTAL:     ${Total_Prestamos}

        INDICADORES
        ==========================================
        • Tasa de Uso:          ${Tasa_Uso.toFixed(2)}%
        • Promedio Préstamos/U: ${Promedio_Prestamos.toFixed(1)}
        `);
    }
 }
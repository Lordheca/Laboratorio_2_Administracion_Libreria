# Laboratorio Práctico: Sistema de Gestión de Biblioteca Digital

Un sistema modular desarrollado en TypeScript para la gestión de usuarios, libros y préstamos en una biblioteca. Este proyecto demuestra el uso de Programación Orientada a Objetos (POO), interfaces, tipos avanzados y modificadores de acceso.

## 🌟 Características Principales

* **Gestión de Usuarios:** Registro de Estudiantes, Profesores y Administradores con validación estricta de formato de correo electrónico y longitud de nombres.
* **Control de Inventario:** Administración del estado de los libros (Disponible, Prestado, Reservado, Mantenimiento) y seguimiento de copias en tiempo real.
* **Sistema de Préstamos:**
    * Límites dinámicos basados en el perfil del usuario (Estudiante: 3, Profesor: 5, Administrador: 10).
    * Cálculo automático de fechas de vencimiento, días de retraso y multas.
* **Reportes:** Generación de estadísticas generales, libros más prestados y reportes de préstamos activos/vencidos usando Template Strings.

## 🛠️ Tecnologías

* **TypeScript**
* **Node.js** (Uso de `@types/node` para tipado estricto)

## 🛠️ Tecnologías

* **TypeScript**
* **Node.js**
  
## 🚀 Quick Start

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### Prerequisitos

Asegúrate de tener instalado lo siguiente:

-   [Node.js](https://nodejs.org/en/) (versión 18 o superior recomendada)
-   [ npm](https://www.npmjs.com/) (viene con Node.js)
-   Compilador de TypeScript (tsc).

### Installation

1.  **Clona el repositorio**
    ```bash
    git clone https://github.com/Lordheca/Laboratorio_2_Administracion_Libreria.git
    cd Laboratorio_2_Administracion_Libreria
    ```

2.  **Instala las dependencias**
   (Nota: Si ya clonaste el proyecto completo, un simple npm install ejecutará esto automáticamente basado en el package.json).
    ```bash
    npm install --save-dev typescript @types/node
    ```

4.  **Compila el código TypeScript a JavaScript:**
    ```bash
    tsc
    ```
5.  **Ejecuta el programa:**
    ```bash
    node main.js
    ```

## 📂 Estructura del Proyecto

```text
├── src/
│   ├── biblioteca.ts   # Lógica central del sistema de la biblioteca
│   ├── clases.ts       # Implementación de las clases (Libro, Prestamo, Usuario)
│   ├── Interfaces.ts   # Enums y contratos del sistema
│   └── main.ts         # Punto de entrada principal y pruebas de ejecución
├── package.json        # Dependencias y scripts del proyecto
├── tsconfig.json       # Configuración del compilador TypeScript
└── README.md           # Documentación del proyecto


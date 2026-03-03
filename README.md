#  Laboratorio_2_Administracion_Libreria

Un sistema modular desarrollado en TypeScript para la gestión de usuarios, libros y préstamos en una biblioteca. 
## Características Principales

* **Gestión de Usuarios:** Registro con validación estricta de formato de correo electrónico y longitud de nombres.
* **Control de Inventario:** Administración del estado de los libros (Disponible, Prestado, Reservado, Mantenimiento) y seguimiento de copias en tiempo real.
* **Sistema de Préstamos:**
    * Límites dinámicos basados en el perfil del usuario (Estudiante , Profesor , Administrador).
    * Cálculo automático de fechas de vencimiento, días de retraso y multas.
    * 
  ## 🛠️ Tecnologías

* **TypeScript**
* **Node.js**
*
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
    ```bash
    npm install
    ```

3.  **Compila el código TypeScript a JavaScript:**
    ```bash
    tsc
    ```
4.  **Ejecuta el programa:**
    ```bash
    node main.js
    ```




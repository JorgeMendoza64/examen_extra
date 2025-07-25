# examen_extra# Gestor de Estudiantes

Este proyecto es una aplicación web para gestionar estudiantes utilizando **FastAPI** (backend) y **HTML/CSS/JS** (frontend). Permite registrar, listar, actualizar y eliminar estudiantes en una base de datos SQLite.

---

## Instalación

1. **Clona el repositorio**
   ```sh
   git clone <URL DE TU PROYECTO>
   ```

2. **Crea un entorno virtual de Python**
   ```sh
   python -m venv venv
   ```

3. **Activa el entorno virtual**
   - En Windows:
     ```sh
     venv\Scripts\activate
     ```
   - En Mac/Linux:
     ```sh
     source venv/bin/activate
     ```

4. **Instala las dependencias**
   ```sh
   pip install -r requirements.txt
   ```

---

## Ejecución

1. **Inicia el servidor FastAPI**
   ```sh
   uvicorn main:app --reload
   ```

2. **Abre el frontend**
   - Accede en tu navegador a:  
     ```
     http://localhost:8000/frontend/index.html
     ```

---

## Estructura del Proyecto

- **main.py**  
  Archivo principal de la API. Define las rutas para el CRUD de estudiantes y configura CORS y archivos estáticos.

- **models.py**  
  Define el modelo de datos [`Estudiante`](models.py) usando SQLModel.

- **database.py**  
  Configura la conexión a la base de datos SQLite y la inicialización de las tablas.

- **frontend/**  
  Carpeta con la interfaz web:
  - [`index.html`](frontend/index.html): Formulario y tabla para gestionar estudiantes.
  - [`app.js`](frontend/app.js): Lógica JS para consumir la API y actualizar la interfaz.
  - [`style.css`](frontend/style.css): Estilos visuales.

- **estudiantes.db**  
  Base de datos SQLite generada automáticamente.

---

## Explicación de las partes más importantes

### Backend (FastAPI)
- **Rutas CRUD** en [`main.py`](main.py):
  - `GET /estudiantes`: Lista estudiantes con paginación.
  - `POST /estudiantes`: Crea un nuevo estudiante.
  - `GET /estudiantes/{matricula}`: Consulta un estudiante por matrícula.
  - `PUT /estudiantes/{matricula}`: Actualiza los datos de un estudiante.
  - `DELETE /estudiantes/{matricula}`: Elimina un estudiante.

- **Modelo de datos** en [`models.py`](models.py):
  - La clase [`Estudiante`](models.py) define los campos: matrícula, nombre, apellidos, género, dirección y teléfono.

- **Base de datos** en [`database.py`](database.py):
  - Se usa SQLite y SQLModel para persistencia de datos.

### Frontend
- **Formulario y tabla** en [`index.html`](frontend/index.html):
  - Permite ingresar y visualizar estudiantes.

- **Lógica JS** en [`app.js`](frontend/app.js):
  - Realiza peticiones a la API para crear y listar estudiantes.
  - Implementa paginación y refresco automático de la tabla.

- **Estilos** en [`style.css`](frontend/style.css):
  - Mejora la apariencia visual de la aplicación.

---

## Notas

- Puedes probar la API directamente en la documentación interactiva de FastAPI en:  
  ```
  http://localhost:8000/docs
  ```
- El proyecto es de código abierto bajo licencia


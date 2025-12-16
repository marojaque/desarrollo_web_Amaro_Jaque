# Spring Boot - Aplicación de Adopciones

## Requisitos Previos

1. **MySQL** debe estar corriendo
2. **Base de datos `tarea2`** debe existir (Flyway la creará automáticamente si no existe)
3. **Java 17** instalado
4. **Maven** instalado

## Configuración de Base de Datos

La aplicación está configurada para conectarse a:
- **Host:** localhost:3306
- **Base de datos:** tarea2
- **Usuario:** cc5002
- **Contraseña:** programacionweb

Si necesitas cambiar estas credenciales, edita `src/main/resources/application.properties`

## Cómo Ejecutar la Aplicación

### Opción 1: Usando Maven (Recomendado)

```bash
# Desde la carpeta spring_app
mvn spring-boot:run
```

### Opción 2: Compilar y ejecutar el JAR

```bash
# Compilar
mvn clean package

# Ejecutar
java -jar target/t4-0.0.1-SNAPSHOT.jar
```

### Opción 3: Desde un IDE (IntelliJ IDEA, Eclipse, VS Code)

1. Abre el proyecto en tu IDE
2. Localiza la clase `Application.java` en `src/main/java/com/desarrolloweb/t4/`
3. Ejecuta la clase como aplicación Java

## URLs de la Aplicación

Una vez que la aplicación esté corriendo, puedes acceder a:

- **Vista de evaluación de avisos:** http://localhost:8080/avisos
- **API REST - Listado de avisos:** http://localhost:8080/api/avisos
- **API REST - Agregar nota:** POST http://localhost:8080/api/avisos/{avisoId}/nota

## Probar la Funcionalidad

### 1. Ver el listado de avisos
Abre en tu navegador: http://localhost:8080/avisos

Deberías ver una tabla con:
- ID
- Fecha publicación
- Sector
- Cantidad Tipo Edad
- Comuna
- Nota (promedio)
- Botón "evaluar"

### 2. Evaluar un aviso
1. Haz clic en el botón "evaluar" de cualquier aviso
2. Ingresa una nota entre 1 y 7
3. La nota se guardará y el promedio se actualizará automáticamente

### 3. Probar la API REST

#### Obtener listado de avisos:
```bash
curl http://localhost:8080/api/avisos
```

#### Agregar una nota:
```bash
curl -X POST http://localhost:8080/api/avisos/1/nota \
  -H "Content-Type: application/json" \
  -d "{\"nota\": 5}"
```

## Migraciones de Base de Datos

Flyway ejecutará automáticamente las migraciones al iniciar la aplicación:
- V1: Crear tabla region
- V2: Crear tabla comuna
- V3: Crear tabla aviso_adopcion
- V4: Crear tabla foto
- V5: Crear tabla contactar_por
- V6: Crear tabla comentario
- V7: Crear tabla nota
- V8: Insertar datos de regiones y comunas

## Solución de Problemas

### Error de conexión a MySQL
- Verifica que MySQL esté corriendo
- Verifica las credenciales en `application.properties`
- Asegúrate de que la base de datos `tarea2` exista

### Error en migraciones Flyway
- Si las tablas ya existen, Flyway puede fallar. Puedes:
  - Limpiar la base de datos y dejar que Flyway la cree
  - O deshabilitar Flyway temporalmente: `spring.flyway.enabled=false`

### Puerto 8080 ocupado
- Cambia el puerto en `application.properties`: `server.port=8081`


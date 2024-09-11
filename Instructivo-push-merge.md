## Instructivo para Push/Merge en el Proyecto

1. Verificar que los cambios estén bien probados localmente
   Antes de hacer un push o merge, asegúrate de que los cambios funcionen correctamente en tu entorno local. Realiza lo siguiente:

### Frontend:

Corre la aplicación localmente (npm start o yarn start) para verificar que el frontend funcione correctamente.
Revisa que no haya errores de consola.
Asegúrate de que el diseño sea correcto y que las funcionalidades nuevas o modificadas estén implementadas sin errores.

### Backend:

Corre el backend (npm run start:dev o similar) y asegúrate de que no haya errores en el servidor.
Ejecuta las pruebas unitarias (npm test) y confirma que todas pasen exitosamente.
Verifica que las rutas de API funcionen como se espera.

2. Hacer commit de todos los cambios necesarios
   Antes de hacer push, asegúrate de que los cambios que has realizado estén staged y correctamente commiteados con mensajes descriptivos.

Usa git add para agregar los cambios que deseas incluir en el commit.
Asegúrate de que tu commit sea claro y descriptivo:

```bash
git commit -m "Descripción clara de lo que se ha hecho"
```

3. Realizar un pull de la rama base
   Antes de hacer push, siempre asegúrate de que tu rama esté sincronizada con la última versión de la rama base (ya sea develop/back, develop/front, deploy/back o deploy/front). Esto evitará conflictos de merge y asegurará que estás trabajando con el código más actualizado.

Si estás trabajando en la rama develop/back o deploy/back:

```bash
Copiar código
git pull origin develop/back
```

Si estás trabajando en la rama develop/front o deploy/front:

```bash
Copiar código
git pull origin develop/front
```

Esto garantiza que tienes la versión más reciente del código antes de hacer tus propios cambios.

4. Verificar que no hay conflictos de merge
   Si Git muestra algún conflicto durante el pull, debes resolver los conflictos manualmente antes de hacer un push. Verifica y edita los archivos en conflicto, luego realiza los pasos siguientes:

Resuelve los conflictos en el código.
Agrega los archivos resueltos:

```bash
Copiar código
git add archivo-en-conflicto.js
```

Continúa el proceso de merge:

```bash
Copiar código
git commit
```

5. Validar que las pruebas automáticas se ejecutarán correctamente
   GitHub Actions ejecutará automáticamente las pruebas que hayas configurado en el CI. Asegúrate de lo siguiente:

Todas las pruebas unitarias (si las tienes) pasan correctamente (npm test o el comando que uses).
Si tienes pruebas end-to-end, verifica que las más importantes estén cubiertas.
Consejo: Si es posible, corre los mismos scripts de prueba que GitHub Actions va a correr para detectar errores antes de hacer push.

6. Uso de Pull Requests para Merge en deploy/_
   Si estás trabajando en un equipo, se recomienda usar Pull Requests (PR) en lugar de hacer merge directamente a deploy/_. Esto permite a otros colaboradores revisar tus cambios antes de que sean fusionados en la rama de despliegue.

## Consideraciones antes de hacer un PR o Merge:

Asegúrate de que todo tu código esté revisado internamente antes de hacer el PR.
Describe claramente en el PR los cambios realizados y por qué son necesarios.
Verifica que no haya conflictos en la rama deploy/\* antes de hacer merge.

7. Evitar push directo a deploy/_ sin revisión
   Es importante evitar hacer push directamente a la rama deploy/_ sin pasar por una revisión de código. Esto puede romper la CI/CD y desplegar código sin la verificación necesaria. La mejor práctica es usar pull requests para fusionar cambios en deploy.

### Proceso Completo de Push o Merge

1. Trabajar en la rama de desarrollo (develop/back o develop/front):
   Asegúrate de hacer los cambios en la rama correspondiente.
   Haz commit de todos los cambios.
   Haz pull para asegurarte de que tu rama esté sincronizada:

```bash
Copiar código
git pull origin develop/back  # O la rama correspondiente
```

2. Crear un Pull Request hacia deploy/\*:
   Una vez que los cambios estén listos, crea un PR para revisar el código.
   Asegúrate de que las pruebas automáticas pasen en GitHub Actions.
   Revisa el PR antes de hacer el merge.
3. Mergear el PR en deploy/_:
   Una vez aprobado, haz el merge a la rama correspondiente (deploy/back o deploy/front).
   Esto disparará el pipeline de CI/CD, que realizará la integración continua y desplegará la aplicación en Render automáticamente.
   Preguntas antes del Push o Merge:
   ¿Han pasado todas las pruebas locales?
   ¿Está mi código sincronizado con la última versión de la rama base?
   ¿He resuelto todos los conflictos de merge?
   ¿Está mi commit bien descrito?
   ¿He creado un pull request si es necesario para deploy/_?

### Resumen: Checklist antes de Push/Merge

1. Verificar que todos los cambios funcionen correctamente en el entorno local.
2. Asegurarse de que todas las pruebas pasen correctamente.
3. Realizar pull de la última versión de la rama base.
4. Resolver cualquier conflicto de merge antes de hacer push.
5. Crear un Pull Request si se trabaja en deploy/\* para asegurar revisión.
6. Evitar hacer push directo a deploy/\* sin revisión.

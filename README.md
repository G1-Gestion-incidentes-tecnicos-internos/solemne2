Solemne 2

Gestión de incidentes tecnícos internos - InfraTech S.A

Contexto y problemática: Se desarrollará un portal de gestiones de incidentes tecnológicos internos. Este portal permitirá a los usuarios registrar y hacer seguimientos de incidentes, asignar técnicos y consultar estadística del portal.

Software necesarios:
- Node.js
- Angular CLI
- Git
- IDE
- Docker

Instrucciones de ejecución del "frontend" en git
1.- Asegurar de tener github en pc
2.- Configurar git por primera vez:
    git config --global user.namer "nombre"
    git config --global user.email "@correo.uss.cl"

3.- Se ejecuta solo una vez y es para los terceros
    git clone <url-del-repositorio>.git
    cd <nombre-de-la-carpeta-del-proyecto>

4.- Ir a la carpeta del poyecto
    cd solemne2

5.- Ver ramas 
    git branch (locales)
    git bramch -r (remotas)
    git branch -a (locales y remotas)

6.- Antes de empezar, realizar sincronizacion
    git pull origin main

7.- Recomendación: Antes usa "git status" para ver si se modificó algo
    git status

8.- Ir a carpeta frontend
    cd frontend

9.- Agregar cambios:
    git add <nombre-del-archivo>  
    add . (para todos los cambios realizados)

10-. Hacer commit:
    git commit -m "descripción de cambios realizados"

11.- Subir los cambios al repositorio remoto:
    git push origin main

Instrucciones de usos Angular en terceros:
1.- Instalar Node.js y Angular CLI
    npm install -g @angular/cli

2.- Comprobar instalaciones
    node -v
    npm -v
Sí, hay error. Abril la PowerShell como administrador y ejecuta
    Set-ExecutionPolicy Unrestricted

3.- Instalar dependencias de Angular
    npm install

4.- Iniciar servidor
    Modo de desarrollo: ng serve 
    Acceso desde cualquier dispositivo: ng serve --host 0.0.0.0

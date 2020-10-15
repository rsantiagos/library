## Requerimientos (La biblioteca)

Una biblioteca le pide que cree un sistema para administrar sus libros y aquí están las especificaciones:

    ->Un libro tiene: nombre, autor, categoría (seleccione con autocompletar), fecha de publicación, usuario (persona que pidió prestado un libro).

    ->Una categoría tiene: nombre, descripción, muchos libros.

    ->Tienes que poder hacer las siguientes cosas con los libros:

    ->Muestre una lista/tabla paginada con todos los libros.

    ->Filtre la lista/tabla mencionada anteriormente.

    ->Crea un libro.

    ->Edita un libro.

    ->Eliminar un libro.

    ->Poder saber si un usuario pidió prestado un libro o si aun disponible.

    ->Poder cambiar el estado de disponible a no disponible (use un modal para esta función).


## Todas las funcionalidades deben de hacerse con laravel

Se puede utilizar React, Vue, Blade, Templates, o cualquier otro como frontend


# Instalacion de la app
1.- Clonar o descargar la aplicacion

2.- Situarse en la carpeta raiz de la aplicacion

3.- Instalar las dependencias del composer (tener instalado composer en el Sistema Operativo)
```
composer install
```

4.- Instalar las dependencias del node_modules (tener instalado node en el Sistema Operativo)
```
npm install
```

5.- Especificar las variables de entorno para la conexion con la base de datos en el archivo .env
```
cp .env.example .env
```

6.- Crear la base de datos especificado en la variable de entorno anteriormente en el gestor de la base de datos(en este caso se utiliza mysql)


7.- Hacer la migracion de la base de datos (crear las tablas)
```
php artisan migrate
```

8.- Probar la aplicacion
```
php artisan serve
```


# Documentacion de laravel

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).to:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

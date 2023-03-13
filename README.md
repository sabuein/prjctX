# prjctX

A community management system and tools for art collectors.

The project consists of:
- Front-end: Progessive web app (PWA),
- Back-end: RESTful API built with Slim Framework [4.11.0][slim], PHP [8.1.2][php], and MariaDB [10.6.12][mariadb].

```bash
$ composer show --direct 
selective/basepath 2.1.0  A URL base path detector for Slim 4
slim/psr7          1.6    Strict PSR-7 implementation
slim/slim          4.11.0 Slim is a PHP micro framework that helps you quickly write simple yet powerful web applications and APIs
```

## Local development

```bash
# Start PHP built-in web server to run an API
cd ./apis/collectors/
sudo php -S localhost:7654 -t public public/index.php
```

### Resources

- [Using the Fetch API][fetch]
- [PSR-4: Autoloader][psr4]
- [PSR-7: HTTP message interfaces][psr7]
- [PSR-15: HTTP Server Request Handlers][psr15]

[slim]: https://www.slimframework.com/2022/11/06/slim-4.11.0-release.html "Slim 4.11.0 released - Slim Framework"
[php]: https://www.php.net/releases/8_1_2.php "PHP: PHP 8.1.2 Release Announcement"
[mariadb]: https://mariadb.com/kb/en/mariadb-10-6-12-release-notes/ "MariaDB 10.6.12 Release Notes - MariaDB Knowledge Base"
[psr4]: https://www.php-fig.org/psr/psr-4/ "PSR-4: Autoloader - PHP-FIG"
[psr7]: https://www.php-fig.org/psr/psr-7/ "PSR-7: HTTP message interfaces - PHP-FIG"
[psr15]: https://www.php-fig.org/psr/psr-15/ "PSR-15: HTTP Server Request Handlers - PHP-FIG"
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch "Using the Fetch API - Web APIs | MDN"
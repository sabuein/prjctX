<?php

use Slim\Factory\AppFactory;
use Selective\BasePath\BasePathMiddleware;

require_once __DIR__ . "/../vendor/autoload.php";

$api = AppFactory::create();

/* Creating a route for a POST request. However, Slim's implementation of PSR-7 does not support the sending of data in a JSON format, instead, they provide a BodyParsingMiddleware that handles this task. */
$api->addBodyParsingMiddleware();

$api->addRoutingMiddleware();
$api->add(new BasePathMiddleware($api));
$api->addErrorMiddleware(true, true, true);

require_once __DIR__ . "/../src/routes.php";

$api->run();
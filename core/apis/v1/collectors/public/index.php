<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Selective\BasePath\BasePathMiddleware;

use App\Models\Database as DB;
use App\Models\Forms as Form;

require_once __DIR__ . "/../vendor/autoload.php";

$api = AppFactory::create();

/* Creating a route for a POST request. However, Slim's implementation of PSR-7 does not support the sending of data in a JSON format, instead, they provide a BodyParsingMiddleware that handles this task. */
$api->addBodyParsingMiddleware();

$api->addRoutingMiddleware();
$api->add(new BasePathMiddleware($api));
$api->addErrorMiddleware(true, true, true);

$container = $api->getContainer();

function handleErrors(PDOException $e, Response $response): Response {
    $error = array(
        "message" => $e->getMessage()
    );
    $codes = [
        500, // Internal server error
        600
    ];
    $response->getBody()->write(json_encode($error));
    return $response
        ->withHeader("content-type", "application/json")
        ->withStatus($codes[0]);
}

$api->get("/", function (Request $request, Response $response): Response {
    $html = <<<TXT
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>prjctX: APIs Homepage</title>
    </head>
    <body>
        <header>
            <h1>prjctX: APIs Homepage</h1>
        </header>
        <main>
            <h2>As-salamu alaykum, world! 😊</h2>
            <p><a href="https://en.wikipedia.org/wiki/As-salamu_alaykum" target="_blank">Wikipedia</a></p>
        </main>
        <footer>
            <p>Copyright © 2023 prjctX. All rights reserved.</p>
            <p><a href="#" target="_top">Homepage</a> | <a href="https://github.com/sabuein/prjctX" target="_blank">Source code</a></p>
        </footer>
    </body>
    </html>
    TXT;
    $response->getBody()->write($html);
    return $response;
});

$api->get("/collectors/all", function (Request $request, Response $response): Response {
    $sql = "SELECT * FROM collectors";

    try {
        $db = new DB();
        $conn = $db->connect();
        $stmt = $conn->query($sql);
        $customers = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        $response->getBody()->write(json_encode($customers));
        return $response
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $e) {
        return handleErrors($e, $response);
    }
});

$api->post("/", function (Request $request, Response $response, array $args): Response {
    $data = $request->getParsedBody();

    $html = var_export($data, true);
    $response->getBody()->write($html);

    return $response;
});

$api->post("/collectors/add", function (Request $request, Response $response, array $args): Response {
    $data = $request->getParsedBody();
    $name = $data["name"];
    $email = $data["email"];
    $phone = $data["phone"];

    $sql = "INSERT INTO collectors (name, email, phone) VALUES (:name, :email, :phone)";

    try {
        $db = new DB();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":phone", $phone);

        $result = $stmt->execute();

        $db = null;
        $response->getBody()->write(json_encode($result));
        return $response
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $e) {
        return handleErrors($e, $response);
    }
});

$api->post("/collectors/upload", function (Request $request, Response $response, array $args): Response {
    try {
        $container["upload_directory"] = "../../var/www/uploads/";
        $directory = $this->get("upload_directory");
        $files = $request->getUploadedFiles();
        $form = new Form();
        $form->process($files, $directory, $response);
        return $response
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $e) {
        return handleErrors($e, $response);
    }
});

$api->put("/collectors/update/{id}", function (Request $request, Response $response, array $args): Response {
        $id = $request->getAttribute("id");
        $data = $request->getParsedBody();
        $name = $data["name"];
        $email = $data["email"];
        $phone = $data["phone"];

        $sql = "UPDATE collectors SET
           name = :name,
           email = :email,
           phone = :phone
           WHERE id = $id";

        try {
            $db = new DB();
            $conn = $db->connect();

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":phone", $phone);

            $result = $stmt->execute();

            $db = null;
            echo "Update successful! ";
            $response->getBody()->write(json_encode($result));
            return $response
                ->withHeader("content-type", "application/json")
                ->withStatus(200);
        } catch (PDOException $e) {
            return handleErrors($e, $response);
        }
    }
);

$api->delete("/collectors/delete/{id}", function (Request $request, Response $response, array $args): Response {
    $id = $args["id"];

    $sql = "DELETE FROM collectors WHERE id = $id";

    try {
        $db = new DB();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();

        $db = null;
        $response->getBody()->write(json_encode($result));
        return $response
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $e) {
        return handleErrors($e, $response);
    }
});

$api->run();

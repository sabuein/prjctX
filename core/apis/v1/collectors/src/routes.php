<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\Database as DB;
use App\Models\Form as Form;

$container = $api->getContainer();
$container["upload_directory"] = "../../var/www/uploads/";

/* GET */
$api->get("/", "getRoot");
$api->get("/collectors", "getHome");
$api->get("/collectors/all", "getAll");

/* POST */
$api->post("/", "postRoot");
$api->post("/collectors", "postHome");
$api->post("/collectors/add", "postAdd");
$api->post("/collectors/add/all", "postAddAll");
$api->post("/collectors/upload", "postUpload");

/* PUT */
$api->put("/collectors/update/{id}", "updateId");

/* DELETE */
$api->delete("/collectors/delete/{id}", "deleteId");

/* GET functions */
function getRoot(Request $request, Response $response): Response {
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
            <p>
                <a href="https://en.wikipedia.org/wiki/As-salamu_alaykum" target="_blank">Wikipedia</a>
            </p>
            <div>
                <h3>GET</h3>
                <ul>
                    <li><a href="/">/</a></li>
                    <li><a href="/collectors">/collectors</a></li>
                    <li><a href="/collectors/all">/collectors/all</a></li>
                    <li><a href="/collectors/all">/collectors/all</a></li>
                    <li><a href="/collectors/all">/collectors/all</a></li>
                    <li><a href="/collectors/all">/collectors/all</a></li>
                </ul>
                <a href="#" onclick="window.history.go(-1)">Go Back</a>
            </div>
            <div>
                <h3>POST</h3>
                <ul>
                    <li><a href="/">/</a></li>
                    <li><a href="/collectors/add">/collectors/add</a></li>
                    <li><a href="/collectors/all">/collectors/all</a></li>
                    <li><a href="/collectors/all">/collectors/all</a></li>
                    <li><a href="/collectors/all">/collectors/all</a></li>
                </ul>
                <a href="#" onclick="window.history.go(-1)">Go Back</a>
            </div>
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
}
function getHome(Request $request, Response $response, array $args): Response {
    global $api;
    return $this->renderer->render($response, "form.phtml", $args);
}
function getAll(Request $request, Response $response): Response {
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
}

/* POST functions */
function postRoot(Request $request, Response $response, array $args): Response {
    return $this->renderer->render($response, "form.phtml", $args);
}
function postHome(Request $request, Response $response, array $args): Response {
    $data = $request->getParsedBody();
    $html = var_export($data, true);
    $response->getBody()->write($html);
    return $response;
}
function postAdd(Request $request, Response $response, array $args): Response {
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
}
function postAddAll(Request $request, Response $response, array $args): Response {
    $data = $request->getParsedBody();
    
    try {
        $db = new DB();
        $conn = $db->connect();

        if (!$conn) :
            die("Connection failed: " . !$conn);
        endif;

        // TO-DO "(?, ?,UTC_TIMESTAMP(),?)"
        $sql = "INSERT INTO collectors (name, email, phone) VALUES ";
        $values = array_fill(0, count($data), "(:name, :email, :phone)");
        $sql .= implode(", ", $values);

        $stmt = $conn->prepare($sql);
        
        $i = 1;
        foreach($data as $record):
            $name = $record["name"];
            $email = $record["email"];
            $phone = $record["phone"];
            $stmt->bindValue( ":name", $name, PDO::PARAM_STR );
            $stmt->bindValue( ":email", $email, PDO::PARAM_STR );
            $stmt->bindValue( ":phone", $phone, PDO::PARAM_STR );
        endforeach;
        // $values = rtrim($values, ", ");
        
        $result = $stmt->execute();

        $db = null;

        $response->getBody()->write(json_encode($result));
        return $response
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $e) {
        return handleErrors($e, $response);
    }
}
function postUpload(Request $request, Response $response, array $args): Response {
    try {
        // $directory = $this->get("upload_directory");
        $directory = __DIR__ . "../../var/www/uploads/";
        $files = $request->getUploadedFiles();
        $form = new Form();
        $form->process($files, $directory, $response);
        return $response
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $e) {
        return handleErrors($e, $response);
    }
}

/* PUT functions */
function updateId(Request $request, Response $response, array $args): Response {
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

/* DELETE functions */
function deleteId(Request $request, Response $response, array $args): Response {
    $id = $request->getAttribute("id");
    $sql = "DELETE FROM collectors WHERE id = $id";

    try {
        $db = new DB();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();

        $db = null;
        if($result):
            $response->getBody()->write(json_encode($result));
            return $response
                ->withHeader("content-type", "application/json")
                ->withStatus(200);
        else:
            return $response->getBody()->write("<p>Nothing</p>");
        endif;
    } catch (PDOException $e) {
        return handleErrors($e, $response);
    }
}

/* ERROR functions */
function handleErrors(PDOException $error, Response $response): Response {
    $errorMessage = array(
        "message" => $error->getMessage()
    );
    $errorCode = [
        500, // Internal server error
        600
    ];
    $response->getBody()->write(json_encode($errorMessage));
    return $response
        ->withHeader("content-type", "application/json")
        ->withStatus($errorCode[0]);
}
<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Views\PhpRenderer as PhpRenderer;
use Slim\Http\UploadedFile as UploadedFile;
use Psr\Http\Message\UploadedFileInterface;


use App\Models\Database as DB;
use App\Models\Form as Form;

$renderer = new PhpRenderer("templates/");
$upload_directory = __DIR__ . "var/uploads/";

/* POST */
$api->get("/", "getRoot");
$api->get("/collectors", "getHome");
$api->get("/collectors/all", "getAll");
$api->get("/collectors/{id}", "getId");


/* POST */
$api->post("/", "postRoot");
$api->post("/collectors", "postHome");
$api->post("/collectors/add", "postAdd");
$api->post("/collectors/add/all", "postAll");
$api->post("/collectors/upload", "postUpload");

/* PUT */
$api->put("/collectors/update/{id}", "updateId");

/* DELETE */
$api->delete("/collectors/delete/{id}", "deleteId");

/* GET functions */
function getRoot(Request $request, Response $response): Response
{
    global $renderer;
    return $renderer->render($response, "root.phtml");
};

function getHome(Request $request, Response $response): Response
{
    global $renderer;
    return $renderer->render($response, "form.phtml");
};

function getId(Request $request, Response $response, array $args): Response
{
    $id = $args["id"];
    $sql = "SELECT * FROM collectors c WHERE c.id = $id";

    try {
        $db = new DB();
        $conn = $db->connect();
        $stmt = $conn->query($sql);
        $member = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;

        $response->getBody()->write(json_encode($member));
        return $response
            ->withAddedHeader("access-control-allow-origin", "*")
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $error) {
        return handleErrors($error, $response);
    }
};

function getAll(Request $request, Response $response): Response
{
    $start = 0;
    $count = 20;
    $sql = "SELECT * FROM collectors c ORDER BY c.id ASC"; // LIMIT $start, $count

    try {
        $db = new DB();
        $conn = $db->connect();
        $stmt = $conn->query($sql);
        $members = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        $response->getBody()->write(json_encode($members));
        return $response
            ->withAddedHeader("access-control-allow-origin", "*")
            ->withHeader("content-type", "application/json")
            ->withStatus(200);
    } catch (PDOException $error) {
        return handleErrors($error, $response);
    }
}

/* POST functions */
function postRoot(Request $request, Response $response, array $args): Response
{
    global $renderer;
    return $renderer->render($response, "root.phtml", $args);
}

function postHome(Request $request, Response $response, array $args): Response
{
    $data = $request->getParsedBody();
    $html = var_export($data, true);
    $response->getBody()->write($html);
    return $response;
}

function postAdd(Request $request, Response $response): Response
{
    $data = $request->getParsedBody();

    try {
        $db = new DB();
        $conn = $db->connect();

        if (!$conn) :
            die("Connection failed: " . !$conn);
        endif;

        $name = $data["name"];
        $email = $data["email"];
        $phone = $data["phone"];
        $sql = "INSERT INTO collectors (name, email, phone) VALUES (:name, :email, :phone)";

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
    } catch (PDOException $error) {
        return handleErrors($error, $response);
    }
}

function moveUploadedFile($directory, UploadedFile $uploadedFile): string
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename = sprintf("%s.%0.8s", $basename, $extension);
    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
    $strJsonFileContents = file_get_contents($filename);
    return $filename;
}

function postAll(Request $request, Response $response, array $args): Response
{
    try {
        global $upload_directory;
        $uploadedFiles = $request->getUploadedFiles();
        // handle single input with single file upload
        $uploadedFile = $uploadedFiles["file"];
        $content = (string)$uploadedFile->getStream();
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            // $filename = moveUploadedFile($upload_directory, $uploadedFile);
            // $response->getBody()->write(json_encode($content));
        }

        $db = new DB();
        $conn = $db->connect();

        if (!$conn) :
            die("Connection failed: " . !$conn);
        endif;

        //UTC_TIMESTAMP();
        $sql = "INSERT INTO collectors (name, email, phone) VALUES (:name, :email, :phone)";
        $stmt = $conn->prepare($sql);
        $result = false;
        //$data = $request->getParsedBody();
        $data = json_decode($content, true);;
        foreach ($data as $record) :
            $name = $record["name"];
            $email = $record["email"];
            $phone = $record["phone"];
            $stmt->bindValue(":name", $name, PDO::PARAM_STR);
            $stmt->bindValue(":email", $email, PDO::PARAM_STR);
            $stmt->bindValue(":phone", $phone, PDO::PARAM_STR);
            $result = $stmt->execute();
        endforeach;
        $db = null;

        $origin = "";
        if (array_key_exists("HTTP_ORIGIN", $_SERVER)) {
            $origin = $_SERVER["HTTP_ORIGIN"];
        } else if (array_key_exists("HTTP_REFERER", $_SERVER)) {
            $origin = $_SERVER["HTTP_REFERER"];
        } else {
            $origin = $_SERVER["REMOTE_ADDR"];
        }

        var_dump($_SERVER["PHP_SELF"]);
        var_dump($_SERVER["HTTP_ORIGIN"]);
        var_dump($_SERVER["HTTP_REFERER"]);
        var_dump($_SERVER["REMOTE_ADDR"]);

        //$response->getBody()->write(json_encode($result));
        return $response
            ->withHeader("Location", $origin)
            ->withStatus(303); // 200 || 303
    } catch (PDOException $error) {
        return handleErrors($error, $response);
    }
}

function postUpload(Request $request, Response $response, array $args): Response
{
    try {
        // $directory = $this->get("upload_directory");
        $directory = __DIR__ . "../../var/www/uploads/";
        $files = $request->getUploadedFiles();
        $form = new Form();
        return $form->process($files, $directory, $response);
    } catch (PDOException $error) {
        return handleErrors($error, $response);
    }
}

/* PUT functions */
function updateId(Request $request, Response $response, array $args): Response
{
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
    } catch (PDOException $error) {
        return handleErrors($error, $response);
    }
}

/* DELETE functions */
function deleteId(Request $request, Response $response, array $args): Response
{
    $id = $request->getAttribute("id");
    $sql = "DELETE FROM collectors WHERE id = $id";

    try {
        $db = new DB();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();

        $db = null;
        if ($result) :
            $response->getBody()->write(json_encode($result));
            return $response
                ->withHeader("content-type", "application/json")
                ->withStatus(200);
        else :
            return $response->getBody()->write("<p>Nothing</p>");
        endif;
    } catch (PDOException $error) {
        return handleErrors($error, $response);
    }
}

/* ERROR functions */
function handleErrors(PDOException $error, Response $response): Response
{
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

<?php

namespace App\Models;

use \PDO;

class Database
{
    // Database configuration
    private $host = "localhost";
    private $dbname = "collectors_api";
    private $username = "projectx";
    private $password = "appPassword";

    // Connect to database using MySQL/MariaDB
    public function connect()
    {
        $conn_str = "mysql:host=$this->host;dbname=$this->dbname";
        $conn = new PDO($conn_str, $this->username, $this->password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    }
}

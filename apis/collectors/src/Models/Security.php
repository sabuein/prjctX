<?php

namespace App\Models;

class Security
{
    public function todo()
    {
        // Sanitize user input
        // $id = mysqli_real_escape_string($conn, $_GET['id']);

        // Use sanitized input in SQL query
        $id = "Hi";
        $sql = "SELECT * FROM users WHERE id = '$id'";

        // Hash password
        $password = password_hash("mypassword", PASSWORD_DEFAULT);

        // Verify password
        if (password_verify("mypassword", $password)) {
            // Password is correct
        } else {
            // Password is incorrect
        }
    }
}

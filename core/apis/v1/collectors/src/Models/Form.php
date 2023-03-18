<?php

namespace App\Models;

use Psr\Http\Message\ResponseInterface as Response;
use App\Models\MoveUploadedFile;

class Form
{
    public function process($files, $directory, $response): Response
    {

        $job = new MoveUploadedFile();

        // handle single input with single file upload
        $uploadedFile = $files["example1"];
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = $job->start($directory, $uploadedFile);
            $response->write("uploaded " . $filename . "<br />");
        }


        // handle multiple inputs with the same key
        foreach ($files["example2"] as $uploadedFile) {
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $filename = $job->start($directory, $uploadedFile);
                $response->write("uploaded " . $filename . "<br />");
            }
        }

        // handle single input with multiple file uploads
        foreach ($files["example3"] as $uploadedFile) {
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $filename = $job->start($directory, $uploadedFile);
                $response->write("uploaded " . $filename . "<br />");
            }
        }
    }
}

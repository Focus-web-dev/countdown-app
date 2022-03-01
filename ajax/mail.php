<?php
    $email = $_POST['email'];

    $theme = "=?utf-8?B?".base64_encode("You have successfully subscribed to the newsletter")."?=";

    $message = 'Visit my GitHub: https://github.com/Focus-web-dev';

    $headers = "From: skopthe6@gmail.com\r\nReply-to: $email\r\nContent-type: text/html; charset=urf-8\r\n";
    
    $success = mail($email, $theme, $message, $headers);

    echo $success;
?>
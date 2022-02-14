<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 'on');
    include 'code.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rocket Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<style>
</style>
<body>
    <div class="view-box">
        <div class="view-box__counter"></div>
        <div class="view-box__rocket-wrapper view-box__rocket-wrapper_once">
            <img class="rocket view-box__rocket" src="" alt="starship">
            <div class="view-box__hp">
                <div class="view-box__hp-progress"></div>
            </div>
        </div>
    </div>
    <script src="main.js"></script>
</body>

</html>
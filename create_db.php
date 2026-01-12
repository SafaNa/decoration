<?php
$pdo = new PDO('mysql:host=localhost', 'root', '');
$pdo->exec("CREATE DATABASE IF NOT EXISTS dekorasi");
echo "Database created successfully\n";

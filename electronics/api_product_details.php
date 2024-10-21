<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli("localhost", "root", "", "electronics_store");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$base_url = 'http://localhost/php/electronics/images/';


$res = $conn->query("SELECT product_name, email, image, description, price, category FROM electronics_store");

if (!$res) {
    die("Query failed: " . $conn->error);
}
$products = [];

if ($res->num_rows > 0) {
    while ($rowdata = $res->fetch_assoc()) {
        $rowdata['image'] = $base_url . basename($rowdata['image']);
        $products[] = $rowdata;
    }
}



echo json_encode($products);

$conn->close();

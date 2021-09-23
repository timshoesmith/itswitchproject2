<?php
include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);
if($conn->connect_error) {
    die("Failed to connect!".$conn->connect_error);
}
if(isset($_POST['query'])) {
    $inpText=$_POST['query'];
    $query="SELECT lastName FROM personnel WHERE lastName LIKE '%$inpText%'";
    $result = $conn->query($query);
    if($result->num_rows>0) {
        while($row=$result->fetch_assoc()) {
            echo "<a href='#' class='list-group-item list-group-item-action border-1'>" . $row['lastName'] . "</a>";
        }
    }
    else {
        echo "<p class='list-group-item border-1'>No REcord</p>";
    }
}



















?>
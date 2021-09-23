<?php
    include("config.php");

    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);
    if($conn->connect_error) {
        die("Failed to connect!".$conn->connect_error);
    }
    if(isset($_POST['submit'])) {
        $data=$_POST['search'];
        $sql="SELECT * FROM personnel WHERE lastName = '$data'";
        $result=$conn->query($sql);
        $row=$result->fetch_assoc();
            echo "ID :" . $row['id'] . "<br>";
            echo "First Name :" . $row['firstName'] . "<br>";
            echo "Last Name :" . $row['lastName'] . "<br>";
    }
?>
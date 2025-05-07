<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'dbConnect.php';
$objDB=new DbConnect();
$conn=$objDB->connect();

$method=$_SERVER['REQUEST_METHOD'];
switch($method)
{
    case 'GET':
        $sql='SELECT * from user';
        $path= explode('/',$_SERVER['REQUEST_URI']);
        if(isset($path[3])&& is_numeric($path[3]))
        {
            $sql .=" WHERE id=:id";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(':id',$path[3]);
            $stmt->execute();
            $users=$stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt=$conn->prepare($sql);
            $stmt->execute();
            $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        echo json_encode($users);
        break;
    case "POST":
    $user =json_decode(file_get_contents('php://input'));
$sql="INSERT INTO user(id,name,email,mobile_no,createdAt) VALUES(NULL,:name,:email,:mobile_no,:createdAt)";
$stmt=$conn->prepare($sql);
$createdAt=date('Y-m-d');
$stmt->bindParam(':name',$user->name);
$stmt->bindParam(':email',$user->email);
$stmt->bindParam(':mobile_no', $user->mobile_no);
$stmt->bindParam(':createdAt',$createdAt);
if($stmt->execute())
{
    $response=['status'=>1,'message'=>'Record created successfully.'];
}
else{
    
    $response=['status'=>0,'message'=>'Record was not created.'];
}
break;
case "PATCH":
    $user =json_decode(file_get_contents('php://input'));
$sql="UPDATE user SET name=:name,email=:email,mobile_no=:mobile_no,updatedAt=:updatedAt WHERE id=:id";
$stmt=$conn->prepare($sql);
$updatedAt=date('Y-m-d');
$stmt->bindParam(':id',$user->id);
$stmt->bindParam(':name',$user->name);
$stmt->bindParam(':email',$user->email);
$stmt->bindParam(':mobile_no', $user->mobile_no);
$stmt->bindParam(':updatedAt',$updatedAt);
if($stmt->execute())
{
    $response=['status'=>1,'message'=>'Record updated successfully.'];
}
else{
    
    $response=['status'=>0,'message'=>'Record was not updated.'];
}
break;
case "DELETE":
    $sql='DELETE from user WHERE id=:id';
    $path= explode('/',$_SERVER['REQUEST_URI']);
   
        $stmt=$conn->prepare($sql);
        $stmt->bindParam(':id',$path[3]);
     
        if($stmt->execute())
        {
            $response=['status'=>1,'message'=>'Record deleted successfully.'];
        }
        else{
            
            $response=['status'=>0,'message'=>'Record was not deleted.'];
        }
    
}
?>




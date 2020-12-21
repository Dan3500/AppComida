<?php
    include("bd.php");

    $texto=$_POST["cajaBuscar"]??
           $_POST["cajaInsertar"]??
           $_POST["obtenerComidas"]??
           $_POST["mostrarTodo"]??
           $_POST["cambiarComida"]??
           null;
    
    $output=array();

    if (isset($_POST["cajaBuscar"])){
        $query="SELECT nombre, tipo FROM comidas WHERE nombre LIKE '$texto%'";
        $result=mysqli_query($conn,$query);
        if ($result){
            $output["comidas"]=array();
            while($row=mysqli_fetch_assoc($result)){
                $comida=["nombre"=>$row["nombre"],"tipo"=>$row["tipo"]];
                array_push($output["comidas"],$comida);
            }
        }
    }

    if(isset($_POST["mostrarTodo"])){
        $comidas=array();
        $cenas=array();
        $query="SELECT nombre, tipo FROM comidas";
        $result=mysqli_query($conn,$query);
        if ($result){
            while($row=mysqli_fetch_assoc($result)){
                if($row["tipo"]=="comida"){
                    $comida=["tipo"=>$row["tipo"],"nombre"=>$row["nombre"]];
                    array_push($comidas,$comida);
                }else{
                    $cena=["tipo"=>$row["tipo"],"nombre"=>$row["nombre"]];
                    array_push($cenas,$cena);
                } 
            }
        }
        array_push($output,$comidas);
        array_push($output,$cenas);
    }

    if(isset($_POST["insertar"])){
        $comida=$_POST["comida"];
        $tipo=$_POST["tipo"];
        $query="INSERT INTO comidas VALUES (DEFAULT,'$comida','$tipo')";
        $result=mysqli_query($conn,$query);
        if ($result){
            $output="OK";
        }
    }

    if(isset($_POST["obtenerComidas"])){
        $comidas=array();
        $cenas=array();
        $query="SELECT nombre, tipo FROM comidas";
        $result=mysqli_query($conn,$query);
        if ($result){
            while($row=mysqli_fetch_assoc($result)){
                if($row["tipo"]=="comida"){
                    $comida=["tipo"=>$row["tipo"],"nombre"=>$row["nombre"]];
                    array_push($comidas,$comida);
                }else{
                    $cena=["tipo"=>$row["tipo"],"nombre"=>$row["nombre"]];
                    array_push($cenas,$cena);
                } 
            }
        }
        shuffle($comidas); shuffle($cenas);
        $cont=0;
        $response=array();
        for ($k=0;$k<2;$k++){
            switch($k){
                case 0:
                    foreach($comidas as $nombre){
                        if ($cont<$_POST["obtenerComidas"]){
                            array_push($response,$nombre);
                            $cont++;
                        }
                    }
                break;
                case 1:
                    foreach($cenas as $nombre){
                        if ($cont<$_POST["obtenerComidas"]){
                            array_push($response,$nombre);
                            $cont++;
                        }
                    }
                break;
            }
            $cont=0;
        }
        $output=$response;
    }
    
    echo(json_encode($output));


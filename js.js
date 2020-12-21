crearTabla=(numColum)=>{
    let tabla="<button class='btn btn-danger' id='btnBorrarDatos'>Borrar datos</button><table class='tablaComidas' id='tablaComidas'><tr><td id='celdaBlanco'></td>";
    let diasSemana=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

    switch(numColum){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
                for(let f1=0;f1<numColum;f1++){
                    tabla+="<th>"+diasSemana[f1]+"</th>";
                }
                tabla+="</tr><tr><th>COMIDA</th>";
                for(let f2=0;f2<numColum;f2++){
                    tabla+="<td id='comida"+f2+"'></td>";
                }
                tabla+="</tr><tr><th>CENA</th>";
                for(let f3=0;f3<numColum;f3++){
                    tabla+="<td id='cena"+f3+"'></td>";
                }
                tabla+="</tr></tabla>";
        break;
    }
    document.getElementById("numTabla").value=numColum;
    return tabla;
}

/**
 * 
 */
$("#cajaBuscar").keyup(function(e){
    let caja=$("#cajaBuscar").val();
    if (caja){
        let request=$.ajax({
        url: "server.php",
        type: "POST",
        data: {
            "cajaBuscar": caja
        },
        success: function(response){
            let respuesta=JSON.parse(response);
            console.log(respuesta);
            let comidasEncontradas=respuesta.comidas;
            if (comidasEncontradas[0]!=undefined){
                let element = document.querySelector('#cajaBuscar')
                let style = getComputedStyle(element)
                width=style.width;
                $("#mostrarBusqueda").css(
                    {
                        "width": width,
                        "visibility": "visible",
                    }
                )
                let html="<ul>";
                for(let i=0;i<comidasEncontradas.length;i++){
                    html+="<li>"+comidasEncontradas[i]["nombre"]+" ("+comidasEncontradas[i]["tipo"]+")</li>";
                }
                html+="</ul>";
                document.getElementById('mostrarBusqueda').innerHTML=html;
            }else{
                $("#mostrarBusqueda").css(
                    {
                        "visibility": "hidden"
                    }
                )
            }
        }
        
        })
    }else{
        $("#mostrarBusqueda").css(
            {
                "visibility": "hidden"
            }
        )
    }
});


$("#btnObtenerComidas").click(function(e){
    if ((document.getElementById('comida0').innerText)==""){
        let numeroMostrar=0;
        for(let i=0;i<8;i++){
            if((document.getElementById("comida"+i))==null){
                numeroMostrar+=i;
                break;
            }
        }
        if (numeroMostrar){
            let request=$.ajax({
                url: "server.php",
                type: "POST",
                data: {
                    "obtenerComidas": numeroMostrar,
                },
                success: function(response){
                    let respuesta=JSON.parse(response);
                    console.log(respuesta);
                    for(let j=0;j<2;j++){
                        let contCena=0;
                        for(let k=0;k<respuesta.length;k++){
                            switch(respuesta[k]["tipo"]){
                                case "comida":
                                    document.getElementById("comida"+k).innerHTML=respuesta[k]["nombre"];
                                break;
                                case "cena":
                                    document.getElementById("cena"+contCena).innerHTML=respuesta[k]["nombre"];
                                    contCena++;
                                break;
                            }
                        }
                    }
                }
            })
        }
    }
});

$("#btnInsertar").click(function(e){
    let comida=document.getElementById('cajaInsertar').value;
    let tipoInsertar=document.getElementById("tipoComidaInsertar").value;
    if (tipoInsertar!=""&&comida!=""){
        let request=$.ajax({
            url: "server.php",
            type: "POST",
            data: {
                "insertar": "insertar",
                "comida": comida,
                "tipo": tipoInsertar
            },
            success: function(response){
                let respuesta=JSON.parse(response);
                if(respuesta=="OK"){
                    alert("La comida ha sido insertada con éxito")
                    document.getElementById('cajaInsertar').value="";
                    //document.getElementById("tipoComidaInsertar").value;
                }else{
                    alert("Ha ocurrido un error al insertar la comida")
                }
            }
        })
    }else{
        if (comida==""){
           alert("No has introducido ninguna comida");
        }else{
            alert("No has introducido el tipo de la comida comida");
        }
    }

   
});

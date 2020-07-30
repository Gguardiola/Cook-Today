
//aceptar politica por primera vez
function privacyDialogFIRST() {
    var modal = document.getElementById("privacyContainerDialogFIRST");
    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){

        l.setItem("firstTimeCheck",JSON.stringify(false))
        modal.style.display = "none";
        

    })
    /*var dialog = document.querySelectorAll('#privacyContainerDialogFIRST').item(0);  

    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

    dialog.querySelector('.close').addEventListener('click', function(e) {
        l.setItem("firstTimeCheck",JSON.stringify(false))
        dialog.close();
        e.preventDefault()
    });*/

}
//cada vez que el usuario hace click en una pestaña, se resetea la nevera y la despensa
function tabChange(){


    const contenedorDespensaClean = document.getElementById("despensa-list");
    contenedorDespensaClean.innerHTML = ""
    document.getElementById("despensa-list").scrollTop = 0    

    const volverBeacon = document.createElement("div")  
    volverBeacon.setAttribute("id", "volverBeacon");
    contenedorDespensaClean.appendChild(volverBeacon)

    const contenedorComidaCat = document.getElementById("despensa-list");         
    const ComidaFichaCat = document.createElement('div');

    ComidaFichaCat.innerHTML = `
    
    <br><br><br>
    <div align=center><img style="opacity:0.5" src="images/startup-despensa.png" width="192px"></div><br>
    <div align=center><a style="opacity:0.6;text-decoration:none;color:#616161">Selecciona una categoría.</a></div>
    
    `
    contenedorComidaCat.appendChild(ComidaFichaCat)
    //l.setItem("categoriaActual",categoria)
    l.setItem("despensa_load",JSON.stringify(0))
    l.setItem("despensa_break",false)

    var borrarBoton = document.getElementById("clearIndex")

    borrarBoton.style.visibility = "hidden"
    //vaciamos los resultados del HTML
    document.getElementById('resultado').innerHTML = "";
    ingredientes_checked = []
    const contenedorSelectores = document.getElementById("selectores");
    contenedorSelectores.innerHTML = ""
    document.getElementById("selectores").scrollTop = 0

    //borramos el contenido del input de la busqueda en tiempo real
    const contenedorBuscador = document.getElementById("indexof");
    contenedorBuscador.value = ""

    const contenedorBuscadorDiv = document.getElementById("container-buscador");
    contenedorBuscadorDiv.classList.remove("is-dirty")

    const contenedorResultadoComidas = document.getElementById("resultado-comida");
    contenedorResultadoComidas.innerHTML = ""
    contenedorResultadoComidas.style.marginTop = "0px"
    

    //vaciamos las keys del localstorage que se han usado para mostrar las comidas
    l.setItem("mostrar_comidas_finalSave",JSON.stringify([]))
    l.setItem("faltanIngredientesCheckSave",JSON.stringify([]))
    l.setItem("selectores_load",JSON.stringify(0))
    //escondemos el boton de cargar más
    document.getElementById("loadMore").style.visibility = "hidden"
    //contenedorResultadoComidas.style.marginTop = "0px"
    document.getElementById("loadMore").style.height = "0px"
    document.getElementById("loadMoreContainer").style.height = "0px"

    //volvemos a duplicar ingredientes_list de la lista original
    ingredientes_list = ingredientes_list_const.slice()

    //llamamos al metodo selectores para que vuelva a generar las etiquetas con ingredientes
    ui.selectores(ingredientes_list_const);

    //evitamos que el evento submit se comporte por defecto (es decir, que haga reload de la pagina)
  








}
//a parte, cuando haga click en favoritos tambien refrescara la lista.
document.getElementById("favoritosTab").addEventListener("click",function(e){

    fav.mostrar_favoritos(true)



    e.preventDefault()
})


//Esta funcion recoge el ingrediente seleccionado, lo añade a ingredientes checked y pasa la lista para mostrar la etiqueta borrable del ingrediente

function ingrediente_click(id_ingrediente_check){
   
    if (!ingredientes_checked.includes(id_ingrediente_check)){
        ingredientes_checked.push(id_ingrediente_check)

    }

    ui.mostrar_seleccionados(ingredientes_checked);


    //WIP ESTO BORRA EL INDEX OF Y REINICIA LOS SELECTORES//
    //const contenedorBuscador = document.getElementById("indexof");
    //contenedorBuscador.value = ""
    //const contenedorBuscadorDiv = document.getElementById("container-buscador");
    //contenedorBuscadorDiv.classList.remove("is-dirty")

    //const contenedorSelectoresClean = document.getElementById("selectores");
    //contenedorSelectoresClean.innerHTML = ""
    //document.getElementById("selectores").scrollTop = 0
    //l.setItem("selectores_load",JSON.stringify(0))
    //ui.selectores(ingredientes_list_const);

}
function updateScroll(){
    var element = document.getElementById("resultado");
    element.scrollTop = element.scrollHeight;
}

//esta funcion hace que cuando se hace click en un ingrediente anteriormente seleccionado,
//se borre de ese bloque y vuelva al bloque de selectores
function ingrediente_delete(ingrediente_aborrar){

    //var ingredientes_checked_split = ingredientes_checked.slice()
    
    for (var i = 0; i <= ingredientes_checked.length -1; i++){
        if (ingrediente_aborrar === ingredientes_checked[i]){
            garbage_ingredientes = ingredientes_checked.splice(i,1)
        }

    }
    //const contenedorResultado_chip = document.getElementById("resultado");
    // contenedorResultado_chip.remove("ingrediente_result")
    //  contenedorResultado_chip.innerHTML = ""

    ui.mostrar_seleccionados(ingredientes_checked);


}
//esta lista muestra una ventana cuando se le da a "ver ingredientes" en la ficha de cada comida.
//recoge los ingredientes checkeados, la lista total de comidas que coinciden con los ingredientes, la comida donde se ha hecho click y -
//el indice que es la posicion de la ficha

//primero busca la comida que hemos seleccionado en la lista mostrar_comidas_final
//despues busca todos los ingredientes en esa comida, si alguno falta lo mostrara en ROJO
function popupingredientes(ingredientes_checked,mostrar_comidas_final,ComidaClickIngredientes,indice){

    ingredientes_checked = ingredientes_checked.split(",")
    console.log(ingredientes_checked)
    mostrar_comidas_final = mostrar_comidas_final.split(",")
    var ingredienteComidas = []
    for (var i = 0; i <= mostrar_comidas_final.length -1; i++){
        
        for (var x = 0; x < comidas.length;x++ ){
            if (comidas[x].nombre.includes(ComidaClickIngredientes)){
                ingredienteComidas.push(comidas[x].ingredientes)
            }
        }
    }
    
    var ingredientesActualpopup = ingredienteComidas[0]
    console.log(ingredientesActualpopup)



    var coincidencias_ingredientes = 0
    for (var i = 0;i <= ingredientes_checked.length -1; i++){
   
        if (ingredientesActualpopup.includes(ingredientes_checked[i])){
            coincidencias_ingredientes = coincidencias_ingredientes + 1

        }

    }
    console.log(coincidencias_ingredientes)
    console.log(ingredientesActualpopup.length)
  
    const ingredientesContainer = document.querySelectorAll("#ingredientesFichaContainer").item(indice)
    ingredientesActualMostrar = document.createElement("ul")
    ingredientesActualMostrar.setAttribute("id","ingredientesMostrados")
    ingredientesActualMostrar.setAttribute("class","demo-list-item mdl-list")

    for(var i = 0; i < ingredientesActualpopup.length;i++){ 

        if (ingredientes_checked.includes(ingredientesActualpopup[i])){      
            ingredientesActualMostrar.innerHTML += `
            <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                ${ingredientesActualpopup[i]}
            </span>
            </li>  
            `
        }
        else{
            ingredientesActualMostrar.innerHTML += `
            <li class="mdl-list__item">
            <span style="color:#d8573b" class="mdl-list__item-primary-content">
                ${ingredientesActualpopup[i]}
            </span>
            </li>  
            ` 
        }
        
    }
    
    ingredientesContainer.appendChild(ingredientesActualMostrar)        

    var modal = document.querySelectorAll('#ingredientespopup_id').item(indice);


    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){    
      
        try{
            var borrarIngredientesActual = document.getElementById("ingredientesMostrados")
            borrarIngredientesActual.parentNode.removeChild(borrarIngredientesActual)
        } catch (TypeError){
            //pass

        }
        
        modal.style.display = "none";
        

    })        


}

function popupingredientesFavoritos(ComidaClickIngredientes,indice){
    var mostrar_comidas_final = []
    for (var i = 0; i <= comidas.length -1; i++){
        mostrar_comidas_final.push(comidas[i].nombre)
    }

    var ingredienteComidas = []
    for (var i = 0; i <= mostrar_comidas_final.length -1; i++){
        
        for (var x = 0; x < comidas.length;x++ ){
            if (comidas[x].nombre.includes(ComidaClickIngredientes)){
                ingredienteComidas.push(comidas[x].ingredientes)
            }
        }
    }
    
    var ingredientesActualpopup = ingredienteComidas[0]
    console.log(ingredientesActualpopup)

    const ingredientesContainer = document.querySelectorAll("#ingredientesFichaContainerFav").item(indice)
    ingredientesActualMostrar = document.createElement("ul")
    ingredientesActualMostrar.setAttribute("id","ingredientesMostradosFav")
    ingredientesActualMostrar.setAttribute("class","demo-list-item mdl-list")
    for(var i = 0; i < ingredientesActualpopup.length;i++){ 
          
            ingredientesActualMostrar.innerHTML += `
            <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                ${ingredientesActualpopup[i]}
            </span>
            </li>  
            `        
    }
    
    ingredientesContainer.appendChild(ingredientesActualMostrar)        

    var modal = document.querySelectorAll('#ingredientespopup_idFav').item(indice);
    

    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){    
      
        try{
            var borrarIngredientesActual = document.getElementById("ingredientesMostradosFav")
            borrarIngredientesActual.parentNode.removeChild(borrarIngredientesActual)
        } catch (TypeError){
            //pass

        }
        
        modal.style.display = "none";
        

    })    


}

function popupingredientesDia(ComidaClickIngredientes){
    var mostrar_comidas_final = []
    for (var i = 0; i <= comidas.length -1; i++){
        mostrar_comidas_final.push(comidas[i].nombre)
    }

    var ingredienteComidas = []
    for (var i = 0; i <= mostrar_comidas_final.length -1; i++){
        
        for (var x = 0; x < comidas.length;x++ ){
            if (comidas[x].nombre.includes(ComidaClickIngredientes)){
                ingredienteComidas.push(comidas[x].ingredientes)
            }
        }
    }
    
    var ingredientesActualpopup = ingredienteComidas[0]
    console.log(ingredientesActualpopup)

    const ingredientesContainer = document.querySelectorAll("#ingredientesFichaContainerDia").item(0)
    ingredientesActualMostrar = document.createElement("ul")
    ingredientesActualMostrar.setAttribute("id","ingredientesMostradosDia")
    ingredientesActualMostrar.setAttribute("class","demo-list-item mdl-list")
    for(var i = 0; i < ingredientesActualpopup.length;i++){ 
          
            ingredientesActualMostrar.innerHTML += `
            <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                ${ingredientesActualpopup[i]}
            </span>
            </li>  
            `        
    }
    
    ingredientesContainer.appendChild(ingredientesActualMostrar)        

    var modal = document.querySelectorAll('#ingredientespopup_idDia').item(0);

    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){    
      
        try{
            var borrarIngredientesActual = document.getElementById("ingredientesMostradosDia")
            borrarIngredientesActual.parentNode.removeChild(borrarIngredientesActual)
        } catch (TypeError){
            //pass

        }    
        
        modal.style.display = "none";
        

    })
    

}

function popupingredientesDespensa(ComidaClickIngredientes){
    var mostrar_comidas_final = []
    for (var i = 0; i <= comidas.length -1; i++){
        mostrar_comidas_final.push(comidas[i].nombre)
    }

    var ingredienteComidas = []
    for (var i = 0; i <= mostrar_comidas_final.length -1; i++){
        
        for (var x = 0; x < comidas.length;x++ ){
            if (comidas[x].nombre.includes(ComidaClickIngredientes)){
                ingredienteComidas.push(comidas[x].ingredientes)
            }
        }
    }
    
    var ingredientesActualpopup = ingredienteComidas[0]
    console.log(ingredientesActualpopup)

    const ingredientesContainer = document.querySelectorAll("#ingredientesFichaContainerDespensa").item(0)
    ingredientesActualMostrar = document.createElement("ul")
    ingredientesActualMostrar.setAttribute("id","ingredientesMostradosDespensa")
    ingredientesActualMostrar.setAttribute("class","demo-list-item mdl-list")
    for(var i = 0; i < ingredientesActualpopup.length;i++){ 
          
            ingredientesActualMostrar.innerHTML += `
            <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                ${ingredientesActualpopup[i]}
            </span>
            </li>  
            `        
    }
    
    ingredientesContainer.appendChild(ingredientesActualMostrar)        

    var modal = document.querySelectorAll('#ingredientespopup_idDespensa').item(0);


        modal.style.display = "block";


        modal.querySelector(".close").addEventListener('click',function(e){    

            try{
                var borrarIngredientesActual = document.getElementById("ingredientesMostradosDespensa")
                borrarIngredientesActual.parentNode.removeChild(borrarIngredientesActual)
            } catch (TypeError){
                //pass
    
            }
            modal.style.display = "none";
            
    
        })        



}

//esta funcion se activa cuando se le da a la estrella de cada ficha

//mediance el indice (posicion de la ficha) recoge el parrafo oculto que hay debajo de cada ficha que contine el nombre de la comida
//a continuación carga el JSON de favoritos
//si la comida ya esta en la lista, mostrara que ya esta en favoritos.
//si no esta, va a añadir la comida a la lista y acto seguido la va a guardar en localstorage
//despues muestra por pantalla que se ha añadido
function addFavoritos(indice){

    var comida_fav = document.querySelectorAll("#addfavoritosLabel").item(indice).innerHTML
    console.log(comida_fav)
    
    favoritosParse = JSON.parse(l.getItem("favoritos"))
    
    if(favoritosParse.includes(comida_fav)){
        //pass
        var modal = document.querySelectorAll('#addfavoritosDialogFail').item(indice);
        

        modal.style.display = "block";


        modal.querySelector(".close").addEventListener('click',function(e){    
            
            modal.style.display = "none";
            
    
        })
    }
    else{
        favoritosParse.unshift(comida_fav)
        l.setItem("favoritos", JSON.stringify(favoritosParse))   
    

        var modal = document.querySelectorAll('#addfavoritosDialog').item(indice);
       

        modal.style.display = "block";


        modal.querySelector(".close").addEventListener('click',function(e){    
            
            modal.style.display = "none";
            
    
        })
    }
} 

function addFavoritosDia(){

    var comida_fav = document.querySelectorAll("#addfavoritosLabelDia").item(0).innerHTML
    console.log(comida_fav)
    
    favoritosParse = JSON.parse(l.getItem("favoritos"))
    console.log(favoritosParse)
    if(favoritosParse.includes(comida_fav)){
        //pass
        var modal = document.querySelectorAll('#addfavoritosDialogFailDia').item(0);
       

        modal.style.display = "block";


        modal.querySelector(".close").addEventListener('click',function(e){    
            
            modal.style.display = "none";
            
    
        })
    }
    else{
        favoritosParse.unshift(comida_fav)
        l.setItem("favoritos", JSON.stringify(favoritosParse))   
    

        var modal = document.querySelectorAll('#addfavoritosDialogDia').item(0);


        modal.style.display = "block";


        modal.querySelector(".close").addEventListener('click',function(e){    
            
            modal.style.display = "none";
            
    
        })
    }
} 

function removeFavoritos(indice){


    var comida_fav = document.querySelectorAll("#removefavoritosLabel").item(indice).innerHTML
    console.log(comida_fav)
    
    favoritosParse = JSON.parse(l.getItem("favoritos"))
    console.log(favoritosParse)

    for(var i = 0;i <= favoritosParse.length -1;i++){
   
        if(favoritosParse[i] == comida_fav){
            favoritosParse.splice(i,1)
        }
        else{
            //

        }
    }
    
    l.setItem("favoritos",JSON.stringify(favoritosParse))


    fav.mostrar_favoritos(true)
}
//esta function se llama cuando se hace click en el feedback de abajo del todo
function FeedbackAlert(origenNevera) {

    if(origenNevera == true){
        var modal = document.querySelectorAll("#feedbackContainer").item(0);
    }

    else if(origenNevera == false){
        var modal = document.querySelectorAll("#feedbackContainerFav").item(0);
    }
    else if(origenNevera == "despensa"){
        var modal = document.querySelectorAll("#feedbackContainerDespensa").item(0);

    }
    else if(origenNevera == "acercade"){
        var modal = document.querySelectorAll("#feedbackContainerAcercade").item(0);


    }
    
    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){

        
        modal.style.display = "none";
        

    })

}
//esta funcion se llama cuando se hace click en eo enlace al formulario de feedback
//copia el enlace al portapaples


//esta funcion se llama cuando se hace click en al interrogacion de busqueada avanzada
//salta una ventana con información
function advancedSearchInfoDialog(){

    var dialog = document.querySelector('#advancedSearchDialog');
    
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

    dialog.querySelector('.close').addEventListener('click', function(e) {
      dialog.close();
      e.preventDefault()
    });


}

function ingredienteRepeatDialog() {

    var dialog = document.querySelector('#ingredienteRepeatDialog');
    
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

    dialog.querySelector('.close').addEventListener('click', function(e) {
      dialog.close();
      e.preventDefault()
    });


}

//CAJON DE LOS BOTONES DE LA DESPENSA//
//cuando se hace click en una categoria, la manda aqui, limpia el cajon y llama a la clase para montar las fichas
function mostrarCategoria(categoria){
    
    const contenedorDespensaClean = document.getElementById("despensa-list");
    contenedorDespensaClean.innerHTML = ""
    document.getElementById("despensa-list").scrollTop = 0    

    const volverBeacon = document.createElement("div")  
    volverBeacon.setAttribute("id", "volverBeacon");
    contenedorDespensaClean.appendChild(volverBeacon)

    l.setItem("categoriaActual",categoria)
    l.setItem("despensa_load",JSON.stringify(0))
    l.setItem("despensa_break",false)
    des.mostrar_categoria(categoria)

}

//BOTONES DEL APARTADO FINAL (TEMAS LEGALES VERSION ETC)
//cada funcion de estas he llamada por un click en el nombre correspondiente

function eclecnas() {
    var eclecnas = JSON.parse(l.getItem("eclecnas"))

    if (eclecnas == null){
        l.setItem("eclecnas",JSON.stringify(0))
        eclecnas = JSON.parse(l.getItem("eclecnas"))
    }
    
    else{
    
        if(eclecnas < 19){
            eclecnas = eclecnas + 1
            l.setItem("eclecnas",JSON.stringify(eclecnas))

        }
        else if (eclecnas == 19){
            var modal = document.querySelectorAll('#eclecnasContainerDialog').item(0);  


            modal.style.display = "block";


            modal.querySelector(".close").addEventListener('click',function(e){
                l.setItem("eclecnas",JSON.stringify(0))        
                
                modal.style.display = "none";
                
        
            })

        }


    }


}

function acercadeDialog() {

    var modal = document.querySelectorAll('#acercadeContainerDialog').item(0);  

    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){

        
        modal.style.display = "none";
        

    })

}

function creditosDialog() {

    var modal = document.querySelectorAll('#creditosContainerDialog').item(0);  

    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){

        
        modal.style.display = "none";
    })


}

function licenciasDialog() {

    var modal = document.querySelectorAll('#licenciasContainerDialog').item(0);  

    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){

        
        modal.style.display = "none";
    })

}

function privacyDialog() {

    var modal = document.querySelectorAll('#privacyContainerDialog').item(0);  

    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){

        
        modal.style.display = "none";
        

    })

}

function tosDialog() {

    var modal = document.querySelectorAll('#tosContainerDialog').item(0);  
    modal.style.display = "block";


    modal.querySelector(".close").addEventListener('click',function(e){

        
        modal.style.display = "none";
    })

}

//funcion para retrasar la ocultacion del spinner de carga
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
}


async function hideSpinner() {

    await sleep(1000);
    document.getElementById("loadspinner").style.visibility = "hidden"
}



function clearIndexOf(){
    //vaciamos los resultados del HTML

    var borrarBoton = document.getElementById("clearIndex")

    borrarBoton.style.visibility = "hidden"
    
    const contenedorSelectores = document.getElementById("selectores");
    contenedorSelectores.innerHTML = ""
    document.getElementById("selectores").scrollTop = 0

    //borramos el contenido del input de la busqueda en tiempo real
    const contenedorBuscador = document.getElementById("indexof");
    contenedorBuscador.value = ""

    const contenedorBuscadorDiv = document.getElementById("container-buscador");
    contenedorBuscadorDiv.classList.remove("is-dirty")



    l.setItem("selectores_load",JSON.stringify(0))
    l.setItem("bloquearScroll",true)

    //llamamos al metodo selectores para que vuelva a generar las etiquetas con ingredientes
    ui.selectores(ingredientes_list_const);

    //evitamos que el evento submit se comporte por defecto (es decir, que haga reload de la pagina)


}
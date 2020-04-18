
//Esta funcion recoge el ingrediente seleccionado, lo añade a ingredientes checked y pasa la lista para mostrar la etiqueta borrable del ingrediente

function ingrediente_click(id_ingrediente_check){

    ingredientes_list_pop = ingredientes_list
    for( var i = 0; i < ingredientes_list_pop.length; i++){
            if ( ingredientes_list_pop[i] === id_ingrediente_check) {
            ingredientes_list_pop.splice(i, 1); 
        }
    }

    ingredientes_checked.push(id_ingrediente_check)
    ui.mostrar_seleccionados(ingredientes_checked);

    const contenedorBuscador = document.getElementById("indexof");
    contenedorBuscador.value = ""
    const contenedorBuscadorDiv = document.getElementById("container-buscador");
    contenedorBuscadorDiv.classList.remove("is-dirty")

    const contenedorSelectores = document.getElementById("form-selector");
    contenedorSelectores.remove("form-selector")
    contenedorSelectores.innerHTML = ""
    console.log(ingredientes_list_pop)
    ui.selectores(ingredientes_list_pop);

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

    const contenedorSelectores_renew = document.getElementById("form-selector")
    const autoSelector_renew = document.createElement('label');
    autoSelector_renew.setAttribute("class","mdl-chip")
    autoSelector_renew.setAttribute("style","margin:2px")
    autoSelector_renew.setAttribute("onclick",`ingrediente_click('${ingrediente_aborrar}')`)
    autoSelector_renew.setAttribute("name","ingrediente_checkbox")
    autoSelector_renew.setAttribute("for",`${ingrediente_aborrar}`)
    autoSelector_renew.innerHTML += `
        <input style="visibility: hidden" type="checkbox" id="${ingrediente_aborrar}" class="mdl-checkbox__input">
        <span style="font-size:17px;font-family:roboto;margin-left:-19px;margin-top:-5px"" class="mdl-chip__text">${ingrediente_aborrar}</span>
    `;
    ingredientes_list.unshift(ingrediente_aborrar)
    contenedorSelectores_renew.appendChild(autoSelector_renew);
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
        console.log("aa")        
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

    var dialog = document.querySelectorAll('#ingredientespopup_id').item(indice);
    console.log(dialog)
    var showDialogButton = document.querySelectorAll('#show-dialog').item(indice);
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    
    dialog.querySelector('.close').addEventListener('click', function(e) {
        try{
            var borrarIngredientesActual = document.getElementById("ingredientesMostrados")
            borrarIngredientesActual.parentNode.removeChild(borrarIngredientesActual)
        } catch (TypeError){
            //pass

        }

        dialog.close();
        e.preventDefault()
    });


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
    console.log(favoritosParse)
    if(favoritosParse.includes(comida_fav)){
        //pass
        var dialog = document.querySelectorAll('#addfavoritosDialogFail').item(indice);
        console.log(dialog)
        
        if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        
        dialog.querySelector('.close').addEventListener('click', function(e) {
        dialog.close();
        e.preventDefault()
        });
    }
    else{
        favoritosParse.push(comida_fav)
        l.setItem("favoritos", JSON.stringify(favoritosParse))   
    

        var dialog = document.querySelectorAll('#addfavoritosDialog').item(indice);
        console.log(dialog)
        
        if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        
        dialog.querySelector('.close').addEventListener('click', function(e) {
        dialog.close();
        e.preventDefault()
        });
    }
} 

//esta function se llama cuando se hace click en el feedback de abajo del todo
function FeedbackAlert() {

    var dialog = document.querySelectorAll('#feedbackContainer').item(0);
    console.log(dialog)

    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

    dialog.querySelector('.close').addEventListener('click', function(e) {
        dialog.close();
        e.preventDefault()
    });

}
//esta funcion se llama cuando se hace click en eo enlace al formulario de feedback
//copia el enlace al portapaples
function copiarFormFeedback(){
    console.log("copado")
    var codigoACopiar = document.getElementById('copiarForm');
    console.log(codigoACopiar)
    var seleccion = document.createRange();
    seleccion.selectNodeContents(codigoACopiar);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(seleccion);
    var res = document.execCommand('copy');
    window.getSelection().removeRange(seleccion);

    alert("Copiado al portapapeles!")

}
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







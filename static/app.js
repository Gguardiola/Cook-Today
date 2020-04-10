//seccion mi nevera
class minevera {

    //metodo selectores: este method llama a la lista ingredientes_list que contiene todos los ingredientes.
    selectores(ingredientes_list_const) {
        /*
        declaramos la constante contenedorSelectores que recoge:
                        
        
        <div id="selectores">
        </div>

        del index.html. en est div va a crear un elemento form a través de la constante autoSelector.
        */
        const contenedorSelectores = document.getElementById("selectores");
        const autoSelector = document.createElement('form');
        //a la constante autoSelector que es el formulario, le añadimos atributo id form-selector
        autoSelector.setAttribute("id","form-selector");        
        //recorremos un bucle for mientras i sea menor o igual que la longitud de la lista de ingredientes.
        for (var i = 0; i <= ingredientes_list_const.length -1; i++){
            //a autoSelector que es el elemento form le inyectamos el HTML de la lista por cada step del bucle.
            autoSelector.innerHTML += `
            <label style="margin:2px" class="mdl-chip"  onclick="ingrediente_click('${ingredientes_list_const[i]}')"; name="ingrediente_checkbox" for="${ingredientes_list_const[i]}">
                <input style="visibility: hidden" type="checkbox" id="${ingredientes_list_const[i]}" class="mdl-checkbox__input">
                <span style="font-size:17px;font-family:roboto;margin-left:-23px;margin-top:-5px" class="mdl-chip__text">${ingredientes_list_const[i]}</span>
            </label>
            `;

        }      
        //despues del bucle añadimos al div selectores el hijo autoSelector que es el form
        contenedorSelectores.appendChild(autoSelector);
    }
    // este metodo se encarga de controlar el flujo del resultado de los selectores. Se llama con la variable ingredientes_checked.
    // INGREDIENTES_CHECKED = esta variable se rellena con los ingredientes marcados por el usuario a través del evento DOM sobre los selectores del metetodo
    //selectores()
    mostrar_seleccionados(ingredientes_checked_split){
        /*
        se declara la constante contenedorResultado que recoge el div donde se van a printear o se han printeado los ingredientes_checked:
                
                <div id='resultado'>
                </div>  
        

        */
        const contenedorResultado = document.getElementById("resultado");   
        //COMPROBADOR DE SI YA SE HA MOSTRADO UNA SELECCION DE INGREDIENTES
        //crea la constante comprobadorResultado que recoge el numero de hijos que tiene el div resultado (contenedorResultado)
        const comprobadorResultado = contenedorResultado.childElementCount;
        //si comprobadorResultado cuenta que tiene mas de 0 hijos significa que el usuario ya ha buscado algo anteriormente
        // y por lo tanto hay que borrar para que vuelva a escribir.
        if (comprobadorResultado > 0){
            /*
            se declara la variable borrador que recoge ingrediente_result, que son los ingredientes mostrados por pantalla. Tienen la siguiente
            estructura:

                <div id='resultado'>
                    <p id="ingredient_result">ingrediente</p>
                    <p id="ingredient_result">ingrediente</p>
                    <p id="ingredient_result">ingrediente</p>
                </div>

            */
            var borrador = document.getElementById("ingrediente_result");
            //del div con id resultado, va a borrar los hijos con el id ingrediente_result
            contenedorResultado.removeChild(borrador);
            
        }

        //tanto si borra como si no, va a crear el parrafo con el atributo id ingrediente_result con la constante muestraResultado
        //este parrafo va a tener la variable ingredientes_checked que es la lista de ingredientes marcadas por el usuario (explicado en el apartado DOM)

        //ingredientes_checked_split.pop("")  

        const muestraResultado = document.createElement('div');
        muestraResultado.setAttribute("id", "ingrediente_result");
        for (var i = 0; i <= ingredientes_checked_split.length -1; i++){
            muestraResultado.innerHTML += `
            <span onclick="ingrediente_delete('${ingredientes_checked_split[i]}')"class="mdl-chip mdl-chip--deletable">
                <span style="font-size:17px;font-family:roboto" class="mdl-chip__text">${ingredientes_checked_split[i]}</span>
                <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
            </span>
            `;
        }
        //a contenedorResultado le añadimos le hijo muestraResultado que es el <p> con la los ingredientes con id ingrediente_result
        contenedorResultado.appendChild(muestraResultado);

    
    }

    mostrar_comidas(ingredientes_checked,comidas){
        var mostrar_comidas_final = []
        //var comidas_sinorden = []
        //var contador_orden = []
        console.log("agregar")

        for (var i = 0;i <= comidas.length -1;i++){
            var cont_coincidencias = 0
            for (var x=0;x <= ingredientes_checked.length -1;x++){
                if (comidas[i].ingredientes.includes(ingredientes_checked[x])){
                    cont_coincidencias += 1

                }

            }
            if (cont_coincidencias >0){
            //if (cont_coincidencias >= comidas[i].ingredientes.length / 2){
                mostrar_comidas_final.push(comidas[i].nombre)

            }
            var cont_coincidencias = 0
        }
        
        const contenedorResultadoComidas = document.getElementById("resultado-comida");
        contenedorResultadoComidas.innerHTML = ""


        const contenedorComidaFicha = document.getElementById("resultado-comida"); 
        const ComidaFicha = document.createElement('div');
        ComidaFicha.setAttribute("class","mdl-grid")
        ComidaFicha.setAttribute("id", "resultado-comida-container");
        
        var ingredienteComidas = []
        for (var i = 0; i <= mostrar_comidas_final.length -1; i++){
            
            for (var x = 0; x < comidas.length;x++ ){
                if (comidas[x].nombre.includes(mostrar_comidas_final[i])){
                    
                    ingredienteComidas.push(comidas[x].ingredientes)
                    console.log(ingredienteComidas)
                }
            }
        }
        const comidaFichaTitle = document.createElement('h4');
        comidaFichaTitle.innerHTML = `Hoy puedes hacer de comer:`
        contenedorComidaFicha.appendChild(comidaFichaTitle)

        for (var i = 0; i <= mostrar_comidas_final.length -1; i++){

            ComidaFicha.innerHTML += `
            <div id = "comida-ficha-container" class="mdl-mdl-cell mdl-cell--6-col demo-card-wide mdl-card mdl-shadow--2dp" >
            <div id="comida-ficha" class="mdl-card__title">
                <h2 style="overflow-wrap: anywhere;" class="mdl-card__title-text">${mostrar_comidas_final[i]}</h2>
            </div>
            <div id ="desc" style = "font-size:16px;  text-align: justify;text-justify: inter-word;" class="mdl-card__supporting-text">imagen</div>
            <div class="mdl-card__actions mdl-card--border">
            <a  onclick="popupingredientes('${ingredienteComidas[i]}',${i})" id="show-dialog" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Ver ingredientes
            </a>
            </div>
            <div class="mdl-card__menu"> 
              <button id ="copiar-boton" class="mdl-button mdl-button--icon mdl-js-button" onclick = "addFavoritos(${i})" type="button"><i class='material-icons'>star</i></button>
              <div  id = "copiar-boton-container" class="mdl-js-snackbar mdl-snackbar">
                <div class="mdl-snackbar__text"></div>
                <button class="mdl-snackbar__action " type="button"></button>
              </div>   
            </div>             
            </div> 

            <dialog id="ingredientespopup_id" class="mdl-dialog">
            <h4 align=center>Ingredientes:</h4>
            <div class="mdl-dialog__content">
              <p id="ingredientesFichaContainer" class="mdl-cell mdl-cell--1-col demo-card-wide mdl-card mdl-shadow--2dp" style="border-top: 2px solid #8bc34a;border-bottom: 2px solid #8bc34a;overflow: hidden;overflow-y:scroll;overflow-x:hidden;width:250px;height:110px;margin-left:-5%">
            
              </p>
            </div>
            <div align=center class="mdl-dialog__actions">
              <button type="button" class="mdl-button close">Cerrar</button>
            </div>
          </dialog>            


            <p id="addfavoritosLabel" name="${mostrar_comidas_final[i]}" style="color:white">${mostrar_comidas_final[i]}</p>   
            
            <dialog id="addfavoritosDialog" class="mdl-dialog">
            <h4 align=center>Añadido a favoritos!</h4>
            <div  class="mdl-dialog__actions">
              <button align=center type="button" class="mdl-button close">Cerrar</button>
            </div>
          </dialog>      

            </div>
            `;
        }
        contenedorComidaFicha.appendChild(ComidaFicha);

        console.log(mostrar_comidas_final)
        
        
    }
   
 
}

////APARTADO DOM////
//WIP

var l = localStorage
favoritosCheck = l.getItem("favoritos")

if (favoritosCheck == null){
    l.setItem("favoritos", JSON.stringify([]))
}
//lista que tiene todos los ingredientes. Esto necesita mas desarrollo porque tiene que pasarse por python webscrapping
var ingredientes_list_const = []

for (var i = 0;i <= comidas.length -1;i++){
    var ingredientes_append = comidas[i].ingredientes

    for (var x = 0; x <= ingredientes_append.length -1;x++){
        if (ingredientes_list_const.includes(ingredientes_append[x])){
                //pass
        } 
        else{
            ingredientes_list_const.push(ingredientes_append[x])
        }
    }
    console.log(ingredientes_list_const)
}



ingredientes_list = ingredientes_list_const.slice()
 

//hace una nueva clase
const ui = new minevera();

//llama al metodo selectores con la lista de ingredientes para que nos haga los selectores checkbox
ui.selectores(ingredientes_list_const);


////BORRADOR////
/*selecciona el elemento con id borrador:
        
        <form id="borrador">
            <input type='submit' value='Limpiar'>
        </form>

añade el eventoListener(esucha constantemente que se producza un event) cuando el evento sea submit,
va a ejecutar una funcion con el evento (e).


*/
document.getElementById('borrador').addEventListener('submit',function(e){

    /*recoge el div con el id resultado:
        
        <div id='resultado'>
            <p id="ingredient_result">ingrediente</p>
            <p id="ingredient_result">ingrediente</p>
            <p id="ingredient_result">ingrediente</p>
        </div>

    y sustituye el html de entro por una string vacia.

    */

    document.getElementById('resultado').innerHTML = "";
    //declara variable uncheckList que es igual a cada elemento <p> que tiene el name="ingredient_checkbox"
    //var uncheckList = document.getElementsByName('ingrediente_checkbox');
    //recorremos un bucle for que mientras i sea menor que la longitud del total de elementos <p>
//    for (var i = 0;i < uncheckList.length; i++){
  //      //pasamos cada elemento a false
   //     uncheckList[i].classList.remove('is-checked')

    //}
    //limpiamos la lista de ingredientes seleccionados
    ingredientes_checked = []
    const contenedorSelectores = document.getElementById("form-selector");
    contenedorSelectores.remove("form-selector")
    contenedorSelectores.innerHTML = ""

    const contenedorBuscador = document.getElementById("indexof");
    contenedorBuscador.value = ""

    const contenedorBuscadorDiv = document.getElementById("container-buscador");
    contenedorBuscadorDiv.classList.remove("is-dirty")

    const contenedorResultadoComidas = document.getElementById("resultado-comida");
    contenedorResultadoComidas.innerHTML = ""


    ingredientes_list = ingredientes_list_const.slice()
    ui.selectores(ingredientes_list_const);
    e.preventDefault(); 
    //evitamos que el evento submit se comporte por defecto (es decir, que haga reload de la pagina)
})

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
        <span style="font-size:17px;font-family:roboto;margin-left:-19px" class="mdl-chip__text">${ingrediente_aborrar}</span>
    `;
    ingredientes_list.unshift(ingrediente_aborrar)
    contenedorSelectores_renew.appendChild(autoSelector_renew);
}

function popupingredientes(ingredienteComidas,indice){
    var ingredientesActualpopup = ingredienteComidas.split(",")
    console.log(ingredientesActualpopup)
    const ingredientesContainer = document.querySelectorAll("#ingredientesFichaContainer").item(indice)
    ingredientesActualMostrar = document.createElement("ul")
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

    var dialog = document.querySelectorAll('#ingredientespopup_id').item(indice);
    console.log(dialog)
    var showDialogButton = document.querySelectorAll('#show-dialog').item(indice);
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    
    dialog.querySelector('.close').addEventListener('click', function(e) {
      dialog.close();
      e.preventDefault()
    });


}


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
        favoritosParse = JSON.parse(l.getItem("favoritos"))
        console.log(favoritosParse)
    

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

/////BOTON AÑADIR/////
/*
Recoge el elemento form con id add que contiene los inputs con los que va a interactuar el usuario

                <form id="add">
                  <input type='text' id="indexof">
                  <input type='submit' value='Añadir'>
                </form>

recoge el evento submit al cual se le da una función cuando es ejecutado.
La función recoge cada elemento checked y la guarda en una string
*/ 
document.getElementById('buscar').addEventListener('click',function(e){

    ui.mostrar_comidas(ingredientes_checked,comidas)
    //e.preventDefault()

});

//declara la variable ingredientes_checked vacia 
var ingredientes_checked = [];
//declara constante buscador que contiene el elemento con el id=indexof.

////BUSCADOR EN TIEMPO REAL////
//con esto, no hace falta ir directamente al parent para añadir al child (getElementById, appendchild...)
const buscador = document.querySelector('#indexof');
/*
indexof en html:

                <form id="add">
                  <input type='text' id="indexof">
                  <input type='submit' value='Añadir'>
                </form>



*/

//sobre buscador(elemento html con el id indexof) va a escuchar el evento "keyup", es decir, cada vez que el usuario introduzca una tecla en el input text
//al cual va a ejecutar una funcion.
buscador.addEventListener('keyup',function(e){
    //declara la constante contenedorSelectores con el elemento con id form-selector.
    //que es el elemento html con todas las checksbox de los ingredientes generados por ui.selectores.
    const contenedorSelectores = document.getElementById("form-selector");
    /*
    contenedorSelectores en HTML despues de haberse generado por ui.selectores:


        <form id="form-selector">
            <input type="checkbox" id="ingrediente_checkbox" name="ingrediente_checkbox" value="aceite de oliva">
            <label for="aceite de oliva">aceite de oliva</label><br>
            
            
            <input type="checkbox" id="ingrediente_checkbox" name="ingrediente_checkbox" value="espinacas">
            <label for="espinacas">espinacas</label><br>
        </form>

     */

    //cuando se introduce algo para buscar, se borra todo el form-selector para dejar solo las checkboxes que coincidan
    contenedorSelectores.innerHTML = '';
    //recogemos el valor que se introduce en el input text y lo pasamos a minusculas
    const ingrediente_buscado = buscador.value.toLowerCase();
    //recorremos con un bucle mientras i sea igual o menor a la longitud de la lista de ingredientes
    for (var i = 0; i <= ingredientes_list.length -1; i++){
        //comprobamos por cada ingrediente de la lista si contiene una letra o una combinacion de letras con lo introducido por el usuario. si coincide devuelve -1
        ingrediente_select = ingredientes_list[i].toLowerCase();
        if (ingrediente_select.indexOf(ingrediente_buscado)!== -1){
            //imprimimos y sumamos al formulario
            contenedorSelectores.innerHTML += `
            <label class="mdl-chip" onclick="ingrediente_click('${ingredientes_list[i]}')"; name="ingrediente_checkbox" for="${ingredientes_list[i]}">            
                <input style="visibility: hidden" type="checkbox" id="${ingredientes_list[i]}" class="mdl-checkbox__input">
                <span style="font-size:17px;font-family:roboto;margin-left:-23px;margin-top:-5px" class="mdl-chip__text" class="mdl-chip__text">${ingredientes_list[i]}</span>
            </label>
            
            `;

        }

    }
})




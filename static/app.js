//WIP

//declaramos l como localStorage para acceder a el mas facil (escribir l es mejor que localStorage todo el rato)
var l = localStorage

//l.setItem("firstTimeCheck",JSON.stringify(true))

var firstTimeCheck = JSON.parse(l.getItem("firstTimeCheck"))
if (firstTimeCheck == null){

        privacyDialogFIRST()


}

//declaramos favoritosCheck y recogemos como valor la lista de favoritos guardada en local
var favoritosCheck = l.getItem("favoritos")

//si favoritosCheck es Null, significa que no existe la key de favoritos.
//por lo tanto, va a crear la key con una lista vacia
if (favoritosCheck == null){
    l.setItem("favoritos", JSON.stringify([]))
}

//al cargar la pagina va a crear las keys siguientes en local con listas vacias.
//de este modo reiniciamos las listas para que no se sumen a los nuevos resultados cuando carguen.
l.setItem("mostrar_comidas_finalSave",JSON.stringify([]))
l.setItem("ingredienteComidasSave",JSON.stringify([]))
l.setItem("faltanIngredientesCheckSave",JSON.stringify([]))
l.setItem("selectores_load",JSON.stringify(0))
l.setItem("despensa_load",JSON.stringify(0))
l.setItem("despensa_break",false)
l.setItem("categoriaActual","startup")
l.setItem("eclecnas",JSON.stringify(0))
//al iniciar el programa genera la variable con lista vacia donde van a ir los ingredientes.
//esta lista la va a rellenar a partir del JSON dentro de comidas.js
//realmente diria que mas que JSON simplemente es un objeto con listas pero vamos a llamarlo JSON
var ingredientes_list_const = []

//BUCLE QUE RECOGE LOS INGREDIENTES//

//esto lo remarco porque es importante.
//este bucle recorre cada comida dentro de comidas.js (dentro hay una variable comidas con cada elemento/comida)
for (var i = 0;i <= comidas.length -1;i++){
    //ingrediente_append recoge por cada ciclo del for de arriba los ingredientes de la comida
    var ingredientes_append = comidas[i].ingredientes
    //dentro de este bucle reocorre cada ingrediente y lo mete en la lista de ingredientes totales (esta lista es la que se va a usar para mostrar los selectores)
    for (var x = 0; x <= ingredientes_append.length -1;x++){
        //si el ingrediente ya esta, no lo introduce
        if (ingredientes_list_const.includes(ingredientes_append[x])){
                //pass
        }
        else if(ingredientes_append[x] == undefined){
            console.log("undefined!")
            //console.log(ingredientes_append[x])
            //pass
            
        }
        else{
            ingredientes_list_const.push(ingredientes_append[x])
        }
    }
    //console.log(ingredientes_list_const)
}


//replicamos la lista de ingredientes a ingredientes_list porque esta la va a necesitar la función ingredintes_click para comprobar cada ingrediente que hacemos click
//mas detalles en onclick_functions.js ingrediente_click()
var ingredientes_list = ingredientes_list_const.slice()
 

//hacemos la clase minevera();
const ui = new minevera();

//llama al metodo selectores con la lista de ingredientes para que nos haga los selectores checkbox
//llamamos al metodo selectores y le pasamos la lista principal con todos los ingredientes sacados de comidas.js
//mas detalles en app_classes.js minevera.selectores
ui.selectores(ingredientes_list_const);


const fav = new favoritos;

fav.mostrar_favoritos(true)

const comdia = new comidaDia;

comdia.generarFicha()
comdia.generarConsejos()

const des = new despensa;


////APARTADO DOM////







//declara la variable ingredientes_checked vacia.
//en esta variable se van a guardar los ingredientes que el usuario haga click y posteriormente se van a pasar a ui.mostrar_seleccionados para meterlo dentro de el div id=resultado como etiqueta borrable
//mas detalles en app_classes.js minevera.mostrar_seleccionados

//tambien se va a pasar a ui.mostrar_comidas para buscar las comidas que tengan los ingredientes seleccionados
//mas detalles en app_classes.ks minevera.mostrar_comidas
var ingredientes_checked = [];



////BUSCADOR EN TIEMPO REAL////
//declara constante buscador que contiene el elemento con el id=indexof.
// recogemos el elemento #indexof que es el input donde el usuario va a introducir los ingredientes
const buscador = document.querySelector('#indexof');

buscador.addEventListener('keyup',function(e){
    var borrarBoton = document.getElementById("clearIndex")

    borrarBoton.style.visibility = "visible"
    console.log(buscador.value.length)
    if(buscador.value.length == 0){
        var borrarBoton = document.getElementById("clearIndex")

        borrarBoton.style.visibility = "hidden"
    }

})
/*
indexof en html:

                <form id="add">
                  <input type='text' id="indexof">
                  <input type='submit' value='Añadir'>
                </form>



*/

//sobre buscador(elemento html con el id indexof) va a escuchar el evento "keyup", es decir, cada vez que el usuario introduzca una tecla en el input text
//al cual va a ejecutar una funcion.

document.getElementById("ingredienteSearch").addEventListener("click",function(e){
    
    l.setItem("bloquearScroll",false)
    //document.getElementById("loadspinner").style.visibility = "visible"

    //declara la constante contenedorSelectores con el elemento con id form-selector.
    //que es el elemento html con todas las checksbox de los ingredientes generados por ui.selectores.
    const contenedorSelectoresClean = document.getElementById("selectores");
    contenedorSelectoresClean.innerHTML = ""
    document.getElementById("selectores").scrollTop = 0
    l.setItem("selectores_load",JSON.stringify(0))
    ui.selectores(ingredientes_list_const);

    

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

    //cuando se introduce algo para buscar, se borra todo el form-selector generado por ui.selectores para generar desde aqui SOLO las que coincidan con lo introducido en el input de #indexof
    contenedorSelectores.innerHTML = '';
    //recogemos el valor que se introduce en el input text y lo pasamos a minusculas
    const ingrediente_buscado = buscador.value.toLowerCase();

    //recorremos la lista de ingredientes que habiamos duplicado de ingredientes_list_const en busca de ingredientes que coincidan
    
    if(buscador.value.length > 0){

    
        var listaIngredientes = ingredientes_list.filter(ingrediente => ingrediente.indexOf(ingrediente_buscado) !== -1)
        //contenedorSelectores.innerHTML = '';
        listaIngredientes.forEach(function(ingrediente) {
            contenedorSelectores.innerHTML += `
            <label id="ingrediente_check" class="mdl-chip" onclick="ingrediente_click('${ingrediente}')"; name="ingrediente_checkbox" for="${ingrediente}">            
                <input style="visibility: hidden" type="checkbox" id="${ingrediente}" class="mdl-checkbox__input">
                <span style="font-size:17px;font-family:roboto;margin-left:-23px;margin-top:-5px" class="mdl-chip__text" class="mdl-chip__text">${ingrediente}</span>
            </label>
        
            `;
        });        
        /*for (var i = 0; i <= ingredientes_list.length -1; i++){
            //comprobamos por cada ingrediente de la lista si contiene una letra o una combinacion de letras con lo introducido por el usuario. si coincide devuelve -1
            ingrediente_select = ingredientes_list[i].toLowerCase();
            //indexOf devuelve -1 si algo no coincide, se puede decir que es como un False. Por lo tanto si no da -1 significa que hay coincidencias
            if (ingrediente_select.indexOf(ingrediente_buscado)!== -1){
                //imprimimos y sumamos al formulario


                contenedorSelectores.innerHTML += `
                <label id="ingrediente_check" class="mdl-chip" onclick="ingrediente_click('${ingredientes_list[i]}')"; name="ingrediente_checkbox" for="${ingredientes_list[i]}">            
                    <input style="visibility: hidden" type="checkbox" id="${ingredientes_list[i]}" class="mdl-checkbox__input">
                    <span style="font-size:17px;font-family:roboto;margin-left:-23px;margin-top:-5px" class="mdl-chip__text" class="mdl-chip__text">${ingredientes_list[i]}</span>
                </label>
                
                `;


            }

        }*/
    }
    else{
        for (var i = 0; i <= 49; i++){
            l.setItem("bloquearScroll",true)
            //comprobamos por cada ingrediente de la lista si contiene una letra o una combinacion de letras con lo introducido por el usuario. si coincide devuelve -1
            ingrediente_select = ingredientes_list[i].toLowerCase();
            //indexOf devuelve -1 si algo no coincide, se puede decir que es como un False. Por lo tanto si no da -1 significa que hay coincidencias
            if (ingrediente_select.indexOf(ingrediente_buscado)!== -1){
                //imprimimos y sumamos al formulario


                contenedorSelectores.innerHTML += `
                <label id="ingrediente_check" class="mdl-chip" onclick="ingrediente_click('${ingredientes_list[i]}')"; name="ingrediente_checkbox" for="${ingredientes_list[i]}">            
                    <input style="visibility: hidden" type="checkbox" id="${ingredientes_list[i]}" class="mdl-checkbox__input">
                    <span style="font-size:17px;font-family:roboto;margin-left:-23px;margin-top:-5px" class="mdl-chip__text" class="mdl-chip__text">${ingredientes_list[i]}</span>
                </label>
                
                `;


            }

        }       

    }
    //hideSpinner()
    
})

/////BOTON AÑADIR/////

//ejecuta el metodo de minevera mostrar_comidas cuando se hace click sobre el botón con id buscar
document.getElementById('buscar').addEventListener('click',function(e){

    //escondemos el boton de cargar más
    document.getElementById("loadMore").style.visibility = "hidden"
    //contenedorResultadoComidas.style.marginTop = "0px"
    document.getElementById("loadMore").style.height = "0px"
    document.getElementById("loadMoreContainer").style.height = "0px"    
    //este metodo va a recoger los ingredientes seleccionados y va a ver los que coinciden.
    //despues los va a mostrar por fichas.
    //este metodo recoge ingredientes_checked (explicado anteriormente)
    //la variable comidas que es el objeto "JSON" con las comidas
    // y false: este false va a determinar y se le ha dado al botón "cargar más"
    //estando en false quiere decir que no se ha hecho click y por lo tanto va a generar todo desde 0
    //en caso de estar true se saltaria la parte de generar listas ya que va a cargar mas fichas desde cierto punto

    ui.mostrar_comidas(ingredientes_checked,comidas,false)
    //e.preventDefault()

});

////BORRADOR////

//cuando se hace click en el botón con id borrador ejecuta una función
//esta funcion va a borrar ciertos elementos dentro del HTML, va a reinciar keys de localstorage
// y va a cambiar unos elementos del css sobre etiquetas

document.getElementById('borrador').addEventListener('click',function(e){


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
    l.setItem("bloquearScroll",true)
    //escondemos el boton de cargar más
    document.getElementById("loadMore").style.visibility = "hidden"
    //contenedorResultadoComidas.style.marginTop = "0px"
    document.getElementById("loadMore").style.height = "0px"
    document.getElementById("loadMoreContainer").style.height = "0px"

    //volvemos a duplicar ingredientes_list de la lista original
    ingredientes_list = ingredientes_list_const.slice()

    //llamamos al metodo selectores para que vuelva a generar las etiquetas con ingredientes
    ui.selectores(ingredientes_list_const);
    e.preventDefault(); 
    //evitamos que el evento submit se comporte por defecto (es decir, que haga reload de la pagina)
})

//si se hace click a "cargar más" va a llamar al metodo mostrar_comidas PERO como -
// se ha llamado con el parametro True, va a saltarse la parte de creación de las listas y los ingredientes y -
//va pasar directamente a crear las fichas a partir de los 10 primeros que ya tiene cargados
//mas detalles en app_classes minevera.mostrar_comidas
document.getElementById("loadMoreContainer").addEventListener("click",function(e){

    ui.mostrar_comidas(ingredientes_checked,comidas,true)


})



var containerEtiquetas = document.querySelector('#container_ingredientes');

// Detect when scrolled to bottom.
containerEtiquetas.addEventListener('scroll', function() {
  if (containerEtiquetas.scrollTop + containerEtiquetas.clientHeight >= containerEtiquetas.scrollHeight) {
    var bloquearScroll = JSON.parse(l.getItem("bloquearScroll"))
    console.log(bloquearScroll)
    if(bloquearScroll == true){
        console.log("aa")
        ui.selectores(ingredientes_list_const)

    }

  }
});




var containerDespensa = document.querySelector('#despensa-list');

// Detect when scrolled to bottom.
containerDespensa.addEventListener('scroll', function() {
  var categoriaActual = l.getItem("categoriaActual")
  if (containerDespensa.scrollTop + containerDespensa.clientHeight >= containerDespensa.scrollHeight) {
    des.mostrar_categoria(categoriaActual)
  }
});





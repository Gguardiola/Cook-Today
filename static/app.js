//seccion mi nevera
class minevera {
    //metodo selectores: este method llama a la lista ingredientes_list que contiene todos los ingredientes.
    selectores(ingredientes_list) {
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
        for (var i = 0; i <= ingredientes_list.length -1; i++){
            //a autoSelector que es el elemento form le inyectamos el HTML de la lista por cada step del bucle.
            autoSelector.innerHTML += `
            <label class="mdl-chip" name="ingrediente_checkbox" for="${ingredientes_list[i]}">
                <input style="visibility: hidden" type="checkbox" id="${ingredientes_list[i]}" class="mdl-checkbox__input">
                <span style="font-size:17px;font-family:roboto;margin-left:-17px" class="mdl-chip__text">${ingredientes_list[i]}</span>
            </label>
            `;

        }      
        //despues del bucle añadimos al div selectores el hijo autoSelector que es el form
        contenedorSelectores.appendChild(autoSelector);
    }
    // este metodo se encarga de controlar el flujo del resultado de los selectores. Se llama con la variable ingredientes_checked.
    // INGREDIENTES_CHECKED = esta variable se rellena con los ingredientes marcados por el usuario a través del evento DOM sobre los selectores del metetodo
    //selectores()
    mostrar_seleccionados(ingredientes_checked){
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
        const muestraResultado = document.createElement('p');
        muestraResultado.setAttribute("id", "ingrediente_result");
        muestraResultado.innerHTML = ingredientes_checked;
        //a contenedorResultado le añadimos le hijo muestraResultado que es el <p> con la los ingredientes con id ingrediente_result
        contenedorResultado.appendChild(muestraResultado);

    
    }
   
 
}

////APARTADO DOM////
//WIP
//lista que tiene todos los ingredientes. Esto necesita mas desarrollo porque tiene que pasarse por python webscrapping
ingredientes_list = ['Aceite de oliva','Espinacas','Berengena','Pepino','Garbanzos','Aceite de oliva','Espinacas','Berengena','Pepino','Garbanzos','Aceite de oliva','Espinacas','Berengena','Pepino','Garbanzos','Aceite de oliva','Espinacas','Berengena','Pepino','Garbanzos',
'Aceite de oliva','Espinacas','Berengena','Pepino','Garbanzos','Aceite de oliva','Espinacas','Berengena','Pepino','Garbanzos'




]

//hace una nueva clase
const ui = new minevera();

//llama al metodo selectores con la lista de ingredientes para que nos haga los selectores checkbox
ui.selectores(ingredientes_list);

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
    ingredientes_checked = ""
    const contenedorSelectores = document.getElementById("form-selector");
    contenedorSelectores.remove("form-selector")
    contenedorSelectores.innerHTML = ""
    ui.selectores(ingredientes_list);
    e.preventDefault(); 
    //evitamos que el evento submit se comporte por defecto (es decir, que haga reload de la pagina)
})



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
document.getElementById('agregar').addEventListener('submit',function(e){
    //declara la variable ingrediente que es igual al formulario del documento (ingredientes checkbox)
    //IMPORTANTE: el numero index determina el elemento formulario orden si hay 3 forms en el html seria 0,1,2
    var ingrediente = document.forms[3];
    //iniciamos bucle que mientras i sea menor a la longitud de los ingredientes checkbox
    for (var i = 0; i < ingrediente.length; i++) {
    // si el ingrediente esta checked, devuelve true. 

      if (ingrediente[i].checked) {

         //si la lista de ingredientes_checked (si existe) tiene ya el mismo ingrediente, no lo agrega
        if (ingredientes_checked.includes(ingrediente[i].id)){
           //pass 

        }
        //si de lo contrario no lo tiene, añade a la variable ingredientes_checked el nuevo ingrediente
        else{
            ingredientes_checked = ingredientes_checked + ingrediente[i].id + " ";
  
            
        }
      }
    }
    //por ultimo llama al metodo mostrar_seleccionados para mostrarlo por pantalla
    ui.mostrar_seleccionados(ingredientes_checked);
    //de nuevo evita que el evento sea natural y no haga reload al darle al submit
    e.preventDefault();

});

//declara la variable ingredientes_checked vacia 
var ingredientes_checked = "";
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
            <label class="mdl-chip" name="ingrediente_checkbox" for="${ingredientes_list[i]}">            
                <input style="visibility: hidden" type="checkbox" id="${ingredientes_list[i]}" class="mdl-checkbox__input">
                <span style="font-size:17px;font-family:roboto;margin-left:-17px" class="mdl-chip__text" class="mdl-chip__text">${ingredientes_list[i]}</span>
            </label>
            
            `;

        }

    }
})







class comidaDia {

    generarFicha(){
        var mostrar_comidas_final = []
        for (var i = 0; i <= comidas.length -1; i++){
            mostrar_comidas_final.push(comidas[i].nombre)
        }
        var dia_hoy = JSON.parse(l.getItem("dia_hoy"))
        console.log(dia_hoy)

        if (dia_hoy == null){
            var d = new Date()
            var n = d.getDate()
            l.setItem("dia_hoy",JSON.stringify(0))
        }
        
        var dia_hoy = JSON.parse(l.getItem("dia_hoy"))
        var d2 = new Date()
        var cambioDiaCheck = d2.getDate() 

        if (dia_hoy == cambioDiaCheck){
            console.log("mismo dia")
            console.log(ComidaDeldia)
        }
        
        else{
            var nuevaComidadeldiaRandom = Math.floor((Math.random() * mostrar_comidas_final.length) + 1);

            var ComidaDeldia = comidas[nuevaComidadeldiaRandom].nombre
            console.log(ComidaDeldia)

            l.setItem("comidaDelDia",ComidaDeldia)
            l.setItem("dia_hoy",cambioDiaCheck)

        }

        var ComidaDelDiaDefinitiva = l.getItem("comidaDelDia")
        
        const contenedorComidaDiaFicha = document.getElementById("container_comidaDia");         
        const ComidaDiaFicha = document.createElement('div');
        ComidaDiaFicha.setAttribute("id", "resultado-comida-dia");
        
        ComidaDiaFicha.innerHTML += `<br>
        <div align=left style="margin-left:2%;" id = "comidaDia-ficha-container" class="mdl-mdl-cell mdl-cell--6-col demo-card-wide mdl-card" >
        <div id="comidaDia-ficha" class="mdl-card__title">
            <h4 style="margin-top:40px;overflow-wrap: anywhere;opacity:0.6" >${ComidaDelDiaDefinitiva}</h4>
        </div>
        <div id ="descDia" style = "font-size:16px;text-align: justify;text-justify: inter-word;" class="mdl-card__supporting-text">imagen</div>
        <div style="background-color:#779f3e;border-top:2px solid #779f3e" class="mdl-card__actions mdl-card--border">
        <a  style="display:inline;color:#464942;" onclick="popupingredientesDia('${ComidaDelDiaDefinitiva}')"  id="show-dialog" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Ver ingredientes
        </a>
        </div>
        <div class="mdl-card__menu"> 
        <button id ="copiar-botonDia" class="mdl-button mdl-button--icon mdl-js-button" onclick = "addFavoritosDia()" type="button"><i class='material-icons'>star</i></button>
        <div  id = "copiar-botonDia-container" class="mdl-js-snackbar mdl-snackbar">
            <div class="mdl-snackbar__text"></div>
            <button class="mdl-snackbar__action " type="button"></button>
        </div>   
        </div>             
        </div> 

        <dialog id="ingredientespopup_idDia" class="mdl-dialog">
        <h4 id ="ingredientesDialogTitleDia" style="color:#616161" align=center>Ingredientes</h4>
        <div id="dialogContainerDia" class="mdl-dialog__content">
        <p id="ingredientesFichaContainerDia" class="mdl-cell mdl-cell--1-col demo-card-wide mdl-card mdl-shadow--2dp" style="border-top: 2px solid #8bc34a;border-bottom: 2px solid #8bc34a;overflow: hidden;overflow-y:scroll;overflow-x:hidden;width:250px;height:110px;margin-left:-5%"></p>
        </div>
        <div align=center class="mdl-dialog__actions">
            <button type="button" class="mdl-button close">Cerrar</button>
        </div>
    </dialog>            


        <div style="margin-bottom:-20px" class="mdl-cell mdl-cell--6-col"><p id="addfavoritosLabelDia" name="${ComidaDelDiaDefinitiva}" style="color:#cfde47">${ComidaDelDiaDefinitiva}</p></div>
        
        <dialog id="addfavoritosDialogDia" class="mdl-dialog">
        <h5 style="color:#616161" align=center>Añadido a favoritos!</h5>
        <div style="margin-right:90px" class="mdl-dialog__actions">
        <button align=center type="button" class="mdl-button close">Cerrar</button>
        </div>
    </dialog> 
    
    <dialog id="addfavoritosDialogFailDia" class="mdl-dialog">
    <h5 style="color:#616161" align=center>Ya está en favoritos!</h5>
    
    <div style="margin-right:90px" class="mdl-dialog__actions">
        <button type="button" class="mdl-button close">Cerrar</button>
    </div>
    </dialog>            

        </div>
        `;

        contenedorComidaDiaFicha.appendChild(ComidaDiaFicha)


    }

    generarConsejos(){
        var consejos_all = []

        for (var i = 0; i <= consejos.length -1; i++){
            consejos_all.push(consejos[i].consejo)
        }
        var dia_hoy = JSON.parse(l.getItem("dia_hoyCONSEJO"))
        if (dia_hoy == null){
            var d = new Date()
            var n = d.getDate()
            l.setItem("dia_hoyCONSEJO",JSON.stringify(0))
        }
        
        var dia_hoy = JSON.parse(l.getItem("dia_hoyCONSEJO"))
        var d2 = new Date()
        var cambioDiaCheck = d2.getDate() 

        if (dia_hoy == cambioDiaCheck){
            console.log("mismo dia")
        }
        
        else{
            var consejos_list = []
            for (var i=0; i <=2; i++){

                var new_consejoRand = Math.floor((Math.random() * consejos_all.length) + 1);
                var new_consejo = consejos[new_consejoRand].consejo
                console.log(new_consejo)

                while(consejos_list.includes(new_consejo)){

                    var new_consejoRand = Math.floor((Math.random() * consejos_all.length) + 1);
    
                    var new_consejo = consejos[new_consejoRand].consejo                    

                }
                consejos_list.push(new_consejo)  
            }

            l.setItem("dia_hoyCONSEJO",cambioDiaCheck)
            l.setItem("consejosDia",JSON.stringify(consejos_list))
            
        }
        var consejos_list = JSON.parse(l.getItem("consejosDia"))
        console.log(consejos_list)  

        var consejos_desc = []
        for(var i=0; i <= consejos_list.length -1;i++){

            for(var x=0; i <= consejos.length -1;x++){
                console.log(consejos_list[i])
                console.log(consejos[x].consejo)
                if(consejos_list[i] == consejos[x].consejo){

                    consejos_desc.push(consejos[x].desc)
                    break
                }

            }


        }

        console.log(consejos_desc)

        const consejosContainer = document.getElementById("consejos-container")
        const consejosResultado = document.createElement('div');
        consejosResultado.setAttribute("class", "mdl-card__supporting-text mdl-grid mdl-grid--no-spacing");
        
        consejosResultado.innerHTML += `
            <h4 class="mdl-cell mdl-cell--12-col">Consejos diarios</h4>
            <div class="">
            </div>
            <div style="text-align:justify" class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">

            <h5 style="text-align:left">${consejos_list[0]}</h5>
            ${consejos_desc[0]}
            <br>
            <br>
        
            </div>
        
            <div class="">
            </div>
            <div style="text-align:justify" class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
            <br>

            <h5 style="text-align:left">${consejos_list[1]}</h5>
            ${consejos_desc[1]}
            <br>
            <br>
        
            </div>

            <div class="">
            </div>
            <div style="text-align:justify" class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
            <br>
            <h5 style="text-align:left">${consejos_list[2]}</h5>
            ${consejos_desc[2]}
            </div>       

        `
        consejosContainer.appendChild(consejosResultado)
    }

}





////CLASE DE LA SECCIÓN MI NEVERA////
class minevera {

    ///METODO DE CREACIÓN DE LAS ETIQUETAS DE INGREDIENTES (SELECTORES)///
    selectores(ingredientes_list_const) {
        var cargado = JSON.parse(l.getItem("selectores_load"))
        
        //recogemos el div con id selectores que es donde va a generar las etiquetas con ingredientes
        const contenedorSelectores = document.getElementById("selectores");
        //creamos el elemento form que es donde va a generar los ingredientes
        const autoSelector = document.createElement('form');
        //a la constante autoSelector que es el formulario, le añadimos atributo id form-selector
        autoSelector.setAttribute("id","form-selector");        
        //recorremos un bucle for mientras i sea menor o igual que la longitud de la lista de ingredientes totales.
        //va a generar un HTML con cada ingrediente en forma de etiqueta
        for (var i = cargado; i <= cargado +49; i++){
           if (ingredientes_list_const[i] == undefined){

               break

            }
            
            autoSelector.innerHTML += `
            <label id="ingrediente_check" style="margin:2px" class="mdl-chip"  onclick="ingrediente_click('${ingredientes_list_const[i]}')"; name="ingrediente_checkbox" for="${ingredientes_list_const[i]}">
                <input style="visibility: hidden" type="checkbox" id="${ingredientes_list_const[i]}" class="mdl-checkbox__input">
                <span style="font-size:17px;font-family:roboto;margin-left:-23px;margin-top:-5px" class="mdl-chip__text">${ingredientes_list_const[i]}</span>
            </label>
            `;


        }      
        //una vez termina el bucle, va a insertar el html en el div con id selectores
        l.setItem("selectores_load",JSON.stringify(cargado+50))
        contenedorSelectores.appendChild(autoSelector);
    }


    ///MOSTRAR LOS INGREDIENTES SELECCIONADOS EN ETIQUETAS BORRABLES///

    //este metodo va a insertar al html los ingredientes que se han seleccionado en forma de etiqueta borrable
    //es llamado por la funcion ingrediente_delete() y ingrediente_click() 
    //mas detalles en onclick_functions.js
    mostrar_seleccionados(ingredientes_checked_split){

        //se recoge el div donde vamos a meter los ingredientes seleccionados
        const contenedorResultado = document.getElementById("resultado");   

        //COMPROBADOR DE SI YA SE HA MOSTRADO UNA SELECCION DE INGREDIENTES//
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


        //a cotinuación crea un div con cada ingrediente seleccionado en forma de etiqueta
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

        contenedorResultado.appendChild(muestraResultado);
        //setInterval(updateScroll,0);
    
    }


    ///MOSTRADOR DE LAS FICHAS CON LAS COMIDAS EN RELACIÓN A LOS INGREDIENTES SELECCIONADOS///

    //este metodo es el que se va a ocupar de mostrar las fichas de las comidas
    mostrar_comidas(ingredientes_checked,comidas,checkloadmore){
        //var comidas_sinorden = []
        //var contador_orden = []
        
        console.log("agregar")

        //si checkloadmore es false, significa que este metodo NO se ha llamado a traves del boton "cargar mas"
        //esto quiere decir que va a ejecutar el metodo desde 0, generando nuevas listas y mostrando las fichas de comidas desde 0
        if (checkloadmore == false){
            
            //guardamos en local storage (o reemplazamos) el numero de comidas que se han mostrado hasta ahora
            //como el checkloadmore esta en false, va a mostrar desde 0
            l.setItem("comidas_load",JSON.stringify(0))
            
            //generamos la variable con la lista de las comidas que se van a mostrar
            var mostrar_comidas_final = []
            //generamos la variable con la lista con la que se va a saber si faltan ingredientes o no
            //esta variable sirve para la busqueda avanzada, si el elemento de esta lista que corresponde al la comida esta en false, mostrará una exclamación en su ficha!
            var faltanIngredientesCheck = []
            //esta variable se pone en true cuando no hay mas elementos para cargar. Hace que el boton de "cargar mas" se ponga en hidden
            //si de entrada no hay resultados hace que no se muestre el boton
            var hiddenLoadMore = false

            
            //BUCLE IMPORTANTE!!//
            //BUSQUE QUE BUSCA LAS COMIDAS QUE COINICDEN CON LOS INGREDIENTES SELECCIONADOS!//
            //este bucle recorre cada comida del JSON comidas.
            //busca por cada lista de ingredientes de cada comida los ingredientes seleccionados
            //si algun ingrediente seleccionado esta dentro de los ingredientes de la comida, el contador de coincidencias sube
            //este contador de coincidencias sirve para determinar, dependiendo del modo de busqueda, si se va a mostrar o no
            for (var i = 0;i <= comidas.length -1;i++){
                var cont_coincidencias = 0
                for (var x=0;x <= ingredientes_checked.length -1;x++){
                    if (comidas[i].ingredientes.includes(ingredientes_checked[x])){
                        cont_coincidencias += 1

                    }

                }

            
                //if (cont_coincidencias >= comidas[i].ingredientes.length / 2){
                if (cont_coincidencias == comidas[i].ingredientes.length){
                    mostrar_comidas_final.unshift(comidas[i].nombre)

                    if (cont_coincidencias  == comidas[i].ingredientes.length){
                        faltanIngredientesCheck.unshift(true)
    
                    }
                    else {
                        faltanIngredientesCheck.unshift(false)
    
                    }
                }                        
                if (cont_coincidencias >= 3){
                    mostrar_comidas_final.push(comidas[i].nombre)

                    if (cont_coincidencias  == comidas[i].ingredientes.length){
                        faltanIngredientesCheck.push(true)
    
                    }
                    else {
                        faltanIngredientesCheck.push(false)
    
                    }
                }
                

                var cont_coincidencias = 0
            }

            //ESTA PARTE GENERA LA CABECERA DE LAS FICHAS//
            //aqui simplemente va a mostrar la cantidad de resultados que se han encontrado o si no se han encontrado ninguno
            //tambien genera el boton para volver arriba
            const contenedorResultadoComidas = document.getElementById("resultado-comida");
            contenedorResultadoComidas.innerHTML = ""
            contenedorResultadoComidas.style.marginTop = "37px"

            const contenedorComidaFicha = document.getElementById("resultado-comida"); 

            if (mostrar_comidas_final.length > 0){
                const comidaFichaTitle = document.createElement('h4');
                comidaFichaTitle.setAttribute("style","display:block;margin-bottom:30px")

                if (mostrar_comidas_final.length == 1){
                    comidaFichaTitle.innerHTML = `1 comida encontrada:<br>`

                }
                else{
                    comidaFichaTitle.innerHTML = `${mostrar_comidas_final.length} comidas encontradas:<br>`
                }
                contenedorComidaFicha.appendChild(comidaFichaTitle)
                
                const volverPrincipio = document.createElement('div');
                volverPrincipio.setAttribute("id","volverPrincipio")
                volverPrincipio.setAttribute("style","top:90%;position: -webkit-sticky;position: sticky;z-index: 2;margin-left:80%;margin-bottom:15%")
                volverPrincipio.innerHTML = `
                <a style="margin-top:-100%;background-color:#8bc34a" href="#minevera" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                <i class="material-icons">keyboard_arrow_up</i>
                </a>
                `
                
                contenedorComidaFicha.appendChild(volverPrincipio)  
            }

            else if (mostrar_comidas_final == 0){
                const comidaFichaTitle = document.createElement('h4');
                comidaFichaTitle.setAttribute("style","display:block")  
                comidaFichaTitle.innerHTML = `No hay resultados, prueba a poner más ingredientes!`
                contenedorComidaFicha.appendChild(comidaFichaTitle)
                hiddenLoadMore = true
            }
            //guarda en una key de localstorage las comidas y la lista de true o false de cada comida.
            //esto sirve para que cuando se le de a "cargar mas" este metodo pueda cargar estas listas y seguir generando fichas a partir de la ultima
            l.setItem("mostrar_comidas_finalSave",JSON.stringify(mostrar_comidas_final))
            l.setItem("faltanIngredientesCheckSave",JSON.stringify(faltanIngredientesCheck))
           // l.setItem("ingredienteComidasSave",JSON.stringify(ingredienteComidas))
            console.log(cargado)
            //console.log(loadMore)            

    
        }

        //esto crea el container donde van a ir las fichas
        const contenedorComidaFicha = document.getElementById("resultado-comida");         
        const ComidaFicha = document.createElement('div');
        ComidaFicha.setAttribute("class","mdl-grid")
        ComidaFicha.setAttribute("id", "resultado-comida-container");
        console.log(ComidaFicha)

        //aqui cargamos la comidas_load que tiene la cantidad de comidas que se han cargado.
        //si no se ha cargado ninguna estará a 0 por lo tanto las fichas se mosrtaran desde la primera
        var cargado = JSON.parse(l.getItem("comidas_load"))

        //cargamos las listas de las comidas para poder mostrarlas
        var mostrar_comidas_final = JSON.parse(l.getItem("mostrar_comidas_finalSave"))
        var faltanIngredientesCheck = JSON.parse(l.getItem("faltanIngredientesCheckSave"))
        console.log(faltanIngredientesCheck)

        //recorremos las comidas par ir generando las fichas
        if (cargado < mostrar_comidas_final.length){

            //cargado tiene 0 si es la primera vez que se ejecuta
            //si se ha hecho click en cargar más, cargado tendra un valor de 0+10 por cada vez que se le hace click

            for (var i = cargado; i <= cargado + 9; i++){
                console.log("bucle")
                //si el valor es undefined significa que no hay mas comidas. rompemos el bucle
                if (mostrar_comidas_final[i] == undefined){

                    break 

                } 
                //si la comida actual tiene como Check false, va a indicar que faltan ingredientes con la exclamacion
                if (faltanIngredientesCheck[i] == false){
                    ComidaFicha.innerHTML += `<br>
                        <div style="margin-left:2%" id = "comida-ficha-container" class="mdl-mdl-cell mdl-cell--6-col demo-card-wide mdl-card mdl-shadow--2dp" >
                        <div id="comida-ficha" class="mdl-card__title">
                            <h4 style="margin-top:40px;overflow-wrap: anywhere;opacity:0.6">${mostrar_comidas_final[i]}</h4>
                        </div>
                        <div id ="desc" style = "font-size:16px;text-align: justify;text-justify: inter-word;" class="mdl-card__supporting-text">imagen</div>
                        <div class="mdl-card__actions mdl-card--border">
                        <a  style="display:inline" onclick="popupingredientes('${ingredientes_checked}','${mostrar_comidas_final}','${mostrar_comidas_final[i]}',${i})"  id="show-dialog" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Ver ingredientes
                        <span ><i style="margin-bottom:3px;color:#d8573b" class='material-icons'>error_outline</i></span>
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
                        <h4 id ="ingredientesDialogTitle" style="color:#616161" align=center>Ingredientes</h4>
                        <div id="dialogContainer" class="mdl-dialog__content">
                        <p id="ingredientesFichaContainer" class="mdl-cell mdl-cell--1-col demo-card-wide mdl-card mdl-shadow--2dp" style="border-top: 2px solid #8bc34a;border-bottom: 2px solid #8bc34a;overflow: hidden;overflow-y:scroll;overflow-x:hidden;width:250px;height:110px;margin-left:-5%"></p>
                        </div>
                        <div align=center class="mdl-dialog__actions">
                            <button type="button" class="mdl-button close">Cerrar</button>
                        </div>
                    </dialog>            


                        <div style="margin-bottom:-20px" class="mdl-cell mdl-cell--6-col"><p id="addfavoritosLabel" name="${mostrar_comidas_final[i]}" style="color:white;">${mostrar_comidas_final[i]}</p></div>
                        
                        <dialog id="addfavoritosDialog" class="mdl-dialog">
                        <h5 style="color:#616161" align=center>Añadido a favoritos!</h5>
                        <div style="margin-right:90px" class="mdl-dialog__actions">
                        <button align=center type="button" class="mdl-button close">Cerrar</button>
                        </div>
                    </dialog> 
                    
                    <dialog id="addfavoritosDialogFail" class="mdl-dialog">
                    <h5 style="color:#616161" align=center>Ya está en favoritos!</h5>
                    
                    <div style="margin-right:90px" class="mdl-dialog__actions">
                        <button type="button" class="mdl-button close">Cerrar</button>
                    </div>
                    </dialog>            

                        </div>
                        `;
                }
                //si no faltan ingredientes, no muestra la exclamacion
                else if(faltanIngredientesCheck[i] == true){
                    ComidaFicha.innerHTML += `<br>
                        <div style="margin-left:2%" id = "comida-ficha-container" class="mdl-mdl-cell mdl-cell--6-col demo-card-wide mdl-card mdl-shadow--2dp" >
                        <div id="comida-ficha" class="mdl-card__title">
                            <h4 style="margin-top:40px;overflow-wrap: anywhere;opacity:0.6">${mostrar_comidas_final[i]}</h4>
                        </div>
                        <div id ="desc" style = "font-size:16px;text-align: justify;text-justify: inter-word;" class="mdl-card__supporting-text">imagen</div>
                        <div class="mdl-card__actions mdl-card--border">
                        <a  style="display:inline" onclick="popupingredientes('${ingredientes_checked}','${mostrar_comidas_final}','${mostrar_comidas_final[i]}',${i})"  id="show-dialog" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
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
                        <h4 id ="ingredientesDialogTitle" style="color:#616161" align=center>Ingredientes</h4>
                        <div id="dialogContainer" class="mdl-dialog__content">
                        <p id="ingredientesFichaContainer" class="mdl-cell mdl-cell--1-col demo-card-wide mdl-card mdl-shadow--2dp" style="border-top: 2px solid #8bc34a;border-bottom: 2px solid #8bc34a;overflow: hidden;overflow-y:scroll;overflow-x:hidden;width:250px;height:110px;margin-left:-5%"></p>
                        </div>
                        <div align=center class="mdl-dialog__actions">
                            <button type="button" class="mdl-button close">Cerrar</button>
                        </div>
                    </dialog>            


                        <div style="margin-bottom:-20px" class="mdl-cell mdl-cell--6-col"><p id="addfavoritosLabel" name="${mostrar_comidas_final[i]}" style="color:white;">${mostrar_comidas_final[i]}</p></div>
                        
                        <dialog id="addfavoritosDialog" class="mdl-dialog">
                        <h5 style="color:#616161" align=center>Añadido a favoritos!</h5>
                        <div style="margin-right:90px" class="mdl-dialog__actions">
                        <button align=center type="button" class="mdl-button close">Cerrar</button>
                        </div>
                    </dialog> 
                    
                    <dialog id="addfavoritosDialogFail" class="mdl-dialog">
                    <h5 style="color:#616161" align=center>Ya está en favoritos!</h5>
                    
                    <div style="margin-right:90px" class="mdl-dialog__actions">
                        <button type="button" class="mdl-button close">Cerrar</button>
                    </div>
                    </dialog>            

                        </div>
                        `;

                }
            }
            
            contenedorComidaFicha.appendChild(ComidaFicha);
        }
        //si en este punto checkloadmore es false, significa que se ha llegado hasta aqui por le boton de buscar.
        //por lo tanto va a hacer visible el boton "cargar mas"
        //va a sumar 10 a cargando para que cuando se le de al boton "cargar mas" empiece desde ahi (es decir, ya han cargado 10 de entrada, los suma y muestra otros 10 entonces ya son 20, si se le da otra vez al boton de cargar mas, suma esos 10 y asi hasta que se acabe)
        if (checkloadmore == false){

            cargado = JSON.parse(l.getItem("comidas_load"))
            l.setItem("comidas_load",JSON.stringify(cargado+10))

            //si hiddenloadmore esta en false quiere decir que hay resultados, por lo tanto hace el boton "cargar mas" visible
            if (hiddenLoadMore == false){
                document.getElementById("loadMore").style.visibility = "visible"
                document.getElementById("loadMore").style.height = "initial"
                document.getElementById("loadMoreContainer").style.height = "initial"                
            }

            //crea el boton de FEEDBACK
            const feedbackbutton = document.createElement('div');
            feedbackbutton.setAttribute("align","center")
           feedbackbutton.setAttribute("style","opacity: 0.6")
            feedbackbutton.setAttribute("class","mdl-cell mdl-cell--6-col")
            feedbackbutton.setAttribute("id","feedbackButtonContainer")
            feedbackbutton.innerHTML = `<br><a onclick='FeedbackAlert(true)' style="text-decoration:none;color:#616161">¿Crees que faltan comidas o puede haber algún error?</a>
            
            <dialog id="feedbackContainer" class="mdl-dialog">
            <h5 align=center style="color:#616161" align=center>Feedback</h5>
            <div align=left style="overflow-wrap: anywhere;" class="mdl-dialog__content">
            <p>
            Copia el enlace inferior y después pegalo en tu navegador:<br>
            <p id="copiarForm" style="width:230px;text-decotartion:underline;color:#8bc34a" ">https://docs.google.com/forms/d/1uTtiUiml_r8vMcRZYrVeU-EawoaueVtsiCV-XqSLMVc</p><br><br>            
            <p style="text-align: justify;text-justify: inter-word;">Desde este formulario, puedes sugerir comidas o bien reportar un error. También puedes contactarnos directamente a través de nuestro correo: <strong>gx3studios@gmail.com<strong></p>
            </p>
            </div>
            <div style="margin-right:90px" class="mdl-dialog__actions">
                <button type="button" class="mdl-button close">Cerrar</button>
            </div>
            </dialog>  
            
            
            `
            contenedorComidaFicha.appendChild(feedbackbutton)   
            


        }

        //si checkloadmore esta en true significa que se ha llamado el metodo desde el boton
        //en este caso seguira sumando 10 al cargado
        else if (checkloadmore == true){
            console.log("check")
            cargado = JSON.parse(l.getItem("comidas_load"))
            l.setItem("comidas_load",JSON.stringify(cargado+10))

            console.log(cargado)
            //si cargado es mayor al total de comidas, deja de mostrar el boton de cargar mas (ha llegado al final)
            if (cargado >= mostrar_comidas_final.length){
                document.getElementById("loadMore").style.visibility = "hidden"
                document.getElementById("loadMore").style.height = "0px"
                document.getElementById("loadMoreContainer").style.height = "0px"
                contenedorComidaFicha.style.marginTop = "0px"
            }

            //quitamos el feedback anterior y le insertamos el nuevo
            var removeFeedbackButton = document.getElementById("feedbackButtonContainer")
            removeFeedbackButton.parentNode.removeChild(removeFeedbackButton)


            var feedbackbutton = document.createElement('div');
            feedbackbutton.setAttribute("align","center")            
            feedbackbutton.setAttribute("style","opacity: 0.6")
            feedbackbutton.setAttribute("class","mdl-cell mdl-cell--6-col")
            feedbackbutton.setAttribute("id","feedbackButtonContainer")
            feedbackbutton.innerHTML = `<br><a onclick='FeedbackAlert(true)' style="text-decoration:none;color:#616161">¿Crees que faltan comidas o puede haber algún error?</a>
            
            <dialog id="feedbackContainer" class="mdl-dialog">
            <h5 align=center style="color:#616161" align=center>Feedback</h5>
            <div style="overflow-wrap: anywhere;" class="mdl-dialog__content">
            <p>
            Copia el enlace inferior y después pegalo en tu navegador:<br>
            <p id="copiarForm" style="width:230px;text-decotartion:underline;color:#8bc34a" >https://docs.google.com/forms/d/1uTtiUiml_r8vMcRZYrVeU-EawoaueVtsiCV-XqSLMVc</p><br><br>            
            <p style="text-align: justify;text-justify: inter-word;">Desde este formulario, puedes sugerir comidas o bien reportar un error. También puedes contactarnos directamente a través de nuestro correo: <strong>gx3studios@gmail.com<strong></p>
            </p>
            </div>
            <div style="margin-right:90px" class="mdl-dialog__actions">
                <button type="button" class="mdl-button close">Cerrar</button>
            </div>
            </dialog>  
            
            
            `
            contenedorComidaFicha.appendChild(feedbackbutton)          

        }     
        
    }
   
 
}

class favoritos {

    mostrar_favoritos(reload){
        var favoritos = JSON.parse(l.getItem("favoritos"))
        console.log(favoritos)

        if (reload == true){

            const favoritosFichasBorrar = document.getElementById("favoritosContainer")
            const borrarFavoritosContainer = document.getElementById("favoritosGrid")
            borrarFavoritosContainer.removeChild(favoritosFichasBorrar)

            const favoritosContainerReload = document.createElement("div")
            favoritosContainerReload.setAttribute("id","favoritosContainer")
            favoritosContainerReload.setAttribute("class","mdl-cell mdl-cell--12-col")
            document.getElementById("favoritosGrid").appendChild(favoritosContainerReload)
        }

        const favoritosContainer = document.getElementById("favoritosContainer")
        const mostrarFavoritosFicha = document.createElement("div")
        mostrarFavoritosFicha.setAttribute("id","favoritosFichasContainer")

        if (favoritos.length == 0){
            mostrarFavoritosFicha.innerHTML = `<h4 align=center>No tienes favoritos.</h4>`

        }
        for (var i = 0; i <= favoritos.length -1;i++){
            mostrarFavoritosFicha.innerHTML += `<br>
            <div style="margin-left:2%" id = "comida-ficha-container" class="mdl-mdl-cell mdl-cell--6-col demo-card-wide mdl-card mdl-shadow--2dp" >
            <div id="comida-ficha" class="mdl-card__title">
                <h4 style="margin-top:40px;overflow-wrap: anywhere;opacity:0.6">${favoritos[i]}</h4>
            </div>
            <div id ="desc" style = "font-size:16px;text-align: justify;text-justify: inter-word;" class="mdl-card__supporting-text">imagen</div>
            <div class="mdl-card__actions mdl-card--border">
            <a  style="display:inline" onclick="popupingredientesFavoritos('${favoritos[i]}',${i})"  id="show-dialog" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Ver ingredientes
            
            </a>
            </div>
            <div class="mdl-card__menu"> 
            <button id ="copiar-boton" class="mdl-button mdl-button--icon mdl-js-button" onclick = "removeFavoritos(${i})" type="button"><i class='material-icons'>delete_outline</i></button>
            <div  id = "copiar-boton-container" class="mdl-js-snackbar mdl-snackbar">
                <div class="mdl-snackbar__text"></div>
                <button class="mdl-snackbar__action " type="button"></button>
            </div>   
            </div>             
            </div>    
            <dialog id="ingredientespopup_idFav" class="mdl-dialog">
                <h4 id ="ingredientesDialogTitleFav" style="color:#616161" align=center>Ingredientes</h4>
                <div id="dialogContainerFav" class="mdl-dialog__content">
                <p id="ingredientesFichaContainerFav" class="mdl-cell mdl-cell--1-col demo-card-wide mdl-card mdl-shadow--2dp" style="border-top: 2px solid #8bc34a;border-bottom: 2px solid #8bc34a;overflow: hidden;overflow-y:scroll;overflow-x:hidden;width:250px;height:110px;margin-left:-5%"></p>
                </div>
                <div align=center class="mdl-dialog__actions">
                    <button type="button" class="mdl-button close">Cerrar</button>
                </div>
            </dialog>     
            <div style="margin-bottom:-20px" class="mdl-cell mdl-cell--6-col"><p id="removefavoritosLabel" name="${favoritos[i]}" style="color:white;">${favoritos[i]}</p></div>

            `


        }

        favoritosContainer.appendChild(mostrarFavoritosFicha)





    }


}

class despensa {

        mostrar_categoria(categoria){
            //reinicia la despensa

            var despensa_break = l.getItem("despensa_break")

            var mostrar_comidas_categoria = []
            //generamos la variable con la lista con la que se va a saber si faltan ingredientes o no
            //esta variable sirve para la busqueda avanzada, si el elemento de esta lista que corresponde al la comida esta en false, mostrará una exclamación en su ficha!


            
            //BUCLE IMPORTANTE!!//
            //BUSQUE QUE BUSCA LAS COMIDAS QUE COINICDEN CON LOS INGREDIENTES SELECCIONADOS!//
            //este bucle recorre cada comida del JSON comidas.
            //busca por cada lista de ingredientes de cada comida los ingredientes seleccionados
            //si algun ingrediente seleccionado esta dentro de los ingredientes de la comida, el contador de coincidencias sube
            //este contador de coincidencias sirve para determinar, dependiendo del modo de busqueda, si se va a mostrar o no
            if (despensa_break == "false"){

                for (var i = 0;i <= comidas.length -1;i++){
            
                    if (comidas[i].categoria == categoria){
                        mostrar_comidas_categoria.push(comidas[i].nombre)
                        

                    }

                }
                const contenedorComidaCat = document.getElementById("despensa-list");         
                const ComidaFichaCat = document.createElement('div');
                ComidaFichaCat.setAttribute("class","mdl-grid")
                ComidaFichaCat.setAttribute("id", "resultado-cat-container");
              


                var cargado = JSON.parse(l.getItem("despensa_load"))

                if (cargado == 0){
                    const volverPrincipio = document.createElement('div');
                    volverPrincipio.setAttribute("id","volverPrincipio")
                    volverPrincipio.setAttribute("style","top:90%;position: -webkit-sticky;position: sticky;z-index: 2;margin-left:80%;margin-bottom:15%")
                    volverPrincipio.innerHTML = `
                    <a style="margin-top:-100%;background-color:#8bc34a" href="#volverBeacon" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                    <i class="material-icons">keyboard_arrow_up</i>
                    </a>
                    `
                    contenedorComidaCat.appendChild(volverPrincipio) 
                }


                for (var i = cargado;i <= cargado + 9; i++){
          
                    if (mostrar_comidas_categoria[i] == undefined){
                        l.setItem("despensa_break",true)
                        break
        
                    }

                    ComidaFichaCat.innerHTML += `
                        
                        <div id = "comida-ficha-container" class="mdl-mdl-cell mdl-cell--6-col demo-card-wide mdl-card mdl-shadow--2dp" >
                        <div id="comida-ficha" class="mdl-card__title">
                            <h4 style="margin-top:40px;overflow-wrap: anywhere;opacity:0.6">${mostrar_comidas_categoria[i]}</h4>
                        </div>
                        <div id ="desc" style = "font-size:16px;text-align: justify;text-justify: inter-word;" class="mdl-card__supporting-text">imagen</div>
                        <div class="mdl-card__actions mdl-card--border">
                        <a  style="display:inline"  onclick="popupingredientesDespensa('${mostrar_comidas_categoria[i]}')" id="show-dialog" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
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

                        <dialog id="ingredientespopup_idDespensa" class="mdl-dialog">
                        <h4 id ="ingredientesDialogTitleDespensa" style="color:#616161" align=center>Ingredientes</h4>
                        <div id="dialogContainerDespensa" class="mdl-dialog__content">
                        <p id="ingredientesFichaContainerDespensa" class="mdl-cell mdl-cell--1-col demo-card-wide mdl-card mdl-shadow--2dp" style="border-top: 2px solid #8bc34a;border-bottom: 2px solid #8bc34a;overflow: hidden;overflow-y:scroll;overflow-x:hidden;width:250px;height:110px;margin-left:-5%"></p>
                        </div>
                        <div align=center class="mdl-dialog__actions">
                            <button type="button" class="mdl-button close">Cerrar</button>
                        </div>
                    </dialog>            
                
                
                        <div style="margin-bottom:-20px" class="mdl-cell mdl-cell--6-col"><p id="addfavoritosLabel" name="${mostrar_comidas_categoria[i]}" style="color:white;">${mostrar_comidas_categoria[i]}</p></div>
                        
                        <dialog id="addfavoritosDialog" class="mdl-dialog">
                        <h5 style="color:#616161" align=center>Añadido a favoritos!</h5>
                        <div style="margin-right:90px" class="mdl-dialog__actions">
                        <button align=center type="button" class="mdl-button close">Cerrar</button>
                        </div>
                    </dialog> 
                    
                    <dialog id="addfavoritosDialogFail" class="mdl-dialog">
                    <h5 style="color:#616161" align=center>Ya está en favoritos!</h5>
                    
                    <div style="margin-right:90px" class="mdl-dialog__actions">
                        <button type="button" class="mdl-button close">Cerrar</button>
                    </div>
                    </dialog>          

                    </div>
                    
                    `

                }
                l.setItem("despensa_load",JSON.stringify(cargado+10))
                contenedorComidaCat.appendChild(ComidaFichaCat)
                
            }
            
        }



}
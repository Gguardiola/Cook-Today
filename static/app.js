class interfaz {
    selectores(comidas) {
        var selectbox = "<form id='selector'>";
        var i = 0
        for (i = 0; i <= comidas.length -1; i++){
          var selectbox = selectbox.concat(`<input type='checkbox' id='${comidas[i]}' name='ingrediente' value='${comidas[i]}'>`);
          var selectbox = selectbox.concat(`<label for='${comidas[i]}'>${comidas[i]}</label><br>`);
        
            console.log(selectbox)
        }
        var selectbox = selectbox.concat("</form>")
        const contenedorSelectores = document.getElementById("selectores");
        const autoSelector = document.createElement('form');
        autoSelector.innerHTML = selectbox;
        contenedorSelectores.appendChild(autoSelector)

    }
    mostrar_seleccionados(ingredientes_checked){

        const contenedorResultado = document.getElementById("resultado");
        const comproreplace = contenedorResultado.childElementCount;
        if (comproreplace > 0){
            var borrador = document.getElementById("ingrediente");
            contenedorResultado.removeChild(borrador)  
            
        }
        const muestraResultado = document.createElement('p');
        muestraResultado.setAttribute("id", "ingrediente");
        muestraResultado.innerHTML = ingredientes_checked;
        contenedorResultado.appendChild(muestraResultado)  

    
    }

    
 
}

//DOM
comidas = ['ensalada','espinacas','berengena','caca','culo']
document.getElementById('borrador').addEventListener('submit',function(e){
    document.getElementById('resultado').innerHTML = "";
    e.preventDefault();
})
document.getElementById('buscador').addEventListener('submit',function(e){
    var ingrediente = document.forms[0];
    var ingredientes_checked = "";
    var i;
    for (i = 0; i < ingrediente.length; i++) {
      if (ingrediente[i].checked) {
        ingredientes_checked = ingredientes_checked + ingrediente[i].value + " ";
      }
    }
    ui.mostrar_seleccionados(ingredientes_checked)
 
    e.preventDefault();

});
ui = new interfaz();
ui.selectores(comidas)






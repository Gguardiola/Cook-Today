from bs4 import BeautifulSoup
import requests
f = open("comidas.js","w")
f.write("var comidas = [")
#web scrapping cine
seccion = requests.get("https://www.lecturas.com/recetas/ensaladas")
soup = BeautifulSoup(seccion.content, 'html5lib')
quotes=[]  # a list to store quotes 
  
table = soup.find('div', attrs = {'class':'article-list'}) 
  
for row in table.findAll('div', attrs = {'class':'resume-recipe-list col-xs-12'}): 
    quote = {} 
    comida_name = row.h3.text.split("\n"); comida_name = comida_name[1]
    print(comida_name)
    quote['nombre'] = comida_name

    ficha_comida = requests.get("https://lecturas.com/"+str((row.a['href'])))
    soup_comida = BeautifulSoup(ficha_comida.content, "html5lib")
    table_ingredientes = soup_comida.find('table', attrs = {'class':'recipe-ingregients-table'}) 

    ingredientes_comida = []
    for row in table_ingredientes.findAll('td', attrs = {'class','recipe-ingredient-ingr'}):
        #print(row.text)
        ingredientes_comida.append(row.text)
        
        
    quote['ingredientes'] = ingredientes_comida


    quotes_final = str(quote)
    f.write(quotes_final+str(",")+str("\n"))

f.write("]")
f.close()
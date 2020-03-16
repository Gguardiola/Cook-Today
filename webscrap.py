from bs4 import BeautifulSoup
import requests

#web scrapping cine
seccion = requests.get("https://www.lecturas.com/recetas/ensaladas")
soup = BeautifulSoup(seccion.content, 'html5lib')
quotes=[]  # a list to store quotes 
  
table = soup.find('div', attrs = {'class':'article-list'}) 
  
for row in table.findAll('div', attrs = {'class':'resume-recipe-list col-xs-12'}): 
    quote = {} 

    quote['nombre'] = row.h3.text 

    quotes.append(quote) 
print(quotes)
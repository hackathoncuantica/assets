## Analizando la estructura del Universo con métricas de red

Partiendo de los csv con datos de posición y luz de las diferentes galaxias a diferentes redshift (que puedes encontrar [aquí](https://gitlab.pic.es/sgrinschpun/hackathon_cccb_2019/tree/master/flagship_data)), puedes usar el código fuente en el directorio [bin](bin/) para generar ficheros de red .gexf, que luego puedes visualizar en [Gephi](https://gephi.org/).

El código, en Python, usa [networkx](https://networkx.github.io/) para generar una red con los datos de las galaxias, usando la distancia entre ellas para generar enlaces. Se generan de media 10 enlaces para cada nodo, pero ese parámetro lo puedes cambiar (AVERAGE_DEGREE). También puedes cambiar el SAMPLE_RATE, que diezma el número total de registros (si es igual a 10, coge una galaxia de cada 10), porque los datasets son muy grandes. Puedes cambiar el fichero que lee modificando el parámetro 'REDSHIFT'. Si pones los ficheros en un directorio 'data', te cogerá todo y generará todo automáticamente. Antes de escribir el fichero, el programa calcula el [coeficiente de clustering](https://en.wikipedia.org/wiki/Clustering_coefficient) y la [modularidad de la red](https://en.wikipedia.org/wiki/Modularity_(networks))

Una vez que se genere el fichero .gexf, puedes importarlo en Gephi. Lo recomendable es usar el layout [Force Atlas 2](https://github.com/gephi/gephi/wiki/Force-Atlas-2), con unos parámetros semejantes a la siguiente captura de pantalla. También puedes colorear los nodos según la propiedad 'community', que se genera con el fuente en python.

<p align="center">
  <img src="layout_settings.png">
</p>

### Diagrama a redshift=0.2

<p align="center">
  <img src="redshift_0p2.png">
</p>


### Diagrama a redshift=0.6

<p align="center">
  <img src="redshift_0p6.png">
</p>


### Diagrama a redshift=1.2

<p align="center">
  <img src="redshift_1p2.png">
</p>


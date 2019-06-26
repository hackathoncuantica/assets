<p align="center">
  <img src="PIC.png">
</p>


## Datasets del PIC (Port d'informació científica)

En [este enlace](https://gitlab.pic.es/sgrinschpun/hackathon_cccb_2019) están los datasets que el PIC ha preparado explícitamente para este hackathon.

Los datasets parten de una simulación del Universo a partir de energía oscura. Los puedes usar para analizar
estructura del universo a diferentes ['redshift'](https://en.wikipedia.org/wiki/Redshift). El redshift nos habla a la vez de (a)cuánto de lejano está el objeto y (b) la 'edad' de la luz que nos llega de allí (puedes consultar la relación entre 'redshift' y estas dos magnitudes [aquí](https://lco.global/spacebook/light/redshift/))

En el primer enlace, encontrarás una línea con el crédito de los datos. Es muy importante que lo respetes y lo incluyas en todos los trabajos derivados. El proyecto que hay detrás de estos datos supone un enorme esfuerzo económico, académico y humano.

En [este directorio](https://gitlab.pic.es/sgrinschpun/hackathon_cccb_2019/tree/master/flagship_data) encontrarás los siguientes archivos:

- '5116.csv.bz2' es un archivo que, una vez descomprimido, tiene estructura 'csv' (fichero separado por comas). Es la simulación completa del Universo con las galaxias en torno a redshift = 0.5. Puedes usar este dataset para visualizar en 3D la estructura de la galaxia, hacer histogramas 2D o sonificarlo.
Los campos del fichero son los siguientes (cada línea del fichero es una galaxia)
    - 'ra_gal': [Ascensión recta](https://en.wikipedia.org/wiki/Right_ascension), análoga a la 'longitud' en un sistema de coordenadas esféricas
    - 'dec_gal': [Declinación](https://en.wikipedia.org/wiki/Declination), análoga a la 'latitud' en un sistema de coordenadas esféricas
    - 'galaxy_id': Ignorar este campo
    - 'observed_redshift_gal': Redshift exacto de la galaxia
    - 'lsst_i': Flujo lumínico de la galaxia (en unidades CGS)
    
- Los archivos que empiezan por 'flagship_z', con pequeñas 'porciones' del Universo a diferentes redshift. La idea original es usar estos datasets para, mediante técnicas de análisis de redes, calcular o visualizar las diferencias a distintos redshift. En la carpeta [codigo](codigo) puedes encontrar scripts en python para generar métricas o ficheros de red que puedes visualizar con [Gephi](https://gephi.org/). Nuevamente, hay una galaxia por cada línea, y los campos son muy similares al fichero anterior.
    
    - 'ra_gal': [Ascensión recta](https://en.wikipedia.org/wiki/Right_ascension), análoga a la 'longitud' en un sistema de coordenadas esféricas
    - 'dec_gal': [Declinación](https://en.wikipedia.org/wiki/Declination), análoga a la 'latitud' en un sistema de coordenadas esféricas
    - 'galaxy_id': Ignorar este campo
    - 'z': Redshift exacto de la galaxia
    - 'lsst_i': Flujo lumínico de la galaxia (en unidades CGS)




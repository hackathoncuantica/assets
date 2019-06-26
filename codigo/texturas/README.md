## Jugando con texturas cosmológicas en WebVR

[WebVR](https://en.wikipedia.org/wiki/WebVR) es un API para navegadores que te permite crear contenido de Realidad Virtual y ejecutarlo en el dispositivo que sea compatible (Google Cardboard, HTC Vive, Oculus Rift, Oculus Go, Oculus Quest, etc..) simplemente apuntando a la URL donde aloje tu página en el navegador web del dispositivo.

Para programar en WebVR necesitas usar una librería javascript compatible, la más usada es [AFrame](https://aframe.io/). Los ejemplos están en la página principal y la documentación [aquí](https://aframe.io/docs/0.9.0/introduction/). Con código HTML relativamente sencillo puedes desarrollar experiencias con fotos y vídeos 360, modelos 3D, sonidos 3D, interacción, etc. Para cosas más avanzadas, puedes programar en javascript. La librería se extiende escribiendo componentes.

Con las texturas generadas por el PIC [aquí]() puedes 'envolver' esferas y ver como se verían en la bóveda celeste, tanto desde dentro como desde fuera. 


## Cómo ver texturas desde fuera

<p align="center">
  <img src="texturas_fuera.jpg">
</p>

[Aquí](texturas_fuera) tienes un 'index.html' de ejemplo para generar esferas con texturas, y verlas desde las Oculus Go o Quest (este último en 'room-scale', es decir, puedes 'pasearte' por el entorno que hayas creado)

El ejemplo usa el componente ['aframe-environment'](https://github.com/supermedium/aframe-environment-component), que te permite 'vestir' un poco el entorno con cielos, suelos y objetos alrededor de tus modelos.
El resto del código usa la primitiva 'a-sphere', que puedes consultar en la documentación

## Cómo ver texturas desde dentro

<p align="center">
  <img src="textura_dentro.jpg">
</p>

[Aquí](texturas_dentro) tienes un 'index.html' de ejemplo para ver las texturas desde dentro, como si estuvieras suspendido en la bóveda celeste y observando el Universo.

El código es muy parecido, con el único cambio de que hay una sola esfera, de radio 100 metros y en la que la textura 'se pega' a su interior ('side:back')





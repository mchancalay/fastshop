import Carrito from './Carrito.js';

export default class Tienda {

  constructor() {
    this.articulos = [];
    this.carrito = new Carrito();
  }

  agregarArticulo(articulo) {
    if (articulo != null) {
      this.articulos.push(articulo);
    } else {
      console.log("Se quiere agregar un articulo nulo");
    }
  }

  async cargarArticulos() {
    await fetch("./json/articulos.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        this.agregarArticulo(element);
      });

      this.mostrarArticulos();
    })
    .catch(error => {
      console.log("Se produjo el siguiente error al cargar los articulos:");
      console.log(error);
    })
  }

  mostrarArticulos(){
    const listadoArticulosPrincipales = document.getElementById("listado-articulos-principales");

    this.articulos.forEach(articulo => {
      
      const article = document.createElement("article");
      article.classList.add(`articulo`);
      article.innerHTML = `  <div class="articulo__imagen">
                                  <img class="articulo__img" src="${articulo.imagen}" alt="${articulo.nombre}">
                                  <button class="articulo__btn" id="agregar-id-${articulo.id}">Agregar al carrito</button>
                              </div>
                              <div class="articulo__info">
                                  <h4 class="articulo__nombre">${articulo.nombre}</h4>
                                  <p class="articulo__precio">$${articulo.precio}</p>
                              </div>
                              `;
      listadoArticulosPrincipales.appendChild(article);

      const agregarAlCarrito = document.getElementById(`agregar-id-${articulo.id}`);
      agregarAlCarrito.addEventListener("click", () => {
        this.carrito.agregarArticulo(articulo);
        
      })
    })
  }
}
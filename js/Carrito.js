export default class Carrito {

    constructor() {
        this.articulos = [];
        this.cargarCarrito();
    }

    cargarCarrito(){
        if(localStorage.getItem("carrito")){
            //this.articulos = JSON.parse(localStorage.getItem("carrito"));
        }
        document.getElementById("cantidad-en-carrito").innerText = this.obtenerCantidad();
    }

    agregarArticulo(articulo) {
        if (articulo != null) {
            const articuloEncontrado = this.articulos.find(a => a.id === articulo.id);
            if(articuloEncontrado != null) {
                articuloEncontrado.cantidad++;
            } else {
                articulo.cantidad = 1;
                this.articulos.push(articulo);
            }
            document.getElementById("cantidad-en-carrito").innerText = this.obtenerCantidad();
        }
    }

    quitarArticulo(articulo) {
        if (articulo != null) {
          const index = this.articulos.findIndex(a => a.id === articulo.id);
          if (index !== -1) {
            const articuloEncontrado = this.articulos[index];
            if (articuloEncontrado.cantidad === 1) {
              articuloEncontrado.cantidad--;
              this.articulos.splice(index, 1);
            } else {
              articuloEncontrado.cantidad--;
            }
            this.mostrarArticulos();
          }
        }
        document.getElementById("cantidad-en-carrito").innerText = this.obtenerCantidad();
      }

      async mostrarArticulos() {
        localStorage.setItem("carrito", JSON.stringify(this.articulos));

        const listadoCarrito = document.getElementById("listado-carrito");
        listadoCarrito.innerHTML= '';

        this.articulos.forEach(articulo => {

            const li = document.createElement("li");
            li.classList.add(`carrito__item`);
            li.innerHTML = `
                            <li class="carrito__item">
                                <div class="carrito__imagen">
                                    <img class="carrito__img" src="${articulo.imagen}" alt="${articulo.nombre}">
                                </div>
                                <div class="carrito__info">
                                    <h4 class="carrito__nombre">${articulo.nombre}</h4>
                                    <p class="carrito__precio">$${articulo.precio.toLocaleString()}</p>
                                    <button id="quitar-id-${articulo.id}"">Quitar</button>
                                    ${articulo.cantidad}
                                </div>
                            </li>
            `
            listadoCarrito.appendChild(li);

            const quitarDelCarrito = document.getElementById(`quitar-id-${articulo.id}`);
            quitarDelCarrito.addEventListener("click", () => {
              this.quitarArticulo(articulo);
              
            })
        })

        
    }

    obtenerCantidad() {
        let acu = 0;
        this.articulos.forEach(a => {
            acu += a.cantidad;
        })
        return acu;
    }

}

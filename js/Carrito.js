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
            Toastify({
                text: `Agregaste ${articulo.nombre}`,
                duration: 2000,
                gravity: "top",
                position: "left",
                style: {
                  background: "linear-gradient(to left bottom, #ba17ff, #43b6ff)",
                },
                onClick: () => {
                    this.mostrarArticulos();
                }
              }).showToast();

            document.getElementById("cantidad-en-carrito").innerText = this.obtenerCantidad();
            this.mostrarArticulos();
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

      mostrarArticulos() {
        localStorage.setItem("carrito", JSON.stringify(this.articulos));
        const listadoCarrito = document.getElementById("listado-carrito");
        listadoCarrito.innerHTML= '';

        const totalCarrito = document.getElementById("total-carrito");
        totalCarrito.innerHTML= ``;

        if(this.articulos.length === 0){
            const li = document.createElement("li");
            li.innerHTML = `
                <p>Tu carrito está malditamente vacío 😈<p/>
            `;
            listadoCarrito.appendChild(li);

            totalCarrito.innerHTML= `
            $0,00
           `;

        } else {

            let total = 0
            this.articulos.forEach(articulo => {
                total = total + articulo.precio * articulo.cantidad;
                const li = document.createElement("li");
                li.classList.add(`carrito__item`);
                li.innerHTML = `
                                <div class="carrito__imagen">
                                    <img class="carrito__img" src="${articulo.imagen}" alt="${articulo.nombre}">
                                </div>
                                <div class="carrito__info">
                                    <h4 class="carrito__nombre">${articulo.nombre}</h4>
                                    <p class="carrito__precio">$${articulo.precio.toLocaleString()}</p>
                                    <p class="carrito__cantidad">${articulo.cantidad}<p/>
                                    <p class="carrito__subtotal">Subtotal: $${parseInt((articulo.cantidad * articulo.precio).toFixed(2)).toLocaleString()}<p/>
                                    <button id="quitar-id-${articulo.id}"">Quitar</button>
                                    <button id="sumar-id-${articulo.id}"">Sumar</button>
                                </div>
                `
                listadoCarrito.appendChild(li);

                const quitarDelCarrito = document.getElementById(`quitar-id-${articulo.id}`);
                quitarDelCarrito.addEventListener("click", () => {
                  this.quitarArticulo(articulo);
                  
                })
    
                const sumarAlCarrito = document.getElementById(`sumar-id-${articulo.id}`);
                sumarAlCarrito.addEventListener("click", () => {
                  this.agregarArticulo(articulo);
                  
                })
            })

            totalCarrito.innerHTML= `
            ${total.toLocaleString()}
           `;
        }

        const comprarCarrito = document.getElementById(`comprar-carrito`);
        comprarCarrito.addEventListener("click", () => {
          this.vaciarCarrito();
        })

        const vaciarCarrito = document.getElementById(`vaciar-carrito`);
        vaciarCarrito.addEventListener("click", () => {
          this.vaciarCarrito();
        })
        
    }

    vaciarCarrito() {
        this.articulos = [];
        this.mostrarArticulos();
        document.getElementById("cantidad-en-carrito").innerText = this.obtenerCantidad();
    }

    obtenerCantidad() {
        let acu = 0;
        this.articulos.forEach(a => {
            acu += a.cantidad;
        })
        return acu;
    }

}

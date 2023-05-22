export default class Carrito {

    constructor() {
        this.articulos = [];
        this.cargarCarrito();
    }

    cargarCarrito(){
        if(localStorage.getItem("carrito")){
            this.articulos = JSON.parse(localStorage.getItem("carrito"));
        }
        document.getElementById("cantidad-en-carrito").innerText = this.obtenerCantidad();
    }

    agregarArticulo(articulo) {
        if (articulo != null) {
            const articuloAbuscar = this.articulos.find(a => a.id === articulo.id);
            if(articuloAbuscar != null) {
                articuloAbuscar.cantidad++;
            } else {
                articulo.cantidad = 1;
                this.articulos.push(articulo);
            }
            document.getElementById("cantidad-en-carrito").innerText = this.obtenerCantidad();
        }
    }

    mostrarArticulos() {
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
                                    <p class="carrito__precio">$${articulo.precio}</p>
                                    <button id="carrito__btn--quitar">Quitar</button>
                                    ${articulo.cantidad}
                                </div>
                            </li>
            `
            listadoCarrito.appendChild(li);
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

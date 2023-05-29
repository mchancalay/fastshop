import Tienda from './Tienda.js';
const tienda = new Tienda();

tienda.cargarArticulos();

// Abrir carrito
const abrirCarrito = document.getElementById("abrir-carrito");
abrirCarrito.addEventListener("click", () => {
    const carrito = document.querySelector(".carrito");
    carrito.classList.remove("filtro");
    tienda.carrito.mostrarArticulos();
});

// Cerrar carrito
const cerrarCarrito = document.getElementById("cerrar-carrito");
cerrarCarrito.addEventListener("click", () => { 
    const carrito = document.querySelector(".carrito");
    carrito.classList.add("filtro");
    tienda.carrito.mostrarArticulos();
});


// Buscador articulos
document.addEventListener("keyup", e => {
    if(e.target.matches("#buscador")){
        document.querySelectorAll('.articulo').forEach(a => {
            a.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ? a.classList.remove("filtro")
            : a.classList.add("filtro");
        });
}
})

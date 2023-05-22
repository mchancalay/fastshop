import Tienda from './Tienda.js';
const tienda = new Tienda();

tienda.cargarArticulos();

// Abrir carrito
const abrirCarrito = document.getElementById("abrir-carrito");
abrirCarrito.addEventListener("click", () => {
    tienda.carrito.mostrarArticulos();
});

// Buscador articulos
document.addEventListener("keyup", e => {
    if(e.target.matches("#buscador")){
        document.querySelectorAll('.articulo').forEach(a => {
            a.textContent.toLowerCase().includes(e.target.value)
            ? a.classList.remove("filtro")
            : a.classList.add("filtro");
        });
}
})

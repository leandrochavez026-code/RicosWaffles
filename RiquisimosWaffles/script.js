
/* ==================================
   1. CONFIGURACIÓN DEL MENÚ
================================== */

const productos = [
    {
        id: 1,
        nombre: "Waffle sencillo",
        descripcion: "Waffle con fruta y miel.",
        precio: 15,
        imagen: "imagenes/waffle-sencillo.jpg",
        agotado: false,

        categorias: {
            frutas: 1,
            mieles: 1
        }
    },

    {
        id: 2,
        nombre: "Waffle completo",
        descripcion: "Waffle con frutas y complementos.",
        precio: 25,
        imagen: "imagenes/waffle-completo.jpg",
        agotado: false,

        categorias: {
            frutas: 2,
            complementos: 1,
            esencias: 1,
            mieles: 1
        }
    }
];


/* ==================================
   2. CONFIGURACIÓN DE INGREDIENTES
================================== */

// Para marcar un ingrediente como agotado,
// cambia agotado: false por agotado: true.

const ingredientes = {
    frutas: [
        { nombre: "Melocotón", agotado: false },
        { nombre: "Banano", agotado: false },
        { nombre: "Fresa", agotado: false }
    ],

    complementos: [
        { nombre: "Crema batida", agotado: false },
        { nombre: "Nutella", agotado: false }
    ],

    esencias: [
        { nombre: "Chocolate", agotado: false },
        { nombre: "Leche condensada", agotado: false }
    ],

    mieles: [
        { nombre: "Miel de abeja", agotado: false },
        { nombre: "Miel de maple", agotado: false }
    ]
};

const nombresCategorias = {
    frutas: "Frutas",
    complementos: "Complementos",
    esencias: "Esencias",
    mieles: "Mieles"
};


/* ==================================
   3. CONFIGURACIÓN GENERAL
================================== */

const telefono = "50241314186";

const PRECIO_MAS_SABOR = 5;

const carrito = [];

const contenedor = document.getElementById("contenedor-productos");
const resumen = document.getElementById("resumen-pedido");
const totalElemento = document.getElementById("total");


/* ==================================
   4. CREAR VENTANA DE PERSONALIZACIÓN
================================== */

const ventana = document.createElement("dialog");
ventana.id = "ventana-personalizacion";
ventana.innerHTML = `
    <div class="personalizador">
        <h2 id="titulo-personalizador"></h2>
        <p id="descripcion-personalizador"></p>

        <div id="opciones-personalizador"></div>

        <label class="opcion-mas-sabor">
            <input type="checkbox" id="mas-sabor">
            ¡Más Sabor! - Chispas de chocolate (+Q5)
        </label>

        <div class="botones-personalizador">
            <button type="button" id="cancelar-personalizacion">
                Cancelar
            </button>

            <button type="button" id="guardar-personalizacion">
                Agregar al pedido
            </button>
        </div>
    </div>
`;

document.body.appendChild(ventana);


/* ==================================
   5. ESTILOS DE LA VENTANA
================================== */

// Estos estilos pertenecen únicamente
// a la ventana de personalización.

const estilosVentana = document.createElement("style");

estilosVentana.textContent = `
    #ventana-personalizacion {
        width: min(90%, 600px);
        max-height: 85vh;
        overflow-y: auto;
        border: none;
        border-radius: 16px;
        padding: 0;
        background: white;
        color: #222;
    }

    #ventana-personalizacion::backdrop {
        background: rgba(0, 0, 0, 0.65);
    }

    .personalizador {
        padding: 24px;
        text-align: left;
    }

    .personalizador h2 {
        margin-top: 0;
    }

    .grupo-ingredientes {
        margin: 22px 0;
    }

    .grupo-ingredientes h3 {
        margin-bottom: 10px;
    }

    .opciones-ingredientes {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
    }

    .opcion-ingrediente {
        border: 1px solid #bbb;
        border-radius: 9px;
        padding: 9px 12px;
        background: #f5f5f5;
        color: #222;
        cursor: pointer;
    }

    .opcion-ingrediente.seleccionado {
        background: #d8f3e1;
        border-color: #279653;
    }

    .opcion-ingrediente:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    .opcion-sin {
        background: #e9e9e9;
        border-style: dashed;
    }

    .opcion-mas-sabor {
        display: block;
        margin: 22px 0;
        padding: 12px;
        background: #fff1cc;
        border-radius: 9px;
        cursor: pointer;
    }

    .botones-personalizador {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 24px;
    }

    .botones-personalizador button {
        padding: 11px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    #guardar-personalizacion {
        background: #168b50;
        color: white;
    }

    #cancelar-personalizacion {
        background: #ddd;
        color: #222;
    }

    .ingrediente-agotado {
        text-decoration: line-through;
    }

    .item-carrito {
        border-bottom: 1px solid #ddd;
        padding: 12px 0;
    }

    .item-carrito p {
        margin: 5px 0;
    }

    .acciones-carrito {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }

    .acciones-carrito button {
        cursor: pointer;
    }

    @media (max-width: 480px) {
        .personalizador {
            padding: 17px;
        }

        .botones-personalizador {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(estilosVentana);


/* ==================================
   6. ESTADO DEL PERSONALIZADOR
================================== */

let productoActual = null;
let indiceEdicion = null;
let selecciones = {};


/* ==================================
   7. MOSTRAR PRODUCTOS
================================== */

function mostrarProductos() {
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <span class="precio">
                Q${producto.precio.toFixed(2)}
            </span>

            ${
                producto.agotado
                ? `<span class="agotado">¡Agotado!</span>`
                : `<button class="boton-agregar" data-id="${producto.id}">
                    Personalizar y agregar
                   </button>`
            }
        `;

        contenedor.appendChild(tarjeta);
    });
}


/* ==================================
   8. ABRIR PERSONALIZADOR
================================== */

function abrirPersonalizador(producto, indice = null) {
    if (!producto || producto.agotado) return;

    productoActual = producto;
    indiceEdicion = indice;

    // Si estamos editando, recuperamos las selecciones.
    // Si es un producto nuevo, comenzamos desde cero.

    if (indice !== null) {
        const anterior = carrito[indice];

        selecciones = JSON.parse(
            JSON.stringify(anterior.selecciones)
        );

        document.getElementById("mas-sabor").checked =
            anterior.masSabor;
    } else {
        selecciones = {};

        Object.keys(producto.categorias).forEach(categoria => {
            selecciones[categoria] = [];
        });

        document.getElementById("mas-sabor").checked = false;
    }

    document.getElementById("titulo-personalizador").textContent =
        producto.nombre;

    document.getElementById("descripcion-personalizador").textContent =
        `Precio base: Q${producto.precio.toFixed(2)}`;

    document.getElementById("guardar-personalizacion").textContent =
        indice === null ? "Agregar al pedido" : "Guardar cambios";

    mostrarOpciones();

    ventana.showModal();
}


/* ==================================
   9. MOSTRAR OPCIONES DE INGREDIENTES
================================== */

function mostrarOpciones() {
    const contenedorOpciones =
        document.getElementById("opciones-personalizador");

    contenedorOpciones.innerHTML = "";

    Object.entries(productoActual.categorias).forEach(
        ([categoria, limite]) => {

            const grupo = document.createElement("section");
            grupo.className = "grupo-ingredientes";

            const titulo = document.createElement("h3");
            titulo.textContent =
                `${nombresCategorias[categoria]} (máximo ${limite})`;

            grupo.appendChild(titulo);

            const opciones = document.createElement("div");
            opciones.className = "opciones-ingredientes";

            // Botón para elegir que no se desea
            // ningún ingrediente de esta categoría.

            const botonSin = document.createElement("button");
            botonSin.type = "button";
            botonSin.className = "opcion-ingrediente opcion-sin";
            botonSin.textContent =
                `Sin ${nombresCategorias[categoria].toLowerCase()}`;

            if (selecciones[categoria].length === 0) {
                botonSin.classList.add("seleccionado");
            }

            botonSin.addEventListener("click", () => {
                selecciones[categoria] = [];
                mostrarOpciones();
            });

            opciones.appendChild(botonSin);

            // Mostrar cada ingrediente disponible.

            ingredientes[categoria].forEach(ingrediente => {
                const boton = document.createElement("button");
                boton.type = "button";
                boton.className = "opcion-ingrediente";

                const seleccionado =
                    selecciones[categoria].includes(ingrediente.nombre);

                boton.textContent = ingrediente.agotado
                    ? `${ingrediente.nombre} (Agotado)`
                    : ingrediente.nombre;

                if (seleccionado) {
                    boton.classList.add("seleccionado");
                }

                if (ingrediente.agotado) {
                    boton.disabled = true;
                    boton.classList.add("ingrediente-agotado");
                }

                // Si ya se alcanzó el límite,
                // deshabilitar las opciones no seleccionadas.

                if (
                    selecciones[categoria].length >= limite &&
                    !seleccionado
                ) {
                    boton.disabled = true;
                }

                boton.addEventListener("click", () => {
                    if (ingrediente.agotado) return;

                    const seleccionados = selecciones[categoria];

                    if (seleccionados.includes(ingrediente.nombre)) {
                        selecciones[categoria] =
                            seleccionados.filter(
                                nombre => nombre !== ingrediente.nombre
                            );
                    } else if (seleccionados.length < limite) {
                        seleccionados.push(ingrediente.nombre);
                    }

                    mostrarOpciones();
                });

                opciones.appendChild(boton);
            });

            grupo.appendChild(opciones);
            contenedorOpciones.appendChild(grupo);
        }
    );
}


/* ==================================
   10. GUARDAR PRODUCTO EN EL CARRITO
================================== */

document.getElementById("guardar-personalizacion")
    .addEventListener("click", () => {

        if (!productoActual) return;

        const masSabor =
            document.getElementById("mas-sabor").checked;

        const precioFinal =
            productoActual.precio +
            (masSabor ? PRECIO_MAS_SABOR : 0);

        const nuevoProducto = {
            id: productoActual.id,
            nombre: productoActual.nombre,
            precioBase: productoActual.precio,
            precio: precioFinal,
            masSabor: masSabor,

            selecciones: JSON.parse(
                JSON.stringify(selecciones)
            )
        };

        if (indiceEdicion !== null) {
            carrito[indiceEdicion] = nuevoProducto;
        } else {
            carrito.push(nuevoProducto);
        }

        ventana.close();
        actualizarResumen();
    });


/* ==================================
   11. CANCELAR PERSONALIZACIÓN
================================== */

document.getElementById("cancelar-personalizacion")
    .addEventListener("click", () => {
        ventana.close();
    });


/* ==================================
   12. ABRIR PERSONALIZADOR DESDE EL MENÚ
================================== */

contenedor.addEventListener("click", event => {
    const boton = event.target.closest(".boton-agregar");

    if (!boton) return;

    const id = Number(boton.dataset.id);

    const producto = productos.find(p => p.id === id);

    abrirPersonalizador(producto);
});


/* ==================================
   13. CALCULAR TOTAL DEL CARRITO
================================== */

function calcularTotal() {
    return carrito.reduce(
        (suma, producto) => suma + producto.precio,
        0
    );
}


/* ==================================
   14. MOSTRAR RESUMEN DEL PEDIDO
================================== */

function actualizarResumen() {
    resumen.innerHTML = "";

    if (carrito.length === 0) {
        resumen.innerHTML =
            '<p class="vacio">Todavía no has agregado productos.</p>';
    }

    carrito.forEach((producto, indice) => {
        const elemento = document.createElement("div");
        elemento.className = "item-carrito";

        const titulo = document.createElement("strong");
        titulo.textContent =
            `${producto.nombre} - Q${producto.precio.toFixed(2)}`;

        elemento.appendChild(titulo);

        // Mostrar ingredientes seleccionados.

        Object.entries(producto.selecciones).forEach(
            ([categoria, seleccionados]) => {

                const detalle = document.createElement("p");

                detalle.textContent =
                    `${nombresCategorias[categoria]}: ` +
                    (
                        seleccionados.length > 0
                        ? seleccionados.join(", ")
                        : "Ninguno"
                    );

                elemento.appendChild(detalle);
            }
        );

        const sabor = document.createElement("p");

        sabor.textContent = producto.masSabor
            ? "¡Más Sabor!: Chispas de chocolate (+Q5)"
            : "¡Más Sabor!: No";

        elemento.appendChild(sabor);

        // Botones de edición y eliminación.

        const acciones = document.createElement("div");
        acciones.className = "acciones-carrito";

        const editar = document.createElement("button");
        editar.type = "button";
        editar.textContent = "Editar";

        editar.addEventListener("click", () => {
            const original = productos.find(
                p => p.id === producto.id
            );

            abrirPersonalizador(original, indice);
        });

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.textContent = "Quitar";

        eliminar.addEventListener("click", () => {
            carrito.splice(indice, 1);
            actualizarResumen();
        });

        acciones.appendChild(editar);
        acciones.appendChild(eliminar);

        elemento.appendChild(acciones);
        resumen.appendChild(elemento);
    });

    totalElemento.textContent =
        `Total: Q${calcularTotal().toFixed(2)}`;
}


/* ==================================
   15. ENVIAR PEDIDO POR WHATSAPP
================================== */

document.getElementById("enviar-pedido")
    .addEventListener("click", () => {

        const nombre =
            document.getElementById("nombre").value.trim();

        const apellido =
            document.getElementById("apellido").value.trim();

        const detalles =
            document.getElementById("detalles").value.trim();

        if (!nombre || !apellido) {
            alert("Por favor, escribe tu nombre y apellido.");
            return;
        }

        if (carrito.length === 0) {
            alert("Primero agrega al menos un producto.");
            return;
        }

        let mensaje = "¡Hola! Quisiera realizar un pedido.\n\n";

        mensaje += `Nombre: ${nombre} ${apellido}\n\n`;

        mensaje += "PRODUCTOS:\n\n";

        carrito.forEach((producto, indice) => {
            mensaje += `${indice + 1}. ${producto.nombre}\n`;

            mensaje +=
                `Precio base: Q${producto.precioBase.toFixed(2)}\n`;

            Object.entries(producto.selecciones).forEach(
                ([categoria, seleccionados]) => {

                    mensaje +=
                        `${nombresCategorias[categoria]}: ` +
                        (
                            seleccionados.length > 0
                            ? seleccionados.join(", ")
                            : "Ninguno"
                        ) +
                        "\n";
                }
            );

            mensaje += producto.masSabor
                ? "¡Más Sabor!: Chispas de chocolate (+Q5)\n"
                : "¡Más Sabor!: No\n";

            mensaje +=
                `Subtotal: Q${producto.precio.toFixed(2)}\n\n`;
        });

        mensaje +=
            `TOTAL DEL PEDIDO: Q${calcularTotal().toFixed(2)}\n`;

        if (detalles) {
            mensaje += `\nDetalles adicionales: ${detalles}\n`;
        }

        const enlace =
            `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

        window.open(enlace, "_blank");
    });


/* ==================================
   16. INICIAR PÁGINA
================================== */

mostrarProductos();
actualizarResumen();

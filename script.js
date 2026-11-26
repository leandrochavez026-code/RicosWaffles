/* ==================================
1. CONFIGURACIÓN DEL MENÚ
================================== */

const productos = [
    {
        id: 1,
        nombre: "Waffle sencillo",
        descripcion: "Waffle con fruta y miel.",
        precio: 20,
        imagen: "waffle-sencillo.jpeg",
        agotado: false,
        permiteMasSabor: true,
        categorias: {
            frutas: 1,
            mieles: 1
        }
    },
    {
        id: 2,
        nombre: "Waffle completo",
        descripcion: "Waffle con frutas y complementos.",
        precio: 30,
        imagen: "waffle-completo.jpeg",
        agotado: false,
        permiteMasSabor: true,
        categorias: {
            frutas: 2,
            complementos: 1,
            esencias: 1,
            mieles: 1
        }
    },
    {
        id: 3,
        nombre: "Oblea",
        descripcion: "Oblea con dulce de leche",
        precio: 10,
        imagen: "oblea.jpeg",
        agotado: false,
        sinPersonalizacion: true,
        permiteMasSabor: false,
        categorias: {}
    },
    {
        id: 4,
        nombre: "Coca-Cola lata 12 oz",
        descripcion: "Bebida refrescante para cualquier momento.",
        precio: 10,
        imagen: "coca-cola-lata.jpeg",
        agotado: false,
        sinPersonalizacion: true,
        permiteMasSabor: false,
        categorias: {}
    },
    {
        id: 5,
        nombre: "Coca-Cola Zero 300 ml",
        descripcion: "Todo el sabor, sin azúcar.",
        precio: 5,
        imagen: "coca-cola-zero-300ml.jpeg",
        agotado: false,
        sinPersonalizacion: true,
        permiteMasSabor: false,
        categorias: {}
    },
    {
        id: 6,
        nombre: "Batido",
        descripcion: "El complemento perfecto para elevar el sabor de tu waffle.",
        precio: 20,
        imagen: "batido.jpeg",
        agotado: false,
        sinPersonalizacion: true,
        permiteMasSabor: false,
        categorias: {}
    },
    {
        id: 7,
        nombre: "¡EXCLUSIVO! Waffle sencillo + Batido",
        descripcion: "Disfruta tu waffle sencillo y un batido por precio especial. Batido a Q15 en combo.",
        precio: 35,
        imagen: "combo-sencillo-batido.jpeg",
        agotado: false,
        sinPersonalizacion: true,
        permiteMasSabor: false,
        etiqueta: "¡EXCLUSIVO!",
        categorias: {}
    },
    {
        id: 8,
        nombre: "¡EXCLUSIVO! Waffle completo + Batido",
        descripcion: "Waffle completo acompañado de un batido por precio especial. Batido a Q15 en combo.",
        precio: 45,
        imagen: "combo-completo-batido.jpeg",
        agotado: false,
        sinPersonalizacion: true,
        permiteMasSabor: false,
        etiqueta: "¡EXCLUSIVO!",
        categorias: {}
    }
];


/* ==================================
2. CONFIGURACIÓN DE INGREDIENTES
================================== */

const ingredientes = {
    frutas: [
        { nombre: "Melocotón", agotado: false },
        { nombre: "Banano", agotado: false },
        { nombre: "Fresa", agotado: false }
    ],

    complementos: [
        { nombre: "Crema batida", agotado: false },
        { nombre: "Crema de avellanas", agotado: false }
    ],

    esencias: [
        { nombre: "Chocolate", agotado: false },
        { nombre: "Dulce de Leche", agotado: false },
        { nombre: "Esencia de Fresa", agotado: false },
        { nombre: "Leche Condensada", agotado: false }
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

    .etiqueta-exclusivo {
        display: inline-block;
        margin: 6px 0;
        padding: 5px 10px;
        border-radius: 999px;
        background: #fff1cc;
        color: #8a5200;
        font-weight: bold;
        font-size: 0.85rem;
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

    .control-fruta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 9px;
        background: #f5f5f5;
    }

    .cantidad-fruta {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .cantidad-fruta button {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 7px;
        background: #d8eaff;
        cursor: pointer;
        font-size: 18px;
    }

    .cantidad-fruta button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .encabezado-item-carrito {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
    }

    .encabezado-item-carrito button {
        padding: 7px 10px;
        border: none;
        border-radius: 7px;
        background: #d8eaff;
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

        const textoBoton = producto.sinPersonalizacion
            ? "Agregar al pedido"
            : "Personalizar y agregar";

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            ${
                producto.etiqueta
                ? `<span class="etiqueta-exclusivo">${producto.etiqueta}</span>`
                : ""
            }

            <p>${producto.descripcion}</p>

            <span class="precio">
                Q${producto.precio.toFixed(2)}
            </span>

            ${
                producto.agotado
                ? `<span class="agotado">¡Agotado!</span>`
                : `<button class="boton-agregar" data-id="${producto.id}">
                    ${textoBoton}
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

    if (indice !== null) {
        const anterior = carrito[indice];

        selecciones = JSON.parse(
            JSON.stringify(anterior.selecciones || {})
        );

        const inputMasSabor = document.getElementById("mas-sabor");

        if (inputMasSabor) {
            inputMasSabor.checked = !!anterior.masSabor;
        }
    } else {
        selecciones = {};

        if (producto.categorias) {
            Object.keys(producto.categorias).forEach(categoria => {
                selecciones[categoria] = [];
            });
        }

        const inputMasSabor = document.getElementById("mas-sabor");

        if (inputMasSabor) {
            inputMasSabor.checked = false;
        }
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

    if (!productoActual.categorias) return;

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

            const botonSin = document.createElement("button");
            botonSin.type = "button";
            botonSin.className = "opcion-ingrediente opcion-sin";

            botonSin.textContent =
                `Sin ${nombresCategorias[categoria].toLowerCase()}`;

            if (
                selecciones[categoria] &&
                selecciones[categoria].length === 0
            ) {
                botonSin.classList.add("seleccionado");
            }

            botonSin.addEventListener("click", () => {
                selecciones[categoria] = [];
                mostrarOpciones();
            });

            opciones.appendChild(botonSin);

            if (categoria === "frutas") {

                ingredientes.frutas.forEach(ingrediente => {

                    const cantidad = (selecciones.frutas || []).filter(
                        nombre => nombre === ingrediente.nombre
                    ).length;

                    const fila = document.createElement("div");
                    fila.className = "control-fruta";

                    const nombre = document.createElement("span");

                    nombre.textContent = ingrediente.agotado
                        ? `${ingrediente.nombre} (Agotado)`
                        : ingrediente.nombre;

                    if (ingrediente.agotado) {
                        nombre.className = "ingrediente-agotado";
                    }

                    const controles = document.createElement("div");
                    controles.className = "cantidad-fruta";

                    const menos = document.createElement("button");
                    menos.type = "button";
                    menos.textContent = "−";
                    menos.disabled = cantidad === 0;

                    menos.addEventListener("click", () => {
                        const posicion =
                            (selecciones.frutas || []).indexOf(
                                ingrediente.nombre
                            );

                        if (posicion !== -1) {
                            selecciones.frutas.splice(posicion, 1);
                            mostrarOpciones();
                        }
                    });

                    const numero = document.createElement("span");
                    numero.textContent = cantidad;

                    const mas = document.createElement("button");
                    mas.type = "button";
                    mas.textContent = "+";

                    mas.disabled =
                        ingrediente.agotado ||
                        (selecciones.frutas || []).length >= limite;

                    mas.addEventListener("click", () => {
                        if (
                            !ingrediente.agotado &&
                            (selecciones.frutas || []).length < limite
                        ) {
                            if (!selecciones.frutas) {
                                selecciones.frutas = [];
                            }

                            selecciones.frutas.push(ingrediente.nombre);
                            mostrarOpciones();
                        }
                    });

                    controles.appendChild(menos);
                    controles.appendChild(numero);
                    controles.appendChild(mas);

                    fila.appendChild(nombre);
                    fila.appendChild(controles);

                    opciones.appendChild(fila);
                });

            } else {

                ingredientes[categoria].forEach(ingrediente => {

                    const boton = document.createElement("button");
                    boton.type = "button";
                    boton.className = "opcion-ingrediente";

                    const seleccionado =
                        (selecciones[categoria] || []).includes(
                            ingrediente.nombre
                        );

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

                    if (
                        (selecciones[categoria] || []).length >= limite &&
                        !seleccionado
                    ) {
                        boton.disabled = true;
                    }

                    boton.addEventListener("click", () => {

                        if (ingrediente.agotado) return;

                        if (!selecciones[categoria]) {
                            selecciones[categoria] = [];
                        }

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
            }

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

        const inputMasSabor = document.getElementById("mas-sabor");

        const masSabor = inputMasSabor
            ? inputMasSabor.checked
            : false;

        const precioFinal =
            productoActual.precio +
            (masSabor ? PRECIO_MAS_SABOR : 0);

        const nuevoProducto = {
            id: productoActual.id,
            nombre: productoActual.nombre,
            precioBase: productoActual.precio,
            precio: precioFinal,
            masSabor: masSabor,
            permiteMasSabor: productoActual.permiteMasSabor,

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

    if (!producto || producto.agotado) return;

    if (producto.sinPersonalizacion) {

        const nuevoProducto = {
            id: producto.id,
            nombre: producto.nombre,
            precioBase: producto.precio,
            precio: producto.precio,
            masSabor: false,
            permiteMasSabor: false,
            selecciones: {}
        };

        carrito.push(nuevoProducto);
        actualizarResumen();

    } else {
        abrirPersonalizador(producto);
    }
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

        const encabezado = document.createElement("div");
        encabezado.className = "encabezado-item-carrito";

        const titulo = document.createElement("strong");

        titulo.textContent =
            `${producto.nombre} - Q${producto.precio.toFixed(2)}`;

        const repetir = document.createElement("button");
        repetir.type = "button";
        repetir.textContent = "Pedir lo mismo";

        repetir.addEventListener("click", () => {
            const copia = JSON.parse(JSON.stringify(producto));
            carrito.push(copia);
            actualizarResumen();
        });

        encabezado.appendChild(titulo);
        encabezado.appendChild(repetir);

        elemento.appendChild(encabezado);

        // Mostrar ingredientes seleccionados.
        if (
            producto.selecciones &&
            Object.keys(producto.selecciones).length > 0
        ) {
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
        }

        // Mostrar ¡Más Sabor! si el producto lo permite.
        if (producto.permiteMasSabor !== false) {
            const sabor = document.createElement("p");

            sabor.textContent = producto.masSabor
                ? "¡Más Sabor!: Chispas de chocolate (+Q5)"
                : "¡Más Sabor!: No";

            elemento.appendChild(sabor);
        }

        // Botones de edición y eliminación.
        const acciones = document.createElement("div");
        acciones.className = "acciones-carrito";

        if (producto.permiteMasSabor !== false) {
            const editar = document.createElement("button");
            editar.type = "button";
            editar.textContent = "Editar";

            editar.addEventListener("click", () => {
                const original = productos.find(
                    p => p.id === producto.id
                );

                abrirPersonalizador(original, indice);
            });

            acciones.appendChild(editar);
        }

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.textContent = "Quitar";

        eliminar.addEventListener("click", () => {
            carrito.splice(indice, 1);
            actualizarResumen();
        });

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

            if (
                producto.selecciones &&
                Object.keys(producto.selecciones).length > 0
            ) {
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
            }

            if (producto.permiteMasSabor !== false) {
                mensaje += producto.masSabor
                    ? "¡Más Sabor!: Chispas de chocolate (+Q5)\n"
                    : "¡Más Sabor!: No\n";
            }

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

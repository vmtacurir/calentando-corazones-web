"use strict";

const fotos = Object.freeze([
  {
    archivo: "imagenes/galeria/tecito-pan.webp",
    titulo: "Compartiendo té y pan",
    descripcion: "Entrega de té y pan durante una actividad solidaria"
  },
  {
    archivo: "imagenes/galeria/equipo-solidario.webp",
    titulo: "Un equipo unido para ayudar",
    descripcion: "Equipo de voluntariado junto a donaciones y alimentos preparados"
  },
  {
    archivo: "imagenes/galeria/encuentro-comunidad.webp",
    titulo: "Encuentro con la comunidad",
    descripcion: "Actividad compartida con niñas, niños y familias de la comunidad"
  },
  {
    archivo: "imagenes/galeria/actividad-comunitaria.webp",
    titulo: "Momentos que nos unen",
    descripcion: "Actividad comunitaria con participantes reunidos en un círculo"
  },
  {
    archivo: "imagenes/galeria/familia-voluntaria.webp",
    titulo: "Somos una gran familia",
    descripcion: "Fotografía grupal de participantes y voluntarios"
  },
  {
    archivo: "imagenes/galeria/entrega-donaciones.webp",
    titulo: "Solidaridad que se comparte",
    descripcion: "Entrega de productos y donaciones a una institución de la comunidad"
  },
  {
    archivo: "imagenes/galeria/actividad-ninos.webp",
    titulo: "Alegría para las niñas y los niños",
    descripcion: "Actividad recreativa realizada con niñas y niños"
  },
  {
    archivo: "imagenes/galeria/bienestar-animal.webp",
    titulo: "Cuidamos a quienes lo necesitan",
    descripcion: "Actividad de cuidado y alimentación de animales"
  }
]);

function inicializarMenu() {
  const cabecera = document.querySelector(".cabecera");
  const boton = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu");

  if (!cabecera || !boton || !menu) {
    return;
  }

  document.documentElement.classList.add("js");
  const icono = boton.querySelector("[aria-hidden]");

  function cerrarMenu() {
    menu.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú");
    if (icono) {
      icono.textContent = "☰";
    }
  }

  function alternarMenu() {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
    boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    if (icono) {
      icono.textContent = abierto ? "×" : "☰";
    }
  }

  boton.addEventListener("click", alternarMenu);
  menu.querySelectorAll("a").forEach((enlace) => enlace.addEventListener("click", cerrarMenu));

  document.addEventListener("click", (evento) => {
    if (menu.classList.contains("abierto") && !cabecera.contains(evento.target)) {
      cerrarMenu();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && menu.classList.contains("abierto")) {
      cerrarMenu();
      boton.focus();
    }
  });

  const escritorio = window.matchMedia("(min-width: 801px)");
  const manejarCambioDeAncho = (evento) => {
    if (evento.matches) {
      cerrarMenu();
    }
  };

  if (typeof escritorio.addEventListener === "function") {
    escritorio.addEventListener("change", manejarCambioDeAncho);
  } else {
    escritorio.addListener(manejarCambioDeAncho);
  }
}

function inicializarGaleria() {
  const seccion = document.querySelector("#galeria");
  const imagen = document.querySelector("#imagen-galeria");
  const titulo = document.querySelector("#texto-foto");
  const numero = document.querySelector("#numero");
  const anterior = document.querySelector("#anterior");
  const siguiente = document.querySelector("#siguiente");
  const puntosContenedor = document.querySelector("#puntos-galeria");
  const control = document.querySelector("#control-carrusel");
  const iconoControl = document.querySelector("#icono-control-carrusel");
  const textoControl = document.querySelector("#texto-control-carrusel");
  const estado = document.querySelector("#estado-galeria");

  if (
    !seccion ||
    !imagen ||
    !titulo ||
    !numero ||
    !anterior ||
    !siguiente ||
    !puntosContenedor ||
    !control ||
    !iconoControl ||
    !textoControl ||
    !estado ||
    fotos.length === 0
  ) {
    return;
  }

  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  const puntos = fotos.map((foto, indice) => {
    const punto = document.createElement("button");
    punto.className = "punto";
    punto.type = "button";
    punto.setAttribute("aria-label", "Mostrar imagen " + (indice + 1) + ": " + foto.titulo);
    puntosContenedor.append(punto);
    return punto;
  });

  let actual = 0;
  let temporizador = null;
  let pausadoPorUsuario = false;
  let punteroDentro = false;
  let focoDentro = false;
  let reanudadoConFoco = false;
  let seccionVisible = typeof window.IntersectionObserver !== "function";

  function detenerCarrusel() {
    if (temporizador !== null) {
      window.clearInterval(temporizador);
      temporizador = null;
    }
  }

  function puedeReproducirse() {
    return (
      !pausadoPorUsuario &&
      !movimientoReducido.matches &&
      !document.hidden &&
      !punteroDentro &&
      (!focoDentro || reanudadoConFoco) &&
      seccionVisible
    );
  }

  function actualizarReproduccion() {
    detenerCarrusel();
    if (puedeReproducirse()) {
      temporizador = window.setInterval(() => mostrarFoto(actual + 1, false), 6000);
    }
  }

  function precargarSiguiente() {
    const precarga = new Image();
    precarga.src = fotos[(actual + 1) % fotos.length].archivo;
  }

  function mostrarFoto(indice, anunciar) {
    actual = (indice + fotos.length) % fotos.length;
    const foto = fotos[actual];

    imagen.src = foto.archivo;
    imagen.alt = foto.descripcion;
    titulo.textContent = foto.titulo;
    numero.textContent =
      String(actual + 1).padStart(2, "0") + " / " + String(fotos.length).padStart(2, "0");

    puntos.forEach((punto, posicion) => {
      const activo = posicion === actual;
      punto.classList.toggle("activo", activo);
      if (activo) {
        punto.setAttribute("aria-current", "true");
      } else {
        punto.removeAttribute("aria-current");
      }
    });

    if (anunciar) {
      estado.textContent =
        "Imagen " + (actual + 1) + " de " + fotos.length + ": " + foto.titulo;
    }

    precargarSiguiente();
  }

  function cambiarFotoManualmente(indice) {
    mostrarFoto(indice, true);
    actualizarReproduccion();
  }

  function actualizarControl() {
    control.disabled = movimientoReducido.matches;
    control.setAttribute("aria-pressed", String(pausadoPorUsuario));

    if (movimientoReducido.matches) {
      iconoControl.textContent = "—";
      textoControl.textContent = "Movimiento reducido activado";
    } else if (pausadoPorUsuario) {
      iconoControl.textContent = "▶";
      textoControl.textContent = "Reanudar galería";
    } else {
      iconoControl.textContent = "Ⅱ";
      textoControl.textContent = "Pausar galería";
    }
  }

  anterior.hidden = false;
  siguiente.hidden = false;
  puntosContenedor.hidden = false;
  control.hidden = false;

  anterior.addEventListener("click", () => cambiarFotoManualmente(actual - 1));
  siguiente.addEventListener("click", () => cambiarFotoManualmente(actual + 1));
  puntos.forEach((punto, indice) => {
    punto.addEventListener("click", () => cambiarFotoManualmente(indice));
  });

  control.addEventListener("click", () => {
    pausadoPorUsuario = !pausadoPorUsuario;
    reanudadoConFoco = !pausadoPorUsuario;
    actualizarControl();
    actualizarReproduccion();
  });

  seccion.addEventListener("mouseenter", () => {
    punteroDentro = true;
    actualizarReproduccion();
  });

  seccion.addEventListener("mouseleave", () => {
    punteroDentro = false;
    actualizarReproduccion();
  });

  seccion.addEventListener("focusin", (evento) => {
    focoDentro = true;
    if (evento.target !== control) {
      reanudadoConFoco = false;
    }
    actualizarReproduccion();
  });

  seccion.addEventListener("focusout", (evento) => {
    if (!seccion.contains(evento.relatedTarget)) {
      focoDentro = false;
      reanudadoConFoco = false;
      actualizarReproduccion();
    }
  });

  document.addEventListener("visibilitychange", actualizarReproduccion);

  const manejarCambioMovimiento = () => {
    actualizarControl();
    actualizarReproduccion();
  };

  if (typeof movimientoReducido.addEventListener === "function") {
    movimientoReducido.addEventListener("change", manejarCambioMovimiento);
  } else {
    movimientoReducido.addListener(manejarCambioMovimiento);
  }

  if (typeof window.IntersectionObserver === "function") {
    const observador = new IntersectionObserver(
      (entradas) => {
        seccionVisible = entradas.some(
          (entrada) => entrada.isIntersecting && entrada.intersectionRatio >= 0.2
        );
        actualizarReproduccion();
      },
      { threshold: [0, 0.2] }
    );
    observador.observe(seccion);
  }

  mostrarFoto(0, false);
  actualizarControl();
  actualizarReproduccion();
}

function inicializarFlyer() {
  const flyerActual = document.querySelector("#flyer-actual");
  const flyerVacio = document.querySelector("#flyer-vacio");
  const flyerAbrir = document.querySelector("#flyer-abrir");
  const flyerModal = document.querySelector("#flyer-modal");
  const flyerCerrar = document.querySelector("#flyer-cerrar");
  const actividadEstado = document.querySelector("#actividad-estado");
  const detallesActividad = document.querySelector("#detalles-actividad");

  if (
    !flyerActual ||
    !flyerVacio ||
    !flyerAbrir ||
    !flyerModal ||
    !flyerCerrar ||
    !actividadEstado ||
    !detallesActividad
  ) {
    return;
  }

  const textoEstadoDisponible = actividadEstado.textContent;

  function mostrarFlyerDisponible() {
    flyerAbrir.hidden = false;
    flyerVacio.hidden = true;
    detallesActividad.hidden = false;
    actividadEstado.textContent = textoEstadoDisponible;
  }

  function mostrarFlyerProvisional() {
    flyerAbrir.hidden = true;
    flyerVacio.hidden = false;
    detallesActividad.hidden = true;
    actividadEstado.textContent = "Próxima publicación";
  }

  flyerActual.addEventListener("load", mostrarFlyerDisponible);
  flyerActual.addEventListener("error", mostrarFlyerProvisional);

  if (flyerActual.complete) {
    if (flyerActual.naturalWidth > 0) {
      mostrarFlyerDisponible();
    } else {
      mostrarFlyerProvisional();
    }
  }

  flyerAbrir.addEventListener("click", () => {
    if (typeof flyerModal.showModal === "function") {
      flyerModal.showModal();
      flyerCerrar.focus();
    } else {
      window.open(flyerActual.currentSrc || flyerActual.src, "_blank", "noopener,noreferrer");
    }
  });

  flyerCerrar.addEventListener("click", () => flyerModal.close());
  flyerModal.addEventListener("click", (evento) => {
    if (evento.target === flyerModal) {
      flyerModal.close();
    }
  });
  flyerModal.addEventListener("close", () => flyerAbrir.focus());
}

function actualizarAnio() {
  const anio = document.querySelector("#anio");
  if (anio) {
    anio.textContent = String(new Date().getFullYear());
  }
}

inicializarMenu();
inicializarGaleria();
inicializarFlyer();
actualizarAnio();

const menuBoton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
menuBoton.addEventListener('click', () => {
  const abierto = menu.classList.toggle('abierto');
  menuBoton.setAttribute('aria-expanded', String(abierto));
  menuBoton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('abierto');
  menuBoton.setAttribute('aria-expanded', 'false');
  menuBoton.setAttribute('aria-label', 'Abrir menú');
}));
const fotos = [
  {
    archivo: 'imagenes/galeria/tecito-pan.webp',
    titulo: 'Compartiendo té y pan',
    descripcion: 'Entrega de té y pan durante una actividad solidaria'
  },
  {
    archivo: 'imagenes/galeria/equipo-solidario.webp',
    titulo: 'Un equipo unido para ayudar',
    descripcion: 'Equipo de voluntariado junto a donaciones y alimentos preparados'
  },
  {
    archivo: 'imagenes/galeria/encuentro-comunidad.webp',
    titulo: 'Encuentro con la comunidad',
    descripcion: 'Actividad compartida con niñas, niños y familias de la comunidad'
  },
  {
    archivo: 'imagenes/galeria/actividad-comunitaria.webp',
    titulo: 'Momentos que nos unen',
    descripcion: 'Actividad comunitaria con participantes reunidos en un círculo'
  },
  {
    archivo: 'imagenes/galeria/familia-voluntaria.webp',
    titulo: 'Somos una gran familia',
    descripcion: 'Fotografía grupal de participantes y voluntarios'
  },
  {
    archivo: 'imagenes/galeria/entrega-donaciones.webp',
    titulo: 'Solidaridad que se comparte',
    descripcion: 'Entrega de productos y donaciones a una institución de la comunidad'
  },
  {
    archivo: 'imagenes/galeria/actividad-ninos.webp',
    titulo: 'Alegría para las niñas y los niños',
    descripcion: 'Actividad recreativa realizada con niñas y niños'
  },
  {
    archivo: 'imagenes/galeria/bienestar-animal.webp',
    titulo: 'Cuidamos a quienes lo necesitan',
    descripcion: 'Actividad de cuidado y alimentación de animales'
  }
];
let actual=0;
const imagenGaleria=document.querySelector('#imagen-galeria');
const seccionGaleria=document.querySelector('#galeria');
const puntos=[...document.querySelectorAll('.punto')];
let temporizadorGaleria;

function mostrarFoto(indice){
  actual=(indice+fotos.length)%fotos.length;
  imagenGaleria.src=fotos[actual].archivo;
  imagenGaleria.alt=fotos[actual].descripcion;
  document.querySelector('#texto-foto').textContent=fotos[actual].titulo;
  document.querySelector('#numero').textContent=`${String(actual+1).padStart(2,'0')} / ${String(fotos.length).padStart(2,'0')}`;
  puntos.forEach((p,i)=>{
    const activo=i===actual;
    p.classList.toggle('activo',activo);
    p.toggleAttribute('aria-current',activo);
  });
}

function detenerCarrusel(){
  window.clearInterval(temporizadorGaleria);
}

function iniciarCarrusel(){
  detenerCarrusel();
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  temporizadorGaleria=window.setInterval(()=>mostrarFoto(actual+1),3000);
}

function cambiarFotoManualmente(indice){
  mostrarFoto(indice);
  iniciarCarrusel();
}

document.querySelector('#anterior').addEventListener('click',()=>cambiarFotoManualmente(actual-1));
document.querySelector('#siguiente').addEventListener('click',()=>cambiarFotoManualmente(actual+1));
puntos.forEach((p,i)=>p.addEventListener('click',()=>cambiarFotoManualmente(i)));

seccionGaleria.addEventListener('mouseenter',detenerCarrusel);
seccionGaleria.addEventListener('mouseleave',iniciarCarrusel);
seccionGaleria.addEventListener('focusin',detenerCarrusel);
seccionGaleria.addEventListener('focusout',evento=>{
  if(!seccionGaleria.contains(evento.relatedTarget)) iniciarCarrusel();
});
document.addEventListener('visibilitychange',()=>{
  document.hidden ? detenerCarrusel() : iniciarCarrusel();
});

iniciarCarrusel();

const flyerActual=document.querySelector('#flyer-actual');
const flyerVacio=document.querySelector('#flyer-vacio');
const flyerAbrir=document.querySelector('#flyer-abrir');
const flyerModal=document.querySelector('#flyer-modal');
const flyerCerrar=document.querySelector('#flyer-cerrar');

function mostrarFlyerDisponible(){
  flyerAbrir.hidden=false;
  flyerVacio.hidden=true;
}

function mostrarFlyerProvisional(){
  flyerAbrir.hidden=true;
  flyerVacio.hidden=false;
}

flyerActual.addEventListener('load',mostrarFlyerDisponible);
flyerActual.addEventListener('error',mostrarFlyerProvisional);
if(flyerActual.complete){
  flyerActual.naturalWidth ? mostrarFlyerDisponible() : mostrarFlyerProvisional();
}

flyerAbrir.addEventListener('click',()=>flyerModal.showModal());
flyerCerrar.addEventListener('click',()=>flyerModal.close());
flyerModal.addEventListener('click',evento=>{
  if(evento.target===flyerModal) flyerModal.close();
});

document.querySelector('#anio').textContent=new Date().getFullYear();

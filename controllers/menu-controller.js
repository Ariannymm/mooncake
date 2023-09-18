// Código para ocultar el texto sobrante de la sección POLÍTICA DE PRIVACIDAD:

// Si el estilo maxHeight del párrafo tiene un valor se establece "null", se elimina la clase "show" y se actualiza el contenido del elemento a "Ver más".

// Si el estilo maxHeight del párrafo no tiene un valor se establece en la altura total del párrafo, se agrega la clase "show" y se actualiza el contenido del elemento a "Ver menos".

document.querySelector('.see-more').addEventListener('click', function(e) {
    e.preventDefault();
    var paragraph = document.querySelector('#hidden-text');
    var seeMore = document.querySelector('.see-more');

    if (paragraph.style.maxHeight) {
      paragraph.style.maxHeight = null;
      seeMore.classList.remove('show');
      seeMore.innerHTML = 'Ver más <span class="arrow">&#9660;</span>';
    } else {
      paragraph.style.maxHeight = paragraph.scrollHeight + 'rem';
      seeMore.classList.add('show');
      seeMore.innerHTML = 'Ver menos <span class="arrow">&#9650;</span>';
    }
  });
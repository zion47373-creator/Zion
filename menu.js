// =====================================================
// CineStream - Menú compartido
// Funciona en index.html y en páginas como 465.html
// =====================================================

(function () {
  const menu = document.getElementById("menu");

  if (!menu) return;

  // Detectar si estamos en index.html
  const esIndex =
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname.endsWith("/");

  // Ruta hacia index.html
  const rutaIndex = esIndex ? "index.html" : "../index.html";

  // -----------------------------------------------------
  // Crear menú
  // -----------------------------------------------------

  menu.innerHTML = `
    <div class="menu-head">
      <strong>CineStream</strong>

      <button
        class="close"
        id="btnCerrarMenu"
        type="button"
        aria-label="Cerrar menú"
      >
        ×
      </button>
    </div>

    <div class="section-label">
      Contenido
    </div>

    <div class="filter-grid">

      <button
        class="filter full"
        data-genero="todos"
        type="button"
      >
        ✨ Explorar todo
      </button>

      <button
        class="filter"
        data-genero="peliculas"
        type="button"
      >
        🎬 Películas
      </button>

      <button
        class="filter"
        data-genero="series"
        type="button"
      >
        📺 Series
      </button>

      <button
        class="filter full"
        data-genero="animes"
        type="button"
      >
        🇯🇵 Animes
      </button>

    </div>

    <div class="section-label">
      Géneros
    </div>

    <div class="filter-grid">

      <button class="filter" data-genero="accion" type="button">
        Acción
      </button>

      <button class="filter" data-genero="aventura" type="button">
        Aventura
      </button>

      <button class="filter" data-genero="ciencia ficcion" type="button">
        Ciencia ficción
      </button>

      <button class="filter" data-genero="comedia" type="button">
        Comedia
      </button>

      <button class="filter" data-genero="crimen" type="button">
        Crimen
      </button>

      <button class="filter" data-genero="drama" type="button">
        Drama
      </button>

      <button class="filter" data-genero="fantasia" type="button">
        Fantasía
      </button>

      <button class="filter" data-genero="misterio" type="button">
        Misterio
      </button>

      <button class="filter" data-genero="romance" type="button">
        Romance
      </button>

      <button class="filter" data-genero="suspenso" type="button">
        Suspenso
      </button>

      <button class="filter" data-genero="terror" type="button">
        Terror
      </button>

      <button class="filter" data-genero="kdrama" type="button">
        K-Drama
      </button>

    </div>
  `;

  // -----------------------------------------------------
  // Comportamiento de los botones
  // -----------------------------------------------------

  const botones = menu.querySelectorAll(".filter");

  botones.forEach(function (boton) {

    boton.addEventListener("click", function () {

      const genero = boton.dataset.genero;

      // ================================================
      // Si estamos en index.html
      // ================================================
      if (esIndex) {

        // El index ya tiene su propio sistema de filtros.
        // Solo avisamos al index del género seleccionado.
        const evento = new CustomEvent("cineStreamGenero", {
          detail: {
            genero: genero
          }
        });

        document.dispatchEvent(evento);

        return;
      }

      // ================================================
      // Si estamos en 465.html u otra página
      // ================================================

      const url = new URL(
        rutaIndex,
        window.location.href
      );

      if (genero && genero !== "todos") {
        url.searchParams.set("genero", genero);
      }

      window.location.href = url.href;

    });

  });

})();
// CineStream - menú centralizado
(function () {
  const menu = document.getElementById('menu');
  if (!menu) return;
  const root = '../index.html';
  menu.innerHTML = `
    <h2 style="color:var(--primary); font-weight:800; margin-bottom:20px;">CineStream</h2>
    <div class="seccion-label">Navegación</div>
    <div class="grid-filtros">
      <a href="${root}" class="filtro filtro-full">Explorar Todo</a>
      <a href="${root}?genero=peliculas" class="filtro">Películas</a>
      <a href="${root}?genero=series" class="filtro">Series</a>
      <a href="${root}?genero=animes" class="filtro filtro-full">Animes</a>
    </div>
    <div class="seccion-label">Géneros</div>
    <div class="grid-filtros">
      <a href="${root}?genero=accion" class="filtro">Acción</a>
      <a href="${root}?genero=aventura" class="filtro">Aventura</a>
      <a href="${root}?genero=comedia" class="filtro">Comedia</a>
      <a href="${root}?genero=drama" class="filtro">Drama</a>
      <a href="${root}?genero=romance" class="filtro">Romance</a>
      <a href="${root}?genero=terror" class="filtro">Terror</a>
      <a href="${root}?genero=suspenso" class="filtro">Suspenso</a>
      <a href="${root}?genero=misterio" class="filtro">Misterio</a>
      <a href="${root}?genero=ciencia ficcion" class="filtro">Ciencia ficción</a>
      <a href="${root}?genero=fantasia" class="filtro">Fantasía</a>
      <a href="${root}?genero=kdrama" class="filtro">K-Drama</a>
    </div>`;
})();

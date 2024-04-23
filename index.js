const card = document.getElementById('movies'); //capturo el div donde se pintan las peliculas 
const nextButton = document.getElementById('nextButton'); // capturo el boton para la siguiente pagina
const aclamadas = document.getElementById('aclamadas') //capturo el contenedor de peliculas aclamadas
let totalPages;  //inicializo las paginas

let currentPage = 1; //pagina actual
const moviesPerPage = 8; // peliculas que voy a mostrar por pagina

const getAndPaintMovies = () => {
    fetch('https://my-json-server.typicode.com/IsmaelAxel/API_Pelis/peliculas') //fetch a mi endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no pudo ser completada'); //manejo el error
            }
            return response.json();
        })
        .then(data => {        
            totalPages = Math.ceil(data.length / moviesPerPage); // calculo numero de paginas para mostrar todas las peliculas
            const startIndex = (currentPage - 1) * moviesPerPage; //calculo indice inicial de la primera pelicula de la pacgina actual
            const endIndex = startIndex + moviesPerPage;          //calculo el indice final de la ultima pelicula de la pagina actual
            const moviesToDisplay = data.slice(startIndex, endIndex); // devuelvo un nuevo array que contienen las peliculas en el rango definido

            card.innerHTML = '';
            moviesToDisplay.forEach((movie) => { //itero el array para generar la plantilla por cada pelicula
                const template = `
                    <div class="col-lg-3 col-md-6 col-12 mb-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${movie.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${movie.Title}</p>
                            </div>
                        </div>
                    </div>
                `;
                card.innerHTML += template;
            });
        })
        .catch(error => console.log(error))
};

nextButton.addEventListener('click', () => { //atiendo el evento click
    currentPage++;
    if (currentPage > totalPages) { //valido que la pagina actual no supere la cantidad total y reinicio el currentpage al 1
        currentPage = 1;
    }
    getAndPaintMovies();
});




const paintBestMovies = () => {
    fetch('https://my-json-server.typicode.com/IsmaelAxel/API_Pelis/peliculas')
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no pudo ser completada')
            }
            return response.json()
        })
        .then(data => {
            console.log(data);

            // Función para mezclar aleatoriamente el array de películas
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
                }
                return array;
            };

            // Mezclar aleatoriamente el array de películas
            const shuffledMovies = shuffleArray(data);

            // Ahora shuffledMovies contiene las películas en un orden aleatorio
            console.log(shuffledMovies);

            aclamadas.innerHTML = '';

            shuffledMovies.forEach((movie) =>{

                const template = `
                <div class="div_animation"><a href="${movie.Trailer}"><img
                src="${movie.Poster}" alt="" class="caja"></a></div>
                `;

                aclamadas.innerHTML += template;

            })           
        })
        .catch(error => console.log(error))
}



window.addEventListener('load', function(){
    paintBestMovies()
    getAndPaintMovies()
}); // al cargar la pagina llamo a las funciónes

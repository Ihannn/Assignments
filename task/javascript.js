const url = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1"
const main  = document.getElementById('content')
const imgUrl = "https://image.tmdb.org/t/p/w1280"

const getMovies = (url) => new Promise((resolve, reject) => {
    fetch(url).then((response) => response.json())
    .then((data) => resolve(data.results))
    .catch((error) => reject(error))
})

const showMovieList = async () => {
    try {
        const movies = await getMovies(url)
        movies.forEach((movie) => {
            const {poster_path, title, release_date, popularity} = movie
            const movieEl = document.createElement("div")
            console.log(imgUrl + poster_path)
            movieEl.innerHTML = `
                <div class="movie-box">
                    <div class="img-box">
                        <img  
                        src="${imgUrl + poster_path}"
                        >
                    </div>
                    <div class="movie-info">
                    <h3>${title}</h3>
                    <p>${release_date}</p>
                    </div>
                </div>
            `
            main.appendChild(movieEl)
        })
    } catch(error) {
        
    }
}

const sortMovies = async (value) => {
    try {
        const movies = await getMovies(url)
        switch(value) {
            case "asc":
                movies.sort((a,b) => a.popularity - b.popularity)
                showMovieList(movies)
                break
            case "dsc":
                movies.sort((a,b) => b.popularity - a.popularity)
                showMovieList(movies)
                break
            default:
                break
        }
    } catch(error) {
        return error
    }
}

showMovieList()



const apiKey = ''; // Replace with your TMDb API key
const movieList = document.getElementById('movie-list');
const movieModal = document.getElementById('movie-modal');
const movieVideo = document.getElementById('movie-video');
const videoSource = document.getElementById('video-source');
const movieTitle = document.getElementById('movie-title');
const movieDescription = document.getElementById('movie-description');
const movieReleaseDate = document.getElementById('movie-release-date');
const movieGenres = document.getElementById('movie-genres');
const closeModal = document.querySelector('.close');

document.getElementById('theme-icon').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value;
    searchMovies(query);
});

function searchMovies(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieCard.appendChild(moviePoster);

        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.innerHTML = '▶';
        playButton.addEventListener('click', () => {
            fetchMovieDetails(movie.id);
        });
        movieCard.appendChild(playButton);

        movieList.appendChild(movieCard);
    });
}

function fetchMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            playMovie(data);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function playMovie(movie) {
    movieTitle.textContent = movie.title;
    movieDescription.textContent = movie.overview;
    movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
    movieGenres.textContent = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;

    // TODO - Replace with actual video URL from your hosted server or streaming service
    videoSource.src = 'https://example.com/videos/' + movie.id + '.mp4';
    movieVideo.load();
    movieModal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
    movieModal.style.display = 'none';
    movieVideo.pause();
});

window.addEventListener('click', (event) => {
    if (event.target == movieModal) {
        movieModal.style.display = 'none';
        movieVideo.pause();
    }
});

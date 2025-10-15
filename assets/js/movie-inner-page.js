const movie = JSON.parse(sessionStorage.getItem("selectedMovie"));
const movieTitleEl = document.getElementById("movie-title")
const movieDesc = document.getElementById("movie-desc")
const trailerFrame = document.querySelector("iframe")
console.log(movieTitleEl , movie);


if (movie) {
  movieTitleEl.textContent = movie.title;
  movieDesc.textContent = movie.desc;

  // If trailer is available, embed it
  if (movie.trailers) {
    const videoId = movie.trailers.split("v=")[1];    
    trailerFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&start=10`;
  }

  // Change poster background dynamically if needed
  // document.querySelector('.some-bg').style.backgroundImage = `url(${movie.poster})`;
} else {
  console.warn("No movie data found in sessionStorage");
}

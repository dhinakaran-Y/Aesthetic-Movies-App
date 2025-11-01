import { movieCardDisPopup } from "./movie-card-dis-popup.js";
import { scrollEventFn } from "./scrollEvent.js";
import {movieShowerFn} from "./getHollywoodMoviesApi.js";

await scrollEventFn();
//brightness-60 added
//chose correct color for movie description.
// await getTopRatedMovies();
// await getTopRatedWithTrailers();
await movieShowerFn(1 , 'top');
// await getMoviesApi(20);
await movieShowerFn(2, "tamil");
await movieShowerFn(3, "malayalam");
await movieShowerFn(4, "hindi");
await movieShowerFn(5, "english");
//below for work
await movieCardDisPopup();

// Handle click and redirect
document.addEventListener("click", (e) => {

  const targeted = e.target

  if(e.target.classList.contains("watch-btn")){    
    const trailerKey = targeted.dataset.trailerKey;
    const movieTitle = targeted.parentElement.children[0].textContent;
    const movieDesc = targeted.parentElement.children[1].innerText;

    const trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`;

    // set Session Storage
    sessionStorage.setItem("title", movieTitle);
    sessionStorage.setItem("trailer", trailerLink);
    sessionStorage.setItem("desc", movieDesc);
    sessionStorage.setItem("movieCategory", "new");
    window.location.href = "./movie-inner-page.html";
    
  }

  const movieCard = document.getElementsByClassName("movie-card")
  if(movieCard){
    const link = e.target.closest(".movie-card-link");
    const movieRowEl = e.target.closest(".movieRow");
  // to get movie row's number
  // const movieRowNo = movieRowEl.id.split("-")[1];
  const movieCategory = movieRowEl.dataset.category;
  
  if (link){
    const data = link.dataset;
    // console.log(data);

    // console.log(typeof(data.moviePoster));
    // const movie = data.movieTitle;

    sessionStorage.setItem("title", data.movieTitle);
    // sessionStorage.setItem("poster", data.moviePoster);
    sessionStorage.setItem("trailer", data.movieTrailers);
    sessionStorage.setItem("desc", data.movieDesc);
    sessionStorage.setItem("movieCategory", movieCategory);
    window.location.href = "./movie-inner-page.html";
  }
  // else{
  //   alert("404")
  // }
}
  
});

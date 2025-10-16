import { movieCardDisPopup } from "./movie-card-dis-popup.js";
import { getMoviesApi } from "./getMoviesApi.js";
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
  const link = e.target.closest(".movie-card-link");
  
  if (link){
    const data = link.dataset;
    // console.log(data);

    // console.log(typeof(data.moviePoster));
    // const movie = data.movieTitle;

    sessionStorage.setItem("title", data.movieTitle);
    // sessionStorage.setItem("poster", data.moviePoster);
    sessionStorage.setItem("trailer", data.movieTrailers);
    sessionStorage.setItem("desc", data.movieDesc);
    window.location.href = "./movie-inner-page.html";
  }
  // else{
  //   alert("404")
  // }
});

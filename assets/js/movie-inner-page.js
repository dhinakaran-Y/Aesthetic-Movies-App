import { movieShowerFn } from "./getHollywoodMoviesApi.js";
import { movieCardDisPopup } from "./movie-card-dis-popup.js";

await(async function movieRowNoSet() {
    const movieCategory = sessionStorage.getItem("movieCategory")
    await movieShowerFn(1, movieCategory);
}())
await movieCardDisPopup();

// Handle click and redirect
document.addEventListener("click", (e) => {
  const link = e.target.closest(".movie-card-link");
  const movieRowEl = e.target.closest(".movieRow");
  
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

// console.log("get : ", sessionStorage.getItem("trailer"));
// const movieTitleEl = document.getElementById("movie-title");
// const movieDesc = document.getElementById("movie-desc");
// const trailerFrame = document.querySelector("iframe");
// const trailerApi = sessionStorage.getItem("trailer");
// const sessionTrailer =
//   trailerApi === "null" || trailerApi === "undefined" || trailerApi === ""
//     ? "https://www.youtube.com/watch?v=dlkGhgwGmLM"
//     : trailerApi;

// // console.log("movie info : ", movie);
// movieTitleEl.textContent = sessionStorage.getItem("title");
// movieDesc.textContent = sessionStorage.getItem("desc");
// const videoId = sessionTrailer.split("v=")[1];
// trailerFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&start=10`;

// buffer vid
//"https://www.youtube.com/embed/dlkGhgwGmLM?si=wNyGukTZtF8K5lrm"
// https://www.youtube.com/watch?v=dlkGhgwGmLM
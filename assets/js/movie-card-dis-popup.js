export async function movieCardDisPopup(){
  const movieCardEl = document.querySelectorAll(".movie-card");

  movieCardEl.forEach((card) => {
    //console.log(card.children[1].children[0]);
    //add class
    card.addEventListener("mouseenter", (event) => {
      const movieDisEL = card.children[1];
      movieDisEL.classList.replace("bg-gray-800/90", "bg-gray-700/90");
      movieDisEL.classList.replace('h-11','h-40')
    });
    //remove class
    card.addEventListener("mouseleave", (event) => {
      const movieDisEL = card.children[1];
      movieDisEL.classList.replace("bg-gray-700/90", "bg-gray-800/90");
      movieDisEL.classList.replace("h-40", "h-11");
    });
  });
}
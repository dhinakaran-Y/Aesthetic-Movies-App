const smp = document.getElementById("whole-movie-rows");
let rowNo = smp.childElementCount;
let movieInnerRow;

async function getMoviesApi(num) {
  try {
    const movieAPI = await fetch(`https://mimic-server-api.vercel.app/movies`);

    if (!movieAPI) {
      throw new Error("Api is wrong");
    }

    const data = await movieAPI.json();

  for (let j = 2; j <= rowNo; j++) {
    // console.log("row",j);
    movieInnerRow = document.querySelector(`#movieRow-${j} > div`);

    for (let i = 1; i <= num; i++) {
      // console.log(data[i]);
        //  console.log(i);
      //create movie cards
      await createMovieCards(i, data[i]);
    }
  }

  } catch (error) {
    console.log(error);
  }
}

/*<div class="movie-card" id="movie-card-1">
              <img src="https://image.tmdb.org/t/p/original/oTxPji8PY3PL0SK9e4mkt2laJKg.jpg" class="movie-card-img" alt="Viduthalai - 2">
              <div class="movie-card-dis absolute border-t-1 bg-gray-800/90 border-gray-500 z-5 bottom-0 text-white w-full h-11  transition-all duration-300 ease-in-out">
                <h3 class="text-2xl font-semibold pt-1 px-3">Movie 1</h3>
                <p class="pt-3 px-3 text-sm text-white/80">Rookie cop Kumaresan joins task force hunting rebel leader Vaathiyar, but police brutality shakes his faith and sparks sympathy.</p>
              </div>
             </div>*/

async function createMovieCards(index, movie) {
  
  // for (let j = 1; j <= rowNo; j++) {
  //   console.log(j,"- index :",index);
    
  //   const movieInnerRow = document.querySelector(`#movieRow-${j} > div`);

    movieInnerRow.insertAdjacentHTML(
      "beforeend",
      `<div class="movie-card" id="movie-card-${index}">
              <img src=${movie.poster_path} class="movie-card-img" alt="Viduthalai - 2">
              <div class="movie-card-dis absolute border-t-1 bg-gray-800/90 border-gray-500 z-5 bottom-0 text-white w-full h-11  transition-all duration-300 ease-in-out">
                <h3 class="text-2xl font-semibold pt-1 px-3">${movie.title}</h3>
                <p class="pt-3 px-3 text-sm text-white/80">Rookie cop Kumaresan joins task force hunting rebel leader Vaathiyar, but police brutality shakes his faith and sparks sympathy.</p>
              </div>
             </div> `
    );
  // }

  // const movieInnerRow1 = document.querySelector("#movieRow-1 > div");

  // movieInnerRow1.insertAdjacentHTML("beforeend" , `<div class="movie-card" id="movie-card-${index}">
  //             <img src=${movie.poster_path} class="movie-card-img" alt="Viduthalai - 2">
  //             <div class="movie-card-dis absolute border-t-1 bg-gray-800/90 border-gray-500 z-5 bottom-0 text-white w-full h-11  transition-all duration-300 ease-in-out">
  //               <h3 class="text-2xl font-semibold pt-1 px-3">${movie.title}</h3>
  //               <p class="pt-3 px-3 text-sm text-white/80">Rookie cop Kumaresan joins task force hunting rebel leader Vaathiyar, but police brutality shakes his faith and sparks sympathy.</p>
  //             </div>
  //            </div> `)

  //get the actual length of movie row(cards)
  //noMovieCards =  movieInnerRow.childElementCount
}

export { getMoviesApi };

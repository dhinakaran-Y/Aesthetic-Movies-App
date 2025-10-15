// old -- const API_KEY = "323e3fe5a8237f5319c4b400fb4bd2d9";
//3472ccb0d97ebc192cbd0e56bd799736
const API_KEY = "3472ccb0d97ebc192cbd0e56bd799736";

const topMoviesApi = `https://api.themoviedb.org/3/movie/top_rated?`;
//top rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`

function languageApi(lang){
  const today = new Date().toISOString().split("T")[0];
  if(lang === 'tamil')return `with_original_language=ta&sort_by=release_date.desc&release_date.lte=${today}&page=1`;
  if(lang === 'english')return `with_original_language=en&sort_by=release_date.desc&release_date.lte=${today}&page=1`;
  if(lang === 'malayalam')return `with_original_language=ml&sort_by=release_date.desc&release_date.lte=${today}&page=1`;
  if(lang === 'hindi')return `with_original_language=hi&sort_by=release_date.desc&release_date.lte=${today}&page=1`;
  if(lang === 'top')return `language=en-US&page=1`;
}

async function movieShowerFn(rowNo,lang) {
  // console.log(lang);
  
  const language = languageApi(lang);
  // console.log(language);
  
  // const malayalam = `with_original_language=ml&sort_by=release_date.desc&page=1`;
  // const tamil = `with_original_language=ta&sort_by=release_date.desc&page=1`;
  // const english = `with_original_language=en-US&sort_by=release_date.desc&page=1`;
  // const hindi = `with_original_language=hi&sort_by=release_date.desc&page=1`;
  //1)Get top rated movies
  async function getTopRatedMovies() {
    const url =`${lang ==='top' ? topMoviesApi : 'https://api.themoviedb.org/3/discover/movie?'}api_key=${API_KEY}&${language}`;
    // console.log(url);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.results);

      return data.results; // Array of movie objects
    } catch (error) {
      return console.error(error);
    }
  }

  //2)poster function
  function getPosterUrl(path) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  //3) get youtube trailer , and,not are all hade youtube links you filter it
  async function getMovieTrailer(movieId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();

   console.log("trailer data : " , data);
   

    // Find a YouTube trailer
    const trailer = data.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    if (!trailer) return null; // no trailer found
    return `https://www.youtube.com/watch?v=${trailer.key}`;
  }

  //4
  async function getTopRatedWithTrailers() {
    const topRated = await getTopRatedMovies();
    // console.log("555 : ",topRated);

    const moviesWithTrailers = [];

    for (const movie of topRated) {
      const trailers = await getMovieTrailer(movie.id);
      moviesWithTrailers.push({
        title: movie.title,
        rating: movie.vote_average,
        poster: getPosterUrl(movie.poster_path),
        trailers: trailers,
        desc: movie.overview,
      });
    }

    console.log(moviesWithTrailers);
    //   return moviesWithTrailers;

    // loop and set in UI
    for (let i = 1; i <= moviesWithTrailers.length; i++) {
      // console.log(data[i]);
      //  console.log(i);
      //create movie cards
      await moviesUIAddFn(`movieRow-${rowNo}`,i, moviesWithTrailers[i - 1]);
    }
    // createMovieCards(1,[...moviesWithTrailers])
  }
  await getTopRatedWithTrailers();
}

function moviesUIAddFn(rowId, index, movie) {
  // console.log(movie);
  
  const movieInnerRow = document.getElementById(rowId).firstElementChild;

  async function createMovieCards() {
    movieInnerRow.insertAdjacentHTML(
      "beforeend",
      `<a class="movie-card-link cursor-pointer active:-translate-y-1 select-none" data-movie='${JSON.stringify(
        movie
      )}'>
      <div class="movie-card" id="movie-card-${index}">
              <img src=${
                movie.poster
              } class="movie-card-img" alt="Viduthalai - 2">
              <div class="movie-card-dis absolute border-t-1 bg-gray-800/90 border-gray-500 z-5 bottom-0 text-white w-full h-11  transition-all duration-300 ease-in-out">
                <h3 class="text-2xl font-semibold pt-1 px-3">${movie.title}</h3>
                <p class="pt-3 px-3 text-sm text-white/80 line-clamp-4">${
                  movie.desc
                }</p>
              </div>
             </div> 
        </a>`
    );
  }
  createMovieCards();
}


export {movieShowerFn };
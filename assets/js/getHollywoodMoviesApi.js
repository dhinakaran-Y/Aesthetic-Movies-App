// old -- const API_KEY = "323e3fe5a8237f5319c4b400fb4bd2d9";
//3472ccb0d97ebc192cbd0e56bd799736
const API_KEY = "3472ccb0d97ebc192cbd0e56bd799736";

const topMoviesApi = `https://api.themoviedb.org/3/movie/top_rated?`;
//top rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`

function languageApi(lang){
  const today = new Date().toISOString().split("T")[0];
  const currentDate = new Date()
  const theDate = `${currentDate.getFullYear()}-${currentDate.getMonth()-4}-${currentDate.getDate()}`
  const bDay = '2025-05-05'
  
  if(lang === 'tamil')return `with_original_language=ta&sort_by=release_date.desc&release_date.lte=${theDate}`;
  if(lang === 'english')return `with_original_language=en&sort_by=release_date.desc&release_date.lte=${theDate}`;
  if(lang === 'malayalam')return `with_original_language=ml&sort_by=release_date.desc&release_date.lte=${theDate}`;
  if(lang === 'hindi')return `with_original_language=hi&sort_by=release_date.desc&release_date.lte=${theDate}`;
  if(lang === 'top')return `language=en-US&page=1`;
}

async function movieShowerFn(rowNo,lang) {
  
  const language = languageApi(lang);
  
  async function getMoviesAPI() {
    const url1 =`${lang ==='top' ? topMoviesApi : 'https://api.themoviedb.org/3/discover/movie?'}api_key=${API_KEY}&${language}&page=1`;
    const url2 =`${lang ==='top' ? topMoviesApi : 'https://api.themoviedb.org/3/discover/movie?'}api_key=${API_KEY}&${language}&page=2`;
    const url3 =`${lang ==='top' ? topMoviesApi : 'https://api.themoviedb.org/3/discover/movie?'}api_key=${API_KEY}&${language}&page=3`;
    const url4 =`${lang ==='top' ? topMoviesApi : 'https://api.themoviedb.org/3/discover/movie?'}api_key=${API_KEY}&${language}&page=4`;
    const url5 =`${lang ==='top' ? topMoviesApi : 'https://api.themoviedb.org/3/discover/movie?'}api_key=${API_KEY}&${language}&page=5`;

    try {
      const response1 = await fetch(url1);
      const response2 = await fetch(url2);
      const response3 = await fetch(url3);
      const response4 = await fetch(url4);
      const response5 = await fetch(url5);

      if (!response1.ok || !response2.ok || !response3.ok || !response4 || !response5) {
        throw new Error(
          `HTTP error! Status: ${response1.status},${response2.status},${response3.status},${response4},${response5}`
        );
      }

      const data1 = await response1.json(); 
      const data2 = await response2.json(); 
      const data3 = await response3.json();
      const data4 = await response4.json();
      const data5 = await response5.json();
      const fullData = [...data1.results, ...data2.results , ...data3.results, ...data4.results, ...data5.results]
      
      // console.log("full1 :",fullData);
      
      return fullData; // Array of movie objects
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
    
    try{
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,images`
      );

      // const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/api_key=${API_KEY}`);

     if (!res.ok) {
        throw new Error(
          `Fetch error , status : ${res.status} , ${res.type} , ${res.statusText}`
        );
      }

      const data = await res.json();

      // Find a YouTube trailer
      const trailer = data.videos.results.find((v) => v.site === "YouTube");

      if (!trailer) return null; // no trailer found

      return `https://www.youtube.com/watch?v=${trailer.key}`;
    }catch {
        return console.error(error);     
    }
  }

  //4
  async function setMoviesWithTrailers() {
    const topRated = await getMoviesAPI();

    const moviesWithTrailers = [];

    for (const movie of topRated) {
      const trailers = await getMovieTrailer(movie.id);
  
      if(trailers !== null || undefined || "" ) {
        moviesWithTrailers.push({
          title: movie.title,
          rating: movie.vote_average,
          poster: getPosterUrl(movie.poster_path),
          trailers: trailers,
          desc: movie.overview,
        });
      }
    }

    // console.log("mt : ",moviesWithTrailers);
    

    // loop and set in UI
    for (let i = 1; i <= 20 ; i++) {
      
      await moviesUIAddFn(`movieRow-${rowNo}`,i, moviesWithTrailers[i - 1]);
    }
    // createMovieCards(1,[...moviesWithTrailers])
  }
  await setMoviesWithTrailers();
}

function moviesUIAddFn(rowId, index, movie) {
  
  const movieInnerRow = document.getElementById(rowId).firstElementChild;

  async function createMovieCards() {
    
    movieInnerRow.insertAdjacentHTML(
      "beforeend",
      `<a class="movie-card-link cursor-pointer active:-translate-y-1 select-none" 
      data-movie-title=${JSON.stringify(movie.title)}
      data-movie-poster=${JSON.stringify(movie.poster)}
      data-movie-trailers=${JSON.stringify(movie.trailers)}
      data-movie-desc=${JSON.stringify(movie.desc)}>
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
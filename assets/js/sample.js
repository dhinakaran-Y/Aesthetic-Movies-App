const response = await fetch(
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ml&sort_by=release_date.desc&page=1`
);

//GET https://api.themoviedb.org/3/discover/movie
// ?api_key=YOUR_KEY
// &with_original_language=ml
// &sort_by=vote_average.desc
// &vote_count.gte=100    # to ensure some threshold so that obscure ones are less noisy
// &language=en-US        # or any UI/metadata lang you want
// &page=1


//tamil= ta
//hindi= hi
//english = en
//telugu = te
//kannada = kn

//top rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
import { movieCardDisPopup } from "./movie-card-dis-popup.js";
import { getMoviesApi } from "./getMoviesApi.js";
import { scrollEventFn } from "./scrollEvent.js";
import {movieShowerFn} from "./getHollywoodMoviesApi.js";

scrollEventFn();
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
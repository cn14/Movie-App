$(document).ready(function(){
    openMovies();
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        $('#searchText').val("");
        e.preventDefault();
      });
});

let api = '8e3321fb2f41cc400e64893581c2332c';
let img = "https://image.tmdb.org/t/p/w500";
function openMovies(){
    url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api}&language=en-US&page=1`;
    axios.get(url)
    .then((res) => {
        console.log(res);
        let movies = res.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
              <div class=" page card p-3 m-3 col-md-3">
                <div class=" well text-center">
                  <img src="${img}${movie.poster_path}">
                  <h5>${movie.original_title}</h5>
                  <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
              </div>
            `;

            console.log(`${img}+${movie.poster_path}`)
          });
          $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err)
    })
}
function getMovies(searchText){
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${searchText}`)
      .then((res) => {
        console.log(res);
        let movies = res.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class=" page card p-4 m-3 col-md-3">
              <div class=" well text-center">
              <img src="${img}${movie.poster_path}">
              <h5>${movie.original_title}</h5>
                <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          `;
        });
  
        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function movieSelected(id){
    sessionStorage.setItem('movie_id', id);
    window.location = 'movie.html';
    return false;
  }
  
  function getMovie(){
    let movie_id = sessionStorage.getItem('movie_id');
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api}&language=en-US`)
      .then((response) => {
        console.log(response);
        let movie = response.data;
        let output =`
          <div class="row">
            <div class="col-md-4">
              <img src="${img}${movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.original_title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Overview:</strong> ${movie.overview}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_count}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.vote_average}</li>
              </ul>
              <div class="well pt-4">
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Search</a>
            </div>
            </div>
          </div>
        `;
  
        $('#movie').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }

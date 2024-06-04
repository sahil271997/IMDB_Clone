$(document).ready(function(){
  var local_array=[];
  function get_array(){
    let watch_list=localStorage.getItem("wishlist_array");
    console.log(watch_list);
    local_array=JSON.parse(watch_list);
    console.log(local_array);
  }
  get_array();
// console.log(local_array.length);

function set_array(){
  let change_array=JSON.stringify(local_array);
  localStorage.setItem("wishlist_array",change_array);
}

(async function(){
    let n=local_array.length;
    for(let i=0;i<n;i++){
      // console.log(local_array[i]);
      await fetchID(local_array[i]);
    }
})()

async function fetchID(movieid){
    let ID=movieid;
    const res=await fetch(`https://www.omdbapi.com/?i=${ID}&apikey=46dc3503`);
    let data1= await res.json();
    // console.log(data1);
    // single_movie(data1);
    set_data(data1);
}

function set_data(d){
    // console.log(d);
    let div=document.createElement("div");
    $(div).addClass("movie-tab");
    $(div).attr('id',`${d.imdbID}`)
    let n=`
      <div class="head-img" > <img
          src=${d.Poster}
          alt=""> </div>

      <div class="m-detail">
       
        <span class="name"> ${d.Title}</span>
        <span class="year">Year : ${d.Year}</span>
        <span class="gnr">Genre : ${d.Genre}</span>
        <span class="runtime">Runtime : ${d.Runtime}</span>
        <span class="plot"> Plot : ${d.Plot}</span>
        <span class="imdb">Rating : ${d.imdbRating}</span>
        <span class="actor">Actors : ${d.Actors} </span>
        <span class="lang"> <span>Language :  ${d.Language} </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  class="delete bi bi-trash3 " viewBox="0 0 16 16">
            <path
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </span>
      </div>
    `;

   
    $(div).on("click", ".delete", function() {
      let imdbID = d.imdbID;
      delete_div(imdbID);
    });
   
    $(div).append(n);
    $("#main").append(div);
    n=``;
}

function delete_div(identity){
  console.log(identity);
  $(`#${identity}`).remove();
  console.log("deleted div");

  for(let i=0;i<=local_array.length;i++){
    if(local_array[i] === identity){
      local_array.splice(i,1);
      set_array();
      get_array();
      break;
    }
  }
  alert("Removed From WatchList");
  console.log("done");

}
}) 

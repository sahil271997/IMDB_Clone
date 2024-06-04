const search_bar = document.getElementById("search-box");
const movie_container=document.getElementById("movie");
let id=null;
let movies=[];
// let wishlist=[];

var ID=null;  // setting ID

const crousal=document.getElementById("crousal");
const add=document.getElementById("add");
const main=document.getElementById("main");   //variable for main body
const head=document.getElementById("head"); //vaiable for outer head
const subHead=document.getElementById("sub-head"); // variable for subHead 

head.addEventListener("click",displayMovie); //listner for head

main.addEventListener("click",displayMovie);  // listner for main body


//listner for subhead
subHead.addEventListener("click",function(e){  
    e.stopPropagation();
})


//function for display movie
function displayMovie(e){
    document.querySelector(".movie").style.display="none";
    $("#error-msg").css("display","none");
}

search_bar.addEventListener("focus",function(e){
    if( document.getElementById("search-box").value !=null){
        api_Call(e);
    }
})


search_bar.addEventListener("input", api_Call);

async function api_Call(e){
    let name = e.target.value;
    name=name.trim();
    // console.log(name);
    if (name.length >= 3) {
        document.querySelector(".movie").style.display="block"
        const response = await fetch(`https://www.omdbapi.com/?s=${name}&apikey=46dc3503`);
        let data = await response.json();
        if(data.Error){
          console.log("immrjsrnnkjanjbakhd");
          $("#error-msg").css("display","flex");
        }
        else{
        removelist(movie_container);
        $("#error-msg").css("display","none");
        display(data.Search);
        }
    }else if(name.length == 0){
      $("#error-msg").css("display","none");
    }
    else{
        document.querySelector(".movie").style.display="none";
    }
}



function display(d) {
    d.forEach(element => {
        let div=document.createElement('div');
        div.classList="movie-con";
        // console.log(div);
        let d=`  <div class="poster">
                <img
                  src="${element.Poster}"
                  alt="Poster Unavailable"
                />
                
              </div>
              <div class="details">
                <h1>${element.Title}</h1>
                <span>${element.Year}</span>
                 
              </div>`

              div.addEventListener("click",function(){
                console.log(element.imdbID," this is id")
                removelist(main);
                ID=element.imdbID;
                fetchID(ID);
              })
       
        div.innerHTML=d;
        movie_container.append(div);
        d="";
        
    });
}

function removelist(temp){
    while (temp.firstChild) {
        temp.removeChild(temp.firstChild);
    }
}

// fetch api for an id
async function fetchID(movieid){
    let ID=movieid;
    const res=await fetch(`https://www.omdbapi.com/?i=${ID}&apikey=46dc3503`);
    let data1= await res.json();
    // console.log(data1);
    single_movie(data1);
}

function single_movie(data1){
    let data=data1;
    let div=document.createElement("div");
    $(div).addClass("detail");
    let genre=data.Genre.split(',');
    let d=`
    <div class="movieDetails">
      <div class="movie-head">
        <div>
          <h1 class="m-title">&nbsp;${data.Title} </h1>
          <div class="spans">
            <span>&nbsp;${data.Year}</span>
            <span>&nbsp;. ${data.Rated}</span>
            <span>. ${data.Runtime}</span>
          </div>
        </div>
        <div class="movie-ratings">
          <div class="rate">
            <h4>IMDB RATING</h4>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F5C518" class="bi bi-star-fill"
                viewBox="0 0 16 16">
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              ${data.imdbRating}/10</span>
          </div>
          <div class="y-rate">
            <h4>YOUR RATING</h4>
            <span id="rate-star">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star"
                viewBox="0 0 16 16">
                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
              </svg>
              Rate
            </span>
          </div>
        </div>
      </div>
      <div class="movie-body">
        <div class="movie-img">
          <svg xmlns="http://www.w3.org/2000/svg" id="wish-svg"width="50" height="50" fill="gray" class="bi bi-bookmark-plus"
            viewBox="0 0 16 16">
            <path
              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            <path
              d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
          </svg>
          <img
            src="${data.Poster}"
            alt="">
        </div>
        <div class="movie-trailer">
          <div class="h">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"
              class="bi bi-play-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
            </svg>
            <h3>Watch Trailer</h3>
          </div>
        </div>
        <div class="video-img">
          <div class="div">
          <div class="inner-div" title="Movie Videos">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-fast-forward-circle"
              viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z" />
              <path
                d="M4.271 5.055a.5.5 0 0 1 .52.038L8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445Z" />
            </svg>
            <h4>28 Videos</h4>
            </div>
          </div>
          <div class="div">
          <div class="inner-div" title="Movie Photos">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-images"
              viewBox="0 0 16 16">
              <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path
                d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
            </svg>
            <h4>24 Photos</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="about-l">
        <div class="type pad">
          <h4>${genre[0]}</h4>
          <h4>${genre[1]}</h4>
        </div>

        <hr />
        <div class="plot">${data.Plot}</div>
        <hr />
        <div class="director">
          <h3>Director : <span class="decoration"> ${data.Director}</span></h3>
        </div>
        <hr />
        <div class="writers">
          <h3> writers : <span class="decoration"> ${data.Writer}</span></h3>
        </div>
        <hr />
        <div class="stars">
          <h3> Stars : <span class="decoration">${data.Actors}</span></h3>
        </div>
      </div>
      <div class="o-hotstar">
      <div class="hotstar">
          <div class="hot" title="Go to HotStar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
          </svg> <span>Watch On HotStar</span></div>
          <div class="more" title="Watch Similar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg> <span>More Watch Options</span></div>
          <div class="add-watch" id="add-watch" title="Add to WatchList">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg><span>Add to WatchList</span>
          </div>
      </div>
    </div>
    
    
  </div>`
div.innerHTML=d;
d='';

$(".movie").hide();
$("#main").height("auto");

main.append(div);
  
}



$(document).ready(function() {

  let wishlist = []; // Initialize the wishlist array here
  let get_array = localStorage.getItem("wishlist_array");

  // Check if the wishlist_array exists in localStorage
  if (get_array) {
    wishlist = JSON.parse(get_array);
  } else {
    // If wishlist_array doesn't exist, initialize it in localStorage
    let string_array = JSON.stringify(wishlist);
    localStorage.setItem("wishlist_array", string_array);
  }


  // Since the elements are dynamically created, use event delegation to handle the click
  $(document).on("click", "#add-watch", wishlist_fun);

  // wishlist function
  function wishlist_fun() {
    let present = false;

    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i] === ID) {
        present = true;
        alert("Already in WatchList !!!");
        break;
      }
    }

    if (!present) {
      wishlist.unshift(ID);
      alert("Added to watch list!!!");
    }

    let string_array = JSON.stringify(wishlist);
    localStorage.setItem("wishlist_array", string_array);
  }


  // rating function 
  $(document).on("click", "#rate-star", function() {
    alert("Rated !!!");
  });

  $(document).on("click", "#wish-svg", wishlist_fun);
});

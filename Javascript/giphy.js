let anime = ["My Hero Academia", "One Punch Man", "Attack on Titan", "Xenosaga: The Animation", "Sword Art Online", "Bleach", "Naruto", "Dragon ball Z", "Death Note", "Accel World",];
 
$(document).on("click", ".anime", showGiphys);
showButtons();

// the function to show/get the giphys//
function showGiphys() {
    let show = $(this).attr("data-name");
    let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dmqTd4jyLwReoobdC2JzAmVLiXUC8KhZ&limit=10";
    //gets and returns search data and emptys previous giphys//
    $.ajax({ 
        url: queryUrl,
        method: "GET"
    }).done(function(response) {
        $('#giphys-here').empty();

        

            //foor loop to run throught entire data array//
        for (let i = 0; i < response.data.length; i++) {
            //variables
          let newGiphy = $('<div class="newGiphy">');
          let rating = response.data[i].rating;
          let showRating = $('<p>').text("Rating: " + rating);
          let animated = response.data[i].images.fixed_height.url;
          let still = response.data[i].images.fixed_height_still.url;
          let gifIm = $('<img class="gif-image">');
            //adds attributes to gifIm//
          gifIm.attr("src", still);
          gifIm.attr("data-still", still);
          gifIm.attr("data-animate", animated);
          gifIm.attr("data-state", still)
            //appends showRating and prepends gifIm to newGiphy//
          newGiphy.append(showRating);
          newGiphy.prepend(gifIm);
           //prepends var newGiphy to html id giphys-here//
          $('#giphys-here').prepend(newGiphy);
        }
      });
    };
      //A on click event handler to animate or still the giphy//
    $('#giphys-here').on("click", ".gif-image", function() {
        // sets ds
      let ds = $(this).attr("data-state");
    //checks if ds is in still state if so then animate, if animated then still//
      if (ds === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");}
      else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
        }
      });
     //function goes through the array an adds a button with 2 classes, attr, and text to append to a HTML id of premade-buttons//
    function showButtons() {
      $("#premade-buttons").empty();
    
      for (let i = 0; i < anime.length; i++) {
        let btn = $("<button class='button'>");
          btn.addClass("anime");
          btn.attr("data-name", anime[i]);
          btn.text(anime[i]);
    
          $("#premade-buttons").append(btn);
      }
    };
    //prevents the page from refreshing and takes the value of the user input and pushes it to the array and runs the showButtons function to give it a button//
    $(".submit-giphy").on("click", function(event){
      event.preventDefault();
      let gifName = $(".name-of-giphy").val().trim();
      anime.push(gifName);
      showButtons();
    });
    
    $(document).on("click", ".anime", showGiphys);
    showButtons();
    
    

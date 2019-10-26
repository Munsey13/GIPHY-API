let anime = ["My Hero Academia", "One Punch Man", "Attack on Titan", "Xenosaga: The Animation", "Sword Art Online", "Bleach", "Naruto", "Dragon ball Z", "Death Note", "Accel World",];

function showGiphys() {
    let show = $(this).attr("data-name");
    let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dmqTd4jyLwReoobdC2JzAmVLiXUC8KhZ&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function (response) {
        $("#giphys-here").empty();

        for (let i = 0; i < response.data.length; i++) {

            let newGiphy = $('<div id="newGiphy">');
            let rating = response.data[i].rating;
            let showRating = $("<p>").text("Rating: " + rating);
            let animate = response.data[i].images.fixed_height.url;
            let still = response.data[i].images.fixed_height_still.url;
            let newGipIma = $('<img id="newGipIma">');

            newGipIma.attr("src", still);
            newGipIma.attr("data-still", still);
            newGipIma.attr("data-animate", animate);
            newGipIma.attr("data-state", still);

            newGiphy.append(showRating);
            newGiphy.append(newGipIma);

            $('#giphys-here').prepend(newGiphy);
        }
    });


};
// function showGiphys ends here.


// function premadeButtons ends here.

function premadeButtons() {
    $("#premade-buttons").empty();

    for (let i = 0; i < anime.length; i++) {
        let preB = $("<button class='button'>");
        preB.addClass("anime");
        preB.attr("data-name", anime[i]);
        preB.text(anime[i]);

        $("#premade-buttons").append(preB);

    }
}
    
$("#premaid-button").on("click", function (event) {
    event.preventDefault();
    let giphyName = $(".name-of-giphy").val().trim();
    anime.push(giphyName);
    premadeButtons();
});
//on click eventHandler ends here.

$('#giphys-here').on("click", "#newGipIma", function () {

    let dataState = $(this).attr("data-state");

    if (dataState === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});


$(document).on("click", ".anime", showGiphys);
premadeButtons();


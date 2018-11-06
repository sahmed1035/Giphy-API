// creating dynamic buttons for search topics upon page loading.
$(function(){
    // console.log('page loaded');
    //calling renderButton function.searchArray = veggieArray, classToAdd=topicButtons,areaToAddTo
    renderButtons(veggieArray,'searchButton','#searchButtonsArea');
})
// creating an array to hold the search terms strings.
var veggieArray = ['Broccoli','spinach','Lettuce','Cauliflower','French beans'];

//creating a function to populate buttons. parameters: veggieArray, classToAdd.
function renderButtons(veggieArray, classToAdd,areaToAddTo){
    $(areaToAddTo).empty();//avoiding the copies of the buttons
    //for loop to get all the seach terms in the veggieArray.
    for(i=0; i<veggieArray.length;i++){
        //bringing button to variable a
        var a = $('<button>');
        a.addClass(classToAdd);  //adding class to button
        a.attr('data-type',veggieArray[i]); //adding attribute of data-type for each element of the veggieArray.
        a.text(veggieArray[i]); //displaying the text on the button
        $(areaToAddTo).append(a); // appending the buttons to on the html *areaToAddTo
    }
}

/************************************************************************** */
//search the data-type of the class searchButton
$(document).on('click', '.searchButton', function(){
    //bringing the data-type of the clicked button to the type variable
    var type = $(this).data('type');
    // console.log(type);
    //modifying the API call with the type variable. limit of gifs= 10
    var queryURL ='https://api.giphy.com/v1/gifs/search?q='+ type +'&api_key=dc6zaTOxFJmzC&limit=10';

    //calling the ajax routine. 
    $.ajax({url:queryURL, method:'GET'})
        .then(function(response){ //bringing the data result to response.
            // console.log(response);
            //placing all the response data to html. 10 gifts through for loop.
            for (var i=0; i<response.data.length; i++) {
                //creating dynamic divs for gifs and placing in the searchDiv variable.
                var searchDiv = $('<div class="search-item">');
                //grabing the rating of each gif.
                var rating = response.data[i].rating; //check the data structure first.
                //placing the rating in the html under a variable p with p tag.
                var p = $('<p>').text('Rating: '+rating);
                //collecting animated version of the gif
                var animatedGif = response.data[i].images.fixed_height.url;
                //collecting still version of the gif
                var stillGif = response.data[i].images.fixed_height_still.url;
                //creating image tags
                var image =$('<img>');
                //referencing the image variables. first get still image.
                image.attr('src',stillGif);
                //referencing the image strings url.
                image.attr('data-still', 'still');
                
                image.attr('data-animated', animatedGif);
                //giving back still state.
                image.attr('data-state','still');
                image.addClass('searchImage'); //giving a searchImage class.
                //displaying the rating of the gifs.
                searchDiv.append(p);
                //displaying the image
                searchDiv.append(image);
                // placing in the html div created on html
                $('#searched-gifs').append(searchDiv);





                

            }


        })

})
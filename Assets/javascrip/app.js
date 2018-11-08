// creating dynamic buttons for search topics upon page loading.
$(function(){
    // console.log('page loaded');
    //calling renderButton function.searchArray = veggieArray, classToAdd=topicButtons,areaToAddTo
    populateButtons(searchArray,'searchButton','#buttonsArea');
})
// creating an array to hold the search terms strings.
var searchArray = ['Broccoli','spinach','Lettuce','Cauliflower','French Beans'];

//creating a function to populate buttons. parameters: searchArray, classToAdd.
function populateButtons(searchArray, classToAdd,areaToAddTo){
    $(areaToAddTo).empty();//avoiding the copies of the buttons
    //for loop to get all the seach terms in the veggieArray.
    for(i=0; i<searchArray.length;i++){
        //bringing button to variable a
        var a = $('<button>'); //will be modifying button element
        a.addClass(classToAdd);  //adding class to button
        a.attr('data-type',searchArray[i]); //adding attribute of data-type for each element of the veggieArray.
        a.text(searchArray[i]); //displaying the text on the button
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
                var animated = response.data[i].images.fixed_height.url;
                //collecting still version of the gif
                var still = response.data[i].images.fixed_height_still.url;
                //creating reference to image tags
                var image =$('<img>');
                //referencing the image variables. first get still image.
                image.attr('src',still);
                //referencing the image strings url.
                image.attr('data-still', still);
                
                image.attr('data-animated', animated);
                //giving back still state.
                image.attr('data-state','still');
                image.addClass('searchImage'); //giving a searchImage class.
                //displaying the rating of the gifs in the paragraph.
                searchDiv.append(p); 
                //displaying the image
                searchDiv.append(image);
                // placing in the searched images in the searches div.
                $('#searches').append(searchDiv);
            }
        })
})


//making image animated on click.
$(document).on('click', '.searchImage', function(){
    var state = $(this).attr('data-state');
    if(state == 'still') {
        $(this).attr('src' , $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'))
        $(this).attr('data-state', 'still');
    }


})



//text box can add new buttons.
$("#addSearch").on("click",function(){
    var newSearch = $('input').eq(0).val(); //.eq for ?
    searchArray.push(newSearch);
    populateButtons(searchArray, '.searchButton',  '#buttonsArea');
    return false; //not to submit and reload the page. only the default search buttons to show
    
})




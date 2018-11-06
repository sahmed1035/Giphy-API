# Giphy-API
Assignment-6. creating a search page which should be connected to Giphy. 
used the GIPHY API to make a dynamic web page that populates with gifs of a topic. 

-Calling the GIPHY API
-Using JavaScript and jQuery to change the HTML of the site.
GIPHY parameters used:
     * `q`
     * `limit`
     * `rating`


 -Create an array of strings, each one related to a topic of interests(veggies). Saving it to a variable called `topics`.
 

-Take the topics in this array and create buttons in the HTML.
   Using a loop that appends a button for each string in the array.

-When the user clicks on a button, the page grabs 10 static, non-animated gif images from the GIPHY API and place them on the page.

-When the user clicks one of the still GIPHY images, the gif animates. If the user clicks the gif again, it stops playing.

-Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

-Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

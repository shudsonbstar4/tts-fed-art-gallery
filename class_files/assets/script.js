$(document).ready(function(){ //Initialize your jQuery and wrap all expressions and functions in the $(document).ready() function to ensure the DOM has finished loading before running scripts

	//Get Document Height
	$changeHeight = function(elm){ //Pass in the element you want to change the height of as a parameter
		var documentHeight = $(document).height(); //Set a variable to store the height of the document (it is a jQuery method that returns the height of the item it's chained to). This includes the area 'below the fold'
		$(elm).css({'min-height': documentHeight}); //Next, set the element's CSS with the css method, and pass in a JS object with the CSS property to be changed as the key and the documentHeight as the value.
	};

	//Get the title and artist info of each elm
	$getTitle = function(item){ //The item passed in is the <img> HTML elm.
		var portraitInfo = {}; //Create a new object to store the title and artist in
		portraitInfo['title'] = item.parent('a').siblings('h4').html(); //If we look at the HTML, the <img> tag is wrapped in an <a> tag. In order to move up a level to access the <a> tag, we need to use parent() on the <img> HTML elm. Next, we want to access the <h4> tag, which is the same level as the <a> tag. So we will chain the siblings() method after we've accessed the <a> tag. From there, we call the html() method to get the text in the <h4> tag. We've set the key 'title' on the portraitInfo obj, and will store the value returned by the chain of methods.
		portraitInfo['artist'] = item.parent('a').siblings('p').html();
		return portraitInfo; //At the end of the function, return the portraitInfo object so that when we call $getTitle(item), we can set a variable to store the value returned so it's accessible. Otherwise, if we called portraitInfo below, it would be undefined due to local scope (being created in the $getTitle() fn)
	};

	//Lightbox
	$('.portrait').click(function(event){ //On <img> tags with the class .portrait, run this function when clicked and pass the click event (which contains info about the elm clicked) in as a parameter
		var imgPath = event.target.src; //target is a default property of the event object. It contains the element. In this case, since the element is an <img> tag, then we can access the src (the absolute path) of it through the src property and store the absolute path in a variable for accessing later
		$('.overlay').show(1000); //Show the overlay in 1000 milliseconds
		$('.close').show(1000); //Show the close button in 1000 milliseconds
		$('#modal_img').attr('src', imgPath); //attr is a built in jQuery method which allows you to get and edit an element's attribute. If we were simply getting the src attribute and reading the value, we wouldn't include the second parameter. Since we're editing the src path with the path of the <img> we clicked, we're passing that in as the second param
		var imgHeight = $('#modal_img').height(); //Get the image height of the <img> in the modal window with the height() method so we can push the caption down later

		//getTitle
		var portraitInfo = $getTitle($(event.target)); //Set the var portraitInfo to the returned object that's created in the $getTitle function. We're passing in the clicked element as a param

		$('#caption').show(1000).html('<h2>' + portraitInfo['title'] + '</h2><p>' + portraitInfo['artist'] + '</p>').css({'top': imgHeight}); //Show the caption and then set the HTML inside the <div> tags of the caption with the title and artist we retrieved from the $getTitle fn. Then, set the CSS so that the caption is tacked to the bottom of the image

		$changeHeight('.overlay'); //Pass in the overlay element as a parameter to the changeHeight fn. This will adjust the overlay height to fill the entire height of the page
	});

	//Hiding the overlay
	$('.overlay').click(function(event){ //When clicking the overlay, it dismisses the lightbox
		$('.overlay').hide(1000);
	});

	//Animate all the images as we 'load' the next page or the previous page
	$animateItems = function(){
		var item = $('li .portrait-background img'); //The selector is a combined one, much like a CSS rule where you're accessing child selectors. In this case, we're first finding the list items with a child element that has the class .portrait-background, and then finding the image wrapped inside of that. It will traverse the DOM from top to bottom and save each instance that matches in the variable 'item'
		item.animate({'height': 0, 'width': 0}, 750); //We're calling the animate method to segue the CSS rules passed to it. The first parameter is a JS object with the CSS properties affected while the second parameter is how quickly to execute it (in milliseconds)
		item.animate({'opacity': 0.5, 'height': '50%', 'width': '50%'}, 750);
		item.animate({'opacity': 1.0, 'height': '100%', 'width': '100%'}, 750); //These multiple animate statements are 'queued', meaning that each one will execute after the other in sequence to create a complete animation
	};

	//Interactivity when next page is clicked - in a database driven website, this is where you would pass a request to get data from the server
	$('#next_page').click(function(event){
		$('.white-overlay').show(500);
		$('#prev_page').show(500); //Show the prev page link since there is a prev page
		$animateItems();
		setTimeout(function(){ //Mock a data success promise - a promise is basically the response from a HTTP request to get data from a server. When a promise is returned, it means that the request has finished and you have either received a response or the request has finished and failed (whether through error or server timeout). Since we aren't hooking up to a database or a server, use setTimeout to design your interaction
			$('.white-overlay').hide(500);
		}, 2000);
	});

	//Interactivity when prev page is clicked - in a database driven website, this is where you would pass a request to get data from the server
	$('#prev_page').click(function(event){
		$('.white-overlay').show(500);
		$(this).hide(500); //this is used to hide the same element that was clicked. Although we also called to show the white-overlay, it does not override the this variable because this is inheriting from the parent element the click function was called on
		$animateItems();
		setTimeout(function(){
			$('.white-overlay').hide(500);
		}, 2000);
	});
});
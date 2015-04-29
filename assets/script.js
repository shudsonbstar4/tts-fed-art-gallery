/* Please refer to this document only after you've looked over the item from class. Reason being the structure and code design is a little more advanced further down. */

$(document).ready(function(){

	//Get Document Height
	$changeHeight = function(elm){
		var documentHeight = $(document).height();
		$(elm).css({'min-height': documentHeight});
	};

	$getTitle = function(item){
		var portraitInfo = {};
		portraitInfo['title'] = item.parent('a').siblings('h4').html();
		portraitInfo.artist = item.parent('a').siblings('p').html();
		return portraitInfo; //Returns the object with the information; if we did not do this, then we would not be able to access the portrait info in our click function -- it would be undefined
	};
	
	//Lightbox
	$('.portrait').click(function(event){
		var imgPath = event.target.src;
		$('.overlay').show(1000);
		$('.close').show();
		$('#modal_img').attr('src', imgPath);
		var imgHeight = $('#modal_img').height();
		var portraitInfo = $getTitle($(event.target));
		$('#caption').show().html('<h2>' + portraitInfo['title'] + '</h2><p>' + portraitInfo.artist + '</p>').css({'top': imgHeight}); //Known as chaining methods
		$changeHeight('.overlay');
	});

	//Hiding the overlay
	$('.overlay').click(function(event){
		$('.overlay').hide(1000);
	});

	//Since we show and hide the white-overlay class for both #next_page and #prev_page, we're moving the show and hide methods inside a common function with a callback for the $animateItems fn (or any other function we decided to pass it)
	$showLoading = function(callback){ //callback is a function that is passed as a parameter
		$('.white-overlay').show(500, function(){ //The second parameter in the .show() method is for a callback function. Here we have an anonymous function (i.e., a function that hasn't been assigned a name or to a variable) as a callback. Passing a function as a callback ensures that the animation only excutes once the .show() method has finished loading the overlay
			callback(); //Call the callback parameter
			setTimeout(function(){ //Mock a server response with setTimeout(). It should hide the overlay after the callback method and then once the 'server' has finished responding with data
				$('.white-overlay').hide(500);
			}, 2000);
		});
	};

	$animateItems = function(){
		var item = $('li .portrait-background img')
		item.animate({'height': 0, 'width': 0}, 750);
		item.animate({'opacity': 0.5, 'height': '50%', 'width': '50%'}, 750);
		item.animate({'opacity':1.0, 'height': '100%', 'width': '100%'}, 750);
	};

	$('#next_page').click(function(event){
		$showLoading($animateItems); //on #next_page click, call the $showLoading function to display the overlay. Pass the $animateItems function as a parameter to use as the callback
		$('#prev_page').show(500); //Also show the #prev_page
	});

	$('#prev_page').click(function(event){
		$showLoading($animateItems); //Just like with the #next_page click, call the $showLoading fn with $animateItems as a param. This keeps code DRY (do not repeat yourself) and makes for good, modular code design.
		$(this).hide(500); //Hide the #prev_page item after going back
	});

})
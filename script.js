var imgsArray = ["img/img1.png","img/img2.png","img/img3.png","img/img4.png","img/img5.png","img/img6.png","img/img7.png","img/img8.png", "img/img9.png", "img/img10.png"];

/*
* Check to see how many times a number occurs in the array of numbers..
*/
function numOccurance(ary, num) {
	var count = 0;
	//Iterate through the array and if the element equals the number, increment count.
	for(var i = 0; i < ary.length; i++) {
		if(ary[i] == num) {
			count++
		}
	}
	return count;
}

/*
* Get a random array of numbers.
* Note, the array repeats a number twice to allow "matching" of the cards.
* Array size is twice of the image array size.
*/
function getRandomOrder() {
	var ary = new Array();
	//Loop through until we have twice the image array length
	while(ary.length < (imgsArray.length*2)) {
		//Create a random number between index of the image array
		var rndNum = Math.round(Math.random() * (imgsArray.length - 1));
		//Check to see if the number only occurs less than twice, if so, add it to the array
		if(numOccurance(ary, rndNum) < 2) {
			ary.push(rndNum);
		}
	}
	return ary;
}

/*
* Lay out the images in the DOM
*/
function setImgs() {
	var container = document.getElementById("container");
	//Get an array of image array indexes in a random order
	var ary = getRandomOrder();
	for(var i = 0; i < ary.length; i++) {
		// Create a new img element
		var img = document.createElement("img");
		// Give it the source of the images
		img.src = imgsArray[ary[i]];
		// Set a cardNumber attribute to help us compare later on
		img.setAttribute("cardNumber", ary[i]);
		// Set an id to the images
		img.id = "card"
		// Automatically make all the cards "hide"
		img.className = "hidden";
		// Append the created image to the DOM
		container.appendChild(img);
	}
}

// These variables are used for the logic of allowing card seletions
var oneSelected = false, previousSelected = null, allowClick = true;

/*
* Reset all the cards by setting their class to hidden. Also reset all logic values.
*/
function resetAll() {
	oneSelected = false;
	previousSelected = null;
	allowClick = true;
	var elms = document.getElementsByTagName("img");
	for(var i = 0; i < elms.length; i++){
		elms[i].className = "hidden";
	}
}

/*
* Show the help box by switching classes. Classes control height and opacity.
*/
function showHelp() {
	var el = document.getElementById("helpbox");
	if(el.className == "hidehelp") {
		el.className = "showhelp";
	} else {
		el.className = "hidehelp";
	}
}


window.onload = function() {
	// When the window is finished loading, layout the images.
	setImgs();

	// Add an click event listener to the dom, to listen to clicks on the cards
	document.addEventListener("click", function(e) {
		// If the click is on a card (image) and we allow clicking and the card is hidde, continue
		if(e.target.id == "card" && allowClick == true && e.target.className != "show") {
			if(oneSelected == false) {
				// Since no card is showing, this is the first card.
				// Set the previousSelected variable to the current selected card
				previousSelected = e.target;
				// Show the card
				e.target.className = "show";
				// Allow logic to work on next click
				oneSelected = true;
			} else {
				// If the second selected card is equal to the previous card, than show both
				if(previousSelected.getAttribute("cardNumber") ==  e.target.getAttribute("cardNumber")) {
					previousSelected.className = "show";
					e.target.className = "show";
					previousSelected = null;
				} else {
					// We disable clicks for now and allow it again once the timeout is done
					allowClick = false;
					// We show the second card
					e.target.className = "show";
					// We set at timeout so the user can see the two cards for 1 second before they are hidden again
					setTimeout(function() {
						// Hide both the current and previous cards
						previousSelected.className = "hidden";
						e.target.className = "hidden";
						// Previous element is null
						previousSelected = null;
						// Allow clicks again
						allowClick = true;
					}, 1000);
					// Wait for 1 seconds before allowing the user to click.
				}
				oneSelected = false;
			}
			// If there are no "hidden" classes, it means the user has found them all. Prompt to play again.
			// If yes, reset the game.
			if(document.getElementsByClassName("hidden").length == 0) {
				if(window.confirm("Wow, you won! Do you want to play again?")) {
					resetAll();
				}
			}
		}
	});		
}
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

// Set hoverColor here, so that it can be easily changed.
const hoverColor = 'orangered';

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// searches the fruit array for any fruit containing the value of str,
// returns a filtered version of the fruit array in results array
const search = (str) => {
	let results = [];
	if (str !== '') {
		results = fruit.filter((f) => f.toLowerCase().includes(str.toLowerCase()));
		showSuggestions(results, str);
		return results;
	}
	// set suggestions back to empty when str is empty
	suggestions.innerHTML = '';
}

// get string from input field
const searchHandler = () => search(input.value);

// formats the bold patterns for fruits containing inputVal
const insertBold = (str, indexStart, indexEnd) => `${str.substring(0, indexStart)}<b>${str.substring(indexStart, indexEnd)}</b>${str.substring(indexEnd)}`

const showSuggestions = (results, inputVal) => {
	// empties suggestions innerHTML to make sure it updates properly
	suggestions.innerHTML = '';
	// loops through results array to create li for each match
	results.forEach(result => {
		newli = document.createElement('li');
		newli.classList.add('searchSuggestion');
		// event listener for mouseleave to handle color and pointer changes
		newli.addEventListener('mouseleave', unHoverSuggestion);
		// setting initial index of where inputVal is found in fruit
		let index = result.toLowerCase().indexOf(inputVal.toLowerCase());
		// calls insertBold to make the input chars fruit includes to be bold
		newli.innerHTML = insertBold(result, index, (index + inputVal.length));
		suggestions.append(newli);
	});
}

// empties suggestion list and sets suggestion to input value
const useSuggestion = (e) => {
	e.preventDefault();
	// because the eventlistener will pick up the bold tag, this is needed to
	// handle the suggestion for the parent li element
	if (e.target.tagName === 'B') {
		input.value = e.target.parentElement.innerText;
		search(e.target.parentElement.innerText);
	} else {
		// if not bold, then it will use the innerText of the li element
		input.value = e.target.innerText;
		search(e.target.innerText);
	}
	suggestions.innerHTML = '';
}

// handles color and pointer changes on hover
const hoverSuggestion = (e) => {
	e.preventDefault();
	// like the previous function, if you hover over the bold portion it has to be
	// handled seperately. Sets the parentElement background color
	if (e.target.tagName === 'B') {
		e.target.parentElement.style.background = hoverColor;
	}
	// if not hovering the bold portion, we can just operate off the li tag itself
	else if (e.target.tagName === 'LI') {
		e.target.style.background = hoverColor;
	}
	document.body.style.cursor = "pointer";
}

// changes cursor back to default, and color back to previous color before hover
// because we don't want anything to change if you leave a bold character in 
// the li, we do not need to check for bold tag here
const unHoverSuggestion = (e) => {
	e.preventDefault();
	document.body.style.cursor = 'default';
	e.target.style.background = 'rgba(255, 215, 140, 0.397)';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', hoverSuggestion);
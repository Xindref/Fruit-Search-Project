const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

// Set highlight and search class here, so that it can be easily changed.
const HIGHLIGHT_CLASS = 'highlighted-suggestion';
const SEARCH_SUGGESTION = 'search-suggestion';

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// searches the fruit array for any fruit containing the value of str,
// returns a filtered version of the fruit array in results array
const search = (input) => {
	if (input !== '') {
		let searchResults = fruits.filter((fruit) => {
			const inputRegEx = new RegExp(input, 'i');
			return fruit.match(inputRegEx);
		});
		displaySuggestions(searchResults, input);
		return searchResults;
	}
	// set suggestions back to empty when str is empty
	suggestions.innerHTML = '';
}

// get string from input field and call search on it
const handleSearch = () => search(input.value);

// formats a string using regular expression to make matching portion strong tagged
const insertBold = (str, textToBold) => {
	const regex = new RegExp(textToBold, 'i');
	return str.replace(regex, (match) => `<strong>${match}</strong>`)
}

const displaySuggestions = (searchResults, inputVal) => {
	// empties suggestions innerHTML to make sure it updates properly
	suggestions.innerHTML = '';
	// loops through search results and creates an li for each
	searchResults.forEach(fruit => {
		const newListItem = document.createElement('li');
		// set class for the LI so we can reference it in our highlight
		newListItem.classList.add(SEARCH_SUGGESTION);
		// calls insertBold to make the input chars fruit includes to be bold
		newListItem.innerHTML = insertBold(fruit, inputVal);
		// appends the newListItem to the suggestions element
		suggestions.append(newListItem);
	});
}

// empties suggestion list and sets suggestion to input value
const useSuggestion = (event) => {
	event.preventDefault();
	// because the eventlistener will pick up the strong tag, this is needed to
	// handle the suggestion for the parent li element
	if (event.target.parentElement.classList.contains(SEARCH_SUGGESTION)) {
		input.value = event.target.parentElement.innerText;
	} else {
		// if not clicking the strong tag, then it will use the innerText of the
		// li element
		input.value = event.target.innerText;
	}
	// clear suggestions once we select an item from suggestions
	suggestions.innerHTML = '';
}

// handles color and pointer changes on mouse enter
const highlightSuggestion = (event) => {
	event.preventDefault();
	// checks class name, and adds the highlight class
	if (event.target.className === SEARCH_SUGGESTION) {
		event.target.classList.add(HIGHLIGHT_CLASS);
	}
	// if it's the strong tag, then we need to get/set the parent elements class
	else if (event.target.parentElement.className === SEARCH_SUGGESTION) {
		event.target.parentElement.classList.add(HIGHLIGHT_CLASS);
	}
}

// Because we don't want anything to change if you unhover a strong character in 
// the li, we do not need to check for the strong tag here
const unHighlightSuggestion = (event) => {
	event.preventDefault();
	// checks if classList has search-suggestion
	if (event.target.classList.contains(SEARCH_SUGGESTION)) {
		// removes the highlight class on mouse out
		event.target.classList.remove(HIGHLIGHT_CLASS);
	}
}

input.addEventListener('keyup', handleSearch);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', highlightSuggestion);
suggestions.addEventListener('mouseout', unHighlightSuggestion);
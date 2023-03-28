const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

// Set hoverColor here, so that it can be easily changed.
const hoverColor = 'orangered';

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// searches the fruit array for any fruit containing the value of str,
// returns a filtered version of the fruit array in results array
const search = (str) => {
	if (str !== '') {
		let results = fruit.filter((f) => f.toLowerCase().includes(str.toLowerCase()));
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

// second version of formatting using a regular expression and strong tag
const insertBoldV2 = (str, textToBold) => {
	const regex = new RegExp(textToBold, 'gi');
	return str.replace(regex, (match) => `<strong>${match}</strong>`)
}

const showSuggestions = (results, inputVal) => {
	// empties suggestions innerHTML to make sure it updates properly
	suggestions.innerHTML = '';
	// loops through results array to create li for each match
	results.forEach(result => {
		newli = document.createElement('li');
		// set class for the LI so we can reference it for hover
		newli.classList.add('searchSuggestion');
		// setting initial index of where inputVal is found in fruit
		let index = result.toLowerCase().indexOf(inputVal.toLowerCase());
		// calls insertBold to make the input chars fruit includes to be bold
		newli.innerHTML = insertBoldV2(result, inputVal);
		suggestions.append(newli);
	});
}

// empties suggestion list and sets suggestion to input value
const useSuggestion = (e) => {
	e.preventDefault();
	// because the eventlistener will pick up the strong tag, this is needed to
	// handle the suggestion for the parent li element
	if (e.target.parentElement.className === 'searchSuggestion') {
		input.value = e.target.parentElement.innerText;
		search(e.target.parentElement.innerText);
	} else {
		// if not clicking the strong tag, then it will use the innerText of the
		// li element
		input.value = e.target.innerText;
		search(e.target.innerText);
	}
	suggestions.innerHTML = '';
}

// handles color and pointer changes on hover
const hoverSuggestion = (e) => {
	e.preventDefault();
	if (e.target.className === 'searchSuggestion') {
		e.target.style.background = hoverColor;
	}
	else if (e.target.parentElement.className === 'searchSuggestion') {
		e.target.parentElement.style.background = hoverColor;
	}
	document.body.style.cursor = "pointer";
}

// changes cursor back to default, and color back to previous color.
// Because we don't want anything to change if you unhover a strong character in 
// the li, we do not need to check for the strong tag here
const unHoverSuggestion = (e) => {
	e.preventDefault();
	if (e.target.className === 'searchSuggestion') {
		document.body.style.cursor = 'default';
		e.target.style.background = 'rgba(255, 215, 140, 0.397)';
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', hoverSuggestion);
suggestions.addEventListener('mouseout', unHoverSuggestion);
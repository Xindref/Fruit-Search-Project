const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const hoverColor = 'orangered';

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

const search = (str) => {
	let results = [];
	if (str !== '') {
		results = fruit.filter((f) => f.toLowerCase().includes(str.toLowerCase()));
		showSuggestions(results, str);
		return results;
	}
	suggestions.innerHTML = '';
}

const searchHandler = (e) => search(input.value);

const insertBold = (str, indexStart, indexEnd) => `${str.substring(0, indexStart)}<b>${str.substring(indexStart, indexEnd)}</b>${str.substring(indexEnd)}`

const showSuggestions = (results, inputVal) => {
	suggestions.innerHTML = '';
	results.forEach(result => {
		newli = document.createElement('li');
		newli.classList.add('searchSuggestion');
		newli.addEventListener('mouseleave', unHoverSuggestion);
		let index = result.toLowerCase().indexOf(inputVal.toLowerCase());
		newli.innerHTML = insertBold(result, index, (index + inputVal.length));
		suggestions.append(newli);
	});
}

const useSuggestion = (e) => {
	e.preventDefault();
	if (e.target.tagName === 'B') {
		input.value = e.target.parentElement.innerText;
		search(e.target.parentElement.innerText);
	} else {
		input.value = e.target.innerText;
		search(e.target.innerText);
	}
	suggestions.innerHTML = '';
}

const hoverSuggestion = (e) => {
	e.preventDefault();
	if (e.target.parentElement.tagName === 'LI') {
		e.target.parentElement.style.background = hoverColor;
	}
	else if (e.target.tagName === 'LI') {
		e.target.style.background = hoverColor;
	}
	document.body.style.cursor = "pointer";
}

const unHoverSuggestion = (e) => {
	e.preventDefault();
	document.body.style.cursor = 'default';
	e.target.style.background = 'rgba(255, 215, 140, 0.397)';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', hoverSuggestion);
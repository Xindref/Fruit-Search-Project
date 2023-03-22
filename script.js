const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const hoverColor = 'orangered';

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	if (str !== '') {
		for (let f of fruit) {
			if (f.toLowerCase().includes(str.toLowerCase())) {
				results.push(f);
			}
		}
		showSuggestions(results, input.value);
		return results;
	}
	suggestions.innerHTML = '';
}

function searchHandler(e) {
	e.preventDefault();
	search(input.value);
}

function insertBold(str, indexStart, indexEnd) {
	return str.substring(0, indexStart) + '<b>' + str.substring(indexStart, indexEnd) + '</b>' + str.substring(indexEnd);
}

function showSuggestions(results, inputVal) {
	suggestions.innerHTML = '';
	for (let result of results) {
		newli = document.createElement('li');
		newli.classList.add('searchSuggestion');
		if (result.toLowerCase().includes(inputVal.toLowerCase())) {
			let index = result.toLowerCase().indexOf(inputVal.toLowerCase());
			newli.innerHTML = insertBold(result, index, (index + inputVal.length));

		}
		suggestions.append(newli);
	}

}

function useSuggestion(e) {
	e.preventDefault();
	input.value = e.target.innerText;
	search(e.target.innerText);
	suggestions.innerHTML = '';
}

function hoverSuggestion(e) {
	e.preventDefault();
	if (e.target.className === 'searchSuggestion' &&
		e.target.style.background !== hoverColor) {
		e.target.style.background = hoverColor;
	}
	else {
		e.target.style.background = 'rgba(255, 215, 140, 0.397)';
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', hoverSuggestion);
suggestions.addEventListener('mouseout', hoverSuggestion);
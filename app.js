async function getCountries(url, paste) {
	const result = await fetch(url);
	if (result.ok) {
		const data = await result.json();
		for (let i of data) {
			const newOption = document.createElement('option');
			const newText = document.createTextNode(i.name);
			newOption.appendChild(newText);
			newOption.setAttribute('value', i.name);
			paste.appendChild(newOption);
		}
	}
}
async function getStates(url, paste) {
	$(targetstates).empty();
	const result = await fetch(url);
	if (result.ok) {
		const data = await result.json();
		for (let i of data) {
			const newOption = document.createElement('option');
			const newText = document.createTextNode(i.region);
			newOption.appendChild(newText);
			newOption.setAttribute('value', i.region);
			paste.appendChild(newOption);
		}
	}
}
async function getCities(url, paste) {
	const result = await fetch(url);
	if (result.ok) {
		const data = await result.json();
		if (data.length == 0) {
			const newOption = document.createElement('option');
			const newText = document.createTextNode('null');
			newOption.appendChild(newText);
			newOption.setAttribute('value', 'null');
			paste.appendChild(newOption);
		} else {
			$(targetCities).empty();
			for (let i of data) {
				const newOption = document.createElement('option');
				const newText = document.createTextNode(i.city);
				newOption.appendChild(newText);
				newOption.setAttribute('value', i.city);
				paste.appendChild(newOption);
			}
		}
	}
}
const targetCountry = document.getElementById('countries');
const targetstates = document.getElementById('states');
const targetCities = document.getElementById('cities');
var stateUrl = '';
var cityUrl = '';
var cd = '';
async function change() {
	const result = await fetch('http://battuta.medunes.net/api/country/all/?key=8555467e4eaa9e78c4257e76f4dff90b');
	if (result.ok) {
		const data = await result.json();
		for (let i of data) {
			if (i.name == targetCountry.value) {
				cd = i.code;
				break;
			}
		}
		stateUrl = 'http://battuta.medunes.net/api/region/' + cd + '/all/?key=8555467e4eaa9e78c4257e76f4dff90b';
		getStates(stateUrl, targetstates);
	}
}

function changeCities() {
	cityUrl =
		'http://battuta.medunes.net/api/city/' +
		cd +
		'/search/?region=' +
		targetstates.value +
		'&key=8555467e4eaa9e78c4257e76f4dff90b';
	/*cityUrl =
		'http://battuta.medunes.net/api/city/search/?region=' +
		targetstates.value +
		'&key=8555467e4eaa9e78c4257e76f4dff90b';*/
	//cityUrl =
	//	'http://battuta.medunes.net/api/city/' +
	//	cd +
	//	'/search/?region=' +
	//	targetstates.value +
	//	'&key=' +
	//	'8555467e4eaa9e78c4257e76f4dff90b' +
	//	'&callback=?';
	console.log(cityUrl);
	getCities(cityUrl, targetCities);
}
getCountries('http://battuta.medunes.net/api/country/all/?key=8555467e4eaa9e78c4257e76f4dff90b', targetCountry);
//getCode(saveCountries, targetCountry.value);
function fun() {
	alert('Submission Succesfull!!');
}

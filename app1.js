async function getCountries(url, paste) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const data = JSON.parse(xhttp.responseText);
			for (let i of data) {
				const newOption = document.createElement('option');
				const newText = document.createTextNode(i.name);
				newOption.appendChild(newText);
				newOption.setAttribute('value', i.name);
				paste.appendChild(newOption);
			}
		}
	};
	xhttp.open('GET', url);
	xhttp.send();
}
async function getStates(url, paste) {
	$(targetstates).empty();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const data = JSON.parse(xhttp.responseText);
			for (let i of data) {
				const newOption = document.createElement('option');
				const newText = document.createTextNode(i.region);
				newOption.appendChild(newText);
				newOption.setAttribute('value', i.region);
				paste.appendChild(newOption);
			}
		}
	};
	xhttp.open('GET', url);
	xhttp.send();
}
async function getCities(url, paste) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const data = JSON.parse(xhttp.responseText);
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
	};
	xhttp.open('GET', url);
	xhttp.send();
}
const targetCountry = document.getElementById('countries');
const targetstates = document.getElementById('states');
const targetCities = document.getElementById('cities');
var stateUrl = '';
var cityUrl = '';
var cd = '';
async function change() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const data = JSON.parse(xhttp.responseText);
			for (var i of data) {
				if (i.name == targetCountry.value) {
					cd = i.code;
					break;
				}
			}
			stateUrl = '//battuta.medunes.net/api/region/' + cd + '/all/?key=8555467e4eaa9e78c4257e76f4dff90b';
			getStates(stateUrl, targetstates);
		}
	};
	xhttp.open('GET', '//battuta.medunes.net/api/country/all/?key=8555467e4eaa9e78c4257e76f4dff90b');
	xhttp.send();
}

function changeCities() {
	cityUrl =
		'//battuta.medunes.net/api/city/' +
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
getCountries('//battuta.medunes.net/api/country/all/?key=8555467e4eaa9e78c4257e76f4dff90b', targetCountry);
//getCode(saveCountries, targetCountry.value);
function fun() {
	alert('Submission Succesfull!!');
}

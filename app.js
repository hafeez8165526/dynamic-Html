function setData(data, paste) {
	for (let i in data) {
		const newOption = document.createElement('option');
		const newText = document.createTextNode(i.name);
		newOption.appendChild(newText);
		newOption.setAttribute('value', i.name);
		paste.appendChild(newOption);
	}
}
async function getData(url) {
	const data = await fetch(url);
	const re = await data.json();
	return re;
}
/*
function getCode(data, name) {
	for (var j of data) {
		if (j.name == name) {
			return j.code;
		}
	}
}*/
const targetCountry = document.getElementById('countries');
const countryUrl = 'http://battuta.medunes.net/api/country/all/?key=8555467e4eaa9e78c4257e76f4dff90b';
const saveCountries = getData(countryUrl);
console.log(saveCountries);
/*setData(saveCountries, targetCountry);
const stateUrl =
	'http://battuta.medunes.net/api/region/' +
	getCode(saveCountries, targetCountry) +
	'/all/?key=8555467e4eaa9e78c4257e76f4dff90b';*/

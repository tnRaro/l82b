var $price = document.getElementById("price");
var $result = document.getElementById("result");

function fee(price){
	return Math.ceil(price * 1.01 * 1.002 / 500) * 500;
}

function getPrice(){
	return parseFloat($price.value);
}

var currentSelection;

function onChange(e){
	currentSelection = e.target.value;

	update();
}

function update(){
	switch(currentSelection){
		case "u2k":
			render(fee(getPrice() * rates["USD"] * 1.0175));
			break;
		case "j2k":
			render(fee(getPrice() * rates["JPY"] * 1.0175));
			break;
		case "dcc":
			render(fee(getPrice() * 407 / 393));
			break;
		default:
			console.error("Unknown type");
	}
}

function render(value){
	$result.value = value;
}

var rates = {};

function rateUpdate(){
	$.ajax({
		url: "https://api.fixer.io/latest",
		type: "GET",
		data: {
			base: "KRW"
		},
		success(data){
			for(var key in data.rates){
				var value = data.rates[key];

				rates[key] = 1/value;
			}
			update();
		},
		error(err){
			throw err;
		}
	});
}
rateUpdate();

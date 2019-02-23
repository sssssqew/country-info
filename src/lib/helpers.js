export default function create_country_model(codes, names, capital, phone){
	let countries = [];

	for(var prop in codes){
		const uuidv4 = require('uuid/v4');
		countries.push({
			id: uuidv4(),
			code: codes[prop],
			name: names[prop],
			capital: capital[prop],
			phone: phone[prop]
		})
	}
	return countries;
}
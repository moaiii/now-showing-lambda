const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

module.exports = api;

api.get('/showings', function (req) {
	try {
		const { APP_ID, API_KEY } = process.env;
		const { searchedPostcode, endPostCode } = req.queryString;

		const baseURL = `https://transportapi.com/v3`;

		const request = new Request();

		const url = `${baseURL}/uk/public/journey/from/postcode:${searchedPostcode}/to/postcode:${endPostCode}.json?app_id=${APP_ID}&app_key=${API_KEY}&service=southeast`

		request
			.get(url)
			.then((data) => {
				return data;
			});

	} catch (e) {
		return e;
	}
});
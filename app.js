const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const axios = require('axios');
const CircularJSON = require('circular-json');

module.exports = api;

api.get('/showings', function (req) {
	return new Promise((resolve, reject) => {
		try {
			const { API_ID, API_KEY } = process.env;

			const { searchedPostcode, endPostCode } = req.queryString;

			const baseURL = `https://transportapi.com/v3`;

			const url = `${baseURL}/uk/public/journey/from/postcode:`
				+ `${searchedPostcode}/to/postcode:`
				+ `${endPostCode}${`.json`}?`
				+ `app_id=${API_ID}&app_key=${API_KEY}&service=southeast`

			axios
				.get(url)
				.then(function(res) {
					resolve(res.data);
				})
				.catch(function(axiosError) {
					reject({ axiosError })
				});

		} catch (trycatchError) {
			reject({ trycatchError });
		}
	})
});
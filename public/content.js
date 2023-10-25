// content.js
console.log('Content script running');

fetch('https://finance.yahoo.com/quote/AAPL')
	.then(resp => {
		console.log(resp);
		console.log('======success=======');
	})
	.catch(err => {
		console.log('======failure=======');
		console.log(err);
	});
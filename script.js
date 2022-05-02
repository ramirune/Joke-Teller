const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

/* Disable/Enable Button */
function toggleButton() {
	button.disabled = !button.disabled;
}

/* Passing Joke to VoiceRSS API */
function tellMe(joke) {
	VoiceRSS.speech({
		key: '7f32d7fb42864ad5980107e8d1ab2aca',
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false,
	});
}

/* Get Jokes from Joke API */
async function getJokes() {
	let joke = '';
	const apiUrl =
		'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery} ... ha ha ha`;
		} else {
			joke = data.joke;
		}
		// Text-to-Speech
		tellMe(joke);
		// Disable Button
		toggleButton();
	} catch (error) {
		// Catch Error Here
		console.log('Whoops', error);
	}
}

/* Event Listeners */
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

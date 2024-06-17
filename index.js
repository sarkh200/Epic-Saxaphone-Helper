var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'G1IbRujko-A',
		playerVars: {
			'playsinline': 1,
		},
		events: {}
	});
}

async function getJSON(url) {
	const response = await fetch(url);
	return response.json();
}

async function getTime() {
	let data = await getJSON("https://worldtimeapi.org/api/ip");
	let time = data.datetime;
	let date = new Date(time);
	let hours = timeToStart.split(':')[0] - date.getHours();
	let minutes = timeToStart.split(':')[1] - date.getMinutes();
	let totalMS = ((hours * 360000) + (minutes * 60000)) - (date.getSeconds() * 1000) - date.getMilliseconds();
	return totalMS;
}

async function go() {
	if (timeToStart != 0) {
		let totalMS = await getTime();
		let time = new Date();
		output.innerHTML = `Will play in ${totalMS} milliseconds as of ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`;
		if (totalMS > 0) {
			setTimeout(() => { player.playVideo() }, totalMS);
		}
		else {
			player.seekTo(0);
			player.playVideo();
		}
	}
}

let timeToStart = 0;

onload = () => {
	const startTimeSelector = document.getElementById("StartTimeSelector");
	const goButton = document.getElementById("Go");
	const output = document.getElementById("ouput");

	goButton.addEventListener("click", () => go());

	startTimeSelector.addEventListener("change", (event) => {
		timeToStart = event.target.value;
	});
}
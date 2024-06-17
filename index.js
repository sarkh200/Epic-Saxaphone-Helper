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

let timeToStart = 0;

onload = (event) => {
	const startTimeSelector = document.getElementById("StartTimeSelector");
	const goButton = document.getElementById("Go");

	goButton.addEventListener("click", (event) => {
		if (timeToStart != 0) {
			let date = new Date();
			let hours = timeToStart.split(':')[0] - date.getHours();
			let minutes = timeToStart.split(':')[1] - date.getMinutes();
			let totalSeconds = ((hours * 360) + (minutes * 60)) - date.getSeconds();
			console.log(`Will play in ${totalSeconds} seconds`)
			if (totalSeconds > 0) {
				setTimeout(() => { player.playVideo() }, totalSeconds * 1000);
			}
			else {
				player.seekTo(0);
				player.playVideo();
			}
		}
	});

	startTimeSelector.addEventListener("change", (event) => {
		timeToStart = event.target.value;
	});
}
const modalParams = {
	fliphorizontal: true,
	imageScaleFactor: 0.7,
	maxNumBoxes: 1,
	iouThreshold:0.5,
	scoreThreshold:0.79,
}

navigator.getUserMedia = 
navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

let video = document.querySelector("#video")
let audio1 = document.querySelector(".audio1")
let audio2 = document.querySelector(".audio2")
let audio3 = document.querySelector(".audio3")
let audio4 = document.querySelector(".audio4")

let model;

handTrack.startVideo(video)
	.then(status => {
		if (status){
			navigator.getUserMedia({video: {}}, stream => {
				video.srcObject = stream;
				setInterval(runDetection,20)
			},
			err => console.log(err)
			)
		}
	})


function runDetection() {
	model.detect(video)
		.then(predictions => {
			if (predictions.length != 0){
				if (predictions[0].label != "face"){
					let hand1 = predictions[0].bbox;
					let x = hand1[0]
					let y = hand1[1]

					if (x <= 100){
						console.log("auio1")
						audio1.currentTime = 0;
						audio1.play()
					}

					if (x > 100 && x < 250){
						console.log("auio2")
						audio2.currentTime = 0;
						audio2.play()
					}

					if (x > 251 && x < 300){
						audio3.currentTime = 0;
						console.log("auio3")
						audio3.play()
					}

					if (x > 300){
						console.log("auio4")
						audio4.currentTime = 0;
						audio4.play()
					}
				}
			}

		})

}

handTrack.load(modalParams).then(lmodel => {
	model = lmodel;
})
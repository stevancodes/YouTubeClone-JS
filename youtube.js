var input = document.querySelector("input");
var videos = document.querySelector(".videos");
var btn = document.querySelector(".lupica");
var key = "AIzaSyBUuYvC8jHFfmYeYq_IbIu2lp9s_YCQwpo";
// var url = "https://www.googleapis.com/youtube/v3";
// var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=16&q=${input.value}&key=${key}`;
var iframe = document.querySelector("iframe");

function getVideos(id) {
  //   var req = new XMLHttpRequest();
  var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=18&q=${input.value}&key=${key}`;
  //   req.open("GET", url);
  //   req.onload = function () {
  //     console.log(JSON.parse(req.responseText).items);
  //     videosList(JSON.parse(req.responseText).items);
  //   };
  fetch(url)
    .then((response) => response.json())
    .then((data2) => {
      console.log(data2.items);
      videosList(data2.items);
    });
}

function videosList(data) {
  videos.innerHTML = "";
  input.value = "";
  data.forEach((item) => {
    console.log(item);
    makeVideo(item);
  });
}

function makeVideo(video) {
  var videoObject = document.createElement("div");
  var image = document.createElement("img");
  var title = document.createElement("h2");
  image.setAttribute("src", video.snippet.thumbnails.high.url);
  title.textContent = video.snippet.title;
  videoObject.append(image);
  videoObject.append(title);
  videoObject.addEventListener("click", function () {
    playVideo(video.id.videoId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  videos.append(videoObject);
  videoObject.classList.add("videowrapp");
  image.classList.add("videoImg");
}
function playVideo(id) {
  iframe.setAttribute("src", `https://www.youtube.com/embed/${id}`);
  iframe.classList.add("active");
}
btn.addEventListener("click", function () {
  getVideos();
  iframe.classList.remove("active");
});
window.addEventListener("load", getVideos);
window.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    getVideos();
    iframe.classList.remove("active");
  }
});

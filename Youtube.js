let div = document.getElementById("videosResults");
let input = document.getElementById("inputBox");
input.addEventListener("keyup", function (event) {
    if (event.key === 13) {
        event.preventDefault();

        document.getElementById("searchbtn").click(); // Trigger the button element with a click
        search();
    }
});

let playVideo = (id) => {
    let videoDiv = document.getElementById("videosResults");
    

    videoDiv.innerHTML = `<iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/${id}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>`;
};

async function search() {
    let inp = document.getElementById("inputBox").value;
    let div = document.getElementById("videosResults");
    div.innerHTML = "";

    let API = "AIzaSyA266SPutTfCO63sLArqnx8Xi-UR51PSus";

    let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?q=${encodeURIComponent(inp)}&part=snippet&maxResults=25&key=${API}`
    );
    let data = await res.json();
    console.log(data);

    for (let item of data.items) {
        let videoId = item.id.videoId;
        let { title, channelTitle, thumbnails } = item.snippet;
        let channelThumbnail = thumbnails.default.url;

        let mainDiv = document.createElement("div");
        mainDiv.className = "video-item";

        let videoFrame = document.createElement("iframe");
        videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
        videoFrame.allow = "fullscreen";
        videoFrame.className = "video-frame";

        let videoDetails = document.createElement("div");
        videoDetails.className = "video-details";

        let videoTitle = document.createElement("p");
        videoTitle.className = "video-title";
        videoTitle.innerText = title;

        let channelThumbnailImg = document.createElement("img");
        channelThumbnailImg.src = channelThumbnail;
        channelThumbnailImg.className = "channel-icon";

        let channelTittle = document.createElement("p");
        channelTittle.className = "channel-name";
        channelTittle.innerHTML = `${channelTitle} <span id=span>✅</span>`;

        // زر التنزيل
        let downloadButton = document.createElement("button");
        downloadButton.className = "download-button";
        downloadButton.innerText = "تحميل";
        downloadButton.onclick = () => {
            let downloadLink = `https://www.ssyoutube.com/watch?v=${videoId}`;
            window.open(downloadLink, '_blank');
        };

        videoDetails.append(videoTitle, channelThumbnailImg, channelTittle, downloadButton);
        mainDiv.append(videoFrame, videoDetails);
        div.append(mainDiv);
    }
}

// ربط الدالة بزر البحث
document.getElementById('searchbtn').onclick = search;
// <-------------------------------------------------------------------->

async function trending() {
    let inp = document.getElementById("inputBox").value;
    let div = document.getElementById("videosResults");
    div.innerHTML = "";

    let API = "AIzaSyA266SPutTfCO63sLArqnx8Xi-UR51PSus";

    let url = inp
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${encodeURIComponent(inp)}&key=${API}`
        : `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=nature+in+Europe&key=${API}`; // البحث عن فيديوهات حول الطبيعة في أوروبا

    let res = await fetch(url);
    let data = await res.json();
    console.log(data);

    for (let item of data.items) {
        let id = item.id.videoId || item.id; // التعامل مع حالة البحث أو التريندينغ
        let { title, description, channelTitle, thumbnails } = item.snippet;
        let channelThumbnail = thumbnails.medium.url;

        // إنشاء العناصر HTML
        let mainDiv = document.createElement("div");
        mainDiv.className = "video-item";

        let videoThumbnail = document.createElement("img");
        videoThumbnail.src = channelThumbnail;
        videoThumbnail.className = "video-thumbnail";
        videoThumbnail.onclick = () => playVideo(id);

        let videoDetails = document.createElement("div");
        videoDetails.className = "video-details";

        let videoTitle = document.createElement("p");
        videoTitle.className = "video-title";
        videoTitle.innerText = title;

        let videoDescription = document.createElement("p");
        videoDescription.className = "video-description";
        videoDescription.innerText = description;

        let videoChannel = document.createElement("p");
        videoChannel.className = "video-channel";
        videoChannel.innerText = channelTitle;

        // زر التنزيل
        let downloadButton = document.createElement("button");
        downloadButton.className = "download-button";
        downloadButton.innerText = "تحميل";
        downloadButton.onclick = () => {
            let downloadLink = `https://www.ssyoutube.com/watch?v=${id}`; // مثال: استخدام موقع خارجي لتحويل الروابط
            window.open(downloadLink, '_blank');
        };

        videoDetails.append(videoTitle, videoDescription, videoChannel, downloadButton);
        mainDiv.append(videoThumbnail, videoDetails);
        div.append(mainDiv);
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', trending);
const playlists = [
  {
    id: 1,
    image: "./assets/img/ImageSlider/slide1.jpg",
    url: "./assets/music/song1.mp3",
    name: "Tấm lòng son",
    singer: "H-Kray",
  },
  {
    id: 2,
    image: "./assets/img/ImageSlider/slide2.jpg",
    url: "./assets/music/song2.mp3",
    name: "Thời gian sẽ trả lời",
    singer: "Tiên Cookie",
  },
  {
    id: 3,
    image: "./assets/img/ImageSlider/slide3.jpg",
    url: "./assets/music/song3.mp3",
    name: "SKY DECADE",
    singer: "Sơn Tùng MTP",
  },
  {
    id: 4,
    image: "./assets/img/ImageSlider/slide4.jpg",
    url: "./assets/music/song4.mp3",
    name: "Dancing With Your Ghost",
    singer: "Sasha Alex Sloan",
  },
  {
    id: 5,
    image: "./assets/img/ImageSlider/slide5.jpg",
    url: "./assets/music/song5.mp3",
    name: "Eyes",
    singer: "G.Ducky",
  },
  {
    id: 6,
    image: "./assets/img/ImageSlider/slide6.jpg",
    url: "./assets/music/song6.mp3",
    name: "Eyes",
    singer: "G.Ducky",
  },
  {
    id: 7,
    image: "./assets/img/ImageSlider/slide7.jpg",
    url: "./assets/music/song7.mp3",
    name: "Eyes",
    singer: "G.Ducky",
  },
];

const listPlayLists = "PLAY_LISTS";
localStorage.setItem(listPlayLists, JSON.stringify(playlists));

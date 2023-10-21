const songs = [
  {
    id: "1",
    url: "./assets/music/song1.mp3",
    name: "Tấm lòng son",
    singer: "H-Kray",
    time: "04:40",
    image: "./assets/img/singer/singer1.webp",
  },
  {
    id: "2",
    url: "./assets/music/song2.mp3",
    name: "Thời gian sẽ trả lời",
    singer: "Tiên Cookie",
    image: "./assets/img/singer/singer2.webp",
    time: "03:14",
  },
  {
    id: "3",
    url: "./assets/music/song3.mp3",
    name: "SKY DECADE",
    singer: "Sơn Tùng MTP",
    time: "03:16",
    image: "./assets/img/singer/singer3.webp",
  },
  {
    id: "4",
    url: "./assets/music/song4.mp3",
    name: "Dancing With Your Ghost",
    singer: "Sasha Alex Sloan",
    time: "03:19",
    image: "./assets/img/singer/singer4.webp",
  },
  {
    id: "5",
    url: "./assets/music/song5.mp3",
    name: "Eyes",
    singer: "G.Ducky",
    time: "03:25",
    image: "./assets/img/singer/singer5.webp",
  },
  {
    id: "6",
    url: "./assets/music/song6.mp3",
    name: "Em Gái",
    singer: "Low G",
    time: "2:28",
    image: "./assets/img/singer/singer6.webp",
  },
  {
    id: "7",
    url: "./assets/music/song7.mp3",
    name: "Buông Hàng",
    singer: "Young Milo",
    time: "2:51",
    image: "./assets/img/singer/singer7.webp",
  },
];

const LIST_INFO_SONGS = "listSongs";
localStorage.setItem(LIST_INFO_SONGS, JSON.stringify(songs));

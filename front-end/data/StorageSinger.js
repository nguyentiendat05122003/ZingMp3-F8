const singers = [
  {
    name: "Binz",
    image: "./assets/img/singer2/artist1.jpg",
    follower: "256K",
  },
  {
    name: "Phương Ly",
    image: "./assets/img/singer2/artist2.jpg",
    follower: "77K",
  },
  {
    name: "AMEE",
    image: "./assets/img/singer2/artist3.jpg",
    follower: "317K",
  },
  {
    name: "MCK",
    image: "./assets/img/singer2/artist4.jpg",
    follower: "52K",
  },
  {
    name: "Sơn Tùng MTP",
    image: "./assets/img/singer2/artist5.jpg",
    follower: "2.1M",
  },
  {
    name: "MR.Siro",
    image: "./assets/img/singer2/artist6.jpg",
    follower: "735K",
  },
  {
    name: "Han Sara",
    image: "./assets/img/singer2/artist7.jpg",
    follower: "158K",
  },
  {
    name: "Bích Phương",
    image: "./assets/img/singer2/artist8.jpg",
    follower: "368K",
  },
  {
    name: "Soobin",
    image: "./assets/img/singer2/artist9.jpg",
    follower: "435K",
  },
];

const listSinger = localStorage.setItem("LIST_SINGER", JSON.stringify(singers));

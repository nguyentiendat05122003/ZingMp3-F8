const listTemplate = [
  {
    type: "Chủ đề",
    arrayTheme: [
      {
        name: "Zing Music",
        image: "./assets/img/themeBackground/theme1.jpg",
      },
      {
        name: "Tháp Eiffel",
        image: "./assets/img/themeBackground/theme2.jpg",
      },
    ],
  },
  {
    type: "Nghệ sĩ",
    arrayTheme: [
      {
        name: "Rose",
        image: "./assets/img/themeBackground/rosse.jpg",
      },
      {
        name: "IU",
        image: "./assets/img/themeBackground/iu.jpg",
      },
      {
        name: "Ji Chang Wook",
        image: "./assets/img/themeBackground/lee-chang-wook.jpg",
      },
      {
        name: "Lisa",
        image: "./assets/img/themeBackground/lisa.jpg",
      },
      {
        name: "Jennie Kim",
        image: "./assets/img/themeBackground/rose.jpg",
      },
      {
        name: "Jisoo",
        image: "./assets/img/themeBackground/jisso.jpg",
      },
    ],
  },
  {
    type: "Màu Tối",
    arrayTheme: [
      { name: "Tối", image: "./assets/img/themeBackground/dark.jpg" },
      {
        name: "Tím",
        image: "./assets/img/themeBackground/purple.jpg",
      },
      {
        name: "Xanh đậm",
        image: "./assets/img/themeBackground/xanhdam.jpg",
      },
      {
        name: "Xanh biển",
        image: "./assets/img/themeBackground/xanhbien.jpg",
      },
      {
        name: "Xanh lá",
        image: "./assets/img/themeBackground/xanhla.jpg",
      },
      {
        name: "Nâu",
        image: "./assets/img/themeBackground/nau.jpg",
      },
      {
        name: "Hồng",
        image: "./assets/img/themeBackground/hongdam.jpg",
      },
      {
        name: "Đỏ",
        image: "./assets/img/themeBackground/do.jpg",
      },
    ],
  },
];

const TEMPLATE_LIST_KEY = "LIST_BACKGROUNDS_TEMPLATE";

localStorage.setItem(TEMPLATE_LIST_KEY, JSON.stringify(listTemplate));

import convertTime from "../../util/covertTime.js";
app.controller(
  "discoverCtrl",
  function ($http, $rootScope, $scope, $location, $routeParams) {
    $rootScope.homeMenu = false;
    $rootScope.discoverMenu = true;
    $rootScope.followMenu = false;
    $rootScope.storeMenu = false;
    $rootScope.typeSongMenu = false;
    $scope.isActive = true;
    $scope.isActiveVietNam = true;
    $scope.isActiveOther = false;
    const playlists = [
      {
        id: 1,
        image:
          "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/0/0/e/9/00e936d9ebff9dafbd1c76da49ac7f9e.jpg",
        desc: "Bật tình yêu lên' với giai điệu V-Pop làm bạn vui tươi cả ngày",
      },
      {
        id: 2,
        image:
          "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/b/b/6/5/bb65218db438da6d265771d567ae355a.jpg",
        desc: "Nhớ nạp vitamin tích cực đều đặn mỗi ngày nhé",
      },
      {
        id: 3,
        image:
          "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/8/3/e/8/83e83c4a068f0b994a99735e440b76df.jpg",
        desc: "Cứ vui lên vì những âu lo rồi cũng sẽ qua thôi",
      },
      {
        id: 4,
        image:
          "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/0/6/f/1/06f1c6d7785e65704b6fc82d99a505ce.jpg",
        desc: "Yêu đời hẳn ra cùng V-Pop Speed Up cực cuốn",
      },
    ];
    $scope.playLists = playlists;
    $scope.slick = () => {
      const sliderWrapperEl = document.querySelector(".list-slider");
      const wrapper = document.querySelector(".container-discover-slider");
      const sliderList = [...sliderWrapperEl.children];
      const sliderWidth = sliderList[0].offsetWidth;
      let timeoutId;
      let cardPerView = Math.round(sliderWrapperEl.offsetWidth / sliderWidth);
      sliderList
        .slice(-cardPerView)
        .reverse()
        .forEach((card) => {
          sliderWrapperEl.insertAdjacentHTML("afterbegin", card.outerHTML);
        });
      sliderList.slice(0, cardPerView).forEach((card) => {
        sliderWrapperEl.insertAdjacentHTML("beforeend", card.outerHTML);
      });
      sliderWrapperEl.classList.add("no-transition");
      sliderWrapperEl.scrollLeft = sliderWrapperEl.offsetWidth;
      sliderWrapperEl.classList.remove("no-transition");
      const autoPlay = () => {
        timeoutId = setTimeout(() => {
          sliderWrapperEl.scrollLeft += sliderWidth;
        }, 2500);
      };
      autoPlay();
      const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (sliderWrapperEl.scrollLeft === 0) {
          sliderWrapperEl.classList.add("no-transition");
          sliderWrapperEl.scrollLeft =
            sliderWrapperEl.scrollWidth - 2 * sliderWrapperEl.offsetWidth;
          sliderWrapperEl.classList.remove("no-transition");
        }
        // If the sliderWrapperEl is at the end, scroll to the beginning
        else if (
          Math.ceil(sliderWrapperEl.scrollLeft) - 1 ===
          sliderWrapperEl.scrollWidth - sliderWrapperEl.offsetWidth
        ) {
          sliderWrapperEl.classList.add("no-transition");
          sliderWrapperEl.scrollLeft = sliderWrapperEl.offsetWidth;
          sliderWrapperEl.classList.remove("no-transition");
        }
        clearTimeout(timeoutId);
        autoPlay();
      };
      sliderWrapperEl.addEventListener("scroll", infiniteScroll);
    };
    setTimeout(() => {
      $scope.slick();
    }, 100);

    $scope.getListTypeSong();
    $scope.getListArtist();

    $scope.getListSongVietNam = () => {
      $scope.isActiveVietNam = false;
      $scope.isActive = true;
      $http({
        method: "GET",
        url: "http://localhost:3002/song/vietnam",
      }).then(
        function successCallback(response) {
          const listSong = response.data;
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
          });
          $scope.listSong = listSong;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $scope.getListSongOther = () => {
      $scope.isActive = false;
      $http({
        method: "GET",
        url: "http://localhost:3002/song/otherCountry",
      }).then(
        function successCallback(response) {
          const listSong = response.data;
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
          });
          $scope.listSong = listSong;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $scope.getListSongVietNam();
  }
);

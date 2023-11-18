import toast from "../js/toast.js";
import convertTime from "../../util/covertTime.js";
app.controller(
  "mainController",
  function ($http, $rootScope, $scope, $routeParams) {
    $scope.imageUser = "https://avatar.talk.zdn.vn/default";
    $scope.imageSong = "https://photo-zmp3.zmdcdn.me/album_default.png";
    const account = JSON.parse(localStorage.getItem("account"));
    const accountId = account?.account.accountId;
    const typeAccount = account?.account.typeAccountId;

    $rootScope.loading = true;
    $rootScope.isLogin = account;
    $scope.IsHidden = true;
    $scope.IsShowDetailSong = true;
    $scope.IsShowBtnEditSong = true;
    $scope.IsShowInfoSong = true;
    $scope.listPlayList;
    $scope.IsShowPlayList = true;
    $scope.username = "";
    $scope.namePlayList = "";
    $scope.date = "";
    $scope.country = "";
    $scope.email = "";
    $scope.desc = "";
    $scope.getInfoUser = () => {
      $http({
        method: "GET",
        url: `http://localhost:3002/user/${accountId}`,
      }).then(
        function successCallback(response) {
          const user = response.data[0];
          const { name, birthDay, country, email, desc, image } = user;
          $scope.username = name;
          $scope.date = new Date(birthDay);
          $scope.country = country;
          $scope.email = email;
          $scope.desc = desc;
          $scope.imageUser = image;
          localStorage.setItem("user", JSON.stringify(user));
          console.log(user);
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    if (account) {
      $scope.getInfoUser();
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    if (typeAccount == 2) {
      $rootScope.isArtist = true;
    } else {
      $rootScope.isArtist = false;
    }
    $scope.loadFile = function (e) {
      const imageEl = document.getElementById("img-song");
      if (e.target.files && e.target.files[0]) {
        imageEl.src = URL.createObjectURL(e.target.files[0]);
        $scope.imageSong = e.target.files[0];
      }
    };
    $scope.previewFile = (source) => {
      const preview = document.querySelector(".audio-preview");
      const file = document.querySelector(".input-audio").files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          preview.src = reader.result;
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
        $scope.source = file;
      }
    };
    $scope.ShowHide = function () {
      $scope.IsHidden = !$scope.IsHidden;
    };
    $scope.ShowDetailSong = function (id) {
      const detailSong = document.querySelector(`.list-detail-song-${id}`);
      if (detailSong.classList.contains("active")) {
        detailSong.classList.remove("active");
      } else {
        detailSong.classList.add("active");
      }
    };
    $scope.ShowHideCreatePlayList = function () {
      $scope.IsShowPlayList = !$scope.IsShowPlayList;
    };
    $scope.ShowFormInfoSong = function (song) {
      const preview = document.querySelector(".audio-preview");
      const imageEl = document.getElementById("img-song");
      const selectTypeSongEl = document.getElementById("selectedProduct");
      $scope.IsShowInfoSong = !$scope.IsShowInfoSong;
      $scope.IsShowBtnEditSong = true;
      if ($scope.IsShowInfoSong) {
        imageEl.setAttribute(
          "src",
          "https://photo-zmp3.zmdcdn.me/album_default.png"
        );
        preview.setAttribute("src", null);
      }
      $scope.nameSong = "";
      $scope.descSong = "";
      $scope.source = "";
      if (song) {
        const { songId, name, image, source, desc, typeSongId } = song;
        $scope.IsShowBtnEditSong = false;
        $scope.songId = songId;
        $scope.nameSong = name;
        $scope.descSong = desc;
        imageEl.setAttribute("src", image);
        preview.setAttribute("src", source);
        $scope.imageSong = image;
        $scope.source = source;
        selectTypeSongEl.value = typeSongId;
      }
    };
    $scope.logOut = () => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      $rootScope.isLogin = false;
      window.location.reload();
    };
    $scope.updateInfoUser = function () {
      let data = new FormData();
      data.append("name", $scope.username);
      data.append("birthDay", $scope.date);
      data.append("country", $scope.country);
      data.append("email", $scope.email);
      data.append("desc", $scope.desc);
      data.append("isBan", 0);
      data.append("accountId", accountId);
      data.append("image", $scope.imageUser);
      $http({
        method: "PUT",
        url: "http://localhost:3002/user/edit",
        data: data,
        headers: { "Content-Type": undefined },
      }).then(
        function successCallback(response) {
          $scope.getInfoUser();
          toast({
            title: "Thành công!",
            message: "Bạn đã lưu thông tin thành công",
            type: "success",
            duration: 5000,
          });
        },
        function errorCallback(response) {
          toast({
            title: "Thất bại!",
            message: response.data,
            type: "error",
            duration: 5000,
          });
        }
      );
    };
    $scope.hide = function () {
      $scope.IsHidden = true;
    };
    $scope.createNewPlayList = () => {
      const data = {
        userId: userId,
        name: $scope.namePlayList,
      };
      $http({
        method: "POST",
        url: "http://localhost:3002/playList/add",
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          $scope.namePlayList = "";
          toast({
            title: "Thành công!",
            message: "Đăng nhập thành công",
            type: "success",
            duration: 5000,
          });
          $scope.getListPlayList();
        },
        function errorCallback(response) {
          $scope.namePlayList = "";
          toast({
            title: "Thất bại!",
            message: response.data,
            type: "error",
            duration: 5000,
          });
        }
      );
    };
    $scope.getListPlayList = () => {
      $http({
        method: "GET",
        url: `http://localhost:3002/playList/${userId}`,
      }).then(
        function successCallback(response) {
          $scope.listPlayList = response.data;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $rootScope.$on("CallParentMethod", function () {
      $scope.getListPlayList();
    });
    if (userId) {
      $scope.getListPlayList();
    }
    $scope.loadFile = function (e) {
      const imageEl = document.getElementById("img-user");
      if (e.target.files && e.target.files[0]) {
        imageEl.src = window.URL.createObjectURL(e.target.files[0]);
        $scope.imageUser = e.target.files[0];
      }
    };
    $scope.addSongIntoPlayList = (playListId, songId) => {
      const data = {
        playListId,
        songId,
      };
      $http({
        method: "POST",
        url: "http://localhost:3002/playListSong/add",
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          console.log(response);
          toast({
            title: "Thành công!",
            message: "Đăng nhập thành công",
            type: "success",
            duration: 2000,
          });
        },
        function errorCallback(response) {
          $scope.namePlayList = "";
          toast({
            title: "Thất bại!",
            message: response.data,
            type: "error",
            duration: 5000,
          });
        }
      );
    };
    $scope.getListSong = () => {
      $http({
        method: "GET",
        url: "http://localhost:3002/song",
      }).then(
        function successCallback(response) {
          const listSong = response.data;
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
          });
          $rootScope.songs = listSong;
          localStorage.setItem("listSongs", JSON.stringify(listSong));
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $scope.getListTypeSong = () => {
      $http({
        method: "GET",
        url: "http://localhost:3002/typeSong",
      }).then(
        function successCallback(response) {
          localStorage.setItem("typeSong", JSON.stringify(response.data));
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $scope.getListArtist = () => {
      $http({
        method: "GET",
        url: "http://localhost:3002/user/getArtist",
      }).then(
        function successCallback(response) {
          $scope.singers = response.data;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $scope.editSong = () => {
      const audio = document.querySelector(".audio-preview");
      const user = JSON.parse(localStorage.getItem("user"));
      const selectTypeSongEl = document.getElementById("selectedProduct");
      const descSongElement = document.getElementById("desc-song");
      const nameSongEl = document.getElementById("nameSong");
      const userId = user?.userId;
      let data = new FormData();
      data.append("name", nameSongEl.value);
      data.append("image", $scope.imageSong);
      data.append("source", $scope.source);
      data.append("desc", descSongElement.value);
      data.append("typeSongId", selectTypeSongEl.value);
      data.append("userId", userId);
      data.append("duration", audio.duration);
      $scope.showLoader = true;
      $http({
        method: "PUT",
        url: `http://localhost:3002/song/${$scope.songId}/edit`,
        data: data,
        headers: {
          "Content-Type": undefined,
        },
      }).then(
        function successCallback(response) {
          $scope.showLoader = false;
          toast({
            title: "Thành công!",
            message: response.data,
            type: "success",
            duration: 3000,
          });
          $scope.getListSong();
        },
        function errorCallback(response) {
          $scope.showLoader = false;
          toast({
            title: "Thất bại!",
            message: response.data,
            type: "error",
            duration: 5000,
          });
        }
      );
    };
    $scope.getListSong();
    window.addEventListener("load", () => {
      const $ = document.querySelector.bind(document);
      const $$ = document.querySelectorAll.bind(document);
      const appElement = $("#app");
      const btnBC = $(".background-item");
      const modalBC = $(".changeBackground");
      const btnFormInfo = $(".setting-item-info-user");
      const modalFormInfo = $(".container-formInfo");
      const btnCloseFormInfo = $(".btn-close-formInfo");
      const btnFormInfoSong = $(".btn.upload");
      const modalFormInfoSong = $(".container-formInfoSong");
      const btnCloseInfoSong = $(".btn-close-formInfoSong");
      const HistoryELement = $(".history-search");
      const inputElement = $(".input-search");
      const btnClose = $(".btn-close-bc");
      const btnSetting = $(".setting");
      const settingMenu = $(".setting-list");
      const ContainerModalBC = $(".wrapper-content");
      const ContainerPlayMusic = $(".play-music");
      const playlistElements = $$(".list-playlist");
      const btnMovePrevPlaylists = $$(".playlist-move .btn-prev");
      const btnMoveNextPlaylists = $$(".playlist-move .btn-next");
      const thumb = $(".wrapper-img img");
      const nameSong = $(".info-text h2");
      const textClone = $(".text-clone");
      const nameSinger = $(".info-text a");
      const audio = $("audio");
      const playBtn = $("button.btn.play");
      const iconPause = $(".fa-circle-pause");
      const iconPlay = $(".playMusic");
      const timeEnd = $(".time-end");
      const timeUpdate = $(".time-update");
      const inputProgress = $(".input-progress");
      const nextBtn = $(".btn.next");
      const prevBtn = $(".btn.previous");
      const randomBtn = $(".btn.random");
      const repeatBtn = $(".btn.repeat");
      const inputVolume = $(".progress-volume");
      const inputValue = $(".input-value");
      const valueVolumeInput = $(".volume-value");
      let titleElement = $(".text-title");

      let isPLay = false;
      let isRandom = false;
      let isRepeat = false;

      let containerItems;
      let imageElements;
      let currentImage;
      // localStorage
      const TEMPLATES =
        JSON.parse(localStorage.getItem("LIST_BACKGROUNDS_TEMPLATE")) || []; // các template bc
      const THEMES = JSON.parse(localStorage.getItem("THEMES")) || []; // các theme của web
      const VALUE_THEME = JSON.parse(
        localStorage.getItem("LOAD_FIRST_THEME")
      ) || [0, 0]; // giá trị lưu bc
      //
      const tmp = `url(./assets/img/BCplaymusic/theme1.png)`;
      const app = {
        currentIndex: 0,
        render: function () {
          const _this = this;
          // render các modal background
          const TemplateBackGround = ({ type, arrayTheme }) => {
            const listItem = arrayTheme.map((theme, index) => {
              return `<li class="col list-item l-2-4 m-4 c-6">
            <div class="item-img" data-index=${index}>
              <img src=${theme.image} alt="" class="ImageBC"/>
              <div class="item-option">
              <button class="btn btn-complete">Áp dụng</button>
              <button class="btn btn-see">Xem trước</button>
              </div>
              <i class="fa-solid fa-circle-check icon-item"></i>
              </div>
              <p>${theme.name}</p>
          </li>`;
            });
            const template = `<div class="content-item">
          <h3>${type}</h3>
          <div class="grid">
            <ul class="content-list row">
              ${listItem.join("")}
            </ul>
          </div>  
          </div>`;
            return template;
          };
          const modalTemplate = TEMPLATES.map((template) => {
            return TemplateBackGround(template);
          });
          ContainerModalBC.innerHTML = modalTemplate.join("");
        },
        handlerEvent: function () {
          const _this = this;
          // Load background
          loadBC();
          // Scale Image
          ScaleImage(".img-icon");
          ScaleImage(".mv-icon");
          //click modal background
          btnBC.onclick = (e) => {
            modalBC.classList.add("active");
            // Scale Image
            ScaleImage(".item-option");
            // Choose the modal
            containerItems = $$(".content-item");
            containerItems.forEach((item, index) => {
              item.onclick = (e) => {
                const btnApply = e.target.closest(".btn-complete");
                const btnView = e.target.closest(".btn-see");
                const image = e.target.closest(".item-img");
                if (image) {
                  currentImage = Number(image.dataset.index);
                  if (btnApply) {
                    loadThemeBg(index, currentImage);
                    ActiveBC(btnApply);
                    // save value theme
                    localStorage.setItem(
                      "LOAD_FIRST_THEME",
                      JSON.stringify([index, currentImage])
                    );
                    btnClose.onclick();
                    // load background Music PLay
                    if (index === 0 && currentImage === 0) {
                      ContainerPlayMusic.style.backgroundImage = "none";
                      ContainerPlayMusic.style.background = tmp;
                      localStorage.removeItem("SAVE_BC_MUSIC_PLAYER");
                    } else {
                      //loadBgPlayerMusic(VALUE_BC_MUSIC_PLAYER);
                      let tmp = THEMES[index][currentImage].colors.layoutBg;
                      localStorage.setItem(
                        "SAVE_BC_MUSIC_PLAYER",
                        JSON.stringify(tmp)
                      );
                      const VALUE_BC_MUSIC_PLAYER = JSON.parse(
                        localStorage.getItem("SAVE_BC_MUSIC_PLAYER")
                      );
                      loadBgPlayerMusic(VALUE_BC_MUSIC_PLAYER);
                    }
                  }
                  if (btnView) {
                    loadThemeBg(index, currentImage);
                  }
                }
              };
            });
          };
          modalBC.onclick = (e) => {
            const themeContainer = e.target.closest(".content-background");
            if (!themeContainer) {
              modalBC.classList.remove("active");
            }
          };
          btnClose.onclick = (e) => {
            modalBC.classList.remove("active");
          };
          //click form info
          if (btnFormInfo) {
            btnFormInfo.onclick = (e) => {
              modalFormInfo.classList.add("active");
            };
            modalFormInfo.onclick = (e) => {
              const childrenElement = e.target.closest(".container-formInfo");
              if (!childrenElement) {
                modalBC.classList.remove("active");
              }
            };
            btnCloseFormInfo.onclick = (e) => {
              modalFormInfo.classList.remove("active");
            };
          }
          //click form upload song
          // if (btnFormInfoSong) {
          //   btnFormInfoSong.onclick = (e) => {
          //     modalFormInfoSong.classList.add("active");
          //   };
          //   modalFormInfoSong.onclick = (e) => {
          //     const childrenElement = e.target.closest(".container-formInfoSong");
          //     if (!childrenElement) {
          //       modalFormInfoSong.classList.remove("active");
          //     }
          //   };
          //   btnCloseInfoSong.onclick = (e) => {
          //     modalFormInfoSong.classList.remove("active");
          //   };
          // }
          // click input search
          HistoryELement.onmousedown = (e) => {
            e.preventDefault();
          };
          //click menu settings
          btnSetting.onclick = (e) => {
            e.stopPropagation();
            settingMenu.classList.toggle("active");
          };
          settingMenu.onclick = (e) => {
            e.stopPropagation();
          };
          document.onclick = (e) => {
            settingMenu.classList.remove("active");
          };
          // Chuyển đổi sang các tab khác
          const tabs = $$(".tab-title");
          const tabContents = $$(".tab-contents");
          Array.from(tabs).forEach((tab, index) => {
            tab.onclick = (e) => {
              let content = tabContents[index];
              let activeTab = $(".tab-title.active");
              let contentActive = $(".tab-contents.show");
              if (activeTab) {
                activeTab.classList.remove("active");
              }
              contentActive.classList.remove("show");
              contentActive.classList.add("none");
              e.target.classList.add("active");
              content.classList.add("show");
            };
          });
          // click list song
          const itemSongs = $$(".item-song");
          const hearts = $$(".heart");
          // Array.from(itemSongs).forEach((song, index) => {
          //   song.onclick = (e) => {
          //     let songActive = document.querySelector(".item-song.active");
          //     let songRun = songActive.querySelector(".song-run");
          //     if (songActive) {
          //       songActive.classList.remove("active");
          //       songRun.classList.add("none");
          //       _this.currentIndex = index;
          //       _this.loadCurrentSong();
          //       audio.play();
          //     }
          //     if (
          //       e.target.closest(".item-song") &&
          //       !e.target.matches(".item-song")
          //     ) {
          //       const node = getParent(e.target, ".item-song");
          //       node.classList.add("active");
          //     } else {
          //       e.target.classList.add("active");
          //     }
          //   };
          // });
          // active color
          Array.from(hearts).forEach((heart) => {
            heart.onclick = (e) => {
              let color = getThemeNow().colors.purplePrimary;
              if (e.target.classList.contains("show")) {
                e.target.style.color = "#fff";
                e.target.classList.remove("show");
              } else {
                e.target.style.color = `${color}`;
                e.target.classList.add("show");
              }
            };
          });
          // scroll list
          // function handleScroll(next, prev, element) {
          //   const scroll = element.scrollWidth - element.clientWidth;
          //   next.onclick = (e) => {
          //     element.scrollLeft += scroll;
          //     if (
          //       element.clientWidth + Math.round(element.scrollLeft) ===
          //       element.scrollWidth - scroll
          //     ) {
          //       next.classList.add("disabled");
          //       prev.classList.remove("disabled");
          //     }
          //   };
          //   prev.onclick = (e) => {
          //     element.scrollLeft -= scroll;
          //     if (
          //       element.scrollLeft === 0 ||
          //       Math.round(element.scrollLeft) === scroll
          //     ) {
          //       next.classList.remove("disabled");
          //       prev.classList.add("disabled");
          //     }
          //   };
          // }
          //scroll playlist
          // for (i = 0; i < Array.from(playlistElements).length; i++) {
          //   handleScroll(
          //     btnMoveNextPlaylists[i],
          //     btnMovePrevPlaylists[i],
          //     playlistElements[i]
          //   );
          // }
          function ScaleImage(selector) {
            imageElements = $$(selector);
            imageElements.forEach((image) => {
              image.addEventListener("mouseenter", (e) => {
                e.target.previousElementSibling.style.transform = `scale(1.1)`;
              });
              image.addEventListener("mouseleave", (e) => {
                e.target.previousElementSibling.style.transform = `scale(1)`;
              });
            });
          }
          function loadBC() {
            appElement.style.backgroundImage =
              `url('${getThemeNow().image}')` || `url('${THEMES[0][0].image}')`;
            loadThemeBg(VALUE_THEME[0], [VALUE_THEME[1]]);
            ContainerPlayMusic.style.backgroundImage = "none";
            ContainerPlayMusic.style.background =
              JSON.parse(localStorage.getItem("SAVE_BC_MUSIC_PLAYER")) || tmp;
          }
          function loadBgPlayerMusic(value) {
            ContainerPlayMusic.style.backgroundImage = "none";
            ContainerPlayMusic.style.background = value;
          }
          // Load themes
          function loadThemeBg(themeListIndex, currentTheme) {
            const currentThemeColor =
              THEMES[themeListIndex][currentTheme].colors;
            document.documentElement.style.setProperty(
              "--bg-content-color",
              currentThemeColor.bgContentColor
            );
            document.documentElement.style.setProperty(
              "--border-box",
              currentThemeColor.borderBox
            );
            document.documentElement.style.setProperty(
              "--border-primary",
              currentThemeColor.borderPrimary
            );
            document.documentElement.style.setProperty(
              "--layout-bg",
              currentThemeColor.layoutBg
            );
            document.documentElement.style.setProperty(
              "--link-text-hover",
              currentThemeColor.linkTextHover
            );
            document.documentElement.style.setProperty(
              "--modal-scrollbar",
              currentThemeColor.modalScrollbar
            );
            document.documentElement.style.setProperty(
              "--player-bg",
              currentThemeColor.playerBg
            );
            document.documentElement.style.setProperty(
              "--purple-primary",
              currentThemeColor.purplePrimary
            );
            document.documentElement.style.setProperty(
              "--primary-bg",
              currentThemeColor.primaryBg
            );
            document.documentElement.style.setProperty(
              "--sidebar-popup-bg",
              currentThemeColor.sidebarPopupBg
            );
            document.documentElement.style.setProperty(
              "--text-color",
              currentThemeColor.textColor
            );
            document.documentElement.style.setProperty(
              "--text-item-hover",
              currentThemeColor.textItemHover
            );
            document.documentElement.style.setProperty(
              "--text-secondary",
              currentThemeColor.textSecondary
            );
            document.documentElement.style.setProperty(
              "--navigation-text",
              currentThemeColor.navigationText
            );
            document.documentElement.style.setProperty(
              "--placeholder-text",
              currentThemeColor.placeholderText
            );
            if (THEMES[themeListIndex][currentTheme].image) {
              appElement.style.backgroundImage = `url('${THEMES[themeListIndex][currentTheme].image}')`;
            }
            if (!THEMES[themeListIndex][currentTheme].image) {
              appElement.style.backgroundImage = "none";
              appElement.style.background = `${THEMES[themeListIndex][currentTheme].layoutBg}`;
            }
          }
          // Get parent element
          function getParent(element, selector) {
            while (element.parentNode) {
              if (element.matches(selector)) {
                return element;
              }
              element = element.parentNode;
            }
          }
          // Active bc
          function ActiveBC(element) {
            const icons = document.querySelectorAll(".icon-item");
            Array.from(icons).forEach((icon) => {
              icon.classList.remove("active");
            });
            const parentNode = getParent(element, ".item-img");
            const icon = parentNode.querySelector(".icon-item");
            icon.classList.add("active");
          }
          function getThemeNow() {
            return THEMES[VALUE_THEME[0]][VALUE_THEME[1]];
          }

          // MUSIC PLAYER CONTROL
          //click nút play
          let ThumbID = thumb.animate(
            [
              {
                transform: "rotate(360deg)",
              },
            ],
            {
              duration: 10000,
              iterations: Infinity,
            }
          );
          // title animate
          let TitleID = titleElement.animate(
            [{ transform: `translateX(-${titleElement.offsetWidth}px)` }],
            {
              duration: 4000,
              iterations: Infinity,
            }
          );
          TitleID.pause();
          ThumbID.pause();
          playBtn.onclick = (e) => {
            if (!isPLay) {
              audio.play();
            } else {
              audio.pause();
            }
          };
          //khi audio play
          audio.onplay = function (e) {
            iconPlay.classList.add("none");
            iconPause.classList.remove("none");
            isPLay = true;
            ThumbID.play();
            TitleID.play();
            // let songActive = $(".item-song.active");
            // if (songActive) {
            //   let songRun = songActive.querySelector(".song-run");
            //   songRun.classList.remove("none");
            // }
          };
          // khi audio dừng
          audio.onpause = function (e) {
            iconPlay.classList.remove("none");
            iconPause.classList.add("none");
            isPLay = false;
            ThumbID.pause();
            TitleID.pause();
          };
          // khi time chạy
          audio.ontimeupdate = function (e) {
            if (audio.duration) {
              let percentSong = Math.floor(
                (e.target.currentTime / audio.duration) * 100
              );
              inputProgress.value = percentSong;
              let minutes = Math.floor(audio.currentTime / 60);
              let seconds = Math.floor(audio.currentTime % 60);
              if (seconds < 10) {
                seconds = `0${seconds}`;
              }
              if (minutes < 10) {
                minutes = `0${minutes}`;
              }
              timeUpdate.innerText = `${minutes}:${seconds}`;
              inputValue.style.width = percentSong + "%";
            }
          };
          // khi end time
          audio.onended = function (e) {
            if (isRepeat) {
              audio.play();
            } else {
              nextBtn.click();
            }
          };
          // khi input change
          inputProgress.oninput = function (e) {
            audio.currentTime = (inputProgress.value * audio.duration) / 100;
          };
          // next song
          nextBtn.onclick = function (e) {
            if (isRandom) {
              PlayRandom();
              _this.loadCurrentSong();
              audio.play();
              // ScrollActiveSong();
            } else {
              NextSong();
              audio.play();
              // ScrollActiveSong();
            }
          };
          // previous song
          prevBtn.onclick = function (e) {
            if (isRandom) {
              PlayRandom();
              _this.loadCurrentSong();
              audio.play();
            } else {
              PrevSong();
              audio.play();
            }
          };
          //random song
          randomBtn.onclick = (e) => {
            isRandom = !isRandom;
            e.target.classList.toggle("active", isRandom);
          };
          repeatBtn.onclick = (e) => {
            isRepeat = !isRepeat;
            e.target.classList.toggle("active", isRepeat);
          };
          inputVolume.oninput = (e) => {
            audio.volume = inputVolume.value / 100;
            valueVolumeInput.style.width = inputVolume.value / 2 + "%";
          };
          valueVolumeInput.style.width = inputVolume.value / 2 + "%";
          function NextSong() {
            _this.currentIndex++;
            if (_this.currentIndex === $rootScope.songs.length) {
              _this.currentIndex = 0;
            }
            _this.loadCurrentSong();
          }
          function PrevSong() {
            _this.currentIndex--;
            if (_this.currentIndex === -1) {
              _this.currentIndex = $rootScope.songs.length - 1;
            }
            _this.loadCurrentSong();
          }
          function PlayRandom() {
            let newIndexSong;
            do {
              newIndexSong = Math.floor(
                Math.random(0, 1) * $rootScope.songs.length
              );
            } while (newIndexSong === _this.currentIndex);
            console.log(newIndexSong);
            _this.currentIndex = newIndexSong;
          }
          // function ScrollActiveSong() {
          //   setTimeout(function () {
          //     $(".item-song.active").scrollIntoView({
          //       behavior: "smooth",
          //       inline: "nearest",
          //     });
          //   }, 300);
          // }
        },
        loadCurrentSong: function () {
          const currentSong = $rootScope.songs[this.currentIndex];
          thumb.setAttribute("src", currentSong.image);
          nameSong.innerText = currentSong.name;
          nameSinger.innerText = currentSong.nameArtist || currentSong.singer;
          textClone.innerText = currentSong.name;
          audio.setAttribute("src", currentSong.source);
          timeEnd.innerText = currentSong.duration;
          inputProgress.value = 0;
        },
        reset() {
          audio.play();
        },
        start: function () {
          // this.defineProperties();
          this.render();
          this.handlerEvent();
          this.loadCurrentSong();
        },
      };
      app.start();
      $scope.$watch("songs", function (newValue, oldValue) {
        if (newValue !== oldValue) {
          app.start();
          app.reset();
        }
      });
    });
    $scope.isHideSearch = true;
    $scope.evaluateChange = function () {
      $scope.isHideSearch = false;
      const input = document.querySelector(".input-search");
      $scope.valueSearch = input.value.trim();
      let value = input.value.trim();
      if (value.trim() == "") {
        $scope.listSuggestSearch = [];
        return;
      } else {
        $http({
          method: "GET",
          url: `http://localhost:3002/search?q=${value}`,
        }).then(
          function successCallback(response) {
            console.log(response);
            if (response.data.length <= 0) {
              $scope.listSuggestSearch = [];
            } else {
              $scope.listSuggestSearch = response.data;
              $scope.listSuggestSearchMV = [response.data[0]];
            }
          },
          function errorCallback(response) {
            console.log(response);
          }
        );
      }
    };
    $scope.handleClickItem = () => {
      const input = document.querySelector(".input-search");
      input.blur();
    };
  }
);

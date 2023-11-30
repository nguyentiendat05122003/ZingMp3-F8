var listsale = document.getElementsByClassName("sales");
var listsalew = document.getElementsByClassName("sales_week");

function Bieutuan() {
  var chart = new CanvasJS.Chart("chartContainerTuan", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Thống kê theo tuần",
      fontWeight: "bolder",
      fontColor: "#008B8B",
      fontfamily: "tahoma",
      fontSize: 30,
      padding: 10,
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Thứ 2", y: 46 },
          { label: "Thứ 3", y: 87 },
          { label: "Thứ 4", y: 76 },
          { label: "Thứ 5", y: 39 },
          { label: "Thứ 6", y: 87 },
          { label: "Thứ 7", y: 42 },
          { label: "Chủ nhật", y: 60 },
        ],
      },
    ],
  });
  chart.render();
}
function Bieuthang() {
  var chart = new CanvasJS.Chart("chartContainerthang", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Thống kê theo tháng",
      fontWeight: "bolder",
      fontColor: "#008B8B",
      fontfamily: "tahoma",
      fontSize: 25,
      padding: 10,
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "1", y: 46 },
          { label: "2", y: 27 },
          { label: "3", y: 26 },
          { label: "4", y: 39 },
          { label: "5", y: 37 },
          { label: "6", y: 42 },
          { label: "7", y: 60 },
          { label: "8", y: 91 },
          { label: "9", y: 82 },
          { label: "10", y: 79 },
          { label: "11", y: 76 },
          { label: "12", y: 72 },
          { label: "13", y: 26 },
          { label: "14", y: 39 },
          { label: "15", y: 37 },
          { label: "16", y: 42 },
          { label: "17", y: 60 },
          { label: "18", y: 91 },
          { label: "19", y: 82 },
          { label: "20", y: 79 },
          { label: "21", y: 76 },
          { label: "22", y: 72 },
          { label: "23", y: 26 },
          { label: "24", y: 39 },
          { label: "25", y: 37 },
          { label: "26", y: 42 },
          { label: "27", y: 60 },
          { label: "28", y: 91 },
          { label: "29", y: 82 },
          { label: "30", y: 79 },
        ],
      },
    ],
  });
  chart.render();
}
function Bieunam() {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Thống kê theo năm",
      fontWeight: "bolder",
      fontColor: "#008B8B",
      fontfamily: "tahoma",
      fontSize: 25,
      padding: 10,
    },
    data: [
      {
        type: "column",
        padding: 20,
        dataPoints: [
          { label: "Tháng 1", y: 46 },
          { label: "Tháng 2", y: 27 },
          { label: "Tháng 3", y: 26 },
          { label: "Tháng 4", y: 39 },
          { label: "Tháng 5", y: 37 },
          { label: "Tháng 6", y: 42 },
          { label: "Tháng 7", y: 60 },
          { label: "Tháng 8", y: 91 },
          { label: "Tháng 9", y: 82 },
          { label: "Tháng 10", y: 79 },
          { label: "Tháng 11", y: 76 },
          { label: "Tháng 12", y: 72 },
        ],
      },
    ],
  });
  chart.render();
}

function Thongke() {
  if ($("#txt_over").val() == "tuan") {
    for (x of listsale) {
      x.style.display = "none";
    }
    for (y of listsalew) {
      y.style.display = "none";
    }
    listsale[0].style.display = "block";
    listsalew[0].style.display = "grid";
    Bieutuan();
  }
  if ($("#txt_over").val() == "thang") {
    for (x of listsale) {
      x.style.display = "none";
    }
    for (y of listsalew) {
      y.style.display = "none";
    }
    listsale[1].style.display = "block";
    listsalew[1].style.display = "grid";
    Bieuthang();
  }
  if ($("#txt_over").val() == "nam") {
    for (x of listsale) {
      x.style.display = "none";
    }
    for (y of listsalew) {
      y.style.display = "none";
    }
    listsale[2].style.display = "block";
    listsalew[2].style.display = "grid";
    Bieunam();
  }
}
Thongke();

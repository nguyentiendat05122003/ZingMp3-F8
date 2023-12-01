var listsale = document.getElementsByClassName("sales");
var listsalew = document.getElementsByClassName("sales_week");

async function Bieutuan() {
  const response = await fetch("http://localhost:3001/statistical/week");
  let data = await response.json();
  const newData = data.map((item, idx) => {
    if (idx === 0) {
      return (item = { ...item, label: "Chủ nhật", y: item.account_count });
    } else {
      return (item = {
        ...item,
        label: `Thứ ${item.DayNumber} `,
        y: item.account_count,
      });
    }
  });
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
        dataPoints: newData,
      },
    ],
  });
  chart.render();
}
async function Bieuthang() {
  const response = await fetch("http://localhost:3001/statistical/month");
  let data = await response.json();
  const newData = data.map((item, idx) => {
    return (item = { ...item, label: idx + 1, y: item.account_count });
  });
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
        dataPoints: newData,
      },
    ],
  });
  chart.render();
}
async function Bieunam() {
  const response = await fetch("http://localhost:3001/statistical/year");
  let data = await response.json();
  const newData = data.map((item, idx) => {
    return (item = {
      ...item,
      label: `Tháng ${item.MonthNumber} `,
      y: item.account_count,
    });
  });
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
        dataPoints: newData,
      },
    ],
  });
  chart.render();
}

function Thongke() {
  if (document.querySelector("#txt_over").value == "tuan") {
    [...listsale].forEach((item) => {
      item.style.display = "none";
    });

    [...listsalew].forEach((item) => {
      item.style.display = "none";
    });
    listsale[0].style.display = "block";
    listsalew[0].style.display = "grid";
    Bieutuan();
  }
  if ($("#txt_over").val() == "thang") {
    [...listsale].forEach((item) => {
      item.style.display = "none";
    });

    [...listsalew].forEach((item) => {
      item.style.display = "none";
    });
    listsale[1].style.display = "block";
    listsalew[1].style.display = "grid";
    Bieuthang();
  }
  if (document.querySelector("#txt_over").value == "nam") {
    [...listsale].forEach((item) => {
      item.style.display = "none";
    });

    [...listsalew].forEach((item) => {
      item.style.display = "none";
    });
    listsale[2].style.display = "block";
    listsalew[2].style.display = "grid";
    Bieunam();
  }
}
export default Thongke;

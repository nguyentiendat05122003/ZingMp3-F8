$(function LoadingMethod() {
  document.getElementById("content-wrapper").style.visibility = "hidden";
  $("#loading").fadeOut(2000, function () {
    document.getElementById("content-wrapper").style.visibility = "visible";
  });
});

const modalLogin = document.querySelector(".modal-login");
const btnCloseLogin = document.querySelector(".modal-login-close");
const loginBtn = document.querySelector(".sub_header_item-login");
const accessToken = true;

loginBtn.onclick = (e) => {
  modalLogin.classList.remove("isHidden");
  modalLogin.classList.add("isShow");
  document.body.classList.add("isNonScroll");
};
btnCloseLogin.onclick = (e) => {
  modalLogin.classList.add("isHidden");
  modalLogin.classList.remove("isShow");
  document.body.classList.remove("isNonScroll");
};
document.body.onclick = (e) => {
  if (
    !e.target.closest(".sub_header_item-login") &&
    !e.target.closest(".modal-wrapper")
  ) {
    modalLogin.classList.add("isHidden");
    modalLogin.classList.remove("isShow");
    document.body.classList.remove("isNonScroll");
  }
};

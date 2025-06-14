var email = localStorage.getItem("Email");
if (email != null) {
  window.location.href = "/html/index.html";
}

function login() {
  var email = document.getElementById("Email").value;
  var password = document.getElementById("Password").value;

  if (email == "long@gmail.com" && password == "12345") {
    localStorage.setItem("Email", email);
    window.location.href = "/html/index.html";
  } else {
    document.getElementById("error").innerText = " Sai tài khoản hoặc mật khẩu";
  }

  if (email.trim() == "" || password.trim() == "") {
    document.getElementById("error").innerText = "Vui lòng điền đủ thông tin";
  }
}


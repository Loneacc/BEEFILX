// Kiểm tra xem người dùng đã đăng nhập chưa
var email = localStorage.getItem("Email");
if (email === null || email === undefined || email === ""){
    // Chỉ chuyển hướng nếu không phải đang ở trang login
    if (!window.location.pathname.includes('login.html')) {
        window.location.href = "/html/login.html";
    }
}

// Hàm đăng xuất
function logout(){
    localStorage.removeItem("Email");
    window.location.href = "/html/login.html";
}
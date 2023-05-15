//Language
const language = document.getElementById('language');
const language__hide = document.getElementById('language__hide');

language.addEventListener("click", function () {
  event.stopPropagation();// ngăn chặn sự kiện click của language__hide lan ra ngoài
  language__hide.style.display = "block";
});

document.addEventListener('click', function (event) {
  if (!language__hide.contains(event.target)) {  // kiểm tra xem sự kiện click có xảy ra trong language__hide
    language__hide.style.display = 'none';
  }
});

//Notification
const notification = document.getElementById('notification');
const notification__hide = document.getElementById('notification__hide');

notification.addEventListener('click', function () {
  event.stopPropagation();
  notification__hide.style.display = "block";
});

document.addEventListener('click', function (event) {
  if (!notification__hide.contains(event.target)) {
    notification__hide.style.display = "none";
  }
})

//Xử lý khi nhấn vào trái tim
var hearts = document.querySelectorAll('.home-playlist__play-icon-like');
for (var i = 0; i < hearts.length; i++) {
  hearts[i].onclick = function (event) {
    event.preventDefault();
    if (!this.isLiked) {
      this.classList.remove('fa-regular');
      this.classList.add('fa-solid');
      this.isLiked = true;
    } else {
      this.classList.remove('fa-solid');
      this.classList.add('fa-regular');
      this.isLiked = false;
    }
  };
}


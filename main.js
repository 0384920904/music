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


//Player

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.home-new-song .grid__row');
const player = $('.player');
const heading = $('header h2');
const heading_singer = $('header p');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random i');
const repeatBtn = $('.btn-repeat i');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const exitBtn= $('.player_exit');

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,

  songs: [
    {
      name: 'Bật tình yêu lên',
      singer: 'Tăng Duy Tân, Hòa Minzy',
      path: './music/song1.mp3',
      image: './img/song1.jpg',
      time: 'Hôm qua'
    },
    {
      name: 'Ghệ iu dấu của em ơi',
      singer: 'tlinh, 2pillz, WOKEUP',
      path: './music/song2.mp3',
      image: './img/song2.jpg',
      time: 'Ba ngày trước'
    },
    {
      name: 'Waiting for you',
      singer: 'MONO',
      path: './music/song3.mp3',
      image: './img/song3.jpg',
      time: 'Một tuần trước'
    },
    {
      name: 'See tình (Speedup Remix)',
      singer: 'Hoàng Thùy Linh',
      path: './music/song4.mp3',
      image: './img/song4.jpg',
      time: 'Hai ngày trước'
    },
    {
      name: 'Ghé vào tai',
      singer: 'UMIE, Freaky, Hổ',
      path: './music/song5.mp3',
      image: './img/song5.jpg',
      time: 'Ba ngày trước'
    },
    {
      name: 'Cô gái này là của ai',
      singer: 'Krix, Rush (Đoàn Quốc Vinh), Nhi Nhi',
      path: './music/song6.mp3',
      image: './img/song6.jpg',
      time: 'Một tuần trước'
    },
    {
      name: 'Rồi ta sẽ ngắm pháo hoa cùng nhau',
      singer: 'O.lew',
      path: './music/song7.mp3',
      image: './img/song7.jpg',
      time: 'Hôm qua'
    },
    {
      name: 'Ngủ một minh',
      singer: 'HIEUTHUHAI, Negav, Kewtiie',
      path: './music/song8.mp3',
      image: './img/song8.jpg',
      time: 'Bốn ngày trước'
    },
    {
      name: 'Yêu 5',
      singer: 'Rhymastic',
      path: './music/song9.mp3',
      image: './img/song9.jpg',
      time: 'Hôm qua'
    },
    {
      name: 'Chân ái',
      singer: 'Orange, Khói, Châu Đăng Khoa',
      path: './music/song10.mp3',
      image: './img/song10.jpg',
      time: 'Hai tuần trước'
    },
    {
      name: 'Cupid',
      singer: 'Fifty Fifty',
      path: './music/song11.mp3',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Fifty_Fifty_-_The_Beginning_Cupid.png',
      time: 'Hôm qua'
    },
    {
      name: 'Bên trên tầng lầu',
      singer: 'Tăng Duy Tân',
      path: './music/song12.mp3',
      image: 'https://i.ytimg.com/vi/LaxkmhiECfM/maxresdefault.jpg',
      time: 'Ba tuần trước'
    }
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="grid__column-4 song" data-index="${index}">
      <div class="home-new-song__wrap">
          <div class="home-new-song__play">
              <div class="home-new-song__play-img" style="background-image: url(${song.image});"></div>
              <i class="home-new-song__play-icon fa-solid fa-play"></i>
          </div>
          
          <div class="home-new-song__content">
              <h3 class="home-new-song__content-title">${song.name}</h3>
              <div class="home-new-song__content-singer">
                  <a href="#" class="home-new-song__content-singer-link">${song.singer}</a>
              </div>
              <span class="home-new-song__content-time">${song.time}</span>
          </div>
          <div class="home-new-song__more">
              <a href="#" class="home-new-song__more-link">...</a>
          </div>
      </div>
      </div>`
    });
    playlist.innerHTML = htmls.join('');
  },

  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },

  handleEvent: function () {
    const _this = this;

    //Xử lí CD quay / dừng
    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)' }
    ], {
      duration: 8000, //10s
      iterations: Infinity
    })
    cdThumbAnimate.pause();

    //Xử lí khi click play
    playBtn.onclick = function () {
      console.log(123);
      if (_this.isPlaying) {
        audio.pause();
        cdThumbAnimate.pause();
      } else {
        audio.play();
        cdThumbAnimate.play();
      }
    }

    //Khi bài hát được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    }

    //Khi bài hát được pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }

    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
      }
    }

    //Xử lí khi tua bài hát
    progress.onchange = function (e) {
      const seekTime = e.target.value / 100 * audio.duration;
      audio.currentTime = seekTime;
    }

    //Khi next bài hát
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.nextSong();
      }
      audio.play();
      cdThumbAnimate.cancel();
    }

    //Khi pre bài hát
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.prevSong();
      }
      audio.play();
      cdThumbAnimate.cancel();
    }

    //Xử lí bật/tắt random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle('active', _this.isRandom);
    }

    //Xử lí lặp lại một bài hát 
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle('active', _this.isRepeat);
    }

    //Xử lí next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    }

    //Xử lí khi nhấn exit
    exitBtn.onclick=function(){
      player.style.display='none';
      audio.pause();
    }

    //Xử lí ấn vào bài hát
    playlist.onclick = function (e) {
      const songElement = e.target.closest('.song');
      if (songElement && !e.target.closest('.home-new-song__more')
        && !e.target.closest('.home-new-song__content-singer-link')) {
        _this.currentIndex = Number(songElement.dataset.index);
        _this.loadCurrentSong();
        audio.play();
        cdThumbAnimate.cancel();
        player.style.display='block';
      }
    }
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    heading_singer.textContent = this.currentSong.singer;
    audio.src = this.currentSong.path;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex)

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    this.defineProperties();

    this.handleEvent();

    this.loadCurrentSong();

    this.render();
  }
}

app.start();


const CONFIG = {
  cakeImage: 'assets/cake.png',
  letterPhoto: 'assets/letter-photo.jpg',
  mosaicPhotos: [
    'assets/anh1.jpg',
    'assets/anh2.jpg',
    'assets/anh3.jpg',
    'assets/anh4.jpg',
    'assets/anh5.jpg',
    'assets/anh6.jpg',
    'assets/anh7.jpg',
    'assets/anh8.jpg',
    'assets/anh9.jpg',
    'assets/anh10.jpg',
    'assets/anh11.jpg',
    'assets/anh12.jpg',
    'assets/anh13.jpg',
    'assets/anh14.jpg',
    'assets/anh15.jpg',
    'assets/anh16.jpg',
    'assets/anh17.jpg',
    'assets/anh18.jpg',
    'assets/anh19.jpg',
    'assets/anh20.jpg',
    'assets/anh21.jpg',
    'assets/anh22.jpg',
    'assets/anh23.jpg',
    'assets/anh24.jpg',
    'assets/anh25.jpg',
    'assets/anh26.jpg',
  ]
};

// Tạo hiệu ứng cánh hoa rơi trên tất cả các trang, trừ trang đầu tiên

function addFallingPetals(screen) {
  if (
    !screen ||
    screen.id === 'step-1' ||
    screen.id === 'step-4' ||
    screen.dataset.petalsAdded === 'true'
  ) return;

  screen.dataset.petalsAdded = 'true';
  const petalImage = 'assets/petal.png';

  // Ít hoa hơn, rơi lác đác
  for (let i = 0; i < 5; i++) {
    const petal = document.createElement('img');

    petal.className = 'falling-item';
    petal.src = petalImage;
    petal.alt = '';
    petal.draggable = false;
    petal.setAttribute('aria-hidden', 'true');

    // Kích thước lớn hơn: 22–40px
    petal.style.width = (Math.random() * 54 + 58) + 'px';

    // Rơi chậm hơn: 12–18 giây mỗi vòng
    petal.style.animationDuration = (Math.random() * 6 + 12) + 's';

    // Phân bố thời điểm xuất hiện ngẫu nhiên
    petal.style.animationDelay = (Math.random() * -28) + 's';

    petal.style.left = Math.random() * 100 + '%';

    screen.appendChild(petal);
  }
}


// Gắn hoa cho mọi màn hình ngoại trừ màn hình đầu tiên
 document.querySelectorAll('.screen:not(#step-1):not(#step-4)').forEach(addFallingPetals);

// Chuyển Màn Hình
function goToStep(stepNum) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`step-${stepNum}`);
  if (target) {
    target.classList.add('active');
    // Hiện / ẩn trang trí chung (cờ + bóng bay)
    const globalDecor = document.getElementById('global-decor');
    if (globalDecor) {
      globalDecor.hidden = (stepNum === 1);
      globalDecor.hidden = (stepNum === 4);
    }
    if (stepNum === 2) {
      const items = target.querySelectorAll('.canva-item');
      items.forEach((item, idx) => {
        setTimeout(() => item.classList.add('show'), idx * 250);
      });
    }

    if (stepNum === 3) {
      startMatchAnimation();
    }

    if (stepNum === 7) {
      animatePhotoNumber35();
    }
  }
}
/* ========== XEM LẠI BỮA TIỆC – CHẠY LẠI TỪ ĐẦU ========== */
function restartParty() {
  window.location.reload();
}

// BƯỚC 1: Xử lý gạt công tắc & Flash sáng
// BƯỚC 1: Hiện lần lượt + xử lý gạt công tắc
const lightSwitch = document.getElementById('lightSwitch');
const flashOverlay = document.getElementById('flash-overlay');
const textTop = document.getElementById('textTop');
const textBottom = document.getElementById('textBottom');

// Hiện tuần tự khi vào trang
(function introStep1() {
  if (!lightSwitch) return;

  // 1. Hiện công tắc trước
  setTimeout(() => {
    lightSwitch.classList.add('show');
  }, 400);

  // 2. Hiện chữ trên
  setTimeout(() => {
    if (textTop) textTop.classList.add('show');
  }, 1200);

  // 3. Hiện chữ dưới
  setTimeout(() => {
    if (textBottom) textBottom.classList.add('show');
  }, 2000);
})();

// Click công tắc → flash → sang bước 2
// Click công tắc → flash → sang bước 2
if (lightSwitch) {
  lightSwitch.addEventListener('click', () => {
    if (lightSwitch.classList.contains('on')) return;
    startBackgroundMusic();
    lightSwitch.classList.add('on');

    // Flash sáng rồi chuyển step
    if (flashOverlay) {
      setTimeout(() => {
        flashOverlay.style.opacity = '1';
        setTimeout(() => {
          goToStep(2);
          flashOverlay.style.opacity = '0';
        }, 500);
      }, 400);
    } else {
      // Fallback nếu không có overlay
      setTimeout(() => goToStep(2), 400);
    }
  });
}

// --- HỆ THỐNG MÔ PHỎNG HẠT LỬA UỐN CONG MỀM MẠI ---
class FluidFlame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.animId = null;
    this.isBlowing = false;
    this.isDead = false;
    this.particles = [];
  }

  start() {
    if (!this.ctx) return;
    this.isDead = false;

    // Tạo các hạt lửa gốc
    for (let i = 0; i < 22; i++) {
      this.particles.push({
        x: 20 + (Math.random() - 0.5) * 4,
        y: 55 - Math.random() * 12,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -1.6 - Math.random() * 1.4,
        radius: Math.random() * 5 + 3,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    const render = () => {
      if (this.isDead) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const cx = this.canvas.width / 2;
      const cy = this.canvas.height - 2;

      this.particles.forEach((p) => {
        // Khi thổi, các hạt lửa sẽ uốn cong bay dạt hẳn sang phải một cách uyển chuyển
        const windForce = this.isBlowing ? 2.5 + Math.sin(p.y * 0.1) * 0.8 : (Math.random() - 0.5) * 0.5;
        p.x += p.vx + windForce;
        p.y += p.vy;
        p.radius *= 0.96; // Lửa bay lên cao sẽ nhỏ dần và tan ra
        p.alpha -= 0.03;

        // Nếu hạt biến mất, tái tạo lại từ bấc nến
        if (p.alpha <= 0 || p.radius <= 0.5) {
          p.x = cx + (Math.random() - 0.5) * 4;
          p.y = cy - 4;
          p.vx = (Math.random() - 0.5) * 0.5 + (this.isBlowing ? 2.2 : 0);
          p.vy = -1.8 - Math.random() * 1.2;
          p.radius = Math.random() * 5 + 3;
          p.alpha = 0.8;
        }

        // Vẽ hạt lửa dạng hình tròn phát sáng lung linh
        this.ctx.beginPath();
        let grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
        grad.addColorStop(0.4, `rgba(253, 224, 71, ${p.alpha * 0.8})`);
        grad.addColorStop(0.8, `rgba(249, 115, 22, ${p.alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

        this.ctx.fillStyle = grad;
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      });

      this.animId = requestAnimationFrame(render);
    };

    render();
  }

  setBlowing(status) {
    this.isBlowing = status;
  }

  stop() {
    this.isDead = true;
    cancelAnimationFrame(this.animId);
    if (this.canvas) this.canvas.style.display = 'none';
  }
}

let fluidFlame1 = null;
let fluidFlame2 = null;

// BƯỚC 3: Diêm quẹt thắp nến 2 số

function startMatchAnimation() {
  const match = document.getElementById('matchstick');
  const hint = document.getElementById('cakeHint');
  const blowIns = document.getElementById('blowInstruction');

  const flames = [
    {
      flame: document.getElementById('flame1'),
      glow: document.getElementById('glow1'),
      wick: document.getElementById('wick1')
    },
    {
      flame: document.getElementById('flame2'),
      glow: document.getElementById('glow2'),
      wick: document.getElementById('wick2')
    }
  ];

  if (!match || !flames[0].flame || !flames[1].flame) return;

  flames.forEach(item => {
    [item.flame, item.glow, item.wick].forEach(el => {
      if (el) el.style.display = 'none';
    });
  });

  match.style.transition = 'none';
  match.style.opacity = '0';

  // Đặt que diêm tại vị trí khởi đầu
  match.style.left = '0px';
  match.style.top = '0px';
  match.style.transform = 'rotate(-45deg)';

  requestAnimationFrame(() => {
    match.style.transition =
      'left 650ms ease, top 650ms ease, opacity 250ms ease, transform 650ms ease';

    setTimeout(() => {
      match.style.opacity = '1';

      // Đốt lần lượt hai ngọn lửa
      lightCandle(0, () => {
        lightCandle(1, () => {
          match.style.opacity = '0';

          if (hint) {
            hint.style.opacity = '0';
            setTimeout(() => {
              hint.style.display = 'none';
              if (blowIns) blowIns.style.opacity = '1';
              setupFlameBlowing();
            }, 400);
          }
        });
      });
    }, 150);
  });

  function lightCandle(index, onDone) {
    const item = flames[index];
    const zone = document.getElementById(`flameZone${index + 1}`);
    if (!zone || !item.flame) {
      onDone();
      return;
    }

    // Tọa độ vùng nến so với cake-container
    const container = match.offsetParent;
    const containerRect = container.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();

    // Đầu que diêm hướng vào chân ngọn lửa, sát tim nến
    const targetX = zoneRect.left + zoneRect.width / 2 - containerRect.left;
    const targetY = zoneRect.bottom + 50 - containerRect.top;

    match.style.left = `${targetX - 3}px`;
    match.style.top = `${targetY - 55}px`;
    match.style.transform = 'rotate(-12deg)';

    setTimeout(() => {
      [item.flame, item.glow, item.wick].forEach(el => {
        if (el) el.style.display = '';
      });

      // Lùi que diêm nhẹ sau khi lửa bắt cháy
      match.style.left = `${targetX + 25}px`;
      match.style.top = `${targetY - 75}px`;
      match.style.transform = 'rotate(25deg)';

      setTimeout(onDone, 350);
    }, 700);
  }
}


// Thổi nến: Tắt từng ngọn hoặc tắt cả 2 cùng lúc khi bấm vùng giữa
let blownOutCount = 0;

function setupFlameBlowing() {
  blownOutCount = 0;

  const f1 = document.getElementById('flame1');
  const g1 = document.getElementById('glow1');
  const w1 = document.getElementById('wick1');

  const f2 = document.getElementById('flame2');
  const g2 = document.getElementById('glow2');
  const w2 = document.getElementById('wick2');

  const extinguishFlame = (flame, glow, wick) => {
    if (!flame || flame.classList.contains('off')) return;

    flame.classList.remove('blowing', 'wind-bending');

    const smoke = document.createElement('div');
    smoke.className = 'candle-smoke';

    if (flame.parentElement) {
      flame.parentElement.appendChild(smoke);
    }

    flame.classList.add('off');

    if (glow) glow.classList.add('off');
    if (wick) wick.classList.add('off');

    flame.style.display = 'none';

    if (glow) glow.style.display = 'none';
    if (wick) wick.style.display = 'none';

    setTimeout(() => smoke.remove(), 1800);
  };

  // Hàm xử lý thổi từng ngọn nến
  const setupZone = (zoneId, flame, glow, wick) => {
    const zone = document.getElementById(zoneId);
    if (!zone || !flame) return;

    let timer = null;

    const start = (e) => {
      e.preventDefault();

      if (flame.classList.contains('off')) return;

      clearTimeout(timer);

      flame.classList.add('blowing', 'wind-bending');

      timer = setTimeout(() => {
        extinguishFlame(flame, glow, wick);
        checkCompletion();
      }, 1400);
    };

    const stop = () => {
      clearTimeout(timer);
      timer = null;

      flame.classList.remove('blowing', 'wind-bending');
    };

    zone.onmousedown = start;
    zone.ontouchstart = start;
    zone.onmouseup = stop;
    zone.onmouseleave = stop;
    zone.ontouchend = stop;
    zone.ontouchcancel = stop;
  };

  setupZone('flameZone1', f1, g1, w1);
  setupZone('flameZone2', f2, g2, w2);

  // Vùng giữa: thổi tắt cả hai ngọn
  const zoneCenter = document.getElementById('flameZoneCenter');
  let timerCenter = null;

  if (zoneCenter) {
    const startCenter = (e) => {
      e.preventDefault();

      if (
        f1.classList.contains('off') &&
        f2.classList.contains('off')
      ) return;

      clearTimeout(timerCenter);

      if (!f1.classList.contains('off')) {
        f1.classList.add('blowing', 'wind-bending');
      }

      if (!f2.classList.contains('off')) {
        f2.classList.add('blowing', 'wind-bending');
      }

      timerCenter = setTimeout(() => {
        extinguishFlame(f1, g1, w1);
        extinguishFlame(f2, g2, w2);
        checkCompletion();
      }, 1400);
    };

    const stopCenter = () => {
      clearTimeout(timerCenter);
      timerCenter = null;

      f1.classList.remove('blowing', 'wind-bending');
      f2.classList.remove('blowing', 'wind-bending');
    };

    zoneCenter.onmousedown = startCenter;
    zoneCenter.ontouchstart = startCenter;
    zoneCenter.onmouseup = stopCenter;
    zoneCenter.onmouseleave = stopCenter;
    zoneCenter.ontouchend = stopCenter;
    zoneCenter.ontouchcancel = stopCenter;
  }
}


// Kiểm tra hoàn thành bước thổi nến để chuyển màn
function checkCompletion() {
  const f1 = document.getElementById('flame1');
  const f2 = document.getElementById('flame2');
  if ((f1.classList.contains('off') || f1.style.display === 'none') &&
      (f2.classList.contains('off') || f2.style.display === 'none')) {
    setTimeout(() => goToStep(4), 800);
  }
}


/* ===== HẠT SÁNG XOÁY VÀO NGÔI SAO ===== */

let blackHoleInterval = null;
let blackHoleLayer = null;

function startBlackHoleEffect() {
  const holder = document.getElementById('starHolder');
  if (!holder || blackHoleInterval !== null) return;

  blackHoleLayer = document.getElementById('blackHoleParticleLayer');

  if (!blackHoleLayer) {
    blackHoleLayer = document.createElement('div');
    blackHoleLayer.id = 'blackHoleParticleLayer';
    document.body.appendChild(blackHoleLayer);
  }

  holder.classList.add('black-hole-active');

  blackHoleInterval = setInterval(() => {
    const rect = holder.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Sinh nhiều chấm sáng quanh ngôi sao
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 85 + Math.random() * 125;

      const startX = centerX + Math.cos(angle) * radius;
      const startY = centerY + Math.sin(angle) * radius;

      const particle = document.createElement('span');
      particle.className = 'black-hole-particle';

      const size = 1.5 + Math.random() * 3;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';

      blackHoleLayer.appendChild(particle);

      const dx = centerX - startX;
      const dy = centerY - startY;

      particle.animate([
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 0
        },
        {
          transform:
            `translate(${dx * 0.25}px, ${dy * 0.25}px) scale(1.2)`,
          opacity: 1,
          offset: 0.2
        },
        {
          transform:
            `translate(${dx}px, ${dy}px) scale(0.05)`,
          opacity: 0
        }
      ], {
        duration: 650 + Math.random() * 650,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).onfinish = () => particle.remove();
    }
  }, 35);
}

function stopBlackHoleEffect() {
  if (blackHoleInterval !== null) {
    clearInterval(blackHoleInterval);
    blackHoleInterval = null;
  }

  const holder = document.getElementById('starHolder');
  if (holder) holder.classList.remove('black-hole-active');
}

// BƯỚC 4 & 5: Nhấn giữ Ngôi sao & Bão sao bay
const starHolder = document.getElementById('starHolder');
const progressCircle = document.querySelector('.progress-ring-circle');

let starTimer = null;
let progress = 0;
let starCompleted = false;
let holdStartTime = 0;

const WISH_HOLD_DURATION = 5000;

function updateStarProgress() {
  if (progressCircle) {
    const offset = 345 - (345 * progress) / 100;
    progressCircle.style.strokeDashoffset = offset;
  }
}

const startStarHold = (e) => {
  e.preventDefault();

  if (starCompleted || starTimer !== null) return;
  startBlackHoleEffect();

  holdStartTime = Date.now();

  starTimer = setInterval(() => {
    const elapsed = Date.now() - holdStartTime;
    progress += (elapsed / WISH_HOLD_DURATION) * 100;
    holdStartTime = Date.now();

    if (progress >= 100) {
      progress = 100;
      starCompleted = true;

      clearInterval(starTimer);
      starTimer = null;

      updateStarProgress();
      stopBlackHoleEffect();
      triggerStarStorm();
      return;
    }

    updateStarProgress();
  }, 30);
};

const stopStarHold = () => {
  stopBlackHoleEffect();
  if (starTimer !== null) {
    clearInterval(starTimer);
    starTimer = null;
  }
};

if (starHolder) {
  starHolder.addEventListener('pointerdown', (e) => {
    if (starHolder.setPointerCapture) {
      starHolder.setPointerCapture(e.pointerId);
    }
    startStarHold(e);
  });

  starHolder.addEventListener('pointerup', stopStarHold);
  starHolder.addEventListener('pointercancel', stopStarHold);
}

function triggerStarStorm() {
  const hintText = document.getElementById('starHintText');
  const subText = document.getElementById('starSubText');

  if (hintText) {
    hintText.innerText = 'điều ước vừa theo những vì sao gửi lên trời rồi đó...';
  }

  if (subText) subText.innerText = '';

  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      const star = document.createElementNS(
        "http://www.w3.org/2000/svg", "svg"
      );

      star.setAttribute("class", "flying-star");
      star.setAttribute("viewBox", "0 0 24 24");
      star.style.width = (Math.random() * 22 + 10) + 'px';
      star.style.left = (Math.random() * 100) + 'vw';
      star.style.top = '105vh';

      star.innerHTML = `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`;

      document.body.appendChild(star);

      star.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        {
          transform: `translateY(-125vh) translateX(${(Math.random() - 0.5) * 220}px) scale(0.3)`,
          opacity: 0
        }
      ], {
        duration: Math.random() * 1800 + 1800,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }).onfinish = () => star.remove();

    }, i * 40);
  }

  setTimeout(() => {
    goToStep(6);
  }, 4200);
}

// BƯỚC 6: Mở cuộn thư
function openScroll() {
  const scroll = document.getElementById('scrollWrapper');
  const btn = document.getElementById('btnAfterLetter');
  if (!scroll) return;

  scroll.classList.toggle('open');

  // Chỉ hiện nút tiếp tục khi thư đã mở hoàn toàn
  if (btn) {
    if (scroll.classList.contains('open')) {
      setTimeout(() => {
        if (scroll.classList.contains('open')) {
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
        }
      }, 1000);
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  }
}




// BƯỚC 8: Ghép ảnh số 20
function buildMosaic() {
  const container = document.getElementById('mosaicContainer');
  if (!container) return;
  container.innerHTML = '';

  const pattern20 = [
    1,1,1,1, 0, 1,1,1,1,
    0,0,0,1, 0, 1,0,0,1,
    1,1,1,1, 0, 1,0,0,1,
    1,0,0,0, 0, 1,0,0,1,
    1,1,1,1, 0, 1,1,1,1
  ];

  pattern20.forEach((val, idx) => {
    const tile = document.createElement('div');
    tile.className = 'mosaic-tile';

    if (val === 1) {
      tile.style.backgroundImage = `url(${CONFIG.mosaicPhotos[idx % CONFIG.mosaicPhotos.length]})`;
      setTimeout(() => {
        tile.style.opacity = '1';
        tile.style.transform = 'scale(1)';
      }, idx * 50);
    } else {
      tile.style.visibility = 'hidden';
    }

    container.appendChild(tile);
  });
}

(() => {
  const container = document.getElementById('photoNumber35');
  const lightbox = document.getElementById('photoLightbox');
  const largeImage = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');

  if (!container || !lightbox || typeof CONFIG === 'undefined') return;

  const photos = [...new Set(CONFIG.mosaicPhotos || [])];

  if (!photos.length) {
    console.warn('Chưa có ảnh trong CONFIG.mosaicPhotos');
    return;
  }

  // Dạng pixel của số 3 và số 5
  
const digits = [
  // Số 3
  [
    '111111111',
    '111111111',
    '000000111',
    '000000111',
    '000000111',
    '001111111',
    '001111111',
    '001111111',
    '000000111',
    '000000111',
    '000000111',
    '111111111',
    '111111111'
  ],
  // Số 5
  [
  '111111111',
  '111111111',
  '111000000',
  '111000000',
  '111000000',
  '111111111',
  '111111111',
  '111111111',
  '111000111',
  '111000111',
  '111000111',
  '111111111',
  '111111111'
]
];


  const allTiles = [];

  digits.forEach((pattern, digitIndex) => {
    const digit = document.createElement('div');
    digit.className = 'photo-digit';
    digit.setAttribute('aria-label', digitIndex === 0 ? 'Số 3' : 'Số 5');

    pattern.forEach(row => {
      [...row].forEach(cell => {
        if (cell === '0') {
          const empty = document.createElement('span');
          digit.appendChild(empty);
          return;
        }

        const photoIndex = allTiles.length % photos.length;
        const button = document.createElement('button');
        const img = document.createElement('img');

        button.type = 'button';
        button.className = 'photo-tile';
        button.setAttribute('aria-label', 'Phóng to ảnh kỷ niệm');

        img.src = photos[photoIndex];
        img.alt = 'Ảnh kỷ niệm ' + (photoIndex + 1);
        img.loading = 'lazy';

        button.appendChild(img);
        digit.appendChild(button);

        allTiles.push({
          button,
          src: photos[photoIndex],
          alt: img.alt
        });
      });
    });

    container.appendChild(digit);
  });

  // Danh sách ảnh để xem lớn, mỗi ảnh chỉ xuất hiện một lần
  let currentIndex = 0;
  let lastFocusedElement = null;

  function showPhoto(index) {
    currentIndex = (index + photos.length) % photos.length;
    largeImage.src = photos[currentIndex];
    largeImage.alt = 'Ảnh kỷ niệm ' + (currentIndex + 1);
    counter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }

  allTiles.forEach(tile => {
    tile.button.addEventListener('click', () => {
      lastFocusedElement = tile.button;
      currentIndex = photos.indexOf(tile.src);
      showPhoto(currentIndex);
      lightbox.classList.add('visible');
      document.body.style.overflow = 'hidden';
      document.getElementById('closeLightbox').focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('visible');
    document.body.style.overflow = '';

    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.getElementById('closeLightbox')
    .addEventListener('click', closeLightbox);

  document.getElementById('prevPhoto')
    .addEventListener('click', () => showPhoto(currentIndex - 1));

  document.getElementById('nextPhoto')
    .addEventListener('click', () => showPhoto(currentIndex + 1));

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('visible')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });
})();

function animatePhotoNumber35() {
  const page = document.getElementById('step-7');
  const tiles = page?.querySelectorAll('.photo-tile');

  if (!page || !tiles?.length) return;

  // Tránh chạy hiệu ứng nhiều lần trong cùng một lượt vào trang
  if (page.dataset.mosaicAnimated === 'true') return;
  page.dataset.mosaicAnimated = 'true';

  const reducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  tiles.forEach((tile, index) => {
    tile.classList.remove('photo-fly-in', 'photo-ready');

    if (reducedMotion) {
      tile.style.removeProperty('--start-x');
      tile.style.removeProperty('--start-y');
      tile.style.removeProperty('--start-rotate');
      tile.style.removeProperty('--fly-delay');
      tile.classList.add('photo-fly-in', 'photo-ready');
      return;
    }

    // Chọn một vị trí xuất phát ngẫu nhiên ngoài màn hình
    const angle = Math.random() * Math.PI * 2;
    const distance = 500 + Math.random() * 650;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rotate = (Math.random() - 0.5) * 100;
    const delay = Math.random() * 650 + index * 3;

    tile.style.setProperty('--start-x', `${x}px`);
    tile.style.setProperty('--start-y', `${y}px`);
    tile.style.setProperty('--start-rotate', `${rotate}deg`);
    tile.style.setProperty('--fly-delay', `${delay}ms`);
  });

  // Chờ trình duyệt ghi nhận vị trí xuất phát rồi mới bay vào
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      tiles.forEach(tile => tile.classList.add('photo-fly-in'));
    });
  });

  // Cho phép bấm ảnh khi hiệu ứng kết thúc
  const totalDuration = 900 + 650 + tiles.length * 3 + 100;

  window.setTimeout(() => {
    tiles.forEach(tile => {
      tile.classList.add('photo-ready');
      tile.style.removeProperty('--start-x');
      tile.style.removeProperty('--start-y');
      tile.style.removeProperty('--start-rotate');
      tile.style.removeProperty('--fly-delay');
    });
  }, totalDuration);
}

const wishInput = document.getElementById('wishInput');
const wishCount = document.getElementById('wishCount');


const liveWishCard = document.getElementById('liveWishCard');
const liveWishText = document.getElementById('liveWishText');

if (wishInput) {
  wishInput.addEventListener('input', () => {
    const wish = wishInput.value.trim();

    // Cập nhật số ký tự
    if (wishCount) {
      wishCount.textContent = wishInput.value.length;
    }

    // Hiện điều ước ngay trên card khi đang gõ
    if (liveWishCard && liveWishText) {
      liveWishText.textContent = wish;
      liveWishCard.hidden = !wish;
    }
  });
}



function saveBirthdayWish() {
  const input = document.getElementById('wishInput');

  if (!input) return;

  const wish = input.value.trim();

  if (!wish) {
    alert('Cậu hãy viết một điều ước trước nhé 💌');
    input.focus();
    return;
  }

  try {
    localStorage.setItem('birthdayWish', wish);
  } catch (error) {
    alert('Không thể lưu điều ước trên trình duyệt này 😢');
    return;
  }

  // Cập nhật lời chúc đang hiển thị ở card trang 9
  const saved = document.getElementById('savedWish');

  if (saved) {
    saved.textContent = 'điều ước của mình năm nay ✨\n\n' + wish;
    saved.hidden = false;
  }

  // Chuyển sang trang cuối sau khi lưu thành công
  goToStep(10);
}



function loadBirthdayWish() {
  const input = document.getElementById('wishInput');
  const saved = document.getElementById('savedWish');
  const count = document.getElementById('wishCount');

  if (!input || !saved) return;

  try {
    const wish = localStorage.getItem('birthdayWish');

    if (wish) {
      input.value = wish;
      saved.textContent = 'điều ước của mình năm nay ✨\n\n' + wish;
      saved.hidden = false;

      if (count) count.textContent = wish.length;
    }
  } catch (error) {
    console.warn('Không thể tải điều ước đã lưu.');
  }
}

loadBirthdayWish();




async function downloadBirthdayPolaroid() {
  if (typeof html2canvas === "undefined") {
    alert("Không tìm thấy thư viện html2canvas!");
    return;
  }

  const originalStep = document.getElementById("step-9");
  const originalCard = originalStep?.querySelector(".wish-card");
  const originalInput = document.getElementById("wishInput");

  if (!originalStep || !originalCard) {
    alert("Không tìm thấy wish card!");
    return;
  }

  // Tạo bản sao riêng để xuất ảnh
  const cloneStep = originalStep.cloneNode(true);

  Object.assign(cloneStep.style, {
    display: "block",
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${window.innerWidth}px`,
    height: "auto",
    minHeight: "0",
    maxHeight: "none",
    overflow: "visible",
    visibility: "visible",
    opacity: "1",
    transform: "none",
    zIndex: "-1"
  });

  document.body.appendChild(cloneStep);

  try {
    const card = cloneStep.querySelector(".wish-card");
    const wishInput = cloneStep.querySelector("#wishInput");
    const liveCard = cloneStep.querySelector("#liveWishCard");
    const liveText = cloneStep.querySelector("#liveWishText");

    // Lấy lời chúc hiện tại, hoặc lời chúc đã lưu
    const wish =
      originalInput?.value.trim() ||
      localStorage.getItem("birthdayWish") ||
      "";

    if (wishInput) wishInput.value = wish;

    if (liveCard && liveText) {
      liveText.textContent = wish;
      liveCard.hidden = !wish;
    }

    // Bỏ giới hạn chiều cao, không bóp méo ảnh
const photo = card.querySelector(".wish-photo");

if (photo) {
  // Giữ nguyên tỷ lệ ảnh gốc, chỉ cắt phần thừa
  photo.removeAttribute("width");
  photo.removeAttribute("height");

  photo.style.setProperty("display", "block", "important");
  photo.style.setProperty("width", "100%", "important");
  photo.style.setProperty("height", "350px", "important");
  photo.style.setProperty("min-height", "0", "important");
  photo.style.setProperty("max-height", "350px", "important");
  photo.style.setProperty("object-fit", "cover", "important");
  photo.style.setProperty("object-position", "center", "important");
  photo.style.setProperty("aspect-ratio", "auto", "important");
  photo.style.setProperty("flex-shrink", "0", "important");
}

    const wishText = card.querySelector("#liveWishText");

    if (wishText) {
      wishText.style.setProperty("max-height", "none", "important");
      wishText.style.setProperty("overflow", "visible", "important");
    }

    // Chờ ảnh bên trong tải xong
    const images = [...card.querySelectorAll("img")];

    await Promise.all(
      images.map(img => {
        if (img.complete) {
          return img.decode?.().catch(() => {});
        }

        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Đợi trình duyệt tính xong chiều cao thật
    await new Promise(resolve =>
      requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
      )
    );

    const canvas = await html2canvas(card, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0
    });

    const link = document.createElement("a");
    link.download = "wish-card-sinh-nhat.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

  } catch (error) {
    console.error("Lỗi xuất wish card:", error);
    alert("Tạo ảnh chưa thành công, mày thử lại nhé!");
  } finally {
    cloneStep.remove();
  }
}




// Vẽ văn bản tự xuống dòng để không tràn khỏi khung
function drawWrappedText(ctx, text, centerX, startY, maxWidth, lineHeight, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const testLine = line ? line + ' ' + word : word;

    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) lines.push(line);

  const visibleLines = lines.slice(0, maxLines);

  if (lines.length > maxLines) {
    let last = visibleLines[maxLines - 1];

    while (
      last.length > 3 &&
      ctx.measureText(last + '…').width > maxWidth
    ) {
      last = last.slice(0, -1);
    }

    visibleLines[maxLines - 1] = last + '…';
  }

  visibleLines.forEach((lineText, i) => {
    ctx.fillText(lineText, centerX, startY + i * lineHeight);
  });
}
const bgMusic = document.getElementById("bgMusic");

const introMusic = "assets/music/intro.mp3";
const mainMusic = "assets/music/main.mp3";

let musicStarted = false;
let isPlayingIntro = false;

// Bắt đầu nhạc khi người dùng bấm nút đầu tiên
function startBackgroundMusic() {
  if (musicStarted || !bgMusic) return;

  musicStarted = true;
  isPlayingIntro = true;

  bgMusic.loop = false;
  bgMusic.src = introMusic;
  bgMusic.volume = 1.0;

  bgMusic.play().catch(error => {
    console.error("Không phát được intro:", error);
    musicStarted = false;
    isPlayingIntro = false;
  });
}

// Khi intro kết thúc, chuyển sang thân bài
bgMusic.addEventListener("ended", function () {
  if (isPlayingIntro) {
    isPlayingIntro = false;

    bgMusic.src = mainMusic;
    bgMusic.loop = true;

    bgMusic.play().catch(error => {
      console.error("Không phát được thân bài:", error);
    });
  }
});

const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

// Cập nhật giao diện nút âm thanh
function updateMusicButton() {
  if (!bgMusic || !musicToggle || !musicIcon) return;

  const isMuted = bgMusic.muted || bgMusic.paused;

  musicToggle.classList.toggle('muted', isMuted);
  musicIcon.textContent = isMuted ? '♪̸' : '♫';

  musicToggle.setAttribute(
    'aria-label',
    isMuted ? 'Bật nhạc' : 'Tắt nhạc'
  );
}

// Click để bật/tắt tiếng
if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (!bgMusic) return;

    // Nếu nhạc chưa bắt đầu, khởi động theo trình tự intro → thân bài
    if (!musicStarted) {
      startBackgroundMusic();
      updateMusicButton();
      return;
    }

    // Đang tắt tiếng thì bật lại, đang phát thì tắt tiếng
    bgMusic.muted = !bgMusic.muted;

    // Nếu nhạc đã dừng và chưa bị tắt tiếng, thử phát tiếp
    if (!bgMusic.muted && bgMusic.paused) {
      bgMusic.play().catch(error => {
        console.error('Không thể phát nhạc:', error);
      });
    }

    updateMusicButton();
  });
}

// Đồng bộ biểu tượng khi bài nhạc chuyển từ intro sang thân bài
if (bgMusic) {
  bgMusic.addEventListener('play', updateMusicButton);
  bgMusic.addEventListener('pause', updateMusicButton);
  bgMusic.addEventListener('volumechange', updateMusicButton);
  bgMusic.addEventListener('ended', updateMusicButton);
}

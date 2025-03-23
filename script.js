const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const centralSphere = document.getElementById('centralSphere');
const waves = document.querySelectorAll('.wave');
const spheres = document.querySelectorAll('.sun, .planet');
const sizeRange = document.getElementById('sizeRange');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Функция для создания звезд
function createStars() {
  const bg = document.getElementById('bg');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = (10 + Math.random() * 20) + 's';
    bg.appendChild(star);
  }
}

createStars();

let showMain = false;

if (localStorage.getItem("entered") === "true") {
  document.body.style.opacity = '1';
  document.getElementById('centralSphere').style.display = 'none';
  document.querySelectorAll('.wave').forEach(w => w.style.display = 'none');
  document.querySelectorAll('.sun, .planet').forEach(s => s.style.display = 'block');
  showMain = true;
}

function drawLine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!showMain) return requestAnimationFrame(drawLine);

  const points = [...spheres].map(s => {
    const rect = s.getBoundingClientRect();
    return [rect.left + rect.width / 2, rect.top + rect.height / 2];
  });

  const t = Date.now() / 1000;
  const index = Math.floor(t) % points.length;
  const next = (index + 1) % points.length;
  const prog = t % 1;

  const x = points[index][0] + (points[next][0] - points[index][0]) * prog;
  const y = points[index][1] + (points[next][1] - points[index][1]) * prog;

  ctx.beginPath();
  ctx.moveTo(points[index][0], points[index][1]);
  ctx.lineTo(x, y);
  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#00f5ff';
  ctx.stroke();

  requestAnimationFrame(drawLine);
}

drawLine();

centralSphere.addEventListener('click', () => {
  localStorage.setItem("entered", "true");
  document.body.style.transition = 'opacity 1.5s ease';
  document.body.style.opacity = '0';

  setTimeout(() => {
    document.body.style.opacity = '1';
    centralSphere.style.display = 'none';
    waves.forEach(w => w.style.display = 'none');
    spheres.forEach(s => s.style.display = 'block');
    showMain = true;
  }, 1500);
});

sizeRange.addEventListener('input', (e) => {
  spheres.forEach(sphere => {
    sphere.style.width = sphere.style.height = e.target.value + 'px';
  });
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

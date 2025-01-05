const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Pacman başlangıç konumu ve hız
let pacman = {
  x: 50,
  y: 50,
  radius: 20,
  dx: 0,
  dy: 0,
  mouthOpen: true
};

// Tuş kontrolü
document.addEventListener("keydown", movePacman);
document.addEventListener("keyup", stopPacman);

function movePacman(e) {
  if (e.key === "ArrowRight") {
    pacman.dx = 2; pacman.dy = 0;
  } else if (e.key === "ArrowLeft") {
    pacman.dx = -2; pacman.dy = 0;
  } else if (e.key === "ArrowUp") {
    pacman.dx = 0; pacman.dy = -2;
  } else if (e.key === "ArrowDown") {
    pacman.dx = 0; pacman.dy = 2;
  }
}

function stopPacman() {
  pacman.dx = 0;
  pacman.dy = 0;
}

function drawPacman() {
  // Çizimi temizle
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Pacman'in ağız hareketi
  const mouthAngle = pacman.mouthOpen ? 0.2 : 0.05;
  pacman.mouthOpen = !pacman.mouthOpen;

  // Pacman'i çiz
  ctx.beginPath();
  ctx.arc(pacman.x, pacman.y, pacman.radius, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI);
  ctx.lineTo(pacman.x, pacman.y);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();

  // Gözünü çiz
  ctx.beginPath();
  ctx.arc(pacman.x, pacman.y - 10, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function updatePacman() {
  pacman.x += pacman.dx;
  pacman.y += pacman.dy;

  // Duvarlardan çıkmasını engelle
  if (pacman.x - pacman.radius < 0) pacman.x = pacman.radius;
  if (pacman.x + pacman.radius > canvas.width) pacman.x = canvas.width - pacman.radius;
  if (pacman.y - pacman.radius < 0) pacman.y = pacman.radius;
  if (pacman.y + pacman.radius > canvas.height) pacman.y = canvas.height - pacman.radius;
}

function gameLoop() {
  drawPacman();
  updatePacman();
  requestAnimationFrame(gameLoop);
}

gameLoop();

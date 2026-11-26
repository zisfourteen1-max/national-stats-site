// NusaData — charts.js
// Menggambar grafik di <canvas> tanpa pustaka apa pun.
// Dua jenis grafik: batang (untuk pangsa sektor & garis kemiskinan)
// dan garis (untuk pertumbuhan ekonomi 2024 → 2025).
// Semua label digambar besar dan kontras supaya terbaca saat
// tangkapan layar diperkecil.

export const PALETTE = {
  navy: '#12395e',
  teal: '#0e8a7b',
  amber: '#e8a33d',
  ink: '#1c2b3a',
  muted: '#4a5b6b',
  grid: '#d8e0e8',
  bar: '#0e8a7b',
  barAlt: '#12395e',
  line: '#e8a33d',
};

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, Math.round(rect.width));
  const height = Math.max(220, Math.round(rect.height));
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  return { ctx, width, height };
}

function niceMax(value) {
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const n = value / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return nice * pow;
}

// Grafik batang: items = [{name, value}], valueLabel = format angka.
export function drawBarChart(canvas, items, valueLabel) {
  const { ctx, width, height } = setupCanvas(canvas);
  // Lebar kiri mengikuti label terpanjang supaya tidak terpotong.
  ctx.font = '600 15px system-ui, sans-serif';
  const labelW = Math.max(...items.map((i) => ctx.measureText(i.name).width));
  const padL = Math.min(240, Math.ceil(labelW) + 16), padR = 70, padT = 14, padB = 14;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const max = niceMax(Math.max(...items.map((i) => i.value)));
  const rowH = chartH / items.length;

  ctx.font = '600 15px system-ui, sans-serif';
  ctx.textBaseline = 'middle';

  items.forEach((item, i) => {
    const y = padT + i * rowH;
    const barH = Math.min(30, rowH * 0.55);
    const barY = y + (rowH - barH) / 2;
    const barW = (item.value / max) * chartW;
    // Garis grid + skala di bawah batang pertama saja (hemat ruang).
    ctx.fillStyle = PALETTE.ink;
    ctx.textAlign = 'right';
    ctx.fillText(item.name, padL - 12, y + rowH / 2);
    ctx.fillStyle = i % 2 === 0 ? PALETTE.teal : PALETTE.navy;
    ctx.fillRect(padL, barY, Math.max(2, barW), barH);
    ctx.fillStyle = PALETTE.ink;
    ctx.textAlign = 'left';
    ctx.font = '700 16px system-ui, sans-serif';
    ctx.fillText(valueLabel(item.value), padL + barW + 10, y + rowH / 2);
    ctx.font = '600 15px system-ui, sans-serif';
  });

  // Sumbu dasar.
  ctx.strokeStyle = PALETTE.grid;
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, padT + chartH);
  ctx.stroke();
}

// Grafik garis: points = [{year, value}], dengan label nilai di tiap titik.
export function drawLineChart(canvas, points, valueLabel) {
  const { ctx, width, height } = setupCanvas(canvas);
  const padL = 64, padR = 70, padT = 30, padB = 40;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = Math.max(0, min - (max - min) * 2 - 0.1);
  const hi = max + (max - min) * 2 + 0.1;
  const xAt = (i) => padL + (points.length === 1 ? chartW / 2 : (i / (points.length - 1)) * chartW);
  const yAt = (v) => padT + chartH - ((v - lo) / (hi - lo)) * chartH;

  // Garis grid horizontal + label sumbu.
  ctx.font = '600 14px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const steps = 4;
  for (let s = 0; s <= steps; s++) {
    const v = lo + ((hi - lo) * s) / steps;
    const y = yAt(v);
    ctx.strokeStyle = PALETTE.grid;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + chartW, y);
    ctx.stroke();
    ctx.fillStyle = PALETTE.muted;
    ctx.fillText(valueLabel(v), padL - 10, y);
  }

  // Garis tren.
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(p.value));
    else ctx.lineTo(xAt(i), yAt(p.value));
  });
  ctx.stroke();
  ctx.lineWidth = 1;

  // Titik + label nilai + label tahun.
  points.forEach((p, i) => {
    const x = xAt(i), y = yAt(p.value);
    ctx.fillStyle = PALETTE.navy;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '700 18px system-ui, sans-serif';
    // Label nilai di atas titik; titik di ujung digeser ke dalam supaya
    // tidak menabrak label sumbu-y di kiri atau tepi kanan.
    if (i === 0) {
      ctx.textAlign = 'left';
      ctx.fillText(valueLabel(p.value), x + 16, y - 24);
    } else if (i === points.length - 1) {
      ctx.textAlign = 'right';
      ctx.fillText(valueLabel(p.value), x - 16, y - 24);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText(valueLabel(p.value), x, y - 24);
    }
    ctx.font = '600 15px system-ui, sans-serif';
    ctx.fillStyle = PALETTE.muted;
    ctx.textAlign = 'center';
    ctx.fillText(String(p.year), x, padT + chartH + 24);
  });
}

// Donat sederhana untuk dua bagian (dipakai pada garis kemiskinan:
// makanan vs non-makanan). labels = [{name, value, color}].
export function drawDonut(canvas, parts) {
  const { ctx, width, height } = setupCanvas(canvas);
  const cx = width * 0.32;
  const cy = height / 2;
  const r = Math.min(width * 0.24, height * 0.38);
  const total = parts.reduce((s, p) => s + p.value, 0);
  let angle = -Math.PI / 2;
  parts.forEach((p) => {
    const sweep = (p.value / total) * Math.PI * 2;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + sweep);
    ctx.closePath();
    ctx.fill();
    angle += sweep;
  });
  // Lubang tengah.
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.58, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '700 20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // maxWidth menjaga teks tetap di dalam lubang donat.
  ctx.fillText('Rp609.160', cx, cy - 10, r * 1.05);
  ctx.font = '600 13px system-ui, sans-serif';
  ctx.fillStyle = PALETTE.muted;
  ctx.fillText('per kapita/bulan', cx, cy + 14, r * 1.05);

  // Legenda di kanan.
  const lx = width * 0.58;
  ctx.textAlign = 'left';
  parts.forEach((p, i) => {
    const y = cy - 34 + i * 40;
    ctx.fillStyle = p.color;
    ctx.fillRect(lx, y - 9, 18, 18);
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '700 17px system-ui, sans-serif';
    ctx.fillText(p.name, lx + 28, y);
    ctx.fillStyle = PALETTE.muted;
    ctx.font = '600 15px system-ui, sans-serif';
    const pct = Math.round((p.value / total) * 100);
    ctx.fillText(`${pct}% · Rp${p.value.toLocaleString('id-ID')}`, lx + 28, y + 22);
  });
}

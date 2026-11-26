// NusaData — app.js
// Menjalankan situs: navigasi antar-bagian (hash routing), pengalih
// indikator/tahun, pengalih bentuk grafik, kotak cari, dan tabel yang
// bisa diurutkan. Semua data angka datang dari data.js; semua gambar
// grafik datang dari charts.js.

import {
  INDICATORS, GROWTH_SERIES, SECTOR_SHARES, POVERTY_LINE,
  UMP_2026, SPENDING,
} from './data.js';
import { drawBarChart, drawLineChart, drawDonut } from './charts.js';

const PAGES = ['ringkasan', 'penduduk', 'ekonomi', 'pekerjaan', 'daerah'];
const rupiah = (n) => 'Rp' + n.toLocaleString('id-ID');

// ---------- Navigasi (hash routing) ----------
function currentPage() {
  const hash = (location.hash || '#/ringkasan').replace(/^#\/?/, '');
  return PAGES.includes(hash) ? hash : 'ringkasan';
}

function showPage(name) {
  PAGES.forEach((p) => {
    const el = document.getElementById('page-' + p);
    if (el) el.hidden = p !== name;
  });
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === name);
  });
  // Gambar ulang grafik di halaman yang baru dibuka: canvas yang
  // tersembunyi punya lebar 0, jadi digambar saat terlihat.
  if (name === 'ringkasan') drawSectorChart();
  if (name === 'ekonomi') drawGrowthChart();
  if (name === 'pekerjaan') drawPovertyChart();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => showPage(currentPage()));

// ---------- Grafik ----------
let sectorMode = 'bar';
let growthMode = 'line';

function drawSectorChart() {
  const canvas = document.getElementById('chart-sectors');
  if (!canvas) return;
  const items = SECTOR_SHARES.map((s) => ({ name: s.name, value: s.value }));
  if (sectorMode === 'line') {
    // Nama pendek supaya label sumbu-x tidak bertumpuk.
    const short = ['Industri', 'Dagang', 'Tani', 'Konstruksi', 'Tambang', 'Lainnya'];
    drawLineChart(canvas, items.map((i, idx) => ({ year: short[idx], value: i.value })),
      (v) => v.toFixed(2).replace('.', ',') + '%');
  } else {
    drawBarChart(canvas, items, (v) => v.toFixed(2).replace('.', ',') + '%');
  }
}

function drawGrowthChart() {
  const canvas = document.getElementById('chart-growth');
  if (!canvas) return;
  const points = GROWTH_SERIES.map((g) => ({ year: g.year, value: g.value }));
  const label = (v) => v.toFixed(2).replace('.', ',') + '%';
  if (growthMode === 'bar') {
    drawBarChart(canvas, GROWTH_SERIES.map((g) => ({ name: String(g.year), value: g.value })), label);
  } else {
    drawLineChart(canvas, points, label);
  }
}

function drawPovertyChart() {
  const canvas = document.getElementById('chart-poverty');
  if (!canvas) return;
  drawDonut(canvas, [
    { name: 'Makanan', value: POVERTY_LINE[0].value, color: '#0e8a7b' },
    { name: 'Non-makanan', value: POVERTY_LINE[1].value, color: '#e8a33d' },
  ]);
}

// Pengalih bentuk grafik (Batang / Garis).
document.querySelectorAll('[data-chart-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const chart = btn.dataset.chartToggle;
    const mode = btn.dataset.mode;
    document.querySelectorAll(`[data-chart-toggle="${chart}"]`).forEach((b) => {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    if (chart === 'sector') { sectorMode = mode; drawSectorChart(); }
    if (chart === 'growth') { growthMode = mode; drawGrowthChart(); }
  });
});

// ---------- Pengalih indikator penduduk ----------
const POP_IDS = ['penduduk', 'pertumbuhan-penduduk', 'kepadatan', 'harapan-hidup', 'fertilitas'];
document.querySelectorAll('#pop-switcher button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#pop-switcher button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    const ind = INDICATORS.find((i) => i.id === btn.dataset.pop);
    if (!ind) return;
    document.getElementById('pop-title').textContent = ind.label;
    document.getElementById('pop-value').textContent = ind.value;
    document.getElementById('pop-unit').textContent = ind.unit;
    document.getElementById('pop-note').textContent = ind.note;
    document.getElementById('pop-source').textContent = 'Sumber: ' + ind.source;
  });
});

// ---------- Pengalih tahun pertumbuhan ----------
const GROWTH_BY_YEAR = {
  2024: { value: '5,03%', note: 'Tahun penuh 2024' },
  2025: { value: '5,1%', note: 'Triwulan IV 2025: 5,39% y-on-y' },
};
document.querySelectorAll('#year-switcher button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#year-switcher button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    const g = GROWTH_BY_YEAR[btn.dataset.year];
    if (!g) return;
    document.getElementById('growth-year-label').textContent = btn.dataset.year;
    document.getElementById('growth-value').textContent = g.value;
    document.getElementById('growth-note').textContent = g.note;
  });
});

// ---------- Daftar indikator + kotak cari (Ringkasan) ----------
const indicatorList = document.getElementById('indicator-list');
const searchEmpty = document.getElementById('search-empty');

function indicatorItem(ind) {
  const li = document.createElement('li');
  li.dataset.search = (ind.label + ' ' + ind.note + ' ' + ind.source + ' ' + ind.section).toLowerCase();
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = ind.label;
  const val = document.createElement('div');
  val.className = 'val';
  val.textContent = ind.value + ' ';
  const unit = document.createElement('small');
  unit.textContent = ind.unit;
  val.appendChild(unit);
  const note = document.createElement('p');
  note.className = 'note';
  note.textContent = ind.note + ' Sumber: ' + ind.source + '.';
  li.append(name, val, note);
  return li;
}

INDICATORS.forEach((ind) => indicatorList.appendChild(indicatorItem(ind)));

document.getElementById('search-indicators').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  let visible = 0;
  indicatorList.querySelectorAll('li').forEach((li) => {
    const match = !q || li.dataset.search.includes(q);
    li.hidden = !match;
    if (match) visible += 1;
  });
  searchEmpty.hidden = visible > 0;
});

// ---------- Tabel yang bisa diurutkan ----------
function fillTable(tbody, rows, renderRow) {
  tbody.textContent = '';
  rows.forEach((row) => tbody.appendChild(renderRow(row)));
}

function makeSortable(tableId, rows, renderRow) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  let sortKey = null;
  let sortDir = 1;
  fillTable(tbody, rows, renderRow);
  table.querySelectorAll('button.sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      sortDir = sortKey === key ? -sortDir : 1;
      sortKey = key;
      const sorted = [...rows].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av === null || av === undefined) return 1;
        if (bv === null || bv === undefined) return -1;
        if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * sortDir;
        return String(av).localeCompare(String(bv), 'id') * sortDir;
      });
      fillTable(tbody, sorted, renderRow);
    });
  });
  return { tbody, refill: (newRows) => fillTable(tbody, newRows, renderRow) };
}

// Tabel pasar kerja & harga.
const labourRows = [
  { label: 'Angkatan kerja', value: '155,27 jt jiwa', source: 'BPS, November 2025' },
  { label: 'Penduduk bekerja', value: '147,91 jt jiwa', source: 'BPS, November 2025' },
  { label: 'Menganggur (TPT 4,74%)', value: '7,35 jt jiwa', source: 'BPS, November 2025' },
  { label: 'Tingkat kemiskinan', value: '8,25%', source: 'BPS, September 2025' },
  { label: 'Garis kemiskinan', value: 'Rp609.160 /kapita/bulan', source: 'BPS, Maret 2025' },
  { label: 'Inflasi (harga konsumen)', value: '1,9%', source: 'Bank Dunia (WDI), 2025' },
];
makeSortable('labour-table', labourRows, (r) => {
  const tr = document.createElement('tr');
  [r.label, r.value, r.source].forEach((text, i) => {
    const td = document.createElement('td');
    if (i === 1) td.className = 'num';
    td.textContent = text;
    tr.appendChild(td);
  });
  return tr;
});

// Tabel UMP + kotak cari provinsi.
const ump = makeSortable('ump-table', UMP_2026, (r) => {
  const tr = document.createElement('tr');
  const tdProv = document.createElement('td');
  tdProv.textContent = r.province;
  // Keterangan (tertinggi/terendah) menempel di bawah nama provinsi,
  // supaya tabel tetap muat di layar ponsel (3 kolom saja).
  if (r.note) {
    const tag = document.createElement('div');
    tag.style.cssText = 'font-size:13px;color:#0a6b5f;font-weight:700';
    tag.textContent = r.note;
    tdProv.appendChild(tag);
  }
  const tdUmp = document.createElement('td');
  tdUmp.className = 'num';
  tdUmp.textContent = rupiah(r.ump);
  const tdChange = document.createElement('td');
  tdChange.className = 'num';
  tdChange.textContent = r.change === null ? '—' : '+' + String(r.change).replace('.', ',') + '%';
  tr.append(tdProv, tdUmp, tdChange);
  return tr;
});
document.getElementById('search-ump').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  ump.refill(UMP_2026.filter((r) => !q || r.province.toLowerCase().includes(q)));
});

// Tabel pengeluaran per kapita.
makeSortable('spending-table', SPENDING, (r) => {
  const tr = document.createElement('tr');
  const tdPlace = document.createElement('td');
  tdPlace.textContent = r.place;
  const tdVal = document.createElement('td');
  tdVal.className = 'num';
  tdVal.textContent = rupiah(r.value);
  tr.append(tdPlace, tdVal);
  return tr;
});

// ---------- Boot ----------
// ?shot=cover|ekonomi|pekerjaan: tata letak ringkas supaya halaman muat
// dalam satu tangkapan layar 1280x720 (isinya sama, hanya jarak yang
// dirapatkan dan paragraf pembuka disembunyikan).
const shot = new URLSearchParams(location.search).get('shot');
if (shot) document.documentElement.dataset.shot = shot;

showPage(currentPage());
window.__nusadataReady = true;

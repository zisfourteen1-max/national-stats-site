# national-stats-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zisfourteen1-max/national-stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zisfourteen1-max/national-stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaData — Indonesia dalam Angka: a national statistics site for Indonesia, in Indonesian, that runs offline from static files. Five sections (Ringkasan, Penduduk, Ekonomi, Pekerjaan & Harga, Daerah) with real figures — population 285.72 million (2025), GDP US$1,445.6 billion, growth 5.1%, unemployment 4.74% (BPS, Nov 2025), poverty 8.25% — every figure shown with its source and year. Hand-drawn canvas charts (no chart library), a working indicator search, year/indicator switchers, chart type toggles, and sortable tables.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network requests: `app/` is plain HTML, CSS, and vanilla JavaScript (`data.js` holds the figures, `charts.js` draws the canvas charts, `app.js` runs navigation, filters, and tables).

---

<sub>Entered on [make.fun](https://make.fun/?ref=hzxjewxt&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>

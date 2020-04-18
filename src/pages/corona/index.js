import React, { useState, useEffect } from "react";
import "./style.css";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function CoronaContainer() {
  const [data, setData] = useState({
    confirmed: "-",
    recovered: "-",
    deceased: "-",
    activeCare: "-",
  });

  const [date, setDate] = useState("-");

  useEffect(() => {
    let isDark = new URLSearchParams(window.location.search).get("dark");

    if (isDark) {
      document.body.classList.add("darkmode");
    }

    document.title = "Widget Kawal Corona Indonesia";

    const getData = async function () {
      let doFetch = await fetch(
        "https://api.kawalcovid19.id/v1/api/case/summary",
        {
          method: "GET",
          mode: "no-cors",
        }
      );

      let result = await doFetch.json();

      setData(result);

      let _date = new Date(result.metadata.lastUpdatedAt);

      setDate(
        `${_date.getUTCDate()} ${
          monthNames[_date.getMonth()]
        } ${_date.getFullYear()} ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`
      );
    };

    getData();
  }, []);

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap"
        rel="stylesheet"
      />

      <h1>Update COVID-19 Indonesia</h1>

      <div class="container">
        <div class="box">
          <span class="number cornflowerblue" id="confirmed">
            {data.confirmed}
          </span>
          <span class="label">Terkonfirmasi</span>
        </div>
        <div class="box">
          <span class="number orange" id="activeCare">
            {data.activeCare}
          </span>
          <span class="label">Dirawat</span>
        </div>
        <div class="box">
          <span class="number green" id="recovered">
            {data.recovered}
          </span>
          <span class="label">Sembuh</span>
        </div>
        <div class="box">
          <span class="number red" id="deceased">
            {data.deceased}
          </span>
          <span class="label">Meninggal</span>
        </div>
      </div>

      <div class="footer">
        <span class="info">Pembaruan Terakhir</span>
        <span class="date" id="metadata">
          {date}
        </span>
      </div>
    </div>
  );
}

export default CoronaContainer;

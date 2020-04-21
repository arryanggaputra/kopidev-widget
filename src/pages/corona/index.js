import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";

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

  const [date, setDate] = useState("");

  useEffect(() => {
    let isDark = new URLSearchParams(window.location.search).get("dark");

    if (isDark) {
      document.body.classList.add("darkmode");
    }

    document.title = "Widget Kawal Corona Indonesia";

    const getData = async function () {
      let doFetch = await fetch("https://api.kawalcorona.com/", {
        method: "GET",
      });

      let result = await doFetch.json();

      result.filter((data) => {
        if (data.attributes.Country_Region === "Indonesia") {
          setData({
            confirmed: data.attributes.Confirmed,
            recovered: data.attributes.Recovered,
            deceased: data.attributes.Deaths,
            activeCare: data.attributes.Active,
          });
          let _date = new Date(data.attributes.Last_Update);

          setDate(
            `${_date.getUTCDate()} ${
              monthNames[_date.getMonth()]
            } ${_date.getFullYear()} ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`
          );
        }
      });
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

      <div className="container">
        <div className="box">
          <span className="number cornflowerblue" id="confirmed">
            {data.confirmed}
          </span>
          <span className="label">Terkonfirmasi</span>
        </div>
        <div className="box">
          <span className="number orange" id="activeCare">
            {data.activeCare}
          </span>
          <span className="label">Dirawat</span>
        </div>
        <div className="box">
          <span className="number green" id="recovered">
            {data.recovered}
          </span>
          <span className="label">Sembuh</span>
        </div>
        <div className="box">
          <span className="number red" id="deceased">
            {data.deceased}
          </span>
          <span className="label">Meninggal</span>
        </div>
      </div>

      <div className="footer">
        <span className="info">Pembaruan Terakhir</span>
        <span className="date" id="metadata">
          {date + " - "}{" "}
          {date && (
            <Link
              to="//kopi.dev/widget-kawal-corona-wordpress-blogspot-statistik/"
              target="_blank"
              title="Pasang widget kawal corona"
            >
              Pasang Widget
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default CoronaContainer;

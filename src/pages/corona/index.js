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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

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
      let doFetch = await fetch(
        "https://romantic-knuth-c6ede9.netlify.app/.netlify/functions/corona",
        {
          method: "GET",
        }
      );

      let result = await doFetch.json();

      result.filter((data) => {
        setData({
          confirmed: data.positif,
          recovered: data.sembuh,
          deceased: data.meninggal,
          activeCare: data.dirawat,
        });

        let _date = new Date();
        _date.setHours(_date.getHours() - 3);

        setDate(
          `${_date.getUTCDate()} ${
            monthNames[_date.getMonth()]
          } ${_date.getFullYear()} ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`
        );
        return true;
      });
    };

    getData();
  }, []);

  return (
    <>
      <Link
        to="//kopi.dev/widget-kawal-corona-wordpress-blogspot-statistik/"
        target="_blank"
        title="Pasang widget kawal corona"
        className="updateBar blink_me"
      >
        Versi Terbaru Tersedia, Ayo Update!
      </Link>

      <div className="maincontainer">
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
              {numberWithCommas(data.confirmed)}
            </span>
            <span className="label">Terkonfirmasi</span>
          </div>
          <div className="box">
            <span className="number orange" id="activeCare">
              {numberWithCommas(data.activeCare)}
            </span>
            <span className="label">Dirawat</span>
          </div>
          <div className="box">
            <span className="number green" id="recovered">
              {numberWithCommas(data.recovered)}
            </span>
            <span className="label">Sembuh</span>
          </div>
          <div className="box">
            <span className="number red" id="deceased">
              {numberWithCommas(data.deceased)}
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
    </>
  );
}

export default CoronaContainer;

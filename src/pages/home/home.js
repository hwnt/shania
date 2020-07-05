import React from "react";
import "./home.css";
import Header from "./../../components/header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <br />
            <p
              style={{ fontSize: "25px", fontFamily: "Muli", fontWeight: 500 }}
            >
              Silakan Pilih Menu
            </p>
            <div class="card w-100">
              <div class="card-body">
                <h5 class="card-title" style={{ display: "inline" }}>
                  Konsultasi Online
                </h5>
                <p style={{ color: "Green", display: "inline" }}>&nbsp; NEW</p>
                <p class="card-text">
                  Konsultasi dengan Bidan Profesional via chat sekarang juga!
                </p>
                <Link to="/konsultasi" href="#" className="btn btn-primary">
                  Pesan
                </Link>
              </div>
            </div>

            <div class="card w-100">
              <div class="card-body">
                <h5
                  class="card-title"
                  style={{ display: "inline", color: "grey" }}
                >
                  Program Kehamilan
                </h5>
                <p style={{ color: "grey" }}>&nbsp; SOON</p>
                <a href="#" className="btn btn-light">
                  Segera Hadir!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

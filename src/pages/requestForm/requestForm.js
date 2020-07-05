import React, { Component } from "react";
import Header from "../../components/header";
import Calendar from "react-calendar";
import moment from "moment/min/moment-with-locales";
import Taqwi from "../../assets/hw-taqwi.png";
import Suci from "../../assets/hw-suci.png";
import Anne from "../../assets/hw-anne.png";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import axios from "axios";

class RequestForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    date: new Date(),
    newDate: "Pilih Tanggal Konsultasi",
    customerName: null,
    midwifeStatus: 0,
    whatsappNumber: null,
    midwifeData: {}
  };

  onChangeCalendar = date => {
    var today = new Date();
    moment.locale("id");
    var newDate = moment(date).format("dddd, DD MMMM YYYY");
    if (today.getDate() <= date.getDate()) {
      this.setState({ date, newDate });
    } else {
      alert("Tidak bisa memilih tanggal sebelum hari ini!");
    }
  };

  onChangeCustomerName = e => {
    e.preventDefault();
    this.setState({ customerName: e.target.value });
  };

  onChangeWhatsappNumber = e => {
    e.preventDefault();
    this.setState({ whatsappNumber: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    var json_body;
    json_body = { chat_id: "@hwntgroup" };
    json_body.text =
      "ADA PESANAN MASUK!" +
      "\nNama: " +
      this.state.customerName +
      "\nNo WA: " +
      this.state.whatsappNumber +
      "\nPilihan Bidan: " +
      this.state.midwifeData.name +
      "\nTanggal: " +
      this.state.newDate;

    let regexPhoneNumberIndo = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g;
    if (this.state.midwifeStatus == 0) {
      Swal.fire({
        title: "Error!",
        text: "Pilih bidan terlebih dahulu!",
        icon: "error",
        confirmButtonText: "OK"
      });
    } else if (
      (this.state.customerName == null) |
      (this.state.customerName == "")
    ) {
      Swal.fire({
        title: "Error!",
        text: "Isi nama terlebih dahulu!",
        icon: "error",
        confirmButtonText: "OK"
      });
    } else if (!regexPhoneNumberIndo.test(this.state.whatsappNumber)) {
      Swal.fire({
        title: "Error!",
        text: "Nomor WhatsApp (Indonesia) anda belum benar!",
        icon: "error",
        confirmButtonText: "OK"
      });
    } else if (this.state.newDate === "Pilih Tanggal Konsultasi") {
      Swal.fire({
        title: "Error!",
        text: "Silakan pilih tanggal konsultasi dulu!",
        icon: "error",
        confirmButtonText: "OK"
      });
    } else {
      axios
        .post(
          "https://api.telegram.org/bot1279106504:AAEVMOcGHNSbKS62rcEhI6EX0ZqVJ24I9_k/sendMessage",
          json_body
        )
        .then(response => {
          this.props.history.push("/");
          Swal.fire({
            type: "success",
            title: "Success",
            icon: "success",
            text: "Berhasil order! Kami akan hubungi lewat whatsapp!"
          });
        })
        .catch(error => {
          Swal.fire({
            type: "error",
            title: "error",
            text: "Terjadi kesalahan server!"
          });
        });
    }
  };

  onChangeMidwife = e => {
    if (e.target.value !== "0") {
      this.setState({ midwifeStatus: 1 });
      if (e.target.value === "1") {
        this.setState({
          midwifeData: {
            name: "Taqwi Elfia Sari, S.Keb, Bd.",
            specialties:
              "Kesehatan Reproduksi, Kontrasepsi, Remaja, Pra Nikah, dan Seksualitas",
            schedule:
              " Senin-Kamis (06.00-18.00 WIB) \n Jumat-Minggu (06.00-13.00) ",
            photo: Taqwi
          }
        });
      } else if (e.target.value === "2") {
        this.setState({
          midwifeData: {
            name: "Rd. Anne Naufal, S.Keb, Bd.",
            specialties:
              "Kesehatan Reproduksi, Kehamilan, Persalinan, Laktasi, Nifas Newborn, dan Parenting",
            schedule: "Senin-Sabtu (08.00-12.00 & 18.00-21.00 WIB)",
            photo: Anne
          }
        });
      } else if (e.target.value === "3") {
        this.setState({
          midwifeData: {
            name: "Suci Aji, S.Keb, Bd.",
            specialties:
              "Kontrasepsi, Kehamilan, Persalinan, Nifas, Laktasi, Newborn, MPASI, dan Tumbuh Kembang",
            schedule: "Senin-Jumat (08.00-12.00 & 18.00 - 21.00 WIB) ",
            photo: Suci
          }
        });
      }
    } else {
      this.setState({ midwifeStatus: 0 });
    }
  };

  render() {
    return (
      <div className="RequestForm">
        <Header />
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <br />
              <p
                style={{
                  fontSize: "25px",
                  fontFamily: "Muli",
                  fontWeight: 500
                }}
              >
                Formulir Konsultasi
              </p>
              <div className="form-group ">
                <label htmlFor="inputBidan">Pilih Bidan</label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={this.onChangeMidwife}
                >
                  <option selected="True" value="0">
                    Pilih...
                  </option>
                  <option value="1">Taqwi Elfia Sari, S.Keb., Bd.</option>
                  <option value="2">Rd. Anne Naufal, S.Keb., Bd.</option>
                  <option value="3">Suci Aji, S.Keb., Bd.</option>
                </select>
              </div>
              {this.state.midwifeStatus === 0 ? (
                <p />
              ) : (
                <div className="card text-center">
                  <img
                    src={this.state.midwifeData.photo}
                    className="card-img-top"
                    alt="..."
                    // style={{ height: "200px", width: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {this.state.midwifeData.name}
                    </h5>
                    <p className="card-text">Spesialisasi:</p>
                    <p>{this.state.midwifeData.specialties}</p>
                    <p className="card-text">Jadwal:</p>
                    <p>{this.state.midwifeData.schedule}</p>
                  </div>
                </div>
              )}
              <form>
                <div className="form-group">
                  <label htmlFor="inputName">Nama Pemesan</label>
                  <input
                    className="form-control"
                    id="inputName"
                    aria-describedby="emailHelp"
                    value={this.state.customerName}
                    onChange={this.onChangeCustomerName}
                  />
                  <small id="nameHelp" className="form-text text-muted">
                    Tuliskan nama pemesan.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="inputNomorWhatsApp">
                    Nomor WhatsApp Pemesan
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputNomorWhatsApp"
                    aria-describedby="emailHelp"
                    value={this.state.whatsappNumber}
                    onChange={this.onChangeWhatsappNumber}
                  />
                  <small id="whatsappHelp" className="form-text text-muted">
                    Tuliskan nomor WhatsApp pemesan yang aktif.
                  </small>
                </div>
                <label htmlFor="inputTanggal">Tanggal Konsultasi</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Pilih melalui kalender dibawah..."
                  readOnly="True"
                  //   className="form-control-plaintext"
                  value={this.state.newDate}
                  style={{ marginBottom: "8px" }}
                />

                <Calendar
                  onChange={this.onChangeCalendar}
                  value={this.state.date}
                />
                <br />
                <label htmlFor="biaya">Total Biaya</label>
                <p className="font-weight-bold">Rp 25.000,00</p>
                <br />
                <p className="">
                  *Detail pembayaran akan diberikan via WhatsApp
                </p>
                <br />
                <button
                  type="submit"
                  onClick={this.onSubmit}
                  className="btn btn-primary"
                >
                  Pesan Sekarang
                </button>
              </form>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestForm;

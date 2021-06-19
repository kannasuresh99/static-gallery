import React from "react";
// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";


export default function Landing() {
  return (
    <div className="container-fluid">
      <Navbar />
      <main>
        <section className="hero headerbackground">
          <div className="hero-body">
            <div className="container-hero">
              <div>
                <h1
                  style={{
                    fontFamily: "Aclonica",
                    color: "white",
                    fontSize: "40px",
                  }}
                >
                  Kidsuki
                </h1>
                <p style={{ color: "white", fontFamily: "Lato" }}>
                  Kidsuki is your one stop shop for the largest collection of
                  free printable coloring pages for Kids and Adults alike!
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="px-6 py-6 place-items-center">
          <h1>About Page</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
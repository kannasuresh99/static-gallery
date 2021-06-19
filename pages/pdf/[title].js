import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from 'next/link';
import Typography from "@material-ui/core/Typography";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

var fetch_url = "http://cdn.kidsuki.com/May-31-2021/desired_response_1.json"

export const getStaticPaths = async () => {
  const res = await fetch(fetch_url);
  const data = await res.json();

  const paths = data.final_category.map((gallery) => {
    return {
      params: { title: gallery.title_lowercase },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const title = context.params.title;
  const res = await fetch(fetch_url);
  const data = await res.json();
  const thumbnail_ = data.final_category.filter(
    (imagetitle) => imagetitle.title_lowercase == title
  );

  return {
    props: { image_data: thumbnail_ },
  };
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function PdfViewer({ image_data }) {
  return (
    <div className="container-fluid">
      <Navbar transparent />
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
                  KIDSUKI
                </h1>
                <p style={{color:"white", fontFamily:"Lato"}}>
                  Kidsuki is your one stop shop for the largest collection of
                  free printable coloring pages for Kids and Adults alike!
                </p>
              </div>
            </div>
          </div>
        </section>
        {image_data.map((image_url) => (
          <div key = {image_url.maincategory_name}>
          <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">
            Home
          </Link>
          <Link href={"/subcategories/" + image_url.parent_name}>
            {image_url.parent_name.capitalize()}
          </Link>
          <Link href={"/images/" + image_url.maincategory_name}>
            {image_url.maincategory_name.capitalize()}
          </Link>
          <Typography color="textPrimary">{image_url.title_lowercase.capitalize()}</Typography>
        </Breadcrumbs>
        </div>
        ))}
        <div>
          {image_data.map((image_title) => (
            <div key={image_title.title} className="px-6 py-6">
              <div style={{ textAlign: "center" }}>
                <img src={image_title.big_thumbnail} width="600"  />
              </div>
              <div>
                <a href={image_title.pdf_path} target="_blank" rel="noopener noreferrer" download>
                  <button className="pointer-card-cursor button-download button5">
                    Download
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
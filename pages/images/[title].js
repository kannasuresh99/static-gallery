import React from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Color from 'color';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import CardActionArea from '@material-ui/core/CardActionArea';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

var fetch_url = "http://cdn.kidsuki.com/May-31-2021/desired_response_1.json"

export const getStaticPaths = async () => {
  const res = await fetch(fetch_url);
  const data = await res.json();

  const paths = data.data.map((gallery) => {
    return {
      params: { title: gallery.maincategory_name },
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
  const thumbnail_ = data.data.filter(
    (imagetitle) => imagetitle.maincategory_name == title
  );

  return {
    props: { image_data: thumbnail_ },
  };
};

const useStyles = makeStyles((theme) => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color("#ffffff")
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: '1rem 1.5rem 1.5rem',
    };
  },
  title: {
    fontFamily: 'Lato',
    fontSize: '2rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#fff',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const CustomCard = ({ classes, image, title, subtitle }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function SubcategoryImages({ image_data }) {
  const styles = useStyles({ color: '#150e56' });
  const classes = useStyles();
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
                <p style={{ color: "white", fontFamily: "Lato" }}>
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
          <Typography color="textPrimary">{image_url.maincategory_name.capitalize()}</Typography>
        </Breadcrumbs>
        </div>
        ))}

        <div className="px-6 py-6">
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {image_data.map((image_url) => (
                <div key={image_url.thumbnail}>
                <Grid container item className={classes.cardGrid}>
                  {image_url.files.map((urls) => (
                    <Link href={"/pdf/" + urls.directus_files_id.data.image_title_link_url}>
                    <div className="px-6 py-6" key={urls.directus_files_id.data.asset_url}>
                    <CustomCard
                      classes={styles}
                      title={urls.directus_files_id.data.image_title}
                      image={urls.directus_files_id.data.asset_url}
                    />
                    </div>
                    </Link>
                  ))}
                </Grid>
                </div>
              ))}
            </Grid>
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  );
}
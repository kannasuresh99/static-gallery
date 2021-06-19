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
// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

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

var fetch_url = "http://cdn.kidsuki.com/May-31-2021/desired_response_1.json"

export const getStaticProps = async () => {
  const res = await fetch(fetch_url);
  const data = await res.json();

  return {
    props: { image_data: data },
  };
};

export default function Landing({ image_data }) {
  const styles = useStyles({ color: '#150e56' });
  const classes = useStyles();
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
          <Container className={classes.cardGrid} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={3}>
              {image_data.maincategory.map((maincategory_image) => (
                <div key={maincategory_image.name} className="px-6 py-6">
                <Link href={'/subcategories/'+ maincategory_image.value}>
                <Grid item>
                <CustomCard
                classes={styles}
                title={maincategory_image.name}
                image={"https://cdn.kidsuki.com/May-31-2021/" + maincategory_image.value + '.jpg'}
              />
              </Grid>
              </Link>
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
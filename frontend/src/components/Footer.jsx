import React from 'react';
import { Container, Typography } from '@material-ui/core';
import efilogo from '../eficode_logo_black.svg';

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <a href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">
            Lähteenä oireisiin THL:n COVID-19 - infosivu
          </a>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Tällä sivustolla ei kerätä henkilötietolain tai EU lainsäädännön tarkoittamia yksilöiviä henkilötietoja.
            Eficoden yleisestä henkilötietojen käsittelystä voit lukea <a href="https://www.eficode.com/privacy-policy">täältä.</a>
          </Typography>
          <a href="https://eficode.com">Eficode 2020</a>
        </Container>
        <br/>
        <img src={efilogo} alt="Eficode logo" style={{width:'5vw', height:'5vh'}}/>
      </footer>
    );
  }
}

export default Footer;

import React from 'react';
import { Container, Typography } from '@material-ui/core';
import efilogo from '../eficode_logo_black.svg';

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <a target="_blank" rel="noopener noreferrer" 
          href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">
            Lähteenä oireisiin THL:n COVID-19 - infosivu
          </a>
          <br/>
            Tällä sivustolla ei kerätä henkilötietolain tai EU lainsäädännön tarkoittamia yksilöiviä henkilötietoja.
            <br/>
            Eficoden yleisestä henkilötietojen käsittelystä voit lukea  <a rel="noopener noreferrer" target="_blank" href="https://www.eficode.com/privacy-policy">
               täältä.
              </a>
            <br/>
            <a target="_blank" rel="noopener noreferrer" href="https://eficode.com">Eficode 2020</a>
            <br/>
            <img src={efilogo} alt="Eficoden logo" style={{width:'7vw', height:'7vh'}}/>
          </Typography>
        </Container>
      </footer>
    );
  }
}

export default Footer;

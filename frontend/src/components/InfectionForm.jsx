import React from 'react';
import {
  TextField,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
} from '@material-ui/core';

class InfectionForm extends React.Component {
  state = {
    postal_code: undefined,
    confirmed: false,
    has_symptoms: false,
    symptoms: []
  }

  componentDidMount () {
    const { symptoms } = this.props;
    this.setState({ symptoms });
  }

  setPostalCode(postal_code) {
    this.setState({ postal_code });
  }

  toggleConfirmed() {
    this.setState(prevState => ({ confirmed: !prevState.confirmed }));
  }

  toggleHasSymptoms() {
    this.setState(prevState => ({ has_symptoms: !prevState.has_symptoms }));
  }

  sendInfection() {
    const { api } = this.props;
    let data = this.state;
    data.symptoms = [1,2];
    api.post('/infections', data).then(response => {
      console.log(response);
    });
  }

  render () {
    console.log(this.state);
    return(
      <Box
      width="50%"
      margin="auto"
      padding="100"
      alignItems="center"
      justifyContent="center"
      >
        <h1>
          Efidemic
        </h1>
        <h5>
          Eficoden datankeruu-sovellus koronavirus-epidemiaan
        </h5>
        <h3>
          Covid-19 alueellinen oirekartoitus
        </h3>
        <TextField label="Syötä postinumerosi" onChange={(event) => this.setPostalCode(event.target.value)} />
        <p>
        <FormControlLabel control={
            <Checkbox onClick={() => this.toggleConfirmed()} value="primary" />
          }
            label="Varmistettu Covid-19 tartunta"
          />
        <FormControlLabel control={
            <Checkbox onClick={() => this.toggleHasSymptoms()} value="primary" />
          }
            label="Covid-19 täsmääviä oireita"
          />
        </p>
        <h3>
          Klikkaa alta niitä oireita, joita olet kokenut. Klikkaa lopuksi lähetä-painiketta.
        </h3>
        <br/>
        <a href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">
          Lähteenä oireisiin THL:n COVID-19 - infosivu
        </a>
        <br/>
        <br/>
        <Button variant="contained" color="primary" onClick={() => this.sendInfection()} >
          Lähetä
        </Button>
        <br/>
        <br/>
      </Box>
    );
  }
}

export default InfectionForm;

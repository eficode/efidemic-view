import React from 'react';
import {
  TextField,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
} from '@material-ui/core';
import SymptomSelect from './SymptomSelect';
import { toast } from 'react-toastify';
import postalCodes from 'postal-codes-js';

class InfectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postal_code: undefined,
      confirmed: false,
      has_symptoms: false,
      selectedSymptoms: new Set(),
      postalCodeError: false,
      postalCodeErrorMessage: '',
    }
    this.handleSelectedSymptoms = this.handleSelectedSymptoms.bind(this);
  }

  componentDidMount () {
    const { symptoms } = this.props;
    this.setState({ symptoms });
  }

  setPostalCode(target, postal_code) {
    const validate = postalCodes.validate('fi', postal_code);
    if (validate === true) {
      this.setState({
        postal_code,
        postalCodeError: false,
        postalCodeErrorMessage: '',
      });
    } else {
      this.setState({
        postalCodeError: true,
        postalCodeErrorMessage: validate,
      });
    }
  }

  toggleConfirmed() {
    this.setState(prevState => ({ confirmed: !prevState.confirmed }));
  }

  toggleHasSymptoms() {
    this.setState(prevState => ({ has_symptoms: !prevState.has_symptoms }));
  }

  handleSelectedSymptoms(symptom) {
    let { selectedSymptoms } = this.state;
    if(selectedSymptoms.has(symptom.key)) {
      selectedSymptoms.delete(symptom.key);
    } else {
      selectedSymptoms.add(symptom.key);
    }
    this.setState({ selectedSymptoms });
  }

  sendInfection() {
    const { api } = this.props;
    const { postal_code, confirmed, has_symptoms, selectedSymptoms, postalCodeError } = this.state;
    if (postalCodeError) {
      toast.error('Postinumero on virheellinen.');
    } else {
      const data = {
        postal_code,
        confirmed,
        has_symptoms,
        symptoms: Array.from(selectedSymptoms)
      }
      api.post('/infections', data).then(response => {
        console.log(response);
        toast.success('Kiitos! Ilmoitus lähetetty onnistuneesti.');
      });
    }
  }

  render () {
    const { classes, symptoms } = this.props;
    const { selectedSymptoms, postalCodeError, postalCodeErrorMessage } = this.state;

    return(
      <Box className={classes.root}>
        <h1>
          Tilannekartta koronaviruksen oireiden alueellisesta esiintymisestä.
        </h1>
        <h5>
          Tässä palvelussa voit ilmoittaa koronavirusoireistasi, ja nähdä miten virus leviää eri puolilla maata.
          Vastausmäärän kasvaessa palvelu näyttää tartuntaa vastaavien oireiden esiintymisen kartalla.
        </h5>
        <h3>
          Covid-19 alueellinen oirekartoitus
        </h3>
        <TextField
          label="Syötä postinumerosi"
          style={{margin: '2vh'}}
          onChange={(event) => this.setPostalCode(event.target, event.target.value)}
          error={postalCodeError}
          helperText={postalCodeErrorMessage}
        />
        <FormControlLabel control={
            <Checkbox onClick={() => this.toggleConfirmed()} value="primary" />
          }
            label="Minulla on varmistettu koronavirustartunta"
          />
        <FormControlLabel control={
            <Checkbox onClick={() => this.toggleHasSymptoms()} value="primary" />
          }
            label="Epäilen, että minulla on koronavirustartunta (huom. lisävalinnat)"
          />
        <SymptomSelect classes={classes} symptoms={symptoms} selectedSymptoms={selectedSymptoms} handleSelectedSymptoms={this.handleSelectedSymptoms} />
        <Button variant="contained" color="primary" onClick={() => this.sendInfection()} >
          Lähetä
        </Button>
      </Box>
    );
  }
}

export default InfectionForm;

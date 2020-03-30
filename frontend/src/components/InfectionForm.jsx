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

class InfectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postal_code: undefined,
      confirmed: false,
      has_symptoms: false,
      selectedSymptoms: new Set(),
    }
    this.handleSelectedSymptoms = this.handleSelectedSymptoms.bind(this);
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
    const { postal_code, confirmed, has_symptoms, selectedSymptoms } = this.state;
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

  render () {
    const { classes, symptoms } = this.props;
    const { selectedSymptoms } = this.state;

    return(
      <Box
      width="50%"
      margin="auto"
      padding="100"
      alignItems="center"
      justifyContent="center"
      >
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
          onChange={(event) => this.setPostalCode(event.target.value)}
        />
        <p>
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
        </p>
        <SymptomSelect classes={classes} symptoms={symptoms} selectedSymptoms={selectedSymptoms} handleSelectedSymptoms={this.handleSelectedSymptoms} />
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

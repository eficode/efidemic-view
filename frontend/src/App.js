import React, { useState } from 'react';
import 'typeface-roboto';
import './App.css';
import oirekuva from './THL-oireet.png';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import LMap from './map';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function App() {
  document.title = 'Efidemic';  
  return (
    <div className="App">
      <LMap />
      <SymptomForm />
    </div>
  );  
}

function SymptomForm() {
  const [varmistettu, setVarmistettu] = useState(false);
  const [onkoOireita, setOnkoOireita] = useState(false);

  return(
    <Box 
    width="50%"
    margin="auto"
    padding="100"
    alignItems="center"
    justifyContent="center"
    border={1}
    borderRadius="borderRadius">
      
      <h1>
        Efidemic
      </h1>
      <h5>
        Eficoden datankeruu-sovellus koronavirus-epidemiaan
      </h5>
      <h3>
        Covid-19 alueellinen oirekartoitus
      </h3>
      <TextField label="Syötä postinumerosi"/>
      <p>
      <FormControlLabel control={
          <Checkbox onClick={() => setVarmistettu(!varmistettu)} value="primary" />
        }
          label="Varmistettu Covid-19 tartunta"
        />
      <FormControlLabel control={
          <Checkbox onClick={() => setOnkoOireita(!onkoOireita)} value="primary" />
        }
          label="Covid-19 täsmääviä oireita"
        />
      </p>
      <h3>
        Klikkaa alta niitä oireita, joita olet kokenut. Klikkaa lopuksi lähetä-painiketta.
      </h3>
      <Symptoms/>
      <br/>
      <a href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">
        Lähteenä oireisiin THL:n COVID-19 - infosivu
      </a>
      <br/>
      <br/>
      <Button variant="contained" color="primary" >
        Lähetä
      </Button>
      <br/>
      <br/>
    </Box>
  )
}

function Symptoms() {
  const classes = useStyles();
  const [oireet, setOireet] = useState([]);
  const handleClick = () => {
    setOireet();
  }
  return(
    <div className={classes.root}>
      <Chip 
        clickable
        color="secondary" 
        label="Päänsärky" 
        onClick={handleClick} 
      />
      <Chip 
        clickable
        color="secondary" 
        label="Yskä" 
        onClick={handleClick} 
      />
      <Chip 
        clickable
        color="secondary" 
        label="Kurkkukipu" 
        onClick={handleClick} 
      />
      <Chip 
        clickable
        color="secondary" 
        label="Hengenahdistus" 
        onClick={handleClick} 
      />
      <Chip 
        clickable
        color="secondary" 
        label="Lihaskivut" 
        onClick={handleClick} 
      />
      <Chip 
        clickable
        color="secondary" 
        label="Kuume" 
        onClick={handleClick} 
      />
      <br/>
      <div>
        <h3>Valitsemasi oireet:</h3>
        {
          oireet.map((oire) =>
          <li>{oire}</li>
          )
        }
      </div>
    </div>
  )
}

export default App; 

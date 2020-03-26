import React, { useState } from 'react';
import 'typeface-roboto';
import './App.css';
//import oirekuva from './THL-oireet.png'; THL:n kuva korona-oireista. Ei käytössä.
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
  const [chipData, setChipData] = useState({
    "Päänsärky": { key: 0, label: 'Päänsärky' , clicked: false},
    "Yskä": { key: 1, label: 'Yskä' , clicked: false},
    "Kurkkukipu": { key: 2, label: 'Kurkkukipu' , clicked: false},
    "Hengenahdistus": { key: 3, label: 'Hengenahdistus' , clicked: false},
    "Lihaskivut": { key: 4, label: 'Lihaskivut' , clicked: false},
    "Kuume": { key: 5, label: 'Kuume' , clicked: false}
  });
  function handleClick(key, oire) {
    var isClicked = key[1].clicked;
    setChipData({
      ...chipData, [oire]: { ...chipData[oire], clicked: !isClicked}
    })
    setOireet(oireet.concat(oire));
  }
  const oireLista = oireet.map((oire) => 
    <li key={oire.toString()}>
      {oire}
    </li>
  )
  return(
    <div className={classes.root}>
      {
        Object.entries(chipData).map((key) => {
          return(
            <Chip
            color="secondary" 
            key={key[1].key}
            label={key[0]}
            disabled={key[1].clicked}
            onClick={() => {
              handleClick(key, key[0])
            }} 
            className={classes.chip}
          />
          )
        })
      }
      <hr/>
      <div>
        <h3>Valitsemasi oireet:</h3>
          <ul>{oireLista}</ul>
      </div>
    </div>
  )
}
export default App;
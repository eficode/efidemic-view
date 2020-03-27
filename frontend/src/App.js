import React, { useState } from 'react';
import 'typeface-roboto';
import './App.css';
//import oirekuva from './THL-oireet.png'; THL:n kuva korona-oireista. Ei käytössä.
import efilogo from './eficode_logo_black.svg';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import LMap from './map';
import DoneIcon from '@material-ui/icons/Done';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '10vh',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function App() {
  const classes = useStyles();
  document.title = 'Tilannekartta.fi';
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
        Tilannekartta koronaviruksen oireiden alueellisesta esiintymisestä.
      </h1>
      <h5>
        Tässä palvelussa voit ilmoittaa koronavirusoireistasi, ja nähdä miten virus leviää eri puolilla maata. 
        Vastausmäärän kasvaessa palvelu näyttää tartuntaa vastaavien oireiden esiintymisen kartalla.
      </h5>
      <TextField label="Syötä postinumerosi" style={{margin: '2vh'}}/>
      <br/>
      <FormControlLabel control={
          <Checkbox onClick={() => setVarmistettu(!varmistettu)} value="primary" />
        }
          label="Minulla on varmistettu koronavirustartunta"
        />
        <br/>
      <FormControlLabel control={
          <Checkbox onClick={() => setOnkoOireita(!onkoOireita)} value="primary" />
        }
          label="Epäilen, että minulla on koronavirustartunta (huom. lisävalinnat)"
        />
      <Symptoms/>
      <br/>
      <br/>
      <Button variant="contained" color="primary" >
        Lähetä
      </Button>
      <br/>
      <Footer/>
      <br/>
    </Box>
  )
}

function Footer() {
  const classes = useStyles();
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
  /*
    Oirelistaan tallentuu, mitä oire-chippejä käyttäjä on klikannut. 
    Listaa ei kuitenkaan näytetä käyttäjälle.
  */
  const oireLista = oireet.map((oire) => 
    <li key={oire.toString()}>
      {oire}
    </li>
  )
  return(
    <div className={classes.chip}>
      {
        Object.entries(chipData).map((key) => {
          return(
            <Chip
            clickable
            variant="outlined"
            color="secondary" 
            key={key[1].key}
            label={key[0]}
            onClick={() => {
              handleClick(key, key[0])
            }}
            className={classes.chip}
            icon={key[1].clicked ? <DoneIcon /> : <React.Fragment/>}
          />
          )
        })
      }
    </div>
  )
}
export default App;
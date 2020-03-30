import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InfectionForm from './components/InfectionForm';
import Footer from './components/Footer';
import Api from './api/Api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const styles = makeStyles(theme => ({
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: undefined,
      infections: [],
      symptoms: []
    }
  }

  componentDidMount() {
    document.title = 'Tilannekartta.fi';
    const api = new Api();
    this.setState({ api });
    api.get('/infections').then(response => {
      this.setState({ infections: response });
    });
    api.get('/symptoms').then(response => {
      const symptoms = response;
      const symptomList = symptoms.map(s => {
        const symptom = { key: s.id, label: s.name, clicked: false };
        return symptom;
      });
      this.setState({ symptoms: symptomList });
    });

  }

  render() {
    const { classes } = this.props;
    const { api, infections, symptoms } = this.state;
    return (
      <div className="App">
        <InfectionForm api={api} classes={classes} symptoms={symptoms} />
        <Footer classes={classes} />
        <ToastContainer />
      </div>
    );
  }
}

export default withStyles(styles)(App);

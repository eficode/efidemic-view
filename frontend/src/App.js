import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InfectionForm from './components/InfectionForm';
import Footer from './components/Footer';
import Api from './api/Api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
    alignItems: 'center',
    justify: 'center',
    margin: '4vh',
  },
  chip: {
    display: 'flex',
    marginTop: '5vh',
    marginBottom: '5vh',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '10vh',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
});

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

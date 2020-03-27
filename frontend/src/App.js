import React from 'react';
import { Container } from '@material-ui/core';
import InfectionMap from './components/InfectionMap';
import InfectionForm from './components/InfectionForm';
import Api from './api/Api';


class App extends React.Component {
  constructor() {
    super();
    this.props = {};
    this.state = {
      api: undefined,
      infections: [],
      symptoms: []
    }
  }



  componentDidMount() {
    const api = new Api();
    this.setState({ api });
    api.get('/infections').then(response => {
      this.setState({ infections: response.data });
    });
    api.get('/symptoms').then(response => {
      this.setState({ symptoms: response.data });
    });
  }

  render() {
    console.log(this.state);
    const { api, infections, symptoms } = this.state;
    return (
      <React.Fragment>
        <InfectionMap />
        <Container maxWidth="xl">
          <InfectionForm api={api} symptoms={symptoms} />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;

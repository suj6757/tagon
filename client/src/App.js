import React from 'react';
import Routes from './Routes';
import Login from './components/body/Login';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id : ''
    }
  }

  render() {
    console.log(window.sessionStorage.getItem("ID"));

    if(window.sessionStorage.getItem("ID") == null) {
      return <Login />;
    }
    else {
      return <Routes />;
    }
  }
}

export default App;
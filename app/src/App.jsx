import React, { Component } from 'react';
import Routes from "./components/Routes.jsx";
import {Elements, StripeProvider} from 'react-stripe-elements';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_OX1YNOvcn9HctF5JszTzm2Cg">
        <Elements>
          < Routes/>
        </Elements>
      </StripeProvider>
    );
  }
}

export default App;

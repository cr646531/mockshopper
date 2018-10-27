import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import Nav from './components/Nav'


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Nav} />
        </div>
      </HashRouter>
    );
  }
}

/*const ConnectedApp = connect(*/
  //null,
  //mapDispatchToProps
//)(App);

render(<App />, document.getElementById('root'));

//render(
//<Provider store={store}>
//<ConnectedApp />
//</Provider>,
//document.getElementById('root')
/*);*/

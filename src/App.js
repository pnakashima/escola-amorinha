import './App.css'
import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormPage from './pages/FormPage';
import ListPage from './pages/ListPage';


class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <HomePage/>
          </Route>
          <Route path='/register'>
            <FormPage/>
          </Route>
          <Route path='/directory'>
            <ListPage/>
          </Route>
        </Switch>
      </BrowserRouter>

      // <div className="App">
      //   <HomePage />
      // </div>
    )

  }
}

export default App;
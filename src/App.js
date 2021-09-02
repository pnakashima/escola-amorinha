import './App.css'
import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormPage from './pages/FormPage';
import ListPage from './pages/ListPage';
import EditPage from './pages/EditPage';

class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path='/' exact>
            <HomePage/>
          </Route> */}
          <Route path='/' exact>
            <ListPage/>
          </Route>
          <Route path='/register'>
            <FormPage/>
          </Route>

          {/* Renderizando desta maneira pra poder pegar as props */}
          <Route path='/edit' component={EditPage} />  

          <Route>
            404 Not Found
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
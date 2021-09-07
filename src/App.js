import './App.css'
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormPage from './pages/FormPage';
import ListPage from './pages/ListPage';
import EditPage from './pages/EditPage';
import { APIProvider } from './providers/api';

const App = () => {
  return (
    <APIProvider>
      <BrowserRouter>
        <Switch>
          {/* <Route path='/' exact>
            <HomePage/>
          </Route> */}
          <Route path='/' exact>
            <ListPage />
          </Route>
          <Route path='/register'>
            <FormPage />
          </Route>

          {/* Renderizando desta maneira pra poder pegar as props */}
          <Route path='/edit' exact component={EditPage} />

          <Route path='/edit/:id' component={EditPage} />

          <Route>
            404 Not Found
          </Route>
        </Switch>
      </BrowserRouter>
    </APIProvider>
  )
}

export default App;
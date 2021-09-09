import './App.css'
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormPage from './pages/FormPage';
import ListPage from './pages/ListPage';
import EditPage from './pages/EditPage';
import { APIProvider } from './providers/api';
import LoginPage from './pages/LoginPage'
import useToken from './useToken'
import { UserProvider } from './providers/user';


const App = () => {

  const { token, setToken } = useToken()

  console.log("app token ", token)


  // if(!token) {
  //   return <LoginPage setToken={setToken} />
  // }

  // console.log("app token 2", token)

  return (
    <APIProvider>
      <UserProvider>
        <BrowserRouter>
          <Switch>

            <Route path='/' exact component={() => <LoginPage setToken={setToken} />} />

            {token && <Route path='/list' exact component={ListPage} />}

            {token && <Route path='/register' component={FormPage} />}

            {token && <Route path='/edit' exact component={EditPage} />}

            {token && <Route path='/edit/:id' component={EditPage} />}

            <Route>
              404 Not Found
            </Route>

          </Switch>
        </BrowserRouter>
      </UserProvider>
    </APIProvider>
  )
}

export default App;
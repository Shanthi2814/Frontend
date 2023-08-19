//import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom';
import StackOverflow from './components/StackOverflow'
import Question from './components/Add-Question/Question';
import ViewQuestion from './components/ViewQuestion/MainQuestion';
import Auth from './components/Auth'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
//import { Redirect } from 'react-router'

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          displayName:authUser.displayName,
          email:authUser.email
        }))
      }else{
        dispatch(logout())
      }
    })
  },[dispatch])
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          
          <Navigate
          to={{
            pathname: "/auth",
            state: {
              from: props.location,
            },
          }}/>
        )
      }
    />
  );
  return (
    <div className="App">
      <Router>
      <Header/>
      <Routes>
        <Route exact path='/auth' Component={Auth}/>
        <Route exact path='/add-question' element={PrivateRoute} Component={Question}/>
        <Route exact path='/question' element={PrivateRoute} Component={ViewQuestion}/>
        <Route exact path='/' element={PrivateRoute} Component={StackOverflow}/>
      </Routes>
      </Router>
     
    </div>
  );
}

export default App;

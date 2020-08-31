import React from 'react';
import logo from './logo.svg';
import HomePage from './pages/homepage/homepage.componenets'
import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom'
import ShopPage from './pages/shop/shop.component'
import Header from './componenets/Header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth,createUserProfileDocument,addCollectionAndDocuments} from './firebase/firebase.utils'
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'
import CheckoutPage from './pages/checkout/checkout.component'
class App extends React.Component{
  

  unsubscribeFromAuth = null;

  componentDidMount(){
    
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot=>{
         setCurrentUser({
           id: snapShot.id,
           ...snapShot.data()
         })

          
        });
      } else{
        setCurrentUser(userAuth);
      }

    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/' />):(<SignInAndSignUpPage />)} />
        <Route exact path='/checkout' component={CheckoutPage} />

  
        </Switch>
      </div>
    );
  }
 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user=> dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);

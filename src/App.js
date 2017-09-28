import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import ReactLoading from 'react-loading';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from 'react-router-dom'
import SignUp from './logins/signup.js'
import LogIn from './logins/login.js' 
import MainPage from './MainPage.js'
import About from './about.js'
import Profile from './profiles/Profile.js'
import Posts from './postModules/viewPosts.js'
import AllUsers from './profiles/AllUsers.js'
import Admin from './profiles/admin.js'
import Candidates from './profiles/candidates.js';

const config = {
  apiKey: "AIzaSyA1-thkOzrtaPplVdOlenOMdVEhd-Dg8rA",
  authDomain: "to-do-list-e3a05.firebaseapp.com",
  databaseURL: "https://to-do-list-e3a05.firebaseio.com",
  projectId: "to-do-list-e3a05",
  storageBucket: "to-do-list-e3a05.appspot.com",
  messagingSenderId: "415083564185"
};
firebase.initializeApp(config);

var CurrentUser=undefined;

class App extends Component {
  constructor(props){
    super(props);
    
    this.SignUpUser = this.SignUpUser.bind(this);
    this.LogIn = this.LogIn.bind(this);
    this.SignOut = this.SignOut.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.PostNow = this.PostNow.bind(this);
    this.ApplyForJob = this.ApplyForJob.bind(this);
    this.DeletePost = this.DeletePost.bind(this);
    this.ViewCandidates = this.ViewCandidates.bind(this);
    this.EditPost = this.EditPost.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getAuthState = this.getAuthState.bind(this);
    this.SignButton = this.SignButton.bind(this);
    this.NavBar = this.NavBar.bind(this);
    this.Menu = this.Menu.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.DeleteUsers = this.DeleteUsers.bind(this);

    firebase.auth().onAuthStateChanged(this.getAuthState);
    this.state = {
      displayContent:true,
      Authenticated:false,
      userData:{},
      link:""
    }
  }
  getAuthState(user){
    if(firebase.auth().currentUser){
      CurrentUser = firebase.auth().currentUser;
      firebase.database().ref('Campus/users/'+firebase.auth().currentUser.uid).once('value').then(this.getUserData);
    }
  }
  SignUpUser(User){
    firebase.auth().createUserWithEmailAndPassword(User.email, User.Password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    this.setState({
        displayContent:false,
        userData:User,
    });
    firebase.auth().onAuthStateChanged(this.setUser);
  }
  setUser(user){
    if (user) {
      CurrentUser = user;
      var User = this.state.userData;
      const UserUID = user.uid;
      User.uid = UserUID;
      if(this.state.userData){
        firebase.database().ref('Campus/users/'+UserUID).set(User);
      }
      var linkType;  
      if(User.accountType==="Student"){
        linkType="Company";
      }
      else if(User.accountType==="Company"){
        linkType="Student";
      }
      else if(User.accountType==="Admin"){
        linkType="All";
      }
      this.setState({
        userData:User,
        displayContent:true,
        Authenticated:true,
        link:linkType
      });
    }
  }
  LogIn(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    this.setState({
      displayContent:false,
    })
    firebase.auth().onAuthStateChanged(this.getUser);
  }
  getUser(user){
    if (user) {
      CurrentUser = user;
      const UserUID = user.uid;
      firebase.database().ref('Campus/users/'+UserUID).once('value').then(this.getUserData);
    }
  }
  getUserData(snapshot){
    var linkType;
    if(snapshot.val().accountType){
      if(snapshot.val().accountType==="Student"){
        linkType="Company"
      }
      else if(snapshot.val().accountType==="Company"){
        linkType="Student"
      }
      else if(snapshot.val().accountType==="Admin"){
        linkType="All";
      }
      this.setState({
        userData:snapshot.val(),
        displayContent:true,
        Authenticated:true,
        link:linkType
      });
    }
    else{
      console.log("Error in finding Data");
    }
  }
  SignOut(){
    if(CurrentUser!==undefined){
      firebase.auth().signOut();
      CurrentUser=undefined;
      this.setState({
        userData:{},
        displayContent:true,
        Authenticated:false,
        link:""
      })
    }
  }
  getPosts(props){
    firebase.database().ref('Campus/Post').on("value",props.setPost);
  }
  PostNow(RecievedPost){
    firebase.database().ref('Campus/Post').push(RecievedPost)
  }
  DeletePost(props){
    firebase.database().ref('Campus/Post').set(props);
  }
  ApplyForJob(keyIndex){
    var Applicants = [];
    firebase.database().ref('Campus/Post/'+keyIndex+'/candidates').once('value').then(function(snapshot){
      Applicants=snapshot.val();
    });
    Applicants.push(this.state.userData.uid);
    window.alert("Your Successfully Applied for this Job");
    firebase.database().ref('Campus/Post/'+keyIndex+'/candidates').set(Applicants);
  }
  EditPost(updatedPost,keyIndex){
    firebase.database().ref('Campus/Post/'+keyIndex).set(updatedPost);
  }
  getAllUsers(props){
    firebase.database().ref('Campus/users').on("value",props.setUsers);
  }
  DeleteUsers(props){
    // firebase.auth().currentUser.delete().then(function() {
    //   firebase.database().ref('Campus/users').set(props);
    // }).catch(function(error) {
    //   console.log(error);
    // });
    firebase.database().ref('Campus/users').set(props);
  }
  ViewCandidates(props,postKey){
    firebase.database().ref('Campus/Post/'+postKey+"/candidates").once('value').then(function(snapshot){
      var candidateKeys=snapshot.val();
      for(var i=0;i<candidateKeys.length;i++){
        firebase.database().ref('Campus/users/'+candidateKeys[i]).once('value').then(props);
      }
    });
  }
  NavBar(){
    return(
      <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <span className="navbar-brand" href="/about">Campus Recruitement</span>
        </div>
    
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          {this.Menu()}
          {this.SignButton()}
        </div>
      </div>
    </nav>
    );
  }
  SignButton(){
    const SignOutButton = withRouter(({ history}) => (
      <button className="btn btn-danger navbar-btn " onClick={() => {
        this.SignOut();
        history.push('/') 
        }}>Sign Out</button>
    ));
    if(this.state.Authenticated){
    return(
      <ul className="nav navbar-nav navbar-right">
      <li><SignOutButton/></li>
    </ul>
    );
    }
    else{
      return(
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/SignUp"><button className="btn btn-default ">Sign up</button></Link></li>
          <li><Link to="/LogIn"><button className="btn btn-primary " >Login</button></Link></li>
        </ul>
      );
    }
  }
  Menu(){
    if(this.state.Authenticated){
      return(
        <ul className="nav navbar-nav">
          <li><Link to="/" >Home <span className="sr-only">(current)</span></Link></li>
          <li><Link to={"/"+this.state.userData.accountType+"/"+ this.state.userData.uid } >{this.state.userData.name}</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/post">Explore ClipBoard</Link></li>
          <li><Link to={"/"+this.state.link}>View {this.state.link}</Link></li>
        </ul>
      );
    }
  }
  render() {
    const Main = ({ match }) => {
      if(this.state.displayContent){        
        return (
          <MainPage userData={this.state.userData} NavBar={this.NavBar} />
        );
      }
      else{
        return (
          <div className="container">
            <h1>Please Wait</h1>
            <ReactLoading type="balls" color="#444"/>
          </div>
        )
      }
    }
    const userProfile = ({match})=>{
        if(this.state.userData.accountType==="Admin"){
          return(<Admin NavBar={this.NavBar} getAllUsers={this.getAllUsers} userData={this.state.userData} getPostFromServer={this.getPosts} {...match} DeleteUsers={this.DeleteUsers} DeletePost={this.DeletePost} />)
        }else{
          return(<Profile NavBar = {this.NavBar} userData={this.state.userData} {...match} />);
        }
    }
    const viewPost = ()=>{
      return(<Posts NavBar={this.NavBar} userData={this.state.userData} getPostFromServer={this.getPosts} PostThis={this.PostNow}  DeletePost={this.DeletePost} Apply={this.ApplyForJob} Edit={this.EditPost} />);
    }
    const signUpForm = ()=>{
      return(<SignUp SignUp={this.SignUpUser} />);
    }
    const logInForm = ()=>{
      return(<LogIn LogIn={this.LogIn}/>);
    }
    const AlluserView = ()=>{
      return(<AllUsers NavBar={this.NavBar} AccountFor={this.state.link} getUsers={this.getAllUsers} DeleteUsers={this.DeleteUsers}/>);
    }
    const viewCandidates = ({match})=>{
      return(<Candidates NavBar={this.NavBar} View={this.ViewCandidates} {...match}/>);
    }
    return (
        <Router>
          <Switch>
            <Route exact path="/" render={Main}></Route>
            <Route path={"/"+this.state.userData.accountType+"/:uid"} render={userProfile}></Route>
            <Route path="/post" render={viewPost}></Route>
            <Route path="/SignUp" render={signUpForm}></Route>
            <Route path = "/about"><About/></Route>
            <Route path="/LogIn" render={logInForm}></Route>
            <Route path={"/"+this.state.link} render={AlluserView}></Route>
            <Route path={"/applicants/:postKey"} render={viewCandidates}></Route>
          </Switch>
        </Router>
      );
    }
  }


export default App;

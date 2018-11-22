import React from 'react';
import {connect} from 'react-redux';
import fire from '../../../config/fire';
import {Navbar, NavItem} from 'reactstrap';

import ModalLogin from "./modalLogin";


  const navStyle = {
    padding: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: 'rgb(40, 41, 45)',
    color: '#fff'
  }

  const navItemStyle = {
    listStyle: 'none',
    padding: '0 10px',
    textTransform: 'uppercase',
    cursor: 'pointer'
  }

export default class CustomNavbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalLogin: false, modalSignin: false, email: "", password: "", user: null, errors: "",
      user: null
    };
    
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignin = this.toggleSignin.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.authListener = this.authListener.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleLogin() {
    this.setState({
      modalLogin: !this.state.modalLogin
    });
  }

  toggleSignin() {
    this.setState({
      modalSignin: !this.state.modalSignin
    });
  }

  handleInputChange(event) {
    const value =  event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged((user)=> {
    if (user) {
      this.setState({user})
    } else {
      this.setState({user: null})
    }
    });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user)=>{
      this.toggleLogin()
      this.setState({password: "", email: "", errors: "", user: {email: user.user.email, uid: user.user.uid}})
      this.props.userActions.addUser({email: user.user.email, uid: user.user.uid});
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({ errors: errorMessage})
    });
  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user)=>{
      this.toggleSignin()
      this.setState({password: "", email: "", errors: ""});
      this.props.userActions.addUser({email: user.user.email, uid: user.user.uid});
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({ errors: errorMessage})
    });
  }

  logout () {
    fire.auth().signOut()
    .then(()=> {
      this.setState({user: null})
      this.props.userActions.deleteUser()
    })
    .catch((error)=> {
      console.log(error)
    });
  }

  render() {
    let navbar= "";
    if(this.state.user) {
      navbar = <Navbar style={navStyle}  color="dark" dark expand="md">
                <NavItem style={navItemStyle}>{this.props.state.user.user.email}</NavItem>
                <NavItem style={navItemStyle} onClick={this.logout} href="/">logout</NavItem>
              </Navbar>
    }else {
      navbar = <Navbar style={navStyle} color="dark" dark expand="md">
        <NavItem style={navItemStyle} onClick={this.toggleLogin} href="/">sign in</NavItem>
        <NavItem style={navItemStyle} onClick={this.toggleSignin} href="/">sign up</NavItem>
      </Navbar>
    }

    return (
      <div>
          {navbar}
          <ModalLogin
            modalState={this.state.modalLogin}
            btnName="Sign in"
            title="Sign in"
            email={this.state.email}
            password={this.state.password}
            errors={this.state.errors}
            toggle={this.toggleLogin}
            login={(e)=>this.login(e)}
            onHandleInput={(e)=>this.handleInputChange(e)}
            />
          <ModalLogin
            modalState={this.state.modalSignin}
            btnName="Sign up"
            title="Sign up"
            email={this.state.email}
            password={this.state.password}
            errors={this.state.errors}
            login={(e)=>this.signup(e)}
            toggle={this.toggleSignin}
            onHandleInput={(e)=>this.handleInputChange(e)}
            />
      </div>
    );
  }
}



// export default()(CustomNavbar)

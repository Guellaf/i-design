import React from 'react';
import {connect} from 'react-redux';
import fire from '../../../config/fire';
import {Navbar, NavItem, NavbarBrand, NavbarToggler, Collapse, Nav, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom'

import ModalLogin from "./modalLogin";

const navStyle = {
  padding: '15px',
  display: 'flex',
  backgroundColor: 'rgb(40, 41, 45)',
  color: '#fff'
}

const navItemStyle = {
  listStyle: 'none',
  padding: '0 10px',
  textTransform: 'uppercase',
  cursor: 'pointer'
}

const linkItemStyle = {
  color: 'white',
  listStyle: 'none',
  padding: '0 10px',
  textTransform: 'uppercase',
  cursor: 'pointer'
}

class CustomNavbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalLogin: false, modalSignin: false, email: "", password: "", user: null, errors: "",
      user: null
    };

    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.logout = this.logout.bind(this);
    this.logged = this.logged.bind(this);
  }


  toggleLogin() {
    this.setState({
      modalLogin: !this.state.modalLogin
    });
  }

  toggleSignup() {
    this.setState({
      modalSignin: !this.state.modalSignin
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    console.log('navbar', fire.auth().currentUser)
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("navbar", user)
        this.props.onAdd({email: user.email, uid: user.uid});
      } else {
        this.props.onDelete();
      }
    });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.toggleLogin()
        this.setState({password: "", email: "", errors: ""})
        this.props.onAdd({email: user.user.email, uid: user.user.uid});
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({errors: errorMessage})
      });
  }

  logged(email, uid) {
    // this.props.userActions.addUser({email: email, uid: uid});
  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.toggleSignup()
        this.setState({password: "", email: "", errors: ""});
        this.props.onAdd({email: user.user.email, uid: user.user.uid});
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({errors: errorMessage})
      });
  }

  logout() {
    fire.auth().signOut()
      .then(() => {
        this.props.onDelete();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    let userEmail = this.props.state._root.entries[0][1].user.user.email

    return (
      <div>
        <Navbar style={navStyle} color="dark" dark expand="md">
          <NavbarBrand href="/">
            <img src="https://i.imgur.com/iwyixsm.png" style={{width: '2em', marginRight: '0.5em', display: 'inline'}}
                 alt=""/>
            <span>EXKUISITE</span>
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            {userEmail ?
              <Nav className="ml-auto" navbar>
                <NavItem style={linkItemStyle}><Link to="/samples"> Samples </Link></NavItem>
                <NavItem style={linkItemStyle}><Link to="/editor"> Add New </Link></NavItem>
                <NavItem style={navItemStyle}>{userEmail}</NavItem>
                <NavItem style={navItemStyle} onClick={this.logout} href="/">logout</NavItem>
              </Nav>
              :
              <Nav className="ml-auto" navbar>
                <NavItem style={linkItemStyle}><Link to="/samples"> Samples </Link></NavItem>
                <NavItem style={linkItemStyle}><Link to="/editor"> Add New </Link></NavItem>
                <NavItem style={navItemStyle} onClick={this.toggleLogin} href="/">SIGN IN</NavItem>
                <NavItem style={navItemStyle} onClick={this.toggleSignup} href="/">SIGN UP</NavItem>
              </Nav>
            }
          </Collapse>
        </Navbar>

        <ModalLogin
          modalState={this.state.modalLogin}
          btnName="Sign in"
          title="Sign in"
          email={this.state.email}
          password={this.state.password}
          errors={this.state.errors}
          toggle={this.toggleLogin}
          login={(e) => this.login(e)}
          onHandleInput={(e) => this.handleInputChange(e)}
        />
        <ModalLogin
          modalState={this.state.modalSignin}
          btnName="Sign up"
          title="Sign up"
          email={this.state.email}
          password={this.state.password}
          errors={this.state.errors}
          login={(e) => this.signup(e)}
          toggle={this.toggleSignup}
          onHandleInput={(e) => this.handleInputChange(e)}
        />
      </div>
    );
  }
}


function mapStateToProps(reduxState) {
  return {
    state: reduxState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: (data) => {
      return dispatch({type: "ADD_USER", payload: data})
    },
    onDelete: (data) => {
      return dispatch({type: "DELETE_USER"})
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);

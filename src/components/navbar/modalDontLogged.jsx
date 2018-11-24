import React from 'react';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalLogin from "./modalLogin";
import fire from '../../config/fire';

const style = {
    justifyContent: 'center'
}

class ModalDontLogged extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
             email: "", password: "",  errors: ""
        };

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }

      handleInputChange(event) {
        const value =  event.target.value;
        const name = event.target.name;

        this.setState({
          [name]: value
        });
      }

      login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user)=>{
          this.setState({password: "", email: "", errors: ""})
          this.props.onAdd({email: user.user.email, uid: user.user.uid});
        }).then(()=>{
            this.props.toggleModalLogin();
        this.props.toggleModal();
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
          this.setState({password: "", email: "", errors: ""});
          this.props.onAdd({email: user.user.email, uid: user.user.uid});

        }).then(()=>{
            this.props.toggleModalSignup();
          this.props.toggleModal();
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.setState({ errors: errorMessage})
        });
      }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
          <ModalHeader >you are do not logged</ModalHeader>
          <ModalBody>
            if you want to save your project please sign in
          </ModalBody>
          <ModalFooter style={style}>
            <Button color="primary" onClick={this.props.toggleModalLogin}>sign in</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleModalSignup}>sign up</Button>
          </ModalFooter>
        </Modal>
        <ModalLogin
            modalState={this.props.modalLogin}
            btnName="Sign in"
            title="Sign in"
            email={this.state.email}
            password={this.state.password}
            errors={this.state.errors}
            toggle={this.props.toggleModal}
            login={(e)=>this.login(e)}
            onHandleInput={(e)=>this.handleInputChange(e)}
            />
          <ModalLogin
            modalState={this.props.modalSignup}
            btnName="Sign up"
            title="Sign up"
            email={this.state.email}
            password={this.state.password}
            errors={this.state.errors}
            login={(e)=>this.signup(e)}
            toggle={this.props.toggleModal}
            onHandleInput={(e)=>this.handleInputChange(e)}
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
      }
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ModalDontLogged);

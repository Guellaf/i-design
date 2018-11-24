import React, { Component } from 'react';

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';

import catalog from '../catalog/mycatalog';

import Gallery from './item-galley';



const modalStyle = {
  maxWidth: 'calc( 80% - 10em )',
};

class CategoryItemsDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      categoryList: true,
      catlogs: catalog
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  choseCategory() {
    this.setState({
      categoryList: !this.state.categoryList
    });
  }


  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={modalStyle}>
          <ModalHeader toggle={this.toggle}>Catalog</ModalHeader>
          <ModalBody>
            {this.state.categoryList == true ? 
           
            <div className="category-view">
              <Card onClick={() => this.choseCategory()}>
                <CardTitle className="cat-title">Doors</CardTitle>
                <CardImg top width="50%" src="https://i.imgur.com/vyx9Vyx.jpg" alt="Card image cap" />
              </Card>
              <Card onClick={() => this.choseCategory()}>
                <CardTitle className="cat-title">Walls</CardTitle>
                <CardImg top width="50%" src="https://i.imgur.com/I0EXXp7.jpg" alt="Card image cap" />
              </Card>
              <Card onClick={() => this.choseCategory()}>
                <CardTitle className="cat-title">Living room</CardTitle>
                <CardImg top width="50%" src="https://i.imgur.com/vyx9Vyx.jpg" alt="Card image cap" />
              </Card>
              <Card onClick={() => this.choseCategory()}>
                <CardTitle className="cat-title">Office</CardTitle>
                <CardImg top width="50%" src="https://i.imgur.com/I0EXXp7.jpg" alt="Card image cap" />
              </Card>

            </div>
             : 
             <Gallery catalog={catalog} category={this.state.category}/>}
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CategoryItemsDisplay;
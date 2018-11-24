import React, { Component } from 'react';

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';

export default class Gallery extends Component {


  constructor(props, context) {
    super(props);

    let page = props.catalog.elements;
    //let currentCategory = context.catalog.getCategory(page);

    this.state = {
      modal: false,
      isGallery: false,
      items: page
    };

    console.log('cat', page)

    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    console.log('got catalogs', this.state.items);
    this.setState({
      isGallery: !this.state.isGallery
    });
  }

  render() {

    let items = this.props.catalog.elements;

    console.log(typeof items)
    return (<div>

      {this.state.isGallery == true ? <div onClick={() => this.toggle()}> showing gallery</div> : <div>
        <div className="category-view">
          {Object.keys(this.state.items).map((key, i) => {
            return <Card onClick={() => this.toggle()} key={i}>
              <CardTitle className="cat-title">{items[key].info.title} </CardTitle>
              <CardImg top width="50%" src={items[key].info.image} alt="Card image cap" />
            </Card>
          })}
        </div>
      </div>}
    </div>);
  }


}
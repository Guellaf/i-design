import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button, Card, CardImg, 
  CardTitle,
} from 'reactstrap';

import { FaArrowLeft, FaClose } from 'react-icons/lib/fa';

export default class GalleryDetail extends Component {

  constructor(props, context) {
    super(props);

    let item = props.element;
    this.state = {
      isGalleryDetail: false,
      item: item
    };

    console.log('item', context)

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    console.log('got catalogs', this.state.item);
    this.setState({
      isGalleryDetail: !this.state.isGalleryDetail
    });
  }


  select() {
    let element = this.props.element;

    switch (element.prototype) {
      case 'lines':
        this.context.linesActions.selectToolDrawingLine(element.name);
        break;
      case 'items':
        this.context.itemsActions.selectToolDrawingItem(element.name);
        break;
      case 'holes':
        this.context.holesActions.selectToolDrawingHole(element.name);
        break;
    }

    this.context.projectActions.pushLastSelectedCatalogElementToHistory(element);
  }

  render() {

    let item = this.state.item;
    console.log('found item', item)

    return (<div>
      <Button color="primary" className="suite-button" onClick={() => this.props.goBackItem(this.props.element)}><FaArrowLeft /></Button>

      Product detail page
        <Card onClick={e => this.select()}>
        <CardTitle className="cat-title">{this.state.item.info.title} </CardTitle>
        <CardImg top width="50%" src={this.state.item.info.image} alt="Card image cap" />
      </Card>
    </div>);
  }
}

GalleryDetail.propTypes = {
  element: PropTypes.object.isRequired,
};

GalleryDetail.contextTypes = {
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
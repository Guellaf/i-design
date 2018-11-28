import React, { Component } from 'react';

import {
  Button, Card, CardImg,
  CardTitle,
} from 'reactstrap';

import { FaArrowLeft, FaClose } from 'react-icons/lib/fa';

import GalleryDetail from './catalog-item-gallery-detail';


const backButtonStyle = {
  marginTop: '-31px',
  position: 'fixed',
  zIndex: '999'
}

export default class Gallery extends Component {


  constructor(props, context) {
    super(props);

    let elements = props.catalog;
    // let elements = props.category.elements;

    this.state = {
      isGallery: false,
      items: elements,
      selectedItem: null
    };

    this.toggle = this.toggle.bind(this);


  }

  toggle(item) {
    this.setState({
      selectedItem: item,
      isGallery: !this.state.isGallery
    });
  }

  goBack() {
    this.props.goBack('root');
  }

  render() {

    const items = this.state.items;

    return (<div>

      {this.state.isGallery == true ? <div> <GalleryDetail element={this.state.selectedItem} goBackItem={this.toggle} /></div>
        :
        <div>
          <Button color="primary" style={backButtonStyle} className="suite-button" onClick={() => this.props.goBack('root')}><FaArrowLeft /></Button>
          <h5 className="cat-modal-title">{this.props.category.label}</h5>
          <div className="category-view">
            {Object.keys(items).map((key, i) => {
              return <Card onClick={() => this.toggle(items[i])} key={i}>
                <CardTitle className="cat-title">{items[key].info.title} </CardTitle>
                <CardImg top width="50%" src={items[key].info.image} alt="Card image cap" />
              </Card>
            })}
          </div>
        </div>}
    </div>);
  }


}
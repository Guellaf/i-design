import React, { Component } from 'react';

import {
  Button, Card, CardImg,
  CardTitle,
} from 'reactstrap';

import { FaArrowLeft, FaClose } from 'react-icons/lib/fa';

import GalleryDetail from './catalog-item-gallery-detail';

export default class Gallery extends Component {


  constructor(props, context) {
    super(props);

    let elements = props.catalog;

    this.state = {
      modal: false,
      isGallery: false,
      items: elements,
      selectedItem: null
    };

    console.log('cat', elements)

    this.toggle = this.toggle.bind(this);


  }

  toggle(item) {
    console.log('got catalogs', item);
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
          <Button color="primary" className="suite-button" onClick={() => this.props.goBack('root')}><FaArrowLeft /></Button>
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
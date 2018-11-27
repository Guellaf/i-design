
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';

import {
  Button, Modal, ModalHeader, ModalBody, Card, CardImg,
  CardTitle, ModalFooter,
} from 'reactstrap';

import { FaClose } from 'react-icons/lib/fa';


import Gallery from './catalog-item-gallery';



const modalStyle = {
  maxWidth: 'calc( 100% - 10em )',
  background: '#525252',
  height: '90%'
};

const bodyStyle = {
  height: '100%',
  overflowY: 'auto'
};

const closeButtonStyle = {
  float: 'right',
  right: '20px',
  position: 'fixed',
  zIndex: '999'
};

export default class CatalogList extends Component {

  constructor(props, context) {
    super(props);

    let page = props.state.catalog.page;
    let currentCategory = context.catalog.getCategory(page);
    let categoriesToDisplay = currentCategory.categories;
    let elementsToDisplay = currentCategory.elements.filter(element => element.info.visibility ? element.info.visibility.catalog : true);

    this.state = {
      modal: false,
      categoryList: true,
      catalog: elementsToDisplay
    };

    this.toggle = this.toggle.bind(this);
    this.choseCategory = this.choseCategory.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  choseCategory(newPage) {

    this.setState({
      categoryList: !this.state.categoryList
    });
  }


  render() {

    let page = this.props.state.catalog.page;
    let currentCategory = this.context.catalog.getCategory(page);
    let categoriesToDisplay = currentCategory.categories;
    let elementsToDisplay = currentCategory.elements.filter(element => element.info.visibility ? element.info.visibility.catalog : true);

    let breadcrumbComponent = null;


    if (page !== 'root') {

      let breadcrumbsNames = [];

      this.props.state.catalog.path.forEach(pathName => {
        breadcrumbsNames.push({
          name: this.context.catalog.getCategory(pathName).label,
          action: () => projectActions.goBackToCatalogPage(pathName)
        });
      });

      breadcrumbsNames.push({ name: currentCategory.label, action: '' });

      breadcrumbComponent = (<CatalogBreadcrumb names={breadcrumbsNames} />);
    }

    let pathSize = this.props.state.catalog.path.size;

    let turnBackButton = pathSize > 0 ? (
      <CatalogTurnBackPageItem key={pathSize} page={this.context.catalog.categories[this.props.state.catalog.path.get(pathSize - 1)]} />) : null;


    let selectedHistory = this.props.state.get('selectedElementsHistory');
    let selectedHistoryElements = selectedHistory.map((el, ind) =>
      <div key={ind} title={el.name} onClick={() => this.select(el)}>{el.name}</div>
    );

    return (
      <div className="pop-layout">
        <div onClick={this.toggle}>
          {this.props.label ? this.props.label : <div>Catalog</div>}
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={modalStyle}>
          <ModalHeader>
            {/* <div onClick={this.toggle}>
              <Button color="primary" className="suite-button" style={closeButtonStyle}>X</Button>
            </div> */}
            {this.state.categoryList == true?'Categories':''}
            
            <Button className="suite-button" style={closeButtonStyle} onClick={this.toggle}> <FaClose /></Button>
          </ModalHeader>

          <ModalBody style={bodyStyle}>
            {this.state.categoryList == true ?

              <div className="category-view">
                {Object.keys(categoriesToDisplay).map((key, i) => {
                  return <Card onClick={() => this.choseCategory(categoriesToDisplay[key].name)} key={i}>
                    <CardTitle className="cat-title">{categoriesToDisplay[key].label}</CardTitle>
                    <CardImg top width="50%" src="https://i.imgur.com/vyx9Vyx.jpg" alt="Card image cap" />
                  </Card>
                })}

              </div>
              :
              <Gallery catalog={elementsToDisplay} category={this.state.category} goBack={this.choseCategory} />}
            <br />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


CatalogList.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  label: PropTypes.element
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
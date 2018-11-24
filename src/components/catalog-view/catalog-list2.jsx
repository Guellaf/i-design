
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';
import * as SharedStyle from '../../shared-style';

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';

import { FaArrowLeft, FaClose } from 'react-icons/lib/fa';

// import catalog from '../catalog/mycatalog';

import Gallery from './catalog-item-gallery';



const modalStyle = {
  maxWidth: 'calc( 80% - 10em )',
};

export default class CategoryItemsDisplay extends Component {

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

    console.log('cat check', props.state.catalog);

    this.toggle = this.toggle.bind(this);
    this.choseCategory = this.choseCategory.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  choseCategory(newPage) {
    // this.context.projectActions.changeCatalogPage(newPage, this.props.oldPage.name)

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

    console.log('category list', categoriesToDisplay)

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
        <Button color="danger showcatButton" onClick={this.toggle}>Choose item to draw</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={modalStyle}>
          <ModalHeader toggle={this.toggle}>

            Catalog

          </ModalHeader>
          <ModalBody>
            {this.state.categoryList == true ?

              <div className="category-view">
                {Object.keys(categoriesToDisplay).map((key, i) => {
                  return <Card onClick={() => this.choseCategory(categoriesToDisplay[key].name)} key={i}>
                    <CardTitle className="cat-title">{categoriesToDisplay[key].name}</CardTitle>
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


CategoryItemsDisplay.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object
};

CategoryItemsDisplay.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
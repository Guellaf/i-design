import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button, Card, CardImg,
  CardTitle, Container, Row, Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import { FaArrowLeft, FaClose } from 'react-icons/lib/fa';

const backButtonStyle = {
  marginTop: '-31px',
  position: 'fixed',
  zIndex: '999'
}

//  Slider items
const items = [
  {
    src: 'http://russellscountrystore.com/files/2014/08/IMG_0070.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'http://gesolutions.co/wp-content/uploads/2018/10/wood-framed-mission-style-sofa-furniture-for-sale-ontario-p.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'http://manteofurnitureobx.com/wp-content/uploads/2018/08/Rowe-Lounge-Aberdeen-P603-6.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  },
  {
    src: 'https://i.pinimg.com/originals/26/7d/a3/267da390f00c5621d49ceb36423bc4d7.jpg',
    altText: 'Slide 4',
    caption: 'Slide 4'
  }
];


export default class GalleryDetail extends Component {

  constructor(props, context) {
    super(props);

    let item = props.element;
    this.state = {
      isGalleryDetail: false,
      item: item,
      activeIndex: 0
    };

    this.toggle = this.toggle.bind(this);

    //  for slider
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  // slider functions
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  // slider function ends

  toggle() {
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
    
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        </CarouselItem>
      );
    });


    return (<div>
      <Button color="primary" style={backButtonStyle} className="suite-button" onClick={() => this.props.goBackItem(this.props.element)}><FaArrowLeft /></Button>

      <Container>
        <Row>
          <Col xs="6">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
            <div className="carousel-thumb">
              {Object.keys(items).map((key, i) => {
                return (<div className={this.state.activeIndex === i ? 'image-box-active' : 'image-box'} key={i}>
                  <img src={items[key].src} width={70} onClick={() => this.goToIndex(i)} />
                </div>)
              })}
            </div>
          </Col>
          <Col xs="6">
            <h2>Title:{this.state.item.info.title}</h2>
            <h4>Description</h4>
            <p>
              Dimensions: Love Seat: 58 1/2”L X 33”W X 34 1/2”H (SEAT DP: 22”, SEAT HT: 18”)Accent Chair: 39 1/2”L X 33”W X 34 1/2”H (SEAT DP: 22”, SEAT HT: 18”)
            </p>
            <Button color="primary" onClick={e => this.select()} > Add to plan</Button>
          </Col>
        </Row>

      </Container>

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
import React from 'react';
import Slider from 'react-slick';
import Zoom from 'react-img-zoom';
import { Link } from 'react-router-dom';
import { Rate, Button, Tabs } from 'antd';
import InputSpinner from 'react-bootstrap-input-spinner';
import Description from './description';
import Evaluate from './Evaluate';

function BuyProduct() {
  const { TabPane } = Tabs;

  const baseUrl =
    'https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-';
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: i => <img src={`${baseUrl}${i + 1}-247x247.jpg`} alt="" />,
  };

  return (
    <div className="container">
      <div className="buy-product row">
        <div className="col-5">
          <Slider {...settings}>
            <div className="slider-image">
              <Zoom
                className="hover-zoom"
                img="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-5.jpg"
                zoomScale={1.5}
                width={531}
                height={350}
              />
            </div>
            <div className="slider-image">
              <Zoom
                className="hover-zoom"
                img="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-4.jpg"
                zoomScale={1.5}
                width={531}
                height={350}
              />
            </div>
            <div className="slider-image">
              <Zoom
                className="hover-zoom"
                img="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-3.jpg"
                zoomScale={1.5}
                width={531}
                height={350}
              />
            </div>
            <div className="slider-image">
              <Zoom
                className="hover-zoom"
                img="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-2.jpg"
                zoomScale={1.5}
                width={531}
                height={350}
              />
            </div>
            <div className="slider-image">
              <Zoom
                className="hover-zoom"
                img="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-1.jpg"
                zoomScale={1.5}
                width={531}
                height={350}
              />
            </div>
          </Slider>
        </div>
        <div className="col-7">
          <div className="buy-product__link">
            <Link to="/" className="link-home">
              Home
            </Link>
            <span className="link-flycam"> / FlyCam</span>
          </div>
          <h3 className="buy-product__title">Flycam DJI Mini SE</h3>
          <div className="is-divider small" />
          <div className="rate">
            <Rate allowHalf defaultValue={2.5} disabled className="rating" />
          </div>
          <div className="buy-product__price">
            <span>$ 299.99</span>
          </div>
          <div className="buy-product__content">
            <p className="text">
              The DJI Mini SE is one of the compact drones with a design almost
              like the Mavic Mini. The drone is aimed at inexperienced users and
              beginners. With a weight of less than 250g, you can use the drone
              in areas where drones are not allowed.
            </p>
          </div>
          <div className="buy-product__add">
            <div className="quantity">
              <InputSpinner
                className="abc"
                type="real"
                precision={2}
                max={10}
                min={0}
                step={1}
                value={1}
                onChange={num => console.log(num)}
                size="sm"
              />
            </div>
            <Button danger size="large" className="add-cart">
              Add To Cart
            </Button>
            <Button type="primary" danger size="large">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="buy-product__info row">
        <div className="col-12">
          <Tabs defaultActiveKey="1" type="card" size="large">
            <TabPane tab="Description" key="1">
              <Description />
            </TabPane>
            <TabPane tab="Evaluate (4)" key="2">
              <Evaluate />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default BuyProduct;

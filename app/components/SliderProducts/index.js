import React from 'react';
import Slider from 'react-slick';

function SliderProducts({ data }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 1500,
  };

  const showDataSlider = data.map(el => (
    <div className="section-show col-3">
      <div className="p-item">
        <div className="image">
          <img src={el.image} alt="" />
        </div>
        <div className="show-item">
          <h4 className="title">{el.name}</h4>
          <span className="money-sale">
            $ {el.salePrice} / <span className="money">$ {el.price}</span>
          </span>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="row slider">
      <Slider {...settings}>
        {/* <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://png2.cleanpng.com/sh/4664d8ac809667c06dbb30dfec93e09a/L0KzQYm3VsA4N5tnR91yc4Pzfri0jfFkapD0g595cnAwQYS0if5kcF5xeeJ9b4CwfbLqgv9wc15mgeQ2ZHn2gL3omb11aZNxfZ8AYkG8corrUBIybZVqSpCANke7RIq6VsE2Omk5SaQBMke6QomBTwBvbz==/kisspng-macbook-pro-13-inch-laptop-macbook-air-display-table-5b19b9d3b1ede2.5678493615284126277288.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div>

        <div className="section-show col-3">
          <div className="p-item">
            <div className="image">
              <img
                src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/01/07/gps-nhom-silver.png"
                alt=""
              />
            </div>
            <div className="show-item">
              <h4 className="title">abc</h4>
              <span className="money-sale">
                $ 249.99 / <span className="money">$ 249.99</span>
              </span>
            </div>
          </div>
        </div> */}

        {showDataSlider}
      </Slider>
    </div>
  );
}

export default SliderProducts;

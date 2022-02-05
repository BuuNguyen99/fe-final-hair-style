import React from 'react';
import Logo from 'assets/images/logo.png';
function Footer() {
  return (
    <div className="footer-container">
      <div className="container footer">
        <div className="row">
          <div className="col-3">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
            <p className="footer-text">
              STORE - worldwide fasshion store since 1978.
            </p>
            <p className="footer-text">
              We sell over 1000+ branded products on our web-site
            </p>
          </div>
          <div className="col-2">
            <p className="footer-title">INFORMATION</p>
            <ul className="footer-list">
              <li className="footer-text">New Collection</li>
              <li className="footer-text">About store</li>
              <li className="footer-text">Contact Us</li>
              <li className="footer-text">Orders History</li>
              <li className="footer-text">Latest News</li>
              <li className="footer-text">About store</li>
            </ul>
          </div>
          <div className="col-2">
            <p className="footer-title">FOOTER MENU</p>
            <ul className="footer-list">
              <li className="footer-text">New Collection</li>
              <li className="footer-text">About store</li>
              <li className="footer-text">Contact Us</li>
              <li className="footer-text">Orders History</li>
              <li className="footer-text">Latest News</li>
              <li className="footer-text">About store</li>
            </ul>
          </div>
          <div className="col-2">
            <p className="footer-title">USEFUL LINKS</p>
            <ul className="footer-list">
              <li className="footer-text">New Collection</li>
              <li className="footer-text">About store</li>
              <li className="footer-text">Contact Us</li>
              <li className="footer-text">Orders History</li>
              <li className="footer-text">Latest News</li>
              <li className="footer-text">About store</li>
            </ul>
          </div>
          <div className="col-3">
            <p className="footer-title">ABOUT THE STORE</p>
            <div className="text">
              <p className="footer-text">
                STORE - worldwide fasshion store since 1978.
              </p>
              <p className="footer-text">
                We sell over 1000+ branded products on our web-site
              </p>
              <p>www.company.com</p>
            </div>
            <div className="social-links">
              <ul>
                <li>
                  <a className="facebook first" href="#">
                    <span />
                    <span />
                    <span />
                    <span />
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <span />
                    <span />
                    <span />
                    <span />
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <span />
                    <span />
                    <span />
                    <span />
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="google" href="#">
                    <span />
                    <span />
                    <span />
                    <span />
                    <i className="fa fa-google-plus" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import axios from 'axios';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function HairsStyle() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [checkImage, setCheckImage] = useState(false);
  const [urlLink, setUrlLink] = useState(null);
  const [faceShape, setFaceShape] = useState(null);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        imageUrlBase64 => {
          checkImage ? setImageUrl(imageUrlBase64) : setImageUrl(null);
        },
        setLoading(false),
      );
    }
  };

  const custom = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://127.0.0.1:5000/face_shape/predict', formData)
      .then(response => {
        const { data } = response;
        if (!data?.success) {
          setCheckImage(false);
          onSuccess('ok');
          message.error(`Can't recognize face from this photo!`);
          setUrlLink(null);
          setFaceShape(null);
          return;
        }
        setCheckImage(true);
        onSuccess('ok');
        setUrlLink(data?.faceUrl);
        setFaceShape(data?.faceShape);
        message.success(`Face recognition successful!`);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  return (
    <div className="hairs-style">
      <div className="header-title">
        <h2>
          <svg
            width="18px"
            height="17px"
            viewBox="0 0 18 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => history.goBack()}
          >
            <g
              id="prev"
              transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)"
            >
              <polygon
                className="arrow"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <polygon
                className="arrow-fixed"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z" />
            </g>
          </svg>
          Hairs Style
        </h2>
      </div>
      <div className="content mt-5">
        <h3>Suggest hairstyles for users</h3>
        <div className="content__hair mt-5 row">
          <div className="col-2" />
          <div className="upload-image col-3">
            <p className="title">Hair style identification image</p>
            <Upload
              customRequest={custom}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </div>
          <div className="col-2 arrow">
            <SwapRightOutlined style={{ fontSize: '30px', color: '#4d5151' }} />
          </div>
          <div className="result col-3">
            <p className="title">Result</p>
            <div className="result-item">
              <div className="image-result">
                {urlLink && (
                  <img src={`http://127.0.0.1:5000/${urlLink}`} alt="avatar" />
                )}
              </div>
            </div>
            {faceShape && (
              <p className="face-shape">
                <span>Face Shape:</span> {faceShape}
              </p>
            )}
          </div>
          <div className="col-2" />
        </div>
      </div>
    </div>
  );
}

export default HairsStyle;

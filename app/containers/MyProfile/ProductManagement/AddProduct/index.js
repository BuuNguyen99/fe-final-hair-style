import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Upload, Button, Space, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

const { Option } = Select;

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

function AddProduct({ setIsAddProduct, dataAddProduct, onAddProductItem }) {
  const [value, setValue] = useState('');
  const [filterProduct, setFilterProduct] = useState('');
  const [fileImage, setFileImage] = useState([]);
  const [errorCategory, setErrorCategory] = useState(false);

  const handleChangeCategory = valueCategory => {
    setFilterProduct(valueCategory);
  };

  const handleChangeEditor = valueEditor => {
    setValue(valueEditor);
    setErrorCategory(false);
  };

  const hanldeChangeUpload = ({ file }) => {
    if (file?.response?.url) {
      uplloadImage(file);
    }
  };

  const uplloadImage = files => {
    const formData = new FormData();
    formData.append('file', files.originFileObj);
    formData.append('upload_preset', 'q4emlfoq');

    axios
      .post('https://api.cloudinary.com/v1_1/rhy123/image/upload', formData)
      .then(response => {
        const { data } = response;
        setFileImage([...fileImage, data.url]);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Product Name is required!'),
    price: Yup.string().required('Price is required!'),
    discount: Yup.string().required('Discount is required!'),
    quantity: Yup.string().required('Quantity is required!'),
    shortDesc: Yup.string().required('Short description is required!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    if (filterProduct.length === 0) {
      setErrorCategory(true);
      return;
    }
    setErrorCategory(false);
    const dataAdd = {
      title: data.productName,
      discount: data.discount,
      price: data.price,
      quantity: data.quantity,
      category: filterProduct,
      imageUrls: fileImage,
      metaTitle: data.shortDesc,
      content: value,
    };
    onAddProductItem(dataAdd, handleCallBackAddProduct);
  };

  const handleCallBackAddProduct = error => {
    if (error) {
      toast.error('Add Product failed');
      return;
    }
    toast.success('Add Product successfully');
    setIsAddProduct(true);
  };

  const handleError = () => {
    if (filterProduct.length !== 0) {
      setErrorCategory(false);
      return;
    }
    setErrorCategory(true);
  };

  return (
    <div className="add-product-page">
      <h2 className="mt-3"> Add Product</h2>
      <div className="register-form mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="form-group col-6">
              <label className="mb-2 required">Product Name</label>
              <input
                name="productName"
                type="text"
                {...register('productName')}
                className={`form-control ${
                  errors.productName ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.productName?.message}
              </div>
            </div>
            <div className="form-group col-3">
              <label className="mb-2 required">Price</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  step="any"
                  name="price"
                  type="number"
                  {...register('price')}
                  className={`form-control price-input ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">{errors.price?.message}</div>
              </div>
            </div>

            <div className="form-group col-3">
              <label className="mb-2 required">Discount</label>
              <input
                step="any"
                name="discount"
                type="number"
                {...register('discount')}
                className={`form-control price-input ${
                  errors.discount ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.discount?.message}</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="form-group col-2">
              <label className="mb-2 required">Quantity</label>
              <input
                name="quantity"
                type="number"
                {...register('quantity')}
                className={`form-control ${
                  errors.quantity ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.quantity?.message}</div>
            </div>
            <div className="form-group col-3">
              <label className="mb-2 required">Category</label>
              <Select
                style={{ width: 270 }}
                onChange={handleChangeCategory}
                placeholder="Select category"
                className={` ${errorCategory ? 'error' : ''}`}
              >
                <Option value="laptop">Laptop & Table</Option>
                <Option value="camera">Camera & Flycam</Option>
                <Option value="smartwatch">Smartwatch</Option>
                <Option value="smartphone">Smartphone</Option>
              </Select>
              {errorCategory && (
                <div className="category-error">Category is required!</div>
              )}
            </div>
            <div className="form-group col-7">
              <label className="mb-2 required">Short Description</label>
              <input
                name="shortDesc"
                type="text"
                {...register('shortDesc')}
                className={`form-control ${
                  errors.shortDesc ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.shortDesc?.message}
              </div>
            </div>
          </div>

          <div className="row my-5">
            <label className="mb-2">Product Images</label>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Upload
                onChange={hanldeChangeUpload}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={5}
                multiple
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 5)</Button>
              </Upload>
            </Space>
          </div>
          <div className="row mb-3">
            <div className="form-group col-12">
              <label className="mb-2">Description</label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChangeEditor}
                modules={modules}
                formats={formats}
                placeholder="Write something..."
              />
            </div>
          </div>
          <div className="form-group my-5">
            <button
              type="submit"
              className={`btn btn-primary ${dataAddProduct?.isFetching &&
                'disabled'}`}
              onClick={handleError}
            >
              {dataAddProduct?.isFetching && (
                <Spinner color="light" size="sm">
                  Loading...
                </Spinner>
              )}{' '}
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddProduct(true)}
              className="btn btn-light float-right mx-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

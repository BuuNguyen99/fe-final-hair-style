import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Upload, Select, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CookiesStorage } from 'shared/configs/cookie';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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
    [('link', 'image', 'video')],
    ['clean'],
    [
      { align: '' },
      { align: 'center' },
      { align: 'right' },
      { align: 'justify' },
    ],
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
  'align',
];

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function AddHair({
  isAdd,
  isEdit,
  setIsAdd,
  setIsEdit,
  onAddHair,
  onGetListHair,
  onGetDetailHair,
  onEditHair,
  dataDetailHair,
}) {
  const slug = CookiesStorage.getCookieData('slugHair') || null;

  const [value, setValueEditor] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hairCut, setHairCut] = useState({
    data: '',
    isError: false,
  });
  const [hairStyles, setHairStyles] = useState({
    data: '',
    isError: false,
  });
  const [gender, setGender] = useState({
    data: '',
    isError: false,
  });
  const [hairLength, setHairLength] = useState({
    data: '',
    isError: false,
  });
  const [faceShape, setFaceShape] = useState({
    data: [],
    isError: false,
  });
  const [ageRange, setAgeRange] = useState({
    data: [],
    isError: false,
  });

  const [imageUrll, setImageUrll] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const handleChangeEditor = valueEditor => {
    setValueEditor(valueEditor);
  };

  const validationSchema = Yup.object().shape({
    hairName: Yup.string().required('Hair Name is required!'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (slug && isEdit) {
      onGetDetailHair(slug);
    }
  }, []);

  useEffect(() => {
    if (isEdit && dataDetailHair?.data?.length !== 0) {
      setValue('hairName', dataDetailHair?.data?.name || '');
      setValueEditor(dataDetailHair?.data?.description || '');
      setImage(dataDetailHair?.data?.imageUrl || '');
      setImageUrll(dataDetailHair?.data?.imageUrl || '');
      setHairCut({
        data: dataDetailHair?.data?.hairCut || '',
        isError: false,
      });
      setHairStyles({
        data: dataDetailHair?.data?.style || '',
        isError: false,
      });
      setGender({
        data: dataDetailHair?.data?.gender || '',
        isError: false,
      });
      setHairLength({
        data: dataDetailHair?.data?.hairLength || '',
        isError: false,
      });

      const dataAge = [];
      const dataFace = [];
      dataDetailHair?.data?.ageRanges?.map(el => dataAge.push(el.id));
      dataDetailHair?.data?.faceShapes?.map(el => dataFace.push(el.id));
      setFaceShape({
        data: [...dataFace],
        isError: false,
      });
      setAgeRange({
        data: [...dataAge],
        isError: false,
      });

      setIsLoading(true);
    }
  }, [dataDetailHair]);

  const onSubmit = data => {
    if (
      hairCut.data.length !== 0 &&
      hairStyles.data.length !== 0 &&
      gender.data.length !== 0 &&
      hairLength.data.length !== 0 &&
      faceShape.data.length !== 0 &&
      ageRange.data.length !== 0
    ) {
      const dataHair = {
        name: data.hairName,
        description: value,
        hairCut: hairCut.data,
        style: hairStyles.data,
        hairLength: hairLength.data,
        faceShapeIds: faceShape.data,
        ageRangeIds: ageRange.data,
        imageUrl: image,
        gender: gender.data,
      };
      if (dataDetailHair) {
        onEditHair(dataDetailHair?.data?.id, dataHair, handleCallBackEditHair);
        return;
      }
      onAddHair(dataHair, handleCallBackAddHair);
    }
  };

  const handleCallBackEditHair = error => {
    if (error) {
      toast.error('Edit Hair failed');
      return;
    }
    const data = {
      searchFilters: [],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [],
    };

    const params = {
      page: 0,
      size: 9999,
    };

    setIsAdd(false);
    setIsEdit(false);
    onGetListHair(data, params);
    toast.success('Edit HAri successfully');
  };

  const handleCallBackAddHair = error => {
    if (error) {
      toast.error('Add hair failed');
      return;
    }
    const data = {
      searchFilters: [],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [],
    };

    const params = {
      page: 0,
      size: 9999,
    };
    onGetListHair(data, params);
    setIsAdd(false);
    toast.success('Add hair successfully');
  };

  const handleChangeHairCut = data => {
    setHairCut({
      data,
      isError: false,
    });
  };

  const handleChangeGender = data => {
    setGender({
      data,
      isError: false,
    });
  };

  const handleChangeHairStyles = data => {
    setHairStyles({
      data,
      isError: false,
    });
  };

  const handleChangeHairLength = data => {
    setHairLength({
      data,
      isError: false,
    });
  };

  const handleChangeFaceShape = data => {
    setFaceShape({
      data,
      isError: false,
    });
  };

  const handleChangeAgeRange = data => {
    setAgeRange({
      data,
      isError: false,
    });
  };

  const handleError = () => {
    if (hairCut.data.length !== 0) {
      setHairCut({
        ...hairCut,
        isError: false,
      });
    } else {
      setHairCut({
        ...hairCut,
        isError: true,
      });
    }
    if (hairStyles.data.length !== 0) {
      setHairStyles({
        ...hairStyles,
        isError: false,
      });
    } else {
      setHairStyles({
        ...hairStyles,
        isError: true,
      });
    }
    if (gender.data.length !== 0) {
      setGender({
        ...gender,
        isError: false,
      });
    } else {
      setGender({
        ...gender,
        isError: true,
      });
    }
    if (hairLength.data.length !== 0) {
      setHairLength({
        ...hairLength,
        isError: false,
      });
    } else {
      setHairLength({
        ...hairLength,
        isError: true,
      });
    }
    if (faceShape.data.length !== 0) {
      setFaceShape({
        ...faceShape,
        isError: false,
      });
    } else {
      setFaceShape({
        ...faceShape,
        isError: true,
      });
    }
    if (ageRange.data.length !== 0) {
      setAgeRange({
        ...ageRange,
        isError: false,
      });
    } else {
      setAgeRange({
        ...ageRange,
        isError: true,
      });
    }
  };

  const custom = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'q4emlfoq');

    axios
      .post('https://api.cloudinary.com/v1_1/rhy123/image/upload', formData)
      .then(response => {
        const { data } = response;
        setImage(data.url);
        onSuccess('done');
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrll(imageUrl);
        setLoadingImage(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="add-product-page">
      <h2 className="mt-3"> {isEdit ? 'Edit Hair Style' : 'Add Hair Style'}</h2>
      {isAdd || isLoading ? (
        <div className="register-form mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
              <div className="form-group col-6">
                <label className="mb-2 required">Hair Name</label>
                <input
                  name="hairName"
                  type="text"
                  {...register('hairName')}
                  className={`form-control ${
                    errors.hairName ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.hairName?.message}
                </div>
              </div>
              <div className="form-group col-6">
                <label className="mb-2 required">Hair Cut</label>
                <Select
                  defaultValue={hairCut.data || null}
                  style={{ width: '100%' }}
                  onChange={handleChangeHairCut}
                  placeholder="Select Hair Cut"
                  className={` ${hairCut.isError ? 'error' : ''}`}
                >
                  <Option value="Bob">Bob</Option>
                  <Option value="Pixie">Pixie</Option>
                  <Option value="Shag">Shag</Option>
                  <Option value="Bangs">Bangs</Option>
                  <Option value="Layered">Layered</Option>
                  <Option value="Mohawk">Mohawk</Option>
                </Select>
                {hairCut.isError && (
                  <div className="category-error">Hair Cut is required!</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="form-group col-3">
                <label className="mb-2 required">Hair Styles</label>
                <Select
                  defaultValue={hairStyles.data || null}
                  style={{ width: '100%' }}
                  onChange={handleChangeHairStyles}
                  placeholder="Select Hair Styles"
                  className={` ${hairStyles.isError ? 'error' : ''}`}
                >
                  <Option value="Updos">Updos</Option>
                  <Option value="Messy">Messy</Option>
                  <Option value="Vintage">Vintage</Option>
                  <Option value="Braided">Braided</Option>
                  <Option value="Ponytails">Ponytails</Option>
                </Select>
                {hairStyles.isError && (
                  <div className="category-error">Hair Styles is required!</div>
                )}
              </div>
              <div className="form-group col-3">
                <label className="mb-2 required">Gender</label>
                <Select
                  defaultValue={gender.data || null}
                  style={{ width: '100%' }}
                  onChange={handleChangeGender}
                  placeholder="Select Gender"
                  className={` ${gender.isError ? 'error' : ''}`}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
                {gender.isError && (
                  <div className="category-error">Gender is required!</div>
                )}
              </div>
              <div className="form-group col-6">
                <label className="mb-2 required">Hair Length</label>
                <Select
                  defaultValue={hairLength.data || null}
                  style={{ width: '100%' }}
                  onChange={handleChangeHairLength}
                  placeholder="Select Hair Length"
                  className={` ${hairLength?.isError ? 'error' : ''}`}
                >
                  <Option value="Long">Long</Option>
                  <Option value="Short">Short</Option>
                  <Option value="Medium">Medium</Option>
                </Select>
                {hairLength?.isError && (
                  <div className="category-error">Hair Length is required!</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="form-group col-6">
                <label className="mb-2 required">Face Shape</label>
                <Select
                  defaultValue={faceShape.data || null}
                  mode="multiple"
                  style={{ width: '100%' }}
                  onChange={handleChangeFaceShape}
                  placeholder="Select Face Shape"
                  className={` ${faceShape.isError ? 'error' : ''}`}
                >
                  <Option value="1">Long</Option>
                  <Option value="2">Round</Option>
                  <Option value="3">Square</Option>
                </Select>
                {faceShape.isError && (
                  <div className="category-error">Face Shape is required!</div>
                )}
              </div>
              <div className="form-group col-6">
                <label className="mb-2 required">Age Range</label>
                <Select
                  defaultValue={ageRange.data || null}
                  mode="multiple"
                  style={{ width: '100%' }}
                  onChange={handleChangeAgeRange}
                  placeholder="Select category"
                  className={` ${ageRange.isError ? 'error' : ''}`}
                >
                  <Option value="1">Kids</Option>
                  <Option value="2">Teens</Option>
                  <Option value="3">Older</Option>
                </Select>
                {ageRange.isError && (
                  <div className="category-error">Age Range is required!</div>
                )}
              </div>
            </div>
            <div className="row my-5">
              <label className="mb-2">Image</label>

              <Upload
                customRequest={custom}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrll ? (
                  <img src={imageUrll} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  // eslint-disable-next-line no-undef
                  uploadButton
                )}
              </Upload>
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
                className="btn btn-primary"
                onClick={handleError}
              >
                {!isEdit ? 'Add' : 'Edit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdd(false);
                  setIsEdit(false);
                  CookiesStorage.setCookieData('slugHair', null);
                }}
                className="btn btn-light float-right mx-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default AddHair;

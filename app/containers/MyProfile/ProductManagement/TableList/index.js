import React from 'react';
import 'antd/dist/antd.css';
import { Popconfirm, Table, Typography } from 'antd';
import { toast } from 'react-toastify';
import { CookiesStorage } from 'shared/configs/cookie';

function EditableTable({
  dataProduct,
  onDeleteProductItem,
  setIsAdd,
  setIsEdit,
}) {
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'title',
      width: '15%',
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      width: '10%',
    },
    {
      title: 'Rating',
      dataIndex: 'averageRating',
      width: '5%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '5%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '10%',
    },
    {
      title: 'Short Description',
      dataIndex: 'metaTitle',
      width: '23%',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'x',
      width: '8%',
      render: (_, record) => (
        <>
          <Typography.Link onClick={() => handleEditProduct(record?.slug)}>
            Edit
          </Typography.Link>
          <Popconfirm
            className="mx-3"
            title="Sure to Delete?"
            onConfirm={() => handleDelete(record?.id)}
          >
            <Typography.Link>Delete</Typography.Link>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleEditProduct = slug => {
    CookiesStorage.setCookieData('slug', slug);
    setIsAdd(false);
    setIsEdit(true);
  };

  const handleDelete = id => {
    const idArray = [id];
    onDeleteProductItem(idArray, handleCallBackDelete);
  };

  const handleCallBackDelete = error => {
    if (error) {
      toast.error('Delete product item failed');
      return;
    }
    toast.success('Delete product item  Successfully');
  };

  return (
    <Table
      columns={columns}
      dataSource={dataProduct}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 450 }}
    />
  );
}

export default EditableTable;

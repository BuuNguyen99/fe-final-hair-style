import React from 'react';
import 'antd/dist/antd.css';
import { Popconfirm, Table, Typography } from 'antd';
import { toast } from 'react-toastify';

function EditableTable({
  setPage,
  setPageSize,
  pageSizeLimit,
  dataProduct,
  onDeleteProductItem,
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
          <Typography.Link>Edit</Typography.Link>
          <Popconfirm
            className="mx-3"
            title="Sure to Delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Typography.Link>Delete</Typography.Link>
          </Popconfirm>
        </>
      ),
    },
  ];

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

  const handleChangeTable = ({ current, pageSize }) => {
    setPage(current);
    setPageSize(pageSize);
  };

  return (
    <Table
      onChange={handleChangeTable}
      columns={columns}
      dataSource={dataProduct}
      pagination={{ pageSize: pageSizeLimit }}
      scroll={{ y: 450 }}
    />
  );
}

export default EditableTable;

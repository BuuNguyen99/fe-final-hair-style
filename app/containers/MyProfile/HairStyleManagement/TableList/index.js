import React from 'react';
import 'antd/dist/antd.css';
import { Popconfirm, Table, Typography } from 'antd';
import { toast } from 'react-toastify';
import { CookiesStorage } from 'shared/configs/cookie';

function EditableTable({ dataHair, onDeleteHair, setIsAdd, setIsEdit }) {
  const columns = [
    {
      title: 'Hair Name',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: 'Hair Cut',
      dataIndex: 'hairCut',
      width: '10%',
    },
    {
      title: 'Age Ranges',
      width: '10%',
      render: (_, record) => (
        <>
          {record?.ageRanges?.map(el => (
            <p className="my-0">{el.rangeDescription}</p>
          ))}
        </>
      ),
    },
    {
      title: 'Hair Length',
      dataIndex: 'hairLength',
      width: '10%',
    },
    {
      title: 'Hair Style',
      dataIndex: 'style',
      width: '10%',
    },
    {
      title: 'Face Shape',
      render: (_, record) => (
        <>{record?.faceShapes?.map(el => <p className="my-0">{el.name}</p>)}</>
      ),
      width: '10%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'x',
      width: '8%',
      render: (_, record) => (
        <>
          <Typography.Link onClick={() => handleEditHair(record?.slug)}>
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

  const handleEditHair = slug => {
    CookiesStorage.setCookieData('slugHair', slug);
    setIsAdd(false);
    setIsEdit(true);
  };

  const handleDelete = id => {
    const idArray = [id];
    onDeleteHair(idArray, handleCallBackDelete);
  };

  const handleCallBackDelete = error => {
    if (error) {
      toast.error('Delete Hair item failed');
      return;
    }
    toast.success('Delete Hair item Successfully');
  };

  return (
    <Table
      columns={columns}
      dataSource={dataHair}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 550 }}
    />
  );
}

export default EditableTable;

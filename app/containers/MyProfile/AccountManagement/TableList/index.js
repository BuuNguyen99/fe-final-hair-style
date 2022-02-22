import React from 'react';
import 'antd/dist/antd.css';
import { Popconfirm, Table, Typography } from 'antd';
import { toast } from 'react-toastify';
import { CookiesStorage } from 'shared/configs/cookie';

function EditableTable({
  setIsAdd,
  setIsEdit,
  dataAccount,
  onEnableAccount,
  onDisableAccount,
  onDeleteAccount,
}) {
  const columns = [
    {
      title: 'Full Name',
      render: (_, record) => (
        <p> {`${record?.firstname} ${record?.lastname}`}</p>
      ),
      width: '10%',
    },
    {
      title: 'Email',
      render: (_, record) => <p> {`${record?.account?.email} `}</p>,
      width: '15%',
    },
    {
      title: 'Username',
      dataIndex: 'averageRating',
      render: (_, record) => <p> {`${record?.account?.username} `}</p>,
      width: '12%',
    },
    {
      title: 'Gender',
      render: (_, record) => (
        <p>
          {`${
            // eslint-disable-next-line no-nested-ternary
            record?.gender === true
              ? 'male'
              : record?.gender === false
              ? 'female'
              : '-'
          }`}
        </p>
      ),
      width: '10%',
    },
    {
      title: 'phone',
      dataIndex: 'mobile',
      width: '10%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '20%',
    },
    {
      title: 'Status',
      render: (_, record) => (
        <>
          <Popconfirm
            className="mx-3"
            title="Sure to Toggle Account?"
            onConfirm={() =>
              onChangeStatusAccount(
                record?.account?.username,
                record?.id,
                record?.account?.enabled,
              )
            }
          >
            <Typography.Link>
              {record?.account?.enabled ? 'Enable' : 'Disable'}
            </Typography.Link>
          </Popconfirm>
        </>
      ),
      width: '8%',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'x',
      width: '10%',
      render: (_, record) => (
        <>
          <Typography.Link
            onClick={() => handleEditAccount(record?.account?.username)}
          >
            Edit
          </Typography.Link>
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

  const handleEditAccount = username => {
    CookiesStorage.setCookieData('username', username);
    setIsAdd(false);
    setIsEdit(true);
  };
  const onChangeStatusAccount = (username, id, enable) => {
    if (enable) {
      onDisableAccount(username, id, handleStatusAccountCallBack);
      return;
    }
    onEnableAccount(username, id, handleStatusAccountCallBack);
  };

  const handleStatusAccountCallBack = error => {
    if (error) {
      toast.error('Toggle Status Failed');
      return;
    }
    toast.success('Toggle Status Successfully');
  };

  const handleDelete = id => {
    const idArray = [id];
    onDeleteAccount(idArray, handleCallBackDelete);
  };

  const handleCallBackDelete = error => {
    if (error) {
      toast.error('Delete Account item failed');
      return;
    }
    toast.success('Delete Account item Successfully');
  };

  return (
    <Table
      columns={columns}
      dataSource={dataAccount}
      pagination={{ pageSize: 10 }}
    />
  );
}

export default EditableTable;

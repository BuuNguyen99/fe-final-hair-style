import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    quantity: 12,
    price: '$299',
    rating: 3,
    description:
      'The DJI Mini SE is one of the compact drones with a design almost like the Mavic Mini. The drone is aimed at inexperienced users and beginners. With a weight of less than 250g, you can use the drone in areas where drones are not allowed.',
    address: `London Park no. ${i}`,
  });
}

const TableListProduct = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function EditableTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: `Product's name`,
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
      editable: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      width: '5%',
      editable: true,
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      width: '5%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '10%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Typography.Link>
              <Popconfirm title="Sure to delete?" onConfirm={cancel}>
                <a className="mx-2">Delete</a>
              </Popconfirm>
            </Typography.Link>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: TableListProduct,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}

export default EditableTable;

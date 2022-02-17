import { Select, Button } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import EditableTable from './TableList';
import AddProduct from './AddProduct';
const { Option } = Select;

function ProductManagement({ dataAddProduct, onAddProductItem }) {
  const [filterProduct, setFilterProduct] = useState('laptop');
  const [isAddProduct, setIsAddProduct] = useState(true);

  const handleChange = value => {
    setFilterProduct(value);
  };

  return (
    <div className="product-management">
      {isAddProduct ? (
        <>
          <div className="product-management__filter mb-5">
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              className="add-product"
              onClick={() => setIsAddProduct(false)}
            >
              Add Product
            </Button>
            <Select
              defaultValue={filterProduct}
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="laptop">Laptop & Table</Option>
              <Option value="camera">Camera & Flycam</Option>
              <Option value="smartwatch">Smartwatch</Option>
              <Option value="smartphone">Smartphone</Option>
            </Select>
          </div>
          <div className="product-management__table">
            <EditableTable />
          </div>
        </>
      ) : (
        <AddProduct
          setIsAddProduct={setIsAddProduct}
          dataAddProduct={dataAddProduct}
          onAddProductItem={onAddProductItem}
        />
      )}
    </div>
  );
}

export default ProductManagement;

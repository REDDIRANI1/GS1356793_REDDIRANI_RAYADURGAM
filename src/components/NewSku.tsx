import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewSKU.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addSku } from "../redux/slice/skuSlice";

const NewSKU: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get skus for calculating next id
  const skus = useSelector((state: RootState) => state.skus);

  const [sku, setSku] = useState({ name: "", price: "", cost: "" });

  const handleAddSKU = () => {
    if (sku.name && sku.price && sku.cost) {
      const nextId = skus.length > 0 ? Math.max(...skus.map((s) => s.id)) + 1 : 1;

      dispatch(addSku({ id: nextId, ...sku }));

      navigate("/sku-table");
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Add New SKU</h2>

        <input
          type="text"
          placeholder="SKU Name"
          value={sku.name}
          onChange={(e) => setSku({ ...sku, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={sku.price}
          onChange={(e) => setSku({ ...sku, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cost"
          value={sku.cost}
          onChange={(e) => setSku({ ...sku, cost: e.target.value })}
        />

        <div className="button-group">
          <button className="add-btn" onClick={handleAddSKU}>
            Add SKU
          </button>
          <button className="cancel-btn" onClick={() => navigate("/sku-table")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSKU;

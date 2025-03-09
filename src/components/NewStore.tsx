import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/NewStore.css";
import { addStore } from "../redux/slice/storeSlice";
import { AppDispatch, RootState } from "../redux/store";

const NewStore: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const stores = useSelector((state: RootState) => state.stores);

  const [store, setStore] = useState({
    name: "",
    city: "",
    state: ""
  });

  const handleAddStore = () => {
    const { name, city, state } = store;

    if (name.trim() && city.trim() && state.trim()) {
      const newStore = {
        id: stores.length > 0 ? stores[stores.length - 1].id + 1 : 1,
        name,
        city,
        state
      };

      dispatch(addStore(newStore));
      navigate("/");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="storePage-wrapper">
      <div className="store-form-page">
        <h2>Add New Store</h2>

        <input
          type="text"
          placeholder="Store Name"
          value={store.name}
          onChange={(e) => setStore({ ...store, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="City"
          value={store.city}
          onChange={(e) => setStore({ ...store, city: e.target.value })}
        />

        <input
          type="text"
          placeholder="State"
          value={store.state}
          onChange={(e) => setStore({ ...store, state: e.target.value })}
        />

        <div className="form-buttons">
          <button
            className="add-btn"
            onClick={handleAddStore}
          >
            Add Store
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewStore;

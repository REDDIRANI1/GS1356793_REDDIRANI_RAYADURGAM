import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/StoreTable.css";
import { FaTrash, FaPlus, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Header from "../components/Header";

import { RootState } from "../redux/store"; // adjust path if needed
import {  removeStore, reorderStores, updateStore } from "../redux/slice/storeSlice"; // adjust path if needed

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

const StoreTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux stores list
  const stores = useSelector((state: RootState) => state.stores.stores);

  // Local state for editing
  const [editStoreId, setEditStoreId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Store | null>(null);

  // DELETE store
  const handleDelete = (id: number) => {
    dispatch(removeStore(id));
  };

  // DRAG END handler
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedStores = Array.from(stores);
    const [movedStore] = reorderedStores.splice(result.source.index, 1);
    reorderedStores.splice(result.destination.index, 0, movedStore);

    dispatch(reorderStores(reorderedStores));
  };

  // START editing
  const handleEdit = (store: Store) => {
    setEditStoreId(store.id);
    setEditFormData({ ...store });
  };

  // EDIT change handler
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  // SAVE edit
  const handleSaveEdit = () => {
    if (editFormData) {
      dispatch(updateStore(editFormData));
      setEditStoreId(null);
      setEditFormData(null);
    }
  };

  // CANCEL edit
  const handleCancelEdit = () => {
    setEditStoreId(null);
    setEditFormData(null);
  };

  return (
    <div className="store-page">
      <Header />
      <div className="store-table-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="stores">
            {(provided) => (
              <table
                className="store-table"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead>
                  <tr>
                    <th>Actions</th>
                    <th>S.No</th>
                    <th>Store</th>
                    <th>City</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, index) => (
                    <Draggable
                      key={store.id}
                      draggableId={store.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <tr ref={provided.innerRef} {...provided.draggableProps}>
                          <td className="action-buttons">
                            {editStoreId === store.id ? (
                              <>
                                <button className="save-btn" onClick={handleSaveEdit}>
                                  <FaSave />
                                </button>
                                <button className="cancel-btn" onClick={handleCancelEdit}>
                                  <FaTimes />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDelete(store.id)}
                                >
                                  <FaTrash />
                                </button>
                                <button
                                  className="edit-btn"
                                  onClick={() => handleEdit(store)}
                                >
                                  <FaEdit />
                                </button>
                              </>
                            )}
                          </td>

                          <td className="drag-column">
                            <span {...provided.dragHandleProps} className="drag-handle">
                              ☰
                            </span>
                            <span className="serial-no">{index + 1}</span>
                          </td>

                          {editStoreId === store.id ? (
                            <>
                              <td>
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData?.name || ""}
                                  onChange={handleEditChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="city"
                                  value={editFormData?.city || ""}
                                  onChange={handleEditChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="state"
                                  value={editFormData?.state || ""}
                                  onChange={handleEditChange}
                                />
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{store.name}</td>
                              <td>{store.city}</td>
                              <td>{store.state}</td>
                            </>
                          )}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="new-store-container">
        <button className="new-store-btn" onClick={() => navigate("/new-store")}>
          <FaPlus /> NEW STORE
        </button>
      </div>
    </div>
  );
};

export default StoreTable;

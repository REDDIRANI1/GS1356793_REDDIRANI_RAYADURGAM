import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../css/StoreTable.css";

import { useDispatch, useSelector } from "react-redux";
import { deleteSku, editSku, reorderSkus } from "../redux/slice/skuSlice";
import { AppDispatch, RootState } from "../redux/store";

const SkuTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const skus = useSelector((state: RootState) => state.skus);

  const [editSkuId, setEditSkuId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    id: 0,
    name: "",
    price: "",
    cost: ""
  });

  const handleDelete = (id: number) => {
    dispatch(deleteSku(id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSkus = Array.from(skus);
    const [movedSku] = reorderedSkus.splice(result.source.index, 1);
    reorderedSkus.splice(result.destination.index, 0, movedSku);

    dispatch(reorderSkus(reorderedSkus));
  };

  const handleEdit = (sku: typeof skus[0]) => {
    setEditSkuId(sku.id);
    setEditFormData({ ...sku });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    dispatch(editSku(editFormData));
    setEditSkuId(null);
    setEditFormData({
      id: 0,
      name: "",
      price: "",
      cost: ""
    });
  };

  const handleCancelEdit = () => {
    setEditSkuId(null);
  };

  return (
    <div className="store-page">
      <Header />

      <div className="store-table-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="skus">
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
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {skus.map((sku, index) => (
                    <Draggable
                      key={sku.id}
                      draggableId={sku.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <td className="action-buttons">
                            {editSkuId === sku.id ? (
                              <>
                                <button
                                  className="save-btn"
                                  onClick={handleSaveEdit}
                                >
                                  <FaSave />
                                </button>
                                <button
                                  className="cancel-btn"
                                  onClick={handleCancelEdit}
                                >
                                  <FaTimes />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDelete(sku.id)}
                                >
                                  <FaTrash />
                                </button>
                                <button
                                  className="edit-btn"
                                  onClick={() => handleEdit(sku)}
                                >
                                  <FaEdit />
                                </button>
                              </>
                            )}
                          </td>

                          <td className="drag-column">
                            <span
                              {...provided.dragHandleProps}
                              className="drag-handle"
                            >
                              ☰
                            </span>
                            <span className="serial-no">{index + 1}</span>
                          </td>

                          {editSkuId === sku.id ? (
                            <>
                              <td>
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData.name}
                                  onChange={handleEditChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="price"
                                  value={editFormData.price}
                                  onChange={handleEditChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="cost"
                                  value={editFormData.cost}
                                  onChange={handleEditChange}
                                />
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{sku.name}</td>
                              <td>{sku.price}</td>
                              <td>{sku.cost}</td>
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
        <button
          className="new-store-btn"
          onClick={() => navigate("/new-sku")}
        >
          <FaPlus /> NEW SKU
        </button>
      </div>
    </div>
  );
};

export default SkuTable;

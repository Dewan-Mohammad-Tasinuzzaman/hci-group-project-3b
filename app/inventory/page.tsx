'use client';

import React, { useState } from 'react';
import "../../styles/main.scss";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
}

const KitchenInventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: "Apples", quantity: 10, category: "Fruits" },
    { id: 2, name: "Carrots", quantity: 5, category: "Vegetables" },
    { id: 3, name: "Chicken", quantity: 2, category: "Meat" },
  ]);

  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<InventoryItem>({
    id: 0,
    name: '',
    quantity: 0,
    category: '',
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleEditClick = (item: InventoryItem) => {
    setEditItemId(item.id);
    setEditQuantity(item.quantity);
  };

  const handleEditSave = (id: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: editQuantity } : item
      )
    );
    setEditItemId(null);
  };

  const handleRemoveClick = (id: number) => {
    const confirmRemove = confirm(
      "Are you sure you want to remove this item?"
    );
    if (confirmRemove) {
      setInventory((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddSave = () => {
    if (!newItem.name.trim() || !newItem.category.trim() || newItem.quantity <= 0) {
      alert("Please fill out all fields with valid values.");
      return;
    }

    setInventory((prev) => [
      ...prev,
      { ...newItem, id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1 },
    ]);
    setNewItem({ id: 0, name: '', quantity: 0, category: '' });
    setShowAddForm(false);
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="inventory page-margins">
      <h1 className="inventory__header">Inventory</h1>

      <div className="inventory__add-items">
        <h2 className="inventory__add-items_title">Add Items</h2>
        <p className="inventory__add-items_description">
          Update your current available inventory into the app.
        </p>
        <button className="inventory__add-items_button" onClick={handleAddClick}>
          + Add
        </button>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="inventory__add-form-background">
          <div className="inventory__add-form">
            <h3 className="inventory__add-form_header">Add New Item</h3>
            <div className="inventory__add-form_field">
              <label className="inventory__add-form_field-label">Name:</label>
              <input
                className="inventory__add-form_field-input"
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="inventory__add-form_field">
              <label className="inventory__add-form_field-label">Quantity:</label>
              <input
                className="inventory__add-form_field-input"
                type="number"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    quantity: Math.max(0, Number(e.target.value)),
                  }))
                }
              />
            </div>
            <div className="inventory__add-form_field">
              <label className="inventory__add-form_field-label">Category:</label>
              <input
                className="inventory__add-form_field-input"
                type="text"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, category: e.target.value }))
                }
              />
            </div>
            <div className="inventory__add-form_buttons">
              <button onClick={handleAddSave} className="inventory__add-form_buttons-button">+ Add</button>
              <button onClick={() => setShowAddForm(false)} className="inventory__add-form_buttons-button inventory__add-form_buttons-button--cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="inventory__search-bar">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="inventory__search-bar_input"
        />
      </div>

      <div className="inventory__table-container">
        <table className="inventory__table">
          <thead className="inventory__table_header">
            <tr className="inventory__table_header-row">
              <th className="inventory__table_header-row--col">Name</th>
              <th className="inventory__table_header-row--col">Quantity</th>
              <th className="inventory__table_header-row--col">Category</th>
              <th className="inventory__table_header-row--col"></th>
              <th className="inventory__table_header-row--col"></th>
            </tr>
          </thead>
          <tbody className="inventory__table_body">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="inventory__table_body-row">
                <td className="inventory__table_body-row--data">{item.name}</td>
                <td className="inventory__table_body-row--data">
                  {editItemId === item.id ? (
                    <input
                      type="number"
                      value={editQuantity}
                      onChange={(e) =>
                        setEditQuantity(Number(e.target.value))
                      }
                      className="inventory__table_body-row--data---input"
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="inventory__table_body-row--data">{item.category}</td>
                <td className="inventory__table_body-row--data">
                  {editItemId === item.id ? (
                    <button
                      onClick={() => handleEditSave(item.id)}
                      className="inventory__table_body-row--data---button inventory__table_body-row--data---button-save"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(item)}
                      className="inventory__table_body-row--data---button"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="inventory__table_body-row--data">
                  <button
                    onClick={() => handleRemoveClick(item.id)}
                    className="inventory__table_body-row--data---button inventory__table_body-row--data---button-remover"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default KitchenInventoryPage;

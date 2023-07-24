import React, { useState } from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const [isInCart, setIsInCart] = useState(item.isInCart);

  function handleAddToCartClick() {
    // Toggle the cart status locally
    setIsInCart((prevIsInCart) => !prevIsInCart);

    // Send PATCH request to the server
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !isInCart, // Toggle the cart status
      }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        onUpdateItem(updatedItem); // Update the state in the parent component
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        // If there is an error, reset the cart status to its original value.
        setIsInCart(item.isInCart);
      });
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDeleteItem(item); // Update the state in the parent component
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  return (
    <li className={isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;

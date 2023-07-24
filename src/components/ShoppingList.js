// import React, { useState } from "react";
// import ItemForm from "./ItemForm";
// import Filter from "./Filter";
// import Item from "./Item";

// function ShoppingList() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [items, setItems] = useState([]);

//   function handleCategoryChange(category) {
//     setSelectedCategory(category);
//   }

//   const itemsToDisplay = items.filter((item) => {
//     if (selectedCategory === "All") return true;

//     return item.category === selectedCategory;
//   });

//   return (
//     <div className="ShoppingList">
//       <ItemForm />
//       <Filter
//         category={selectedCategory}
//         onCategoryChange={handleCategoryChange}
//       />
//       <ul className="Items">
//         {itemsToDisplay.map((item) => (
//           <Item key={item.id} item={item} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ShoppingList;




// import React, { useEffect, useState } from "react";
// import ItemForm from "./ItemForm";
// import Filter from "./Filter";
// import Item from "./Item";

// function ShoppingList() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Fetch items from the server when the component first mounts
//     fetch("http://localhost:4000/items")
//       .then((response) => response.json())
//       .then((data) => setItems(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   function handleCategoryChange(category) {
//     setSelectedCategory(category);
//   }

//   function handleAddItem(newItem) {
//     // Update the state by adding the newly added item
//     setItems((prevItems) => [...prevItems, newItem]);
//   }

//   const itemsToDisplay = items.filter((item) => {
//     if (selectedCategory === "All") return true;
//     return item.category === selectedCategory;
//   });

//   return (
//     <div className="ShoppingList">
//       <ItemForm onAddItem={handleAddItem} />
//       <Filter
//         category={selectedCategory}
//         onCategoryChange={handleCategoryChange}
//       />
//       <ul className="Items">
//         {itemsToDisplay.map((item) => (
//           <Item key={item.id} item={item} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ShoppingList;




import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => setItems(items))
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

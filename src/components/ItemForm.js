// import React, { useState } from "react";

// function ItemForm() {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("Produce");

//   return (
//     <form className="NewItem">
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>

//       <label>
//         Category:
//         <select
//           name="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="Produce">Produce</option>
//           <option value="Dairy">Dairy</option>
//           <option value="Dessert">Dessert</option>
//         </select>
//       </label>

//       <button type="submit">Add to List</button>
//     </form>
//   );
// }

// export default ItemForm;



// import React, { useState } from "react";

// function ItemForm({ onAddItem }) {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("Produce");

//   // Function to handle form submissions
//   function handleSubmit(e) {
//     e.preventDefault();

//     // Create a new item object using the form data
//     const newItem = {
//       name: name,
//       category: category,
//     };

//     // Make a POST request to the server to add the new item
//     fetch("http://localhost:4000/items", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newItem),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Call the onAddItem function to update the state with the newly added item
//         onAddItem(data);

//         // Clear the form inputs after successful submission
//         setName("");
//         setCategory("Produce");
//       })
//       .catch((error) => console.error("Error adding item:", error));
//   }

//   return (
//     <form className="NewItem" onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label>
//         Category:
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="Produce">Produce</option>
//           <option value="Dairy">Dairy</option>
//           <option value="Bakery">Bakery</option>
//           <option value="Meat">Meat</option>
//           <option value="Other">Other</option>
//         </select>
//       </label>
//       <button type="submit">Add Item</button>
//     </form>
//   );
// }

// export default ItemForm;







import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((response) => response.json())
      .then((newItem) => {
        onAddItem(newItem); // Update the state in the parent component
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });

    // Clear the form after submission
    setName("");
    setCategory("Produce");
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
        <option value="Meat">Meat</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;

import React, { useEffect, useState } from "react";
import todoImg from "../images/todo.svg";


// to Get data from LIST
const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  // console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  };
};


const ToDo = () => {

  

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState('');
  // console.log(inputData);

  // The function is to add Item
  const addItems = () => {
    if (!inputData) {
      alert("Please Fill the Data...");
    }
    
    // it is to edit the list 
    else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name : inputData};
            
          };
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData('');
      setIsEditItem(null);
    }
    
    // it is to add new list in our page
    else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData };
      setItems([...items, allInputData]);
      setInputData("");
    };
  };

  // The function is to update the item
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);

    // console.log(newEditItem);
  }

  // The fuction is to delete Item
  const deleteItem = (ind) => {
    const updatedItems = items.filter((element) => {
      return element.id !== ind;

    });

    setItems(updatedItems);
  };




  // The function is to delete all
  const deleteAll = () => {
    setItems([]);
  };

  // Add data to local storage
  useEffect(() => {

    localStorage.setItem('lists', JSON.stringify(items));

  },[items]);



  return (

    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src={todoImg} atl="todoIcon" />
          <figcaption>Add your List here. 👇</figcaption>
        </figure>
        <div className="addItems">
          <input
            type="text"
            placeholder="✍ Add Item"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {
            toggleSubmit ?
              <i
                className="fa fa-solid fa-plus add-btn"
                title="Add Item"
                onClick={addItems}
              ></i> :
              <i
                className="fa-solid fa-edit"
                title="Edit Item"
                onClick={addItems}
              ></i>
          }

        </div>

        {/* it is for showing Items on the list */}
        <div className="showItems">
          {items.map((element) => {

            return (
              <div className="eachItem" key={element.id}>
                <h3>{element.name}</h3>

                <div className="todo-btn">
                  <i
                    className="fa-solid fa-edit delete-btn"
                    title="Edit Item"
                    onClick={() => editItem(element.id)}
                  ></i>
                  <i
                    className="fa-solid fa-trash-alt"
                    title="Delete Item"
                    onClick={() => deleteItem(element.id)}
                  ></i>

                </div>
              </div>
            )
          })}
        </div>
          {/* // it is the btn to clear all lists */}
        <div className="showItems">
          <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;

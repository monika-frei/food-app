import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  generateGroceryList as generateGroceryListAction,
  deleteItemFromGroceryList as deleteItemFromGroceryListAction,
} from "../redux/actions/index";

const EditGroceryList = (props) => {
  const [editIngredients, setEditIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState({});

  useEffect(() => {
    if (props.ingredients) {
      setEditIngredients(props.ingredients);
    }
  }, [props.ingredients]);

  const handleDelete = (ingredient) => {
    const filteredArray = editIngredients.filter((item) => item !== ingredient);
    setEditIngredients(filteredArray);
    props.deleteItem(ingredient);
  };
  const handleEdit = (ingredient) => {
    setActiveIngredient(ingredient);
    setInputValue(ingredient.amount);
    setActiveInput(true);
  };
  const handleChange = (e, ingredient) => {
    setInputValue(e.target.value);
  };
  const handleSave = (ingredient) => {
    const changedItem = {
      title: ingredient.title,
      amount: inputValue,
      unit: ingredient.unit,
    };
    const filteredArray = editIngredients.map((item) => {
      if (item === ingredient) {
        return changedItem;
      } else {
        return item;
      }
    });
    setEditIngredients(filteredArray);
    props.addList(filteredArray);
  };

  const renderProps = {
    editIngredients,
    inputValue,
    handleChange,
    handleEdit,
    handleSave,
    handleDelete,
    activeInput,
    activeIngredient,
  };

  return props.render(renderProps);
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.groceryList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addList: (list) => dispatch(generateGroceryListAction(list)),
    deleteItem: (item) => dispatch(deleteItemFromGroceryListAction(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroceryList);

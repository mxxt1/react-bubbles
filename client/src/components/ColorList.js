import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: {hex: ""},
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // code: {hex: "#f0f8ff"}
  // color: "aliceblue"
  // id: 1

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`,colorToEdit)
    .then(response => console.log(response))
    .then(() => {
      axiosWithAuth().get('/api/colors').then(list => updateColors(list.data)).catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  };

  const deleteColor = color => {
    // make a delete request to delete this color
      axiosWithAuth().delete(`/api/colors/${color.id}`)
    .then(response => console.log(response))
    .then(() => {
      axiosWithAuth().get('/api/colors').then(list => updateColors(list.data)).catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  };

  const changeNewColor = e => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
  }

  const submitNewColor = (e) => {
    e.preventDefault();
    console.log(newColor);

    axiosWithAuth().post(`/api/colors`, newColor)
    .then(response => console.log(response))
    .then(() => {
      axiosWithAuth().get('/api/colors').then(list => updateColors(list.data)).catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <h2>New Color</h2>
      <form onSubmit={submitNewColor}>
              <input type='text' name='color' value={newColor.color} onChange={changeNewColor} placeholder='Color Name' />
              <input type='text' name='code' value={newColor.code.hex} onChange={changeNewColor} placeholder='Hex Code' />
              <button>Submit New Color</button>
      </form>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;



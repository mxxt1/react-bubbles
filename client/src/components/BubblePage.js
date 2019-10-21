import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    console.log(`get color list`)

    axiosWithAuth()
    .get('/api/colors')
    .then(list => {
      console.log(list.data);
      setColorList(list.data);
    })
    // .then(() => console.log(colorList))
    .catch(err => console.log(err))
  },[])



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

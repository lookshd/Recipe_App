import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import { IoAddCircleOutline } from "react-icons/io5";
import logo from './Assests/images/pngwing.com.png'
import AddRecipe from './Component/AddRecipe/AddRecipe';
import Recipecard from './Component/Card/recipecard';
import Recipeinside from './Component/Card/Recipeinside/Recipeinside';
import './Assests/helpercss/button.css';
import Error from './Error';
function App() {
  //to store the recipe data
  const [recipe, setRecipe] = useState([]);
  //to store the fvt recipe data
  const [fvtlist, setFvtlist] = useState([]);
  console.log(recipe);
  // asynchronous funcn to fetch data from datajson
  // try and catch is used for error handling
  async function getRecipe() {
    try {
      const response = await fetch('/source/data.json');
      const data = await response.json();
      setRecipe(data.recipes);
    } catch (error) {
      console.log("No Data Found", error);
    }
  }

// use effect render startting time which call get recipe()
  useEffect(() => {
    getRecipe();
  }, []);
  console.log(recipe[10]);

  console.log("cdb", fvtlist);
  //handler to store fvtlist when user click addtoft button in fvtlist state
  function clickHandler(id) {
    console.log(id)
    setFvtlist([...fvtlist, recipe[id - 1]]);

  }
  //handler to remove  fvtlist  form fvtlist state when user click remove button 
  function handlertodelete(id) {
    const updatedrecipe = fvtlist.filter((i) => i.id !== id);
    setFvtlist(updatedrecipe);

  }
  console.log(fvtlist);
    //handler to store newrecipe  from form 
  function formaddhandler(newRecipe) {
    setRecipe([...recipe, newRecipe]);
  }
  //update when some one edit store recipe 
  function onUpdateRecipe(editData) {
    setRecipe(recipe.map((i) => i.id === editData.id ? editData : i))

  }
  //3
  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <Link to="/"><img src={logo} alt='logo' className="logo-img" /></Link>
        </div>
        <div className="addbtn" style={{ display:'flex',alignItems:'center', justifyContent:'center'}}>
          <Link to="/AddRecipe"><button className='btn' style={{ display:'flex',alignItems:'center', justifyContent:'center', outlinetextDecoration: 'none'}} >Add Recipe <IoAddCircleOutline className='icon' /></button></Link>
        </div>
      </div>

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="Datagetter">
                <h1>Recipes</h1>
                {recipe.length > 0 ? (
                  <Recipecard recipe={recipe} fvtlist={fvtlist} handler={clickHandler} handlertodelete={handlertodelete} />
                ) : (
                  <p>No recipes available.</p>
                )}
              </div>
            }
          />
          <Route  errorElement={<Error/>}/>
          <Route path="/AddRecipe" element={<AddRecipe recipehandler={formaddhandler} length={recipe.length} />} />
          <Route path="/recipe/:resId" element={<Recipeinside recipes={recipe} onUpdateRecipe={onUpdateRecipe} />} />
        </Routes>
      </div>
    </div>

  );
}


export default App;

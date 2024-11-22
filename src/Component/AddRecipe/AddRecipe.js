import React, { useState } from 'react';

import './AddRecipe.css'
import '.././../Assests/helpercss/button.css'
import './AddRecipe.css'
const AddRecipe = ({ recipehandler, length }) => {
  const [formData, setFormData] = useState({

    name: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    difficulty: '',
    id: '',
    mealType: '',
    ingredients: '',
    instructions: '',
    tags: '',
    rating:''
  });
  const new_id = length + 1;

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Parse 
  const parseData = (s) => {
    return s.split(',').map((i) => i.trim());
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const dataArray = {
      // Use length uniqe
      ...formData,
      id: new_id,
      mealType: parseData(formData.mealType),
      ingredients: parseData(formData.ingredients),
      instructions: parseData(formData.instructions),
      tags: parseData(formData.tags),
      rating:formData.rating
      
    };

    recipehandler(dataArray);

    
    console.log('Recipe added:', dataArray);

    setFormData({

      name: '',
      prepTimeMinutes: '',
      cookTimeMinutes: '',
      difficulty: '',
      id: '',
      mealType: '',
      ingredients: '',
      instructions: '',
      tags: '',
      rating:''
    });
  };

  return (
    <div className="AddRecipe">
      <h2 className='AddRecipe-heading'>Add Recipe</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prepTimeMinutes">Prep Time Minutes</label>
          <input
            type="text"
            id="prepTimeMinutes"
            name="prepTimeMinutes"
            value={formData.prepTimeMinutes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookTimeMinutes">Cook Time Minutes</label>
          <input
            type="text"
            id="cookTimeMinutes"
            name="cookTimeMinutes"
            value={formData.cookTimeMinutes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mealType">Meal Type</label>
          <input
            type="text"
            id="mealType"
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
          />
        </div>
       
        <button type="submit" className="btn">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;

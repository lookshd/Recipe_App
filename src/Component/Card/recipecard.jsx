import React, { useState } from 'react';
import Card from './card';
import Pagination from './Pagination/Pagination';
import '.././../Assests/helpercss/button.css';

const Recipecard = ({ recipe, fvtlist, handler, handlertodelete }) => {
  const [mealType, setMealType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');


  // Pagination code start
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(recipe.length / itemsPerPage);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };
  // Pagination code end

  const clickHandler = (id) => {
    handler(id);
    alert('Added Successfully');
  };

  const clickHandlerToDelete = (id) => {
    handlertodelete(id);
  };

  // Filter recipes based on filters and search
  const filterRecipe = recipe.filter(item => {
    const matchesMealType = mealType ? item.mealType === mealType : true;
    const matchesDifficulty = difficulty ? item.difficulty === difficulty : true;
    const matchesTags = tags.length ? tags.every(tag => item.tags.includes(tag)) : true;
   const matchTexts= text? item.name===text:true;
    return matchesMealType && matchesDifficulty && matchesTags && matchTexts ;
  });

  
  // Reset filters
  const resetHandler = () => {
    setMealType('');
    setDifficulty('');
    setTags([]);
    setText(''); // Clear search text on reset
    setPage(1); // Reset to the first page
  };

  const paginatedRecipes = filterRecipe.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Favorite recipes
  const favoriteRecipes = filterRecipe.filter(item => fvtlist.some(fvt => fvt.id === item.id));
  const fvtTotalPages = Math.ceil(favoriteRecipes.length / itemsPerPage);

  // Search handler
  const searchHandler = () => {
    setPage(1); // Reset to the first page on new search
    setText(text); // Update search text state
    setText('');
  };

  return (
    <div className='Recipecard'>
      <div className='all-recipes'>
        <div className='filters'>
          <div className='searchetext' style={{ display: 'flex', marginTop: '20px' }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search recipes..."
            />
           
          </div>
          <div className='mealtype'>
            <label>
              Meal Type:
              <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                <option value="">All</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </label>
          </div>
          <div className='diffi'>
            <label>
              Difficulty:
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
          </div>
          <div className='tags'>
            <label>
              Tags:
              <select
                multiple
                value={tags}
                onChange={(e) => setTags([...e.target.selectedOptions].map(option => option.value))}
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Spicy">Spicy</option>
                <option value="Baking">Baking</option>
                <option value="Chicken">Chicken</option>
                <option value="Salsa">Salsa</option>
                <option value="Dessert">Dessert</option>
              </select>
            </label>
          </div>
          <div className='addbtn'>
            <button className='btn' onClick={resetHandler} style={{ color: 'red' }}>Reset</button>
          </div>
        </div>

        {paginatedRecipes.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            recipe={item}
            handler={clickHandler}
          />
        ))}
        
        <Pagination
          paginatedHandler={selectPageHandler}
          length={recipe.length}
          page={page}
          totalPages={totalPages}
        />
      </div>

      <div className='favorite-recipes'>
        <h2>Favorite Recipes</h2>
        {favoriteRecipes.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            fvtlist={item}
            clickHandlerToDelete={clickHandlerToDelete}
            fvtl={true} // Pass fvtl as true for favorite recipes
          />
        ))}
        
        <Pagination
          paginatedHandler={selectPageHandler}
          length={favoriteRecipes.length}
          page={page}
          totalPages={fvtTotalPages}
        />
      </div>
    </div>
  );
};

export default Recipecard;

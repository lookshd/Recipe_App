import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '.././../Assests/helpercss/button.css';
const Card = ({ id, fvtl, fvtlist, recipe, handler, clickHandlerToDelete }) => {

  console.log("recipe", recipe);
  console.log(fvtlist);
  //fvtl repersent which component call card favrt recipe or all recipe
  //on the basis of fvtl recipe will store in itemtobe use
  const itemtobeuse = (fvtl === true) ? fvtlist : recipe;
  console.log("itemtobeuse", itemtobeuse);
  //handler to click
  function clickhandler(id) {
    handler(id);

  }
  //handler to dleete
  function handlertodelete(id) {
    clickHandlerToDelete(id);
    alert('Remove Successfully');
  }
  return (<>

    <img src={itemtobeuse.image} alt={itemtobeuse.name} className='item-image' />
    <div className='item-header'>
      <div className='item-header-list'>
        <Link to={`/recipe/${itemtobeuse.id}`}>{itemtobeuse.name}</Link>
        {
          //on the basis of  rating color is reflect
        }
        {itemtobeuse.rating > 4 ? (
          <span className='Rating' style={{ color: 'green' }}>
            <FontAwesomeIcon icon={faStar} />
            {itemtobeuse.rating}
          </span>
        ) : (
          <span className='Rating' style={{ color: 'red' }}>
            <FontAwesomeIcon icon={faStar} />
            {itemtobeuse.rating}
          </span>
        )}
      </div>
      {
          //on the basis of  fvtl button is reflect
        }
      <div className='addbtn'>
        {fvtl === true ? (<button className='btn' style={{ color: 'red' }} onClick={() => handlertodelete(itemtobeuse.id)}>
          Remove From Favourite
        </button>) : (<button className='btn' onClick={() => clickhandler(itemtobeuse.id)}>
          Add To Favourite
        </button>)}

      </div>
    </div>
    <div className='ingredients'>
      <table border={1}>
        <thead>
          <tr>
            <th>Prep Time Minutes</th>
            <th>Cook Time Minutes</th>
            <th>Difficulty</th>
            <th>Meal Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{itemtobeuse.prepTimeMinutes}</td>
            <td>{itemtobeuse.cookTimeMinutes}</td>
            <td>{itemtobeuse.difficulty}</td>
            <td>{itemtobeuse.mealType}</td>
          </tr>
        </tbody>
      </table> </div>
  </>
  )
}

export default Card
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '.././.././../Assests/helpercss/button.css'
import './Recipeinside.css'

const Recipeinside = ({ recipes, onUpdateRecipe }) => {
    // edit  is used to store user click on edit button or not
    const [edit, setEdit] = useState(false);
    // editdata  is used to stoe user changed data in edit data store
    const [editData, setEditData] = useState(null);
    console.log("editdata",editData);
    // to get dynamic url 
    const { resId } = useParams();
//when any changes in recipes and resid happen it rerender the component 
    useEffect(() => {
        if (recipes[resId-1]) {
            setEditData({ ...recipes[resId-1] });
        }
    }, [resId, recipes]);
//any change in form is happen
//set edit set the value
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: name === 'ingredients' || name === 'instructions' || name === 'tags'
                ? value.split(',').map(i => i.trim())
                : value
        });
    };
    // handler to update main recipe when user click submit button in edit form 

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onUpdateRecipe(editData);
        alert('Edit successful');
        setEdit(false);
    };
// handler to setedit to true when user click on edit button
    const handleEditClick = () => {
        setEdit(true);
    };
// handler if user click cancel button then 
    const handleCancelClick = () => {
        setEdit(false);
        setEdit(editData);
        alert('Edit canceled');
    };

    if (!recipes[resId-1]) {
        return <div>Recipe not found.</div>;
    }

    return (
        <>
            {edit ? (
               <div className='AddRecipe'>  <form onSubmit={handleFormSubmit}>
                <div className='AddRecipe-heading'>  <h2>Edit Recipe</h2></div> 
               
                   <div className="form-group"><label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={editData?.name || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </label>
</div> 
<div className="form-group">
                    <label>
                        Ingredients:
                        <textarea
                            name="ingredients"
                            value={editData?.ingredients.join(', ') || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </label></div>
                    <div className="form-group">
                    <label>
                        Instructions:
                        <textarea
                            name="instructions"
                            value={editData?.instructions.join(', ') || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </label></div>
                    <div className="form-group"><label>
                        Tags:
                        <textarea
                            name="tags"
                            value={editData?.tags.join(', ') || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </label></div>
                    <div className='addbtn'>
                    <button type="submit" className='btn'>Save</button>
                   <Link to={'/'}> <button type="button" style={{color:'red'}} className='btn' onClick={handleCancelClick}>Cancel</button></Link>
               </div> </form></div>
            ) : (
                <div className="recipeinside">
                    <div className='img-insider'>
                        <img className='img-insider-itself' src={recipes[resId-1]?.image} alt={recipes[resId-1]?.name} />
                    </div >
                    <div className='just-flex'>
                    <div className='recipe-title'>
                        <h1>{recipes[resId-1].name}</h1>
                        <div className='recipe-tags'>
                        {recipes[resId-1].tags.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        ))}
                    </div>
                   
                    </div>
                    <div className='addbtn' >
                        <button  className='btn' style={{color:'red'}}  onClick={handleEditClick}>Edit</button>
                    <Link to={'/'}>
                        <button  className='btn'  >Back To Home</button>
                    </Link>
                    </div>
                    </div>
                    
                    <div className='recipe-ingredients'>
                        <h3>Ingredients:</h3>
                        {recipes[resId-1].ingredients.map((ingredient, index) => (
                            <p key={index}>{ingredient}</p>
                        ))}
                    </div>
                    <div className='recipe-instructions'>
                        <h3>Instructions:</h3>
                        {recipes[resId-1].instructions.map((instruction, index) => (
                            <p key={index}>{instruction}</p>
                        ))}
                    </div>
                  
                </div>
            )}
        </>
    );
};

export default Recipeinside;

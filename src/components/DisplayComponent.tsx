import React from 'react';
import { Item } from '../entities/CommonTypes';

interface ListOfItemsProps {
  items : Item[],
  onEdit: Function,
  onUpdate: Function,
  onCancel: Function,
  onDelete: Function,
  edited: Item | null,
}

const DisplayComponent: React.FC<ListOfItemsProps> = ({
  items, 
  onEdit, 
  onUpdate,
  onCancel,
  onDelete,
  edited,
}) => {
  
  return <ul className='post-container'>
    <li>
      <span className='header name'>Name</span>
      <span className='header title'>Post Title</span>
      <span className='header name'>Edit/Delete</span>
    </li>
    {items.map((el: Item,i :number) => {
      return <li key={Math.random()}>
        <span className='name'>{el.name}</span>

        {edited && edited.postId === el.postId         
        ? (<>
          <span className='title active'>
            <input 
              autoFocus
              className='active'
              onChange={(e) => onEdit(el, e.target.value)} 
              type='text' value={edited ? edited.postTitle : el.postTitle} />
            </span>
          <span>
            <button className='update' onClick={() => onUpdate(edited)} >Update</button>
            <button className='cancel' onClick={() => onCancel(el)} value='Edit' >Cancel</button>
          </span>
        </>) : (<>
          <span className='title'>{el.postTitle}</span>
          <span>
            <button onClick={() => onEdit(el)} value='Delete' >Edit</button>
            <button onClick={() => onDelete(el)} value='Edit' >Delete</button>
          </span>
        </>)
        
        }
      </li>
    })}
  </ul>
}


export default DisplayComponent;
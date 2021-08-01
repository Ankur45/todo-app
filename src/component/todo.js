import React, {useState,useEffect} from 'react'
import img from '../images/img.jpg';


const getLocalItems = () =>{
    let list = localStorage.getItem('lists');

    if(list){
        return JSON.parse(localStorage.getItem('lists'))
    }else{
        return [];
    }
}
const Todo = () => {
    const[inputData,setInputData] =  useState("");
    const[items,setItems] = useState(getLocalItems());
    const[toggleSubmit,setToggleSubmit] = useState(true);
    const[isEditItem,setIsEditItem] = useState(null);


    const handleSubmit = e => {
        e.preventDefault();
        inputData && addItem(inputData)
        setInputData("");
      };
    
    const addItem = () =>{
        if(!inputData){

        }else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) =>{
                    if(elem.id === isEditItem){
                        return {...elem,name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);

        }
        else{
            const allInputData = {id:new Date().getTime().toString(),name:inputData}
            setItems([...items,allInputData]);
            setInputData('')
        }
      
    }
    const deleteItem = (index) =>{
const updateItem = items.filter((elem) =>{
    return index !== elem.id;
})
 
setItems(updateItem);
    }
    

    const editItem = (id) =>{
        let newEditItem = items.find((elem)=>{
            return( elem.id === id
            )
        });
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);

       
        };

        useEffect(() =>{
            localStorage.setItem('lists',JSON.stringify(items))
        },[items]);



    return (
       <>
       <div class="container">
           <div class="row">
       <div className="main-div">
           <div className="child-div">
               <form onSubmit={handleSubmit}>
               <figure>
                   <img src={img} alt="" />
                   <figcaption>ADD your List Here</ figcaption>
               </figure>
               <div className="addItems">
                   <input type="text" placeholder=" Add Items"  
                    
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                />
                 <span> { toggleSubmit ?    <i class="fa fa-plus addBtn" title="Add Item"  onClick={addItem}> </i> :
               <i class="far fa-edit addBtn" title="Update Item" onClick={addItem} > </i> }</span>
                  
               </div>  

               <div className="showItems">

                   {
                       items.map((elem) =>{
                           return(
                        <div className="eachItem" key={elem.id}>
                        <h3 className="eachItem">{elem.name}</h3>
                        <div className="todo-btn">
                        <span><i class="far fa-edit add-btn" title="Edit Item" onClick={() =>editItem(elem.id)} > </i></span>
                      <span>  <i class="far fa-trash-alt add-btn" title="Delete Item" onClick={() =>deleteItem(elem.id)} > </i></span>
 </div>
                    </div>
                           )
                       })
                   }
                  
               </div>

             </form>
           </div>

       </div>
       </div>
       </div>
       </>
    )
}

export default Todo;

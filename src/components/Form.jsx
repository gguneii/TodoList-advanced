import { useEffect, useState } from "react"

function Form({arr, setArr}) {
    const [inpValue, setInpVal] = useState('')
    const [num, setNum] = useState(1)
    const [originalArr, setOriginalArr] = useState([]);
    function handleClick(e){
        e.preventDefault()
    }
    function addToList(){
       if (inpValue.trim()) {
        const newItem = { inp: inpValue, quantity: num, done: false }
        const newArr = [...arr, newItem]
        setArr(newArr)
        setOriginalArr([...originalArr, newItem])
        setInpVal('')
        setNum(1)
       }
    }  
    function deleteItem(i){ 
        const updatedArr = arr.filter((_, index) => i !== index);
        const updatedOriginalArr = originalArr.filter((_, index) => i !== index)
        setArr(updatedArr)
        setOriginalArr(updatedOriginalArr)
    }
    function doneItem(index){
        const updatedTodos = [...arr]
        updatedTodos[index].done = !updatedTodos[index].done
        setArr(updatedTodos)
    }
    function clearAllLists(){
        if (confirm("Are you sure? You want to delete All items!")) {
            setArr([])
            setOriginalArr([])
        }
    }
    function sortList(e){
        const sortType = e.target.value
        let sortedArr

        if (sortType === 'input') {
            sortedArr = [...originalArr]
        } else if (sortType === 'description') {
            sortedArr = [...arr].sort((a, b) => a.inp.localeCompare(b.inp))
        } else if (sortType === "packed") {
            sortedArr = [...arr].sort((a, b) => a.done - b.done)
        }
        setArr(sortedArr)
    } 
    
  return ( 
  <>
  <form className={"add-form flex flex-col md:flex-row"} onSubmit={handleClick}>
    <h3 className="text-center">What do you need for your 😍 Trip?</h3>
    <select onChange={(e) => setNum(e.target.value)} value={num} name="quantity" id="quantity"
    >
        {Array.from({length: 20}, (_, i) => i + 1)
            .map(num => (<option value={num} key={num}>{num}</option>))
        }
            {/* {
                Array(20).fill("").map((_,i)=>(<option key={i} value={i + 1}>{i + 1}</option>))
            } */}
    </select>
    <input className="w-full sm:w-[initial]" id={"description"} name={"description"} onChange={(e) =>setInpVal(e.target.value)} value={inpValue} type="text" placeholder="Item..." 
           />
    <button type={"submit"} onClick={addToList} disabled={!inpValue.trim()}>Add</button>    
</form>

<div className={"list"}>

    <ul>
        {
            arr.map((item,i) =>{
               if (item.quantity && item.inp) {
                return(
                    <li key={i}>
                     <input value={item.quantity} checked={item.done} onChange={() => doneItem(i)} type="checkbox" />   
                     <span className={item.done ? 'line-through' : ''}>{item.quantity} {item.inp}</span> 
                    <button onClick={()=> deleteItem(i)} className="delete">❌</button></li>
                )
               }
            })
        }
    </ul>
     <div className="actions">
     <select name="action" id="action" onChange={sortList}>
         <option value="input">Sort by Input Order</option>
         <option value="packed">Sort by Packed Status</option>
         <option value="description">Sort by Description</option>
     </select>
     <button onClick={clearAllLists} >Clear List</button>
    </div>       
</div>
  </>

  )
}

export default Form
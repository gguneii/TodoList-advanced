function Stats({arr}) {
  if (!arr.length) {
    return(
      <p className={"stats"}>
      <em>Start Adding some items to you packing list 🚀.</em>
       </p>
    )
  }
  const numItems = arr.length
  const numPacked = arr.filter(item => item.done).length
  const percentage = Math.round(numPacked / numItems * 100)
  return (
        <footer className={"stats"}>
            <em>
                {
                    percentage === 100 ? 'You got everything! Ready to go ✈'
                        :`You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`
                }
            </em>
        </footer> 
  )

}
export default Stats
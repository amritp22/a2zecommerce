import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss'
const Directory=({categories})=>{
    return (
        <div className="directories-container">
      {/* map(()=>()) is used instead of map(()=>{return()}) to return single */}
      {categories.map((category)=>(
        <CategoryItem key={category.id} category={category} />
        
        ))}
      
      
    </div>
    )
}

export default Directory;

import Home from "./routes/home/home.component";
import { Route,Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";

const Shop=()=>{
  return(
    <div>
      i am the shop
    </div>
  )
}
const App=()=>{
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Route>
    
    </Routes>
    );
}

export default App;

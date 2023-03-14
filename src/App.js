import Home from "./routes/home/home.component";
import { Route,Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";
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
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    
    </Routes>
    );
}

export default App;

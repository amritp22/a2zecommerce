import { Outlet,Link } from "react-router-dom";
import { Fragment,useContext } from "react";
import { ReactComponent as Crownlogo } from '../../assets/crown.svg'
import './navigation.styles.scss'
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
const Navigation=()=>{
  const {currentUser,setCurrentUser}=useContext(UserContext)
   const signOutHandler=async()=>{
    await signOutUser();
    // as soon as signout is clicked currentUser value is triggered as null
    // thus renderd with signin option
    setCurrentUser(null);
   }
  return(
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
        <Crownlogo className="logo" />
        </Link>
        <div className="nav-links-container">
         <Link className="nav-link" to='/shop'>
          SHOP
         </Link>
         {/* if cureent user exist then signout is displayed else signin remains as it is */}
         {
         currentUser ?(<Link className="nav-link" onClick={signOutHandler}>
          SIGN OUT
         </Link>):
         (<Link className="nav-link" to='/auth'>
          SIGN IN
         </Link>)
         }
         
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
import { Fragment,useContext} from "react";
import { Outlet,Link} from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg'
import './navigation.styles.scss';
import { UserContext } from "../../../contexts/user.conext";
import { signOutUser } from "../../../utils/firebase/firebase.utils";


const Navigation = ()=> {
    const {currentUser}=useContext(UserContext)
    
    return (
    <Fragment>
        <div className="navigation">
        <Link className='logo-container' to='/'>
        <CrwnLogo className='logo' />
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
            shop
            </Link>
            {currentUser?(
                <span onClick={signOutUser} className="nav-link">signout</span>
            ): (<Link className="nav-link" to='/auth'>
            sign-in
            </Link>
            )}
           
        </div>
        </div>
        <Outlet/>
    </Fragment>
    
    )
    }

export default Navigation;
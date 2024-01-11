import { Fragment,useContext} from "react";
import { Outlet,Link} from "react-router-dom"
import CartIcon from "../../../component/cart-icon/cart-icon.component";
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg'
import './navigation.styles.scss';
import { UserContext } from "../../../contexts/user.conext";
import { CartContext } from "../../../contexts/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartDropdown from "../../../component/cart-dropdown/cart-dropdown.component";


const Navigation = ()=> {
    const {currentUser}=useContext(UserContext)
    const {isCartOpen}=useContext(CartContext)
    
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
            <CartIcon/>
           
        </div>
        {isCartOpen &&
        <CartDropdown/>}
        </div>
        <Outlet/>
    </Fragment>
    
    )
    }

export default Navigation;
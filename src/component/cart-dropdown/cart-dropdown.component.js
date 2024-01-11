import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';



const CartDropdown=()=>{
    const navigate=useNavigate();

    const {cartItems}=useContext(CartContext)

    const goToCheckOutHandler =()=>{
        navigate('/checkout')
    }
    console.log(cartItems)
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item)=> <CartItem key={item.id} item ={item}/>)}

            </div>
            <Button onClick={goToCheckOutHandler}>GTC</Button>
 
        </div>
    )

}

export default CartDropdown;
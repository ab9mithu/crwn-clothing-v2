import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckOutItem from '../../component/checkout-item/checkout-item.component';

const Checkout= ()=>{
    const {cartItems,cartTotal}=useContext(CartContext)
    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>product</span>

                </div>
                <div className='header-block'>
                    <span>Description</span>

                </div>
                <div className='header-block'>
                    <span>quantity</span>

                </div>
                <div className='header-block'>
                    <span>price</span>

                </div>
                <div className='header-block'>
                    <span>remove</span>

                </div>

            </div>
            
            
                {cartItems.map((cartItem)=>{
                   return <CheckOutItem key={cartItem.id} cartItem={cartItem} />
                })}
            <span className='total'>Total:{cartTotal}</span>

        </div>

    )
}

export default Checkout;
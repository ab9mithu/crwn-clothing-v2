import './cart-item.styles.scss';


const CartItem =({item})=>{
   
const { name,quantity,imageUrl,price } = item;
  return(
    <div className='cart-item-container'> 
      <img src={imageUrl} alt={`${name}`}/>
      <div className='item-details'>
        <span className='name'>{name}</span>
      <span className='price'>{quantity} * ${price}</span>
      </div>
    </div>
  )
}
export default CartItem;
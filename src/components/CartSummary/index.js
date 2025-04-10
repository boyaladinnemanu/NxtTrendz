// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const noItems = cartList.length
      const total = cartList.reduce(
        (acc, each) => acc + each.price * each.quantity,
        0,
      ) // Moved total calculation here

      return (
        <>
          <div className="total-cont">
            <h1 className="total-head">
              Order Total:<span className="total-span">{total}</span>
            </h1>
            <p className="total-nItems">{noItems} Items in cart</p>
            <button type="button" className="total-checkout-btn">Checkout</button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary

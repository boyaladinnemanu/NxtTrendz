import {Component} from 'react'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'

import './index.css'

class CartListView extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          return (
            <>
              <div className="removebtn-cont">
                <button
                  type="button"
                  onClick={removeAllCartItems}
                  className="removeallbtn"
                >
                  Remove All
                </button>
              </div>
              <ul className="cart-list">
                {cartList.map(eachCartItem => (
                  <CartItem
                    key={eachCartItem.id}
                    cartItemDetails={eachCartItem}
                  />
                ))}
              </ul>
              <CartSummary />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartListView

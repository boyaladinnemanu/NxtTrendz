import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList.find(
        each => each.id === product.id,
      )

      if (existingProduct) {
        // ✅ Use map to update quantity properly
        return {
          cartList: prevState.cartList.map(each =>
            each.id === product.id
              ? {...each, quantity: each.quantity + 1} // Increment only
              : each,
          ),
        }
      } else {
        // ✅ Add as new entry if not present
        return {
          cartList: [...prevState.cartList, product],
        }
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  onIncrementQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  onDecrementQuantity = (id, quantity) => {
    if (quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(each => each.id !== id),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.onIncrementQuantity,
          decrementCartItemQuantity: this.onDecrementQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

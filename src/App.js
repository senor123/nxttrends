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
  incrementCartItemQuantity = product => {
    const tempcartList = [...this.state.cartList]

    const resList = tempcartList.map(item => {
      if (item.id === product.id) {
        return {...item, quantity: item.quantity + product.quantity}
      }
      return item
    })

    this.setState({cartList: resList})
  }
  decrementCartItemQuantity = id => {
    const tempcartList = [...this.state.cartList]

    const getTotalQuantity = tempcartList.reduce(
      (acc, item) => acc + item.quantity,
      0,
    )

    if (getTotalQuantity === 1) {
      this.setState({cartList: []})
      return
    }
    const resList = tempcartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })

    this.setState({cartList: resList})
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  removeCartItem = id => {
    const tempcartList = [...this.state.cartList]

    const resList = tempcartList.filter(item => item.id !== id)
    this.setState({cartList: []})
  }
  addCartItem = product => {
    const cartItem = this.state.cartList.find(item => item.id === product.id)
    if (cartItem) {
      this.incrementCartItemQuantity(product)
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
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

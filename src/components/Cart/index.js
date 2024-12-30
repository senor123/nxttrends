import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const getSum = () => {
        console.log(cartList)
        const sum = cartList.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        )
        return sum
      }

      const handleDelete = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button onClick={handleDelete}>Remove All</button>
                <CartListView />
                <h1>Order Total</h1>
                <h1>Rs {getSum()}</h1>
                <p>{cartList.length} items in cart</p>
                <button>Checkout</button>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart

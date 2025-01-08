import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, placeOrder, removeFromCart, updateCartQuantity } from "../../redux/cartSlice";

export default function Cart() {
  const {cartItems, total} = useSelector(state => state.cartReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch]);


  // function to remove item from cart 
  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  };

  // function to handle checkout
  const handleCheckout = async (order) => {
    dispatch(placeOrder(order))
  };

  // function to increment item quantity
  const handleIncrement = (id, quantity) => {
    dispatch(updateCartQuantity({ id, quantity: quantity + 1 }));
  };

  // function decrement item quantity
  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartQuantity({ id, quantity: quantity - 1 }));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      {cartItems.map((item) => (
        <Card key={item.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={item.productName}
            height="140"
            image={
              item.imageUrl || "/static/images/cards/contemplative-reptile.jpg"
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.productName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Price: ${item.price}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Quantity: {item.quantity}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Total Price: ${item.quantity * item.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleRemove(item.id)} sx={{
          bgcolor: "#f77f00",
          color: "whitesmoke",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 16px", 
          borderRadius: "8px",
          '&:hover': { 
            bgcolor: "darkgray",
            color: "white"   
          },
          boxShadow: "0px 4px 6px rgba(235, 235, 31, 0.1)",
          fontWeight: "bold", 
        }}>
              Remove
            </Button>
          </CardActions>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "8px" }}
          >
            <button
              onClick={() => handleIncrement(item.id, item.quantity)}
              style={{
                padding: "10px",
                backgroundColor: "#f77f00",
                color: "whitesmoke",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                '&:hover': { 
            bgcolor: "darkgray",
            color: "white"   
          },
              }}
            >
              +
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleDecrement(item.id, item.quantity)}
              style={{
                padding: "10px",
                backgroundColor: "#f77f00",
                color: "whitesmoke",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                '&:hover': { 
            bgcolor: "darkgray",
            color: "white"   
          },
              }}
            >
              -
            </button>
          </div>
        </Card>
      ))}
      <div style={{ marginTop: "20px" }}>
        <h2>Total Price: ${total.toFixed(2)}</h2>
        <Button
        sx={{
          bgcolor: "#f77f00",
          color: "whitesmoke",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 16px", 
          borderRadius: "8px",
          '&:hover': { 
            bgcolor: "darkgray",
            color: "white"   
          },
          boxShadow: "0px 4px 6px rgba(235, 235, 31, 0.1)",
          fontWeight: "bold", 
        }}
          variant="contained"
          color="primary"
          onClick={() => handleCheckout({
              orderDate: new Date(),
              items: cartItems,
              totalPrice: 0
          }) }
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

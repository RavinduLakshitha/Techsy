import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  placeOrder,
  removeFromCart,
  updateCartQuantity,
} from "../../redux/cartSlice";
import Lapimg from "../../assets/laptop.jpg";

export default function Cart() {
  const { cartItems, total } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // function to remove item from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // function to handle checkout
  const handleCheckout = async (order) => {
    dispatch(placeOrder(order));
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
    <div style={{padding:"10px" , margin:""}}>
      <div>
        <h1>My Cart</h1>
      </div>
      <div
    style={{
      display: "flex",
      // flexWrap: "wrap",
      gap: "16px",
      justifyContent: "center",
    }}
  >
    {cartItems.map((item) => (
      <Card key={item.id} sx={{ Width: "600px", height: 450,  borderRadiuous:"10px",bgcolor:"#edf2f4", padding:"10",  }}>
        <CardMedia
        sx={{
          objectFit: "contain", 
          width: "100%", 
          height: "200px", 
          display: "block", 
          margin: "0 auto", 
          paddingTop: "20px", 
          
        }}
          component="img"
          alt={item.productName}
          height="140"
          image={Lapimg}
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
          
        </CardActions>
        <div style={{display:"flex", flexDirection:"column", gap:"20px", justifyContent:"center", padding:"0px 10px"}}><div
          style={{ display: "flex", justifyContent: "center", gap: "8px"}}
        >
          <button
            onClick={() => handleIncrement(item.id, item.quantity)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#f77f00",
              color: "whitesmoke",
              border: "none",
              borderRadius: "4px",
              fontSize: "0.8rem", 
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              fontWeight: "bold",
              minWidth: "40px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e85d04";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#f77f00";
              e.target.style.color = "whitesmoke";
            }}
          >
            +
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => handleDecrement(item.id, item.quantity)}
            style={{
              padding: "6px 12px", 
              backgroundColor: "#f77f00",
              color: "whitesmoke",
              border: "none",
              borderRadius: "4px", 
              fontSize: "0.8rem", 
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              fontWeight: "bold",
              minWidth: "40px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e85d04";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#f77f00";
              e.target.style.color = "whitesmoke";
            }}
          >
            -
          </button>
          
        </div>
        <Button
            size="small"
            onClick={() => handleRemove(item.id)}
            sx={{
              bgcolor: "#f77f00",
              color: "whitesmoke",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              minWidth: "100px",
              "&:hover": {
                bgcolor: "#e85d04",
                color: "white",
              },
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Remove
          </Button></div>
      </Card>
    ))}
  
  </div>
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
          "&:hover": {
            bgcolor: "#e85d04",
            color: "white",
          },
          boxShadow: "0px 4px 6px rgba(235, 235, 31, 0.1)",
          fontWeight: "bold",
        }}
        variant="contained"
        color="primary"
        onClick={() =>
          handleCheckout({
            orderDate: new Date(),
            items: cartItems,
            totalPrice: 0,
          })
        }
      >
        Checkout
      </Button>
    </div></div>
    
    
  );
}

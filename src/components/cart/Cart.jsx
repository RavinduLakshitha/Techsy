import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchCarts() {
      try {
        const response = await fetch("http://localhost:5132/api/Cart");
        const data = await response.json();
        const itemsWithQuantity = data.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(itemsWithQuantity);
      } catch (error) {
        console.error("Error fetching Cart:", error);
      }
    }

    fetchCarts();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5132/api/Cart/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        console.error(
          `Failed to remove item with id: ${id}, status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error removing item with id: ${id}`, error);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    const orderData = {
      id: 0, // Assume the ID will be assigned by the server
      orderDate: new Date().toISOString(),
      items: cartItems.map((item) => ({
        id: 0, // Assume each item's ID will be assigned by the server
        productId: item.id,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: totalPrice,
    };

    try {
      const response = await fetch("http://localhost:5132/api/Orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("successfully!");
        setCartItems([]); // Clear the cart after successful order
        setTotalPrice(0); // Reset the total price
      } else {
        console.error(
          `Failed to place order, status: ${response.status}`
        );
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error during checkout. Please try again.");
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
            <Button size="small" onClick={() => handleRemove(item.id)}>
              Remove
            </Button>
          </CardActions>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "8px" }}
          >
            <button
              onClick={() => handleIncrement(item.id)}
              style={{
                padding: "10px",
                backgroundColor: "#747bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              +
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleDecrement(item.id)}
              style={{
                padding: "10px",
                backgroundColor: "#747bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              -
            </button>
          </div>
        </Card>
      ))}
      <div style={{ marginTop: "20px" }}>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

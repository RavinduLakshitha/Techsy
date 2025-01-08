import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OutlinedCard() {
  // Function to handle order placement
  const handlePlaceOrder = () => {
    // Display order confirmation message
    window.alert("Order placed successfully! Thank you for your purchase.");
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Total Price:
        </Typography>
      </CardContent>
      <CardActions>
        {/* Add click handler to the button */}
        <Button
          sx={{
            bgcolor: "#f77f00",
            color: "whitesmoke",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 16px",
            borderRadius: "8px",
            "&:hover": {
              bgcolor: "darkgray",
              color: "white",
            },
            boxShadow: "0px 4px 6px rgba(235, 235, 31, 0.1)",
            fontWeight: "bold",
          }}
          size="small"
          onClick={handlePlaceOrder}
        >
          Place an Order
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

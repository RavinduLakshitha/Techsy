import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const Orders = () => {
  const order = useSelector((state) => state.orderReducer.order);
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      {order ? (
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Order Summary
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Total Price:</strong> ${order.totalPrice}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 1,
                color: "#495057",
              }}
            >
              Items:
            </Typography>
            {order.items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  padding: 1,
                  border: "1px solid #dee2e6",
                  borderRadius: 2,
                  marginBottom: 1,
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography variant="body2">
                  {index + 1}. {item.productName}
                </Typography>
              </Box>
            ))}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="#f77f00"
              onClick={handleBackToHome}
              sx={{
                marginTop: 2,
                bgcolor: "#f77f00",
                color: "white",
                "&:hover": {
                  bgcolor: "#e85d04",
                },
              }}
            >
              Back to Home
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Typography variant="h6" sx={{ color: "#6c757d" }}>
          No orders found.
        </Typography>
      )}
    </Box>
  );
};

export default Orders;

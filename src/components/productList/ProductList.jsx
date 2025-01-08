import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/productSlice";
import { addToCart, updateCartQuantity } from "../../redux/cartSlice";

export default function ProductCard() {
  const { productsList } = useSelector((state) => state.productReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // function to handle adding/updating products in cart
  const handleAddCart = (product) => {
    const existingProduct = cartItems.find(
      (cartItem) => cartItem.productId === product.id
    );

    if (existingProduct) {
      const newQuantity = existingProduct.quantity + 1;

      dispatch(
        updateCartQuantity({
          id: existingProduct.id,
          quantity: newQuantity,
        })
      );
    } else {
      dispatch(
        addToCart({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
        })
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {productsList.map((product) => (
        <Card key={product.id} sx={{ maxWidth: 345, height: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Price: ${product.price}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Available Quantity: {product.quantityInStock}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleAddCart(product)}
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
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

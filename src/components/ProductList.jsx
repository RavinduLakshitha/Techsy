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
import { fetchProducts } from "../redux/productSlice";
import { addToCart, updateCartQuantity } from "../redux/cartSlice";
import Lapimg from "../assets/laptop.jpg";
import Hero from "./Hero";
import { toast } from "react-toastify";

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
      toast.success("Quantity Updated");
    } else {
      dispatch(
        addToCart({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
        })
      );
      toast.success("New item Added");
    }
  };

  return (
<div>
  <div>
    {/* Hero section that could include a banner or promotion */}
    <Hero />
  </div>
  <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#edf2f4",
        padding:"5px",
      }}
    >

      {/* Container to display products in a flex layout */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding:"5px",}}>
        {productsList.map((product) => (
          <Card
            key={product.id}
            sx={{
            
              margin:"20px",
              maxWidth: 350, 
              width:300,
              height: 400, 
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            {/* Card action area that makes the card clickable */}

            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={Lapimg}
                alt={product.name}
                sx={{ objectFit: "cover", // Ensures the image covers the space without distortion
                  width: "100%", // Makes the image responsive to the container width
                  height: "200px", // Sets the height of the image
                  display: "block", // Ensures it behaves as a block element
                  margin: "0 auto", // Centers the image horizontally
                  paddingTop: "20px", }}
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

            {/* Card actions section for Add to Cart button */}
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
                  "&:hover": {
                    bgcolor: "#e85d04",
                    color: "white",
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
    </div></div>

  );
}

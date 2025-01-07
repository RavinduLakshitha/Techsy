import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";

export default function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5132/api/products");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent:"center" , width: "1000px", alignItems:"center"}}>
      {products.map((product) => (
        <Card  key={product.id} sx={{ maxWidth: 345 }}>
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
              sx={{ bgcolor: "#1976d2", color: "white" }}
              size="small"
              color="primary"
              onClick={async () => {
                try {
                  const response = await fetch(
                    "http://localhost:5132/api/Cart", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        productId: product.id,
                        productName: product.name,
                        price: product.price,
                        quantity: 1,
                      }),
                    }
                  );

                  if (response.ok) {
                    const result = await response.json();
                    console.log("Item added to cart:", result);
                  } else {
                    console.error(
                      "Failed to add item to cart:",
                      response.status
                    );
                  }
                } catch (error) {
                  console.error("Error adding item to cart:", error);
                }
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

import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State for cart items

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5132/api/products');
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1, // Default quantity to 1
    };

    setCart((prevCart) => [...prevCart, cartItem]);
    console.log('Cart:', [...cart, cartItem]); // Log the updated cart
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {products.map((product) => (
        <Card key={product.id} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              width="160"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Price: ${product.price}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Available Quantity: {product.quantityInStock}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

import { Box, Typography, Button, TextField } from "@mui/material";
import lap from "../assets/laptopimg.jpg";

const Hero = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "#edf2f4",
          padding: { xs: 2, sm: 4 },
          borderRadius: 4,
          marginTop: 8,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left Part: Text Content */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: 2, md: 4 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#333",
              marginBottom: 2,
              textAlign: "left",
              fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
            }}
          >
            DISCOVER THE WORLD OF TECHSY!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              marginBottom: 4,
              textAlign: { xs: "center", md: "justify" },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Explore the ultimate destination for all your tech needs. Techsy, we
            offer a premium selection of the latest gadgets, smart devices, and
            must-have accessories, all at competitive prices. Stay ahead of the
            curve with our cutting-edge technology and enjoy a seamless shopping
            experience with secure checkout, speedy delivery, and top-notch
            customer support. Your journey into the world of innovation starts
            here!.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "#f77f00",
              color: "whitesmoke",
              alignItems: "left",
              padding: "8px 16px",
              borderRadius: "8px",
              justifyContent: "flex-start",
              fontSize: { xs: "0.8rem", sm: "1rem" },
              "&:hover": {
                bgcolor: "#e85d04",
                color: "white",
              },
              boxShadow: "0px 4px 6px rgba(235, 235, 31, 0.1)",
              fontWeight: "bold",
              display: { xs: "block" },
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Right Part: Image */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            height: { xs: "250px", sm: "300px", md: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={lap}
            alt="Hero Section"
            style={{
              width: "90%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "0 16px 16px 0",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          />
        </Box>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          marginTop: 4,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search products..."
          sx={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: 2,
            marginBottom: 5,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;

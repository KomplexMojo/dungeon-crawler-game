import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia } from '@mui/material';

function ImageGenerator() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleGenerate = () => {
    // Placeholder for future WASM or backend image generation logic
    console.log("Image generation triggered");
    // setImageSrc("data:image/png;base64,..."); // example update
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Image Generator
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGenerate}>
        Generate Image
      </Button>
      {imageSrc && (
        <Card sx={{ mt: 2, maxWidth: 400 }}>
          <CardMedia
            component="img"
            image={imageSrc}
            alt="Generated visual"
          />
        </Card>
      )}
    </Box>
  );
}

export default ImageGenerator;

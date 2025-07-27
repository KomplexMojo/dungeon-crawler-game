
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from '@mui/material';

function NFTViewer() {
  const [nfts, setNfts] = useState([]);

  const handleLoadNFTs = () => {
    console.log("Loading NFTs for connected wallet...");
    // Placeholder for actual wallet/NFT retrieval logic
    setNfts([
      { id: 1, cid: "QmExampleCid1", imageUrl: "https://via.placeholder.com/150" },
      { id: 2, cid: "QmExampleCid2", imageUrl: "https://via.placeholder.com/150" }
    ]);
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        NFT Viewer
      </Typography>
      <Button variant="contained" onClick={handleLoadNFTs}>
        Load My NFTs
      </Button>
      <Grid container spacing={2} mt={2}>
        {nfts.map((nft) => (
          <Grid item xs={12} sm={6} md={4} key={nft.id}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={nft.imageUrl}
                alt={`NFT ${nft.id}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  CID: {nft.cid}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NFTViewer;
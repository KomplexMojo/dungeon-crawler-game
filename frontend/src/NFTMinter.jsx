
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function NFTMinter() {
  const [cid, setCid] = useState('');
  const [tokenValue, setTokenValue] = useState('');

  const handleMint = () => {
    if (!cid || !tokenValue) return;
    console.log(`Minting NFT with CID: ${cid} and token value: ${tokenValue}`);
    // Placeholder for smart contract interaction logic
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        NFT Minter
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <TextField
          label="CID"
          variant="outlined"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
        />
        <TextField
          label="Token Value"
          variant="outlined"
          type="number"
          value={tokenValue}
          onChange={(e) => setTokenValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleMint}
          disabled={!cid || !tokenValue}
        >
          Mint NFT
        </Button>
      </Box>
    </Box>
  );
}

export default NFTMinter;
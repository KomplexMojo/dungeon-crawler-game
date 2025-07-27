
import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';

function IPFSPinner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cid, setCid] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePin = () => {
    if (!selectedFile) return;
    console.log("Pinning file to IPFS:", selectedFile.name);
    // Placeholder for IPFS pinning logic
    // setCid("Qm...");  // update with returned CID
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        IPFS Pinner
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Button variant="contained" component="label">
          Select Image
          <input type="file" accept="image/*" hidden onChange={handleFileChange} />
        </Button>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePin}
            disabled={!selectedFile}
          >
            Pin to IPFS
          </Button>
        </Box>
        {cid && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              CID: {cid}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default IPFSPinner;
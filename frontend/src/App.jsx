import React from 'react';
import { Container, Box } from '@mui/material';

import Header from './Header';
import ImageGenerator from './ImageGenerator';
import IPFSPinner from './IPFSPinner';
import NFTMinter from './NFTMinter';
import NFTViewer from './NFTViewer';

function App() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Header />
        <ImageGenerator />
        <IPFSPinner />
        <NFTMinter />
        <NFTViewer />
      </Box>
    </Container>
  );
}

export default App;
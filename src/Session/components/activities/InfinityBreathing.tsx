// Copyright - 2025 SouravBandyopadhyay (Sourav Bandyopadhyay) 
// https://uiverse.io/SouravBandyopadhyay/stupid-eagle-66
// License MIT
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Typography } from '@mui/material';
import FadingText from './components/FadingText';
import { motion } from 'framer-motion';
import { fadeVariant } from '../../../utils/helpers';

const InfinityBreathing = ({ onSend, showInstructions = false }) => {
  const [highlightLeft, setHighlightLeft] = useState(true);
  const [started, setStarted] = useState(false);
  const messages = showInstructions ? [
    'Breathing is a simple yet powerful way to calm your mind and body.',
    'Let’s practice breathing together!',
    'Follow along with the picture!',
  ] : ['Follow along with the picture!'];

  useEffect(() => {
    if (!started) return;

    let intervalId: number;
    let timeoutId: number;

    // First toggle happens after a short delay (e.g., 2s)
    timeoutId = window.setTimeout(() => {
      setHighlightLeft(prev => !prev);

      // Then start toggling every 5s
      intervalId = window.setInterval(() => {
        setHighlightLeft(prev => !prev);
      }, 5025);
    }, 4100); // small offset (2s)

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [started]);


  return (
    <StyledWrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
      >

        <Box
          sx={{
            width: "100%",
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Text first, takes all available space */}
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FadingText
              messages={messages}
              stayOnLastMessage={true}
              interval={3000}
              onCompleteCycle={() => setStarted(true)}
            />
          </Box>

          {/* Button sits to the right, vertical center */}
          {started && (
            <Button
              variant="contained"
              onClick={() =>
                onSend("Breathing exercise completed!", false, "infinity_breathing")
              }
              color="primary"
              size="small"
              sx={{
                ml: 2, // space between text and button
              }}
            >
              Done
            </Button>
          )}
        </Box>

        {started && (
          <motion.div
            key="grounding-game"
            variants={fadeVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: '100%' }}
          >
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              width="100%"
              mb={2}
              mt={2}
            >
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: !highlightLeft ? 'bold' : 'normal',
                    color: !highlightLeft ? '#4E4FEB' : '#888',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Breathe out
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: highlightLeft ? 'bold' : 'normal',
                    color: highlightLeft ? '#4E4FEB' : '#888',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Breathe in
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              ` <svg
                viewBox="49 27 88 39"
                // height="300px"
                width="100%"
                preserveAspectRatio="xMidYMid meet"
              >`
                <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit={10} strokeLinejoin="round" strokeLinecap="round" strokeWidth={4} fill="none" id="outline1" stroke="#4E4FEB" />
                <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit={10} strokeLinejoin="round" strokeLinecap="round" strokeWidth={4} fill="none" id="outline2" stroke="#4E4FEB" />
                <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit={10} strokeLinejoin="round" strokeLinecap="round" strokeWidth={4} stroke="#4E4FEB" fill="none" opacity="0.05" id="outline-bg" />
              </svg>
            </Box>
          </motion.div>
        )}

      </Box>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #outline1 {
    stroke-dasharray: 10px, 243px; /* 60px visible, rest is invisible */
    stroke-dashoffset: -3px;
    animation: moveLine1 10s linear infinite;
    opacity: 1;

  }
  #outline2 {
    stroke-dasharray: 10px, 243px; /* 60px visible, rest is invisible */
    stroke-dashoffset: 11px;
    animation: moveLine2 10s linear infinite;
    animation-delay: 9.42s;
    opacity: 1;
  }

  @keyframes moveLine1 {
    to {
      stroke-dashoffset: -234px; /* moves full loop around */
    }
      @0% {
      stroke-dasharray: 0px, 243px;
}
      25% {
      stroke-dasharray: 10px, 243px;}
  }
  @keyframes moveLine2 {
  to {
      stroke-dashoffset: -234px; /* moves full loop around */
    }
    0% {
    opacity: 1;
    stroke-dasharray: 10px, 243px;
  }
  8% {
    opacity: 1;
  }
  8.1% {
    opacity: 0;
  }
  
  100% {
    opacity: 0;
    stroke-dasharray: 0px, 243px;
  }
}
  }
`;
export default InfinityBreathing;

import { Box } from "@mui/material";
import React, { useState } from "react";

interface ImageRevealGameProps {
  onSend: (text: string, userSelected: boolean, activity: string) => void;
}

const ImageRevealGame: React.FC<ImageRevealGameProps> = ({ onSend }) => {
  const GRID_SIZE = 3;
  const TILE_SIZE = 100; // Adjust as needed
  const IMAGE_SIZE = GRID_SIZE * TILE_SIZE;

  const [hiddenTiles, setHiddenTiles] = useState(
    Array.from({ length: GRID_SIZE * GRID_SIZE }, () => true)
  );
  console.log(hiddenTiles)
  const handleClick = (index: number) => {
    console.log("Clicked on tile", index);
    setHiddenTiles((prev) => prev.map((tile, i) => (i === index ? false : tile)));
  };

  return (
    <Box position="relative" width="300px" height="300px">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="300px"
        height="300px"
      // bgcolor="primary.main"
      >
        <img
          src="favicon2.png" // Replace with your image URL
          alt="Hidden"
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        />
      </Box>
      <Box
        position="absolute"
        top="0"
        left="0"
        width="300px"
        height="300px"
      // bgcolor="secondary.main"
      >
        <div
          className="absolute top-0 left-0"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            // backgroundColor: "red"
          }}
        >
          {hiddenTiles.map((isHidden, index) => (
            // isHidden && (
            <Box
              key={index}
              onClick={() => handleClick(index)}
              sx={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                backgroundColor: isHidden ? 'green' : null
              }}
            />
            // )
          ))}
        </div>
      </Box>
    </Box>



    // </div>
  );
};

export default ImageRevealGame;



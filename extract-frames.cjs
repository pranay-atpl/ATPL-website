const gifFrames = require('gif-frames');
const fs = require('fs');
const path = require('path');

const gifPath = path.resolve(__dirname, 'src/assets/experience_centre.gif');
const outDir = path.resolve(__dirname, 'src/assets/frames');

if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
}

gifFrames({ url: gifPath, frames: 'all', outputType: 'jpg', cumulative: true })
  .then(function (frameData) {
    frameData.forEach(function (frame, index) {
      const formattedIndex = String(index).padStart(4, '0');
      const filename = path.resolve(outDir, `frame-${formattedIndex}.jpg`);
      frame.getImage().pipe(fs.createWriteStream(filename));
    });
    console.log(`Extracted ${frameData.length} frames successfully.`);
  })
  .catch(console.error);

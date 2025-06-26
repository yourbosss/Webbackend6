import sharp from 'sharp';
import path from 'path';

export const processImage = async (filePath: string): Promise<string> => {
  const outputPath = `uploads/processed_${path.basename(filePath)}`;

  const svgBuffer = Buffer.from(`
    <svg width="800" height="600">
      <text x="50%" y="50%" font-family="Arial" font-size="40" 
            fill="rgba(255,255,255,0.5)" text-anchor="middle">Course Image</text>
    </svg>
  `);

  await sharp(filePath)
    .resize(800, 600, { fit: 'inside' })
    .jpeg({ quality: 80 })
    .composite([{ input: svgBuffer, blend: 'over' }])
    .toFile(outputPath);

  return outputPath;
};

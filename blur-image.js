import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

async function blurImage() {
  try {
    // Load the original image
    const image = await loadImage('client/public/pricing-dashboard.png');
    
    // Create a canvas with the same dimensions
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    
    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0);
    
    // Apply a blur effect to specific regions (where titles/names are)
    // Assuming titles are in the upper part of the dashboard
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    
    // Draw rectangles over areas with sensitive information
    // Top header area (title area)
    ctx.fillRect(0, 0, image.width, 60);
    
    // Left sidebar (might contain names/categories)
    ctx.fillRect(0, 60, 200, image.height - 60);
    
    // Any table headers or data cells that might contain sensitive info
    // Adjust these coordinates based on the actual image layout
    ctx.fillRect(200, 60, image.width - 200, 40);
    
    // Write the blurred image to a file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('client/public/pricing-dashboard-blurred.png', buffer);
    
    console.log('Image successfully blurred!');
  } catch (error) {
    console.error('Error blurring image:', error);
  }
}

blurImage();
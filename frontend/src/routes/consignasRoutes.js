import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/consignas.json'); 
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.render('consignas/consignas', { data });
});

export default router;
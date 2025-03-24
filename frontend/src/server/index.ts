import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000/api/v1";

app.get('/api/prices', async (req: Request, res: Response) => {
  const { coin_ids } = req.query;

  if (!coin_ids) {
    res.status(400).json({ error: 'coin_ids query parameter is required' });
    return;
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/prices/`, {
      params: { coin_ids },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on PORT: ${PORT}`);
});

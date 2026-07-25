import app from './src/app.js';
import { config } from './src/config/index.js';

app.listen(config.port, () => {
  console.log(`Page Pulse backend running on http://localhost:${config.port}`);
});
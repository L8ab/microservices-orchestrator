const express = require('express');
const orchestrator = require('./orchestrator');

const app = express();
app.use(express.json());

app.post('/services/:name/register', (req, res) => {
  orchestrator.registerService(req.params.name, req.body);
  res.json({ success: true });
});

app.post('/services/:name/call', async (req, res) => {
  try {
    const result = await orchestrator.callService(
      req.params.name,
      req.body.endpoint,
      req.body.data
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Microservices Orchestrator running on port ${PORT}`);
});

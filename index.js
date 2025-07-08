import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT  = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "TroquePorAlgoUnico";

// Confirmação do webhook
app.get("/webhook", (req, res) => {
  const { "hub.mode": m, "hub.verify_token": t, "hub.challenge": c } = req.query;
  if (m === "subscribe" && t === VERIFY_TOKEN) return res.status(200).send(c);
  res.sendStatus(403);
});

// Recebendo mensagens
app.post("/webhook", bodyParser.json(), (req, res) => {
  if (req.body.object !== "whatsapp_business_account") return res.sendStatus(404);

  req.body.entry?.forEach(e =>
    e.changes?.forEach(ch => {
      const m = ch.value?.messages?.[0];
      if (m) console.log(`[${m.timestamp}] ${m.from}: ${m.text?.body || "<não-texto>"}`);
    })
  );

  res.sendStatus(200);
});

app.listen(PORT, () => console.log("Webhook ON em", PORT));

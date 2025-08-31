import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Schemas
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  fullDescription: String,
  date: String,
  time: String,
  location: String,
  capacity: Number,
  registered: { type: Number, default: 0 },
  category: String,
  status: { type: String, default: "Draft" },
  featured: { type: Boolean, default: false }
});

const workshopSchema = new mongoose.Schema({
  title: String,
  description: String,
  fullDescription: String,
  date: String,
  time: String,
  location: String,
  capacity: Number,
  registered: { type: Number, default: 0 },
  level: String,
  duration: String,
  status: { type: String, default: "Draft" },
  featured: { type: Boolean, default: false }
});

const Event = mongoose.model("Event", eventSchema);
const Workshop = mongoose.model("Workshop", workshopSchema);

// Routes
app.get("/api/events", async (req, res) => res.json(await Event.find()));
app.post("/api/events", async (req, res) => res.json(await Event.create(req.body)));
app.put("/api/events/:id", async (req, res) => res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/api/events/:id", async (req, res) => res.json(await Event.findByIdAndDelete(req.params.id)));

app.get("/api/workshops", async (req, res) => res.json(await Workshop.find()));
app.post("/api/workshops", async (req, res) => res.json(await Workshop.create(req.body)));
app.put("/api/workshops/:id", async (req, res) => res.json(await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/api/workshops/:id", async (req, res) => res.json(await Workshop.findByIdAndDelete(req.params.id)));

app.listen(PORT, () => console.log("Server running on port 5000"));

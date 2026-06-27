import express from "express";
import { ObjectId } from "mongodb";

export default function expenseRoutes(db) {
  const router = express.Router();
  const collection = db.collection("expenses");

  // GET - fetch all expenses
  router.get("/", async (req, res) => {
    try {
      const expenses = await collection
        .find({})
        .sort({ date: -1 })
        .toArray();
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST - add new expense
  router.post("/", async (req, res) => {
    try {
      const { title, amount, category, date } = req.body;
      const newExpense = {
        title,
        amount: parseFloat(amount),
        category,
        date: date || new Date().toISOString().split("T")[0],
        createdAt: new Date(),
      };
      const result = await collection.insertOne(newExpense);
      res.json({ ...newExpense, _id: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE - remove an expense
  router.delete("/:id", async (req, res) => {
    try {
      await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET - summary by category (MongoDB aggregation)
  router.get("/summary", async (req, res) => {
    try {
      const summary = await collection
        .aggregate([
          {
            $group: {
              _id: "$category",
              total: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
          { $sort: { total: -1 } },
        ])
        .toArray();
      res.json(summary);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

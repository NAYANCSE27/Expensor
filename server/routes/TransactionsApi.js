import { Router } from "express";
import Transaction from "../models/Transaction.js";
const router = Router();
import passport from "passport";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ data: transactions });
  }
);

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "Transaction received" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.json({ message: "Transaction deleted" });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  await Transaction.updateOne({ _id: id }, { $set: req.body });
  res.json({ message: "Transaction updated" });
});

export default router;

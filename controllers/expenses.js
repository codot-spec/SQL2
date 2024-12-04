const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const newExpense = await Expense.create({ amount, description, category });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding expense' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

exports.updateExpense = async (req, res) => {
  const expenseId = req.params.expenseId;
  const { amount, description, category } = req.body;

  try {
    const [updatedCount] = await Expense.update(
      { amount, description, category },
      { where: { id: expenseId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const updatedExpense = await Expense.findByPk(expenseId);
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating expense' });
  }
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.expenseId;

  try {
    const deletedCount = await Expense.destroy({
      where: { id: expenseId }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting expense' });
  }
};
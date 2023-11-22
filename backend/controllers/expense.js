const ExpenseSchema = require("../models/ExpenseModel")



exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description ||!date){
            return res.status(400).json({message: 'All feilds are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income);
}

exports.getExpense = async (req, res) => {
    try {
        const Expense = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(Expense)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

// exports.deleteIncome = async (req, res) => {
//     const {id} = res.params;
//     IncomeSchema.findByIdAndDelete(id)
//     .then((income) =>{
//         res.status(200).json({message: 'Income Deleted'});
//     } )
//     .catch((err) => {
//         res.status(500).json({message: 'Server Error'});
//     })
// }



exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}
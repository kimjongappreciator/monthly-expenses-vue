export type transactionModel ={
    id: number,    
    name: string,
    description?: string,
    amount: number,
    monthId: number,
    category: string,
    date: Date
}

export type MonthModel = {
    id: number,
    name: string,
    description: string,
    year: number,    
    days: number,
    income: transactionModel[],
    expenses: transactionModel[],
    totalIncome: number,
    totalExpenses: number,
    balance: number
}
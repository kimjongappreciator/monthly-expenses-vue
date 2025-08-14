type CategoryModel = {
  id: number;
  importance: number
  name: string;         
  description?: string;              
};


export type transactionModel ={
    id: number,
    MonthId: number,
    name: string,
    description?: string,
    amount: number,
    monthId: number,    
    category: CategoryModel
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
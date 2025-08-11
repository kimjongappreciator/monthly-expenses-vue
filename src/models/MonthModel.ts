type CategoryModel = {
  id: number;
  importance: number
  name: string;         
  description?: string; 
  icon: string;         
  color: string;
};


type ExpenseModel ={
    id: number,
    MonthId: number,
    name: string,
    description?: string,
    amount: number,
    monthId: number,    
    category: CategoryModel
    date: Date
}

type IncomeModel ={
    id: number,
    MonthId: number,
    name: string,
    description: string,
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
    income?: IncomeModel[],
    expenses?: ExpenseModel[],
    totalIncome: number,
    totalExpenses: number,
    balance: number
}
type CategoryModel = {
  id: Number;
  importance: Number
  name: string;         
  description?: string; 
  icon: string;         
  color: string;        
};


type ExpenseModel ={
    id: Number,
    MonthId: Number,
    name: string,
    description?: string,
    amount: Number,
    monthId: Number,
    categoryId: Number,    
    date: Date
}

type IncomeModel ={
    id: Number,
    MonthId: Number,
    name: string,
    description: string,
    amount: Number,
    monthId: Number,
    categoryId: Number,    
    date: Date
}

export type MonthModel = {
    id: Number,
    name: string,
    description: string,
    year: Number,    
    days: Number,
    income?: IncomeModel
    expenses?: ExpenseModel
}
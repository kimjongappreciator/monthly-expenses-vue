import type { transactionModel } from "./MonthModel";

//mock para mes de enero
export const incomes: transactionModel[] = [
  {
    id: 1,
    MonthId: 202508,
    name: "Salario",
    description: "Pago mensual",
    amount: 2500,
    monthId: 202508,
    category: {
      id: 4,
      importance: 5,
      name: "Trabajo",
      description: "Ingresos por empleo",            
    },
    date: new Date("2025-08-01")
  },
  {
    id: 2,
    MonthId: 202508,
    name: "Venta de laptop",
    description: "Venta de laptop usada",
    amount: 800,
    monthId: 202508,
    category: {
      id: 5,
      importance: 3,
      name: "Venta",
      description: "Ingresos por venta de objetos",            
    },
    date: new Date("2025-08-04")
  },
  {
    id: 3,
    MonthId: 202508,
    name: "Intereses bancarios",
    description: "Ganancias por ahorro",
    amount: 35.25,
    monthId: 202508,
    category: {
      id: 6,
      importance: 1,
      name: "Finanzas",
      description: "Ingresos pasivos y financieros",            
    },
    date: new Date("2025-08-07")
  }
];
import type { transactionModel } from "./MonthModel";

//mock para mes de enero
export const expenses: transactionModel[] = [
  {
    id: 1,
    MonthId: 202508,
    name: "Supermercado",
    description: "Compra semanal en supermercado",
    amount: 250.75,
    monthId: 202508,
    category: {
      id: 1,
      importance: 3,
      name: "Alimentación",
      description: "Gastos de comida y supermercado",            
    },
    date: new Date("2025-08-03")
  },
  {
    id: 2,
    MonthId: 202508,
    name: "Transporte público",
    description: "Recargas de tarjeta de bus",
    amount: 45,
    monthId: 202508,
    category: {
      id: 2,
      importance: 2,
      name: "Transporte",
      description: "Gastos de movilidad",            
    },
    date: new Date("2025-08-05")
  },
  {
    id: 3,
    MonthId: 202508,
    name: "Electricidad",
    description: "Factura de luz del mes",
    amount: 120.5,
    monthId: 202508,
    category: {
      id: 3,
      importance: 4,
      name: "Servicios",
      description: "Servicios básicos como agua, luz, gas",            
    },
    date: new Date("2025-08-08")
  }
];

export type Admin = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type User = {
    fullName: string;
    phone: number;
    email: string;
  }
  
  export interface IncomeItem {
    incomeLabel: string;
    incomeValue: number;
  }
  
  export interface AssetItem {
    assetLabel: string;
    assetValue: number;
  }
  
  export interface ExpenseItem {
    expenseLabel: string;
    expenseValue: number;
  }
  
  export interface LiabilityItem {
    liabilityLabel: string;
    liabilityValue: number;
  }
  
  export type UserData = {
    id: string;
    userDetails: User;
    income: IncomeItem[];
    totalIncome: number;
    assets: AssetItem[];
    totalAssets: number;
    expenses: ExpenseItem[];
    totalExpenses: number;
    liabilities: LiabilityItem[];
    totalLiabilities: number;
    netWorth: number;
    notes: string;
    timestamp: Date;
  }
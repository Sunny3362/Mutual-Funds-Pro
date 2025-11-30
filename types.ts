export enum UserRole {
  ADMIN = 'ADMIN',
  INVESTOR = 'INVESTOR',
  ADVISOR = 'ADVISOR',
  ANALYST = 'ANALYST',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
}

export interface Fund {
  id: string;
  name: string;
  category: 'Equity' | 'Debt' | 'Hybrid' | 'ELSS' | 'Liquid' | 'Index';
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  nav: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  rating: number; // 1-5 stars
  description: string;
  fundManager: string;
  expenseRatio: number;
}

export interface FNOData {
  symbol: string;
  expiry: string;
  strikePrice?: number;
  type: 'Future' | 'CE' | 'PE'; // Future, Call Option, Put Option
  price: number;
  change: number;
  changePercent: number;
  openInterest: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface InvestmentData {
  month: string;
  amount: number;
}

export interface PortfolioItem {
  id: string;
  fundId: string;
  fundName: string;
  investedAmount: number;
  units: number;
  purchaseDate: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  deadlineYear: number;
  category: 'Housing' | 'Education' | 'Retirement' | 'Vehicle' | 'Vacation' | 'Other';
  createdAt: number;
}

export interface MarketHistoryPoint {
  time: string;
  nifty: number;
  banknifty: number;
}
import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number, // 12 500 customers;
    yearlySalesTotal: Number, // 22 000 sales
    yearlyTotalSoldUnits: Number, // 35 000 units sold
    year: Number,   // 2023
    monthlyData: [
      {
        month: String,   // may
        totalSales: Number,  // 225
        totalUnits: Number,  // 450
      },
    ],
    dailyData: [
      {
        date: String, // yesterday
        totalSales: Number, // 360
        totalUnits: Number, // 800
      },
    ],
    salesByCategory: {
      type: Map, 
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;
"use client";

import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  CreditCard,
  RotateCcw,
  Wallet,
  PiggyBank,
  Truck,
  Wrench,
  Calendar,
  GitBranch,
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "./_components/StatCard";

import RecentSales from "./_components/RecentSales";
import DueList from "./_components/DueList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBranches } from "@/hooks/use-branches";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { data: branches, isLoading } = useBranches();
  const activeBranches = branches?.filter((b) => b.isActive) ?? [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your business overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 sm:w-[180px]">
              <GitBranch className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {isLoading ? (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              ) : activeBranches.length > 0 ? (
                activeBranches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id.toString()}>
                    {branch.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No branches found
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          <Select defaultValue="today">
            <SelectTrigger className="w-40 sm:w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="lastmonth">Last Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatCard
            title="Total Sales"
            value={1250000}
            icon={DollarSign}
            trend={{ value: "+12.5%", isPositive: true }}
            colorClass="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Total Due Sale"
            value={270000}
            icon={AlertCircle}
            colorClass="bg-gradient-to-br from-orange-500 to-orange-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Due Paid"
            value={125000}
            icon={TrendingUp}
            trend={{ value: "+15.3%", isPositive: true }}
            colorClass="bg-gradient-to-br from-teal-500 to-teal-600 text-white"
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Total Expense"
            value={185000}
            icon={Wallet}
            colorClass="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Total Profit"
            value={895000}
            icon={PiggyBank}
            trend={{ value: "+18.7%", isPositive: true }}
            colorClass="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Service Profit"
            value={85000}
            icon={Wrench}
            trend={{ value: "+22.1%", isPositive: true }}
            colorClass="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white"
          />
        </motion.div>
      </motion.div>

      {/* Quick Actions & Lists */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <RecentSales />
        <DueList />
      </motion.div>
    </div>
  );
}

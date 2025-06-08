import { prisma } from "@/lib/prisma";
import { AnalyticsCard } from "@/components/admin/analytics-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { BarChart3, DollarSign, MousePointer, TrendingUp } from "lucide-react";
import { subDays, format } from "date-fns";

export const dynamic = "force-dynamic";

async function getAnalytics() {
  // Get total clicks
  const totalClicks = await prisma.clickTracking.count();

  // Get clicks from last 30 days
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentClicks = await prisma.clickTracking.count({
    where: {
      clickedAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  // Calculate click growth
  const previousPeriodClicks = await prisma.clickTracking.count({
    where: {
      clickedAt: {
        gte: subDays(thirtyDaysAgo, 30),
        lt: thirtyDaysAgo,
      },
    },
  });
  const clickGrowth = previousPeriodClicks
    ? ((recentClicks - previousPeriodClicks) / previousPeriodClicks) * 100
    : 0;

  // Get revenue data for the chart
  const revenueData = await prisma.clickTracking.groupBy({
    by: ["clickedAt"],
    _count: true,
    orderBy: {
      clickedAt: "asc",
    },
    where: {
      clickedAt: {
        gte: subDays(new Date(), 30),
      },
    },
  });

  // Calculate estimated revenue (assuming $1 per click for demo)
  const estimatedRevenue = recentClicks;
  const previousRevenue = previousPeriodClicks;
  const revenueGrowth = previousRevenue
    ? ((estimatedRevenue - previousRevenue) / previousRevenue) * 100
    : 0;

  // Format data for the chart
  const chartData = revenueData.map((item) => ({
    date: format(item.clickedAt, "yyyy-MM-dd"),
    clicks: item._count,
    revenue: item._count, // Using clicks as revenue for demo
  }));

  return {
    totalClicks,
    recentClicks,
    clickGrowth,
    estimatedRevenue,
    revenueGrowth,
    chartData,
  };
}

export default async function AdminDashboard() {
  const analytics = await getAnalytics();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Clicks"
          value={analytics.totalClicks.toLocaleString()}
          icon={<MousePointer className="h-6 w-6 text-primary" />}
        />
        <AnalyticsCard
          title="Recent Clicks (30d)"
          value={analytics.recentClicks.toLocaleString()}
          change={analytics.clickGrowth}
          changeLabel="vs last period"
          icon={<BarChart3 className="h-6 w-6 text-primary" />}
        />
        <AnalyticsCard
          title="Estimated Revenue"
          value={`$${analytics.estimatedRevenue.toLocaleString()}`}
          change={analytics.revenueGrowth}
          changeLabel="vs last period"
          icon={<DollarSign className="h-6 w-6 text-primary" />}
        />
        <AnalyticsCard
          title="Conversion Rate"
          value="2.5%"
          change={0.5}
          changeLabel="vs last period"
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={analytics.chartData} />
    </div>
  );
} 
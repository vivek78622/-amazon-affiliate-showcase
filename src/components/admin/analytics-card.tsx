interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

export function AnalyticsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
}: AnalyticsCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        {icon && (
          <div className="p-3 bg-primary/10 rounded-full">{icon}</div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-4">
          <div className="flex items-center">
            <span
              className={`text-sm font-medium ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : isNegative
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            {changeLabel && (
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {changeLabel}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
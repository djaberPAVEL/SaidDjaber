import React from 'react';
import { ThemeColors } from '../theme/colors';

interface TotalDisplayProps {
  total: number;
  customerCash: string;
  change: number;
  colors:  ThemeColors['primary'];
}

export const TotalDisplay: React.FC<TotalDisplayProps> = ({
  total,
  customerCash,
  change,
  colors
}) => {
  return (
    <div
      className="w-full p-6 shadow-lg"
      style={{
        background: `linear-gradient(to left, ${colors.base}, ${colors.lighter})`,
      }}
    >
      <div className="flex justify-between items-center">
        <div
          className="text-8xl font-bold font-mono text-white"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          {total.toFixed(2)}
          <span className="text-4xl mr-2">دج</span>
        </div>
        <div
          className="flex flex-col text-white"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <div className="text-2xl font-bold">
            <span>المبلغ المعطى: {customerCash} دج</span>
          </div>
          <div className="text-2xl font-bold mt-2">
            <span>المبلغ المتبقي: {change.toFixed(2)} دج</span>
          </div>
        </div>
      </div>
    </div>
  );
};

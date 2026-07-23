import ReactECharts from 'echarts-for-react';
import { StatusSlice } from '@/api/types';
import { STATUS_COLOR } from '@/lib/colors';
import { useTheme } from '@/context/ThemeContext';

/** Rides distribution pie (percentage + status labels), with a total-volume caption. */
export function StatusDonut({ data }: { data: StatusSlice[] }) {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const borderColor = dark ? '#171e27' : '#fff';
  const labelColor = dark ? '#a8b2c0' : '#5b6472';
  const lineColor = dark ? '#3a4553' : '#c7cfdb';

  const total = data.reduce((s, d) => s + d.count, 0);
  const option = {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    series: [
      {
        type: 'pie',
        radius: '68%',
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor, borderWidth: 2 },
        label: {
          show: true,
          formatter: '{d}% {b}',
          fontSize: 11,
          fontWeight: 600,
          color: labelColor,
        },
        labelLine: { length: 10, length2: 10, lineStyle: { color: lineColor } },
        data: data.map((d) => ({
          name: d.status.charAt(0) + d.status.slice(1).toLowerCase(),
          value: d.count,
          itemStyle: { color: STATUS_COLOR[d.status] || '#2f6bc4' },
        })),
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} style={{ height: 260 }} opts={{ renderer: 'svg' }} />
      <div className="pie-caption">TOTAL VOLUME: {total} rides</div>
    </div>
  );
}

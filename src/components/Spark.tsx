import ReactECharts from 'echarts-for-react';

// hex (#rrggbb) → rgba string with the given alpha.
function rgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** A clean, smooth ECharts area sparkline for a KPI card. */
export function Spark({ data, color }: { data: number[]; color: string }) {
  const option = {
    animation: false,
    grid: { left: 2, right: 2, top: 8, bottom: 2 },
    xAxis: { type: 'category', show: false, boundaryGap: false, data: data.map((_, i) => i) },
    yAxis: { type: 'value', show: false, min: 0 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#e6eaf0',
      borderWidth: 1,
      padding: [4, 8],
      textStyle: { color: '#1f2a37', fontSize: 12 },
      formatter: (p: any) => `<b>${p?.[0]?.data ?? 0}</b>`,
      axisPointer: { type: 'line', lineStyle: { color: '#e6eaf0' } },
    },
    series: [
      {
        type: 'line',
        data,
        smooth: 0.4,
        symbol: 'circle',
        symbolSize: 1,
        showSymbol: false,
        lineStyle: { width: 2.5, color },
        itemStyle: { color },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: rgba(color, 0.3) },
              { offset: 1, color: rgba(color, 0) },
            ],
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />;
}

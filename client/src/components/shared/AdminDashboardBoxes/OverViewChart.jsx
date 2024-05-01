/* eslint-disable react/prop-types */
import { ResponsiveLine } from "@nivo/line";
import { useMemo } from "react";

const OverViewChart = ({ data, view, isDashboard = false }) => {
    // const lines = useMemo(() => {
    //     if (!data) return [];

    //     const { monthlyData } = data;
    //     const salesLine = {
    //         id: "sales",
    //         color: "#00afaa",
    //         data: Object.values(monthlyData).map(({ month, totalSales }) => ({
    //             x: month,
    //             y: totalSales
    //         }))
    //     };

    //     const unitsLine = {
    //         id: "units",
    //         color: "#00afaa",
    //         data: Object.values(monthlyData).map(({ month, totalUnits }) => ({
    //             x: month,
    //             y: totalUnits
    //         }))
    //     };

    //     return view === "sales" ? [salesLine] : [unitsLine];
    // }, [data, view]);
 const [totalSalesLine,totalUnitesLine] = useMemo(()=> {
    if(!data) return []
     const { monthlyData } = data;
     const totalSalesLine = {
       id: "totalSales",
       color: "#00afaa",
       data: []
     }
     const totalUnitesLine= {
       id: "totalUnits",
       color: "#00afaa",
       data: []
     }
      Object.values(monthlyData).reduce((acc, {month,totalSales,totalUnits})=> {
        const curSales = acc.sales + totalSales;
        const curUnites = acc.unites + totalUnits;
          totalSalesLine.data = [
            ...totalSalesLine.data,
           { x: month, y: curSales}
          ]
          totalUnitesLine.data= [
            ...totalUnitesLine.data,
            {x:month, y: curUnites}
          ]
          return {sales: curSales, unites:curUnites}
      }, {sales: 0, unites: 0})
      return [[totalSalesLine], [totalUnitesLine]]
 }, [data])
    return (
        <ResponsiveLine
            data={view === "sales" ? totalSalesLine : totalUnitesLine}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: "#00afaa",
                  },
                },
                legend: {
                  text: {
                    fill: "#fff",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#00afaa",
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "#fff",
                  },
                },
              },
              legends: {
                text: {
                  fill: "#fff",
                },
              },
              tooltip: {
                container: {
                  color: "#333",
                },
              },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
           
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: v => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickValues: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : `Total ${view === "sales" ? "Revenue" : "Units"} for year`,
                legendOffset: -60,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={!isDashboard ? [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ] : undefined}
        />
    );
};

export default OverViewChart;

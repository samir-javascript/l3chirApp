/* eslint-disable no-unused-vars */

import AdminNavbar from "@/components/shared/AdminDashboardBoxes/AdminNavbar"
import { AdminSidebar } from "@/components/shared/AdminDashboardBoxes/AdminSidebar"
import { useGetStatesQuery } from "@/slices/ProductsApiSlice"
import { ResponsiveLine } from "@nivo/line"
import { useMemo, useState } from "react"





const Monthly = () => {

  const {data,isLoading} = useGetStatesQuery()
   
    const [open,setOpen] = useState(false)
   const  [formattedData] = useMemo(()=>  {
       if(!data) return []
       const { monthlyData} = data;
       const totalSalesLine = {
        id: "totalSales",
        color: "#00afaa",
        data: []
       }
       const totalUnitsLine= {
        id: "totalUnits",
        color: "#ff00aa",
        data: []
       }
       Object.values(monthlyData).forEach(({month,totalSales,totalUnits})=>  {
         totalSalesLine.data = [
           ...totalSalesLine.data,
           {x:month,y: totalSales}
         ]
         totalUnitsLine.data = [
          ...totalUnitsLine.data,
          {x:month,y: totalUnits}
        ]

       })
       const formattedData = [totalSalesLine,totalUnitsLine]
       return [formattedData]
   }, [data])
  
  
  if(isLoading) return "Loading..."
  return (
    <div className="flex w-full h-screen bg-[#101538] flex-col">
    <AdminNavbar open={open} setOpen={setOpen} />
    <AdminSidebar open={open} setOpen={setOpen} />
    <div className="h-[75vh] ">
    <ResponsiveLine
    data={formattedData}
    
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
    colors={{datum:"color"}}
    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false
    }}
    yFormat=" >-.2f"
    // curve="catmullRom"
    axisTop={null}
    axisRight={null}
    axisBottom={{
       
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        legend:  "Month",
        legendOffset: 60,
        legendPosition: 'middle',
        truncateTickAt: 0
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Total',
        legendOffset: -50,
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
    legends={  [
        {
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 50,
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
    ]}
/>
    </div> 
   
</div>
  )
}
export default Monthly

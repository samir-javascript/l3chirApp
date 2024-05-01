import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { useGetStatesQuery } from "@/slices/ProductsApiSlice";
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import { ResponsiveLine } from "@nivo/line";
const Daily = () => {
  const [open,setOpen] = useState(false)
  const {data,isLoading} = useGetStatesQuery()
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate,setEndDate] = useState(new Date('2021-03-01'))
 const [formattedData] = useMemo(()=> {
    if(!data) return []
    const { dailyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: "#00afaa",
      data: []
    }
    const totalUnitesLine = {
       id: "totalUnits",
       color: "#ff00aa",
       data:[]
    }
    Object.values(dailyData).forEach(({date,totalSales,totalUnits})=>  {
        const formattedDate = new Date(date)
        if(formattedDate >= startDate && formattedDate <= endDate) {
              const splitDate = date.substring(date.indexOf("-" + 1))
              totalSalesLine.data = [
                ...totalSalesLine.data,
                {x:splitDate,y: totalSales}
              ]
              totalUnitesLine.data = [
                ...totalUnitesLine.data,
                {x: splitDate,y: totalUnits}
              ]
        }
    })
      const formattedData = [totalSalesLine,totalUnitesLine]
      return [formattedData]
 }, [data,startDate,endDate])
 if(isLoading) return 'Loading...'
  return (
    <div className="flex w-full h-screen bg-[#101538] flex-col">
    <AdminNavbar open={open} setOpen={setOpen} />
    <AdminSidebar open={open} setOpen={setOpen} />

    <div className="h-[75vh] ">
      <div className="flex mr-10 items-center pt-10 gap-3 justify-end  ">
          <DatePicker  
             selectsStart 
             startDate={startDate}
             endDate={endDate}
             showTimeSelect
             className="text-black px-1 py-1 rounded-[5px] "
             selected={startDate}
             onChange={(date)=> setStartDate(date)}
          />
          <DatePicker  
           selectsEnd
           startDate={startDate}
           endDate={endDate}
           showTimeSelect
           className="text-black px-1 py-1 rounded-[5px] "
           selected={endDate}
           minDate={startDate}
           onChange={(date)=> setEndDate(date)}
          
          />
      </div>
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

export default Daily
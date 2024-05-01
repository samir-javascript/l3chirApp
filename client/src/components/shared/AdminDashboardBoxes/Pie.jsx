/* eslint-disable react/prop-types */
import { useGetStatesQuery } from "@/slices/ProductsApiSlice"
import { ResponsivePie } from "@nivo/pie"
const Pie = ({isDashboard }) => { 
    const {data, isLoading, isError} = useGetStatesQuery()
    if(isError) return "Error"
    if(isLoading) return "Loading..."
   
    const formattedData = Object.entries(data.salesByCategory).map(([category,sales])=> ({
         id: category,
         value: sales,
         category:category,
    }))
    console.log(formattedData, "formatted data")
  return (
    <div  style={{
      height: isDashboard ? "400px" : "100%",
      width: "100%",
      minHeight: isDashboard ? "325px" : "100%",
      minWidth: isDashboard ? "325px" : "100%",
      position: "relative",
    }}
   
  >
<ResponsivePie
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
 //colors={{datum: colors}}
margin={ isDashboard ? { top: 40, right: 80, bottom: 100, left: 50 }: {
    top: 40, right: 80, bottom: 80, left: 80 
}}
sortByValue={true}
innerRadius={0.45}

activeOuterRadiusOffset={8}
borderWidth={1}
borderColor={{
   from: 'color',
   modifiers: [
       [
           'darker',
           0.2
       ]
   ]
}}
enableArcLinkLabels={!isDashboard}
arcLinkLabelsSkipAngle={10}
arcLinkLabelsTextColor={"#ffedc2"}
arcLinkLabelsThickness={2}
arcLinkLabelsColor={{ from: 'color' }}
arcLabelsSkipAngle={10}
arcLabelsTextColor={{
   from: 'color',
   modifiers: [
       [
           'darker',
           2
       ]
   ]
}}


legends={[
   {
       anchor: 'bottom',
       direction: 'row',
       
       justify: false,
       translateX: isDashboard ? 20 : 0,
       translateY: isDashboard ? 50 : 56,
       itemsSpacing: 0,
       itemWidth: 85,
       itemHeight: 18,
       itemTextColor: '#999',
       itemDirection: 'left-to-right',
       itemOpacity: 1,
       symbolSize: 18,
       symbolShape: 'circle',
       effects: [
           {
               on: 'hover',
               style: {
                   itemTextColor: '#21295'
               }
           }
       ]
   }
]}
/>
 {!isDashboard && (
  <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "#ffda85",
            textAlign: "center",
            transform: isDashboard
              ? "translate(-75%,-170%)"
              : "translate(-50%,-100%)",
          }}
        >
          <p>Total: ${data?.yearlySalesTotal}</p>
        </div>
 )}

</div>
  )
}

export default Pie
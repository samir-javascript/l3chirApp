/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom"

import { ResponsiveContainer, Line, Tooltip, LineChart } from "recharts"
const UserBox = ({title,route,icon,value,chartData,dataKey}) => {
  return (
    <div className="flex items-center justify-between h-full w-full ">
        <div className="flex flex-col justify-between h-full w-full">
            <div className="flex items-center gap-1 ">
                 {icon}
                 <p className="font-medium text-white text-[17px] capitalize whitespace-nowrap ">{title} </p>
            </div>
            <h2 className="font-bold text-[26px] text-white whitespace-nowrap "> {title.includes("total revenue") && 'Dh'} {value} </h2>
            <Link className="w-fit text-[#0aafaa] font-semibold hover:underline text-sm " to={route}>
                View All
            </Link>
        </div>
        <div className="w-full h-full">
             <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData}>
                 <Tooltip
                            contentStyle={{ background: "transparent", border: "none" }}
                            labelStyle={{ display: "none" }}
                            position={{ x: 10, y: 50 }}
                        />
                        <Line dot={false} type="monotone" dataKey={dataKey} stroke="#00affa" strokeWidth={2} />
                 </LineChart>
             </ResponsiveContainer>
        </div>
    </div>
  )
}

export default UserBox
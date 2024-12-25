import React from 'react'
import { format, startOfMonth, addDays } from "date-fns";

const Calendar = ({ communications }) => {
    const today = new Date();
    const startDay = startOfMonth(today);
  
    const days = Array.from({ length: 35 }, (_, i) =>
        format(addDays(startDay, i), "yyyy-MM-dd")
    );
    return (
        <div className="grid grid-cols-7 gap-4">
            {days.map((day) => (
                <div key={day} className="p-4 border rounded bg-gray-50">
                    <span className="block font-medium mb-2">{day}</span>
                    {communications[day] ? (
                        communications[day].map((comm, index) => (
                            <p
                                key={index}
                                className="text-sm bg-blue-100 p-1 rounded mt-1"
                            >
                                {comm.type} - {comm.details}
                            </p>
                        ))
                    ) : (
                        <span className="text-xs italic text-gray-500">No data</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Calendar
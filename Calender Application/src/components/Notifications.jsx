import React from "react";

const Notifications = ({ overdue, dueToday }) => {
  return (
    <div className="space-y-4">
      <section>
        <h3 className="font-bold text-red-500">Overdue</h3>
        {overdue.length ? (
          <ul>
            {overdue.map((item) => (
              <li key={item.id} className="text-red-800">
                {item.name}: {item.details}
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-400">No overdue tasks.</p>
        )}
      </section>

      <section>
        <h3 className="font-bold text-yellow-500">Today</h3>
        {dueToday.length ? (
          <ul>
            {dueToday.map((item) => (
              <li key={item.id} className="text-yellow-800">
                {item.name}: {item.details}
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-400">No tasks today.</p>
        )}
      </section>
    </div>
  );
};

export default Notifications;

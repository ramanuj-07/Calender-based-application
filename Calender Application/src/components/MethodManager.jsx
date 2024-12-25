import React,{useState} from 'react'

const MethodManager = ({methods, onAddMethod}) => {
    const [method, setMethod] = useState({ name: "", description: "", sequence: "", mandatory: false });
    const handleChange = (e) => {
        const { name, description, sequence, mandatory } = e.target;
        setMethod({ ...method, [name]: type === "checkbox" ? checked : value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (method.name && method.description && method.sequence) {
            onAddMethod({ ...method, sequence: Number(method.sequence) });
            setMethod({ name: "", description: "", sequence: "", mandatory: false });
        }
    };

  return (
   <div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            name="name"
            value={method.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            value={method.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Sequence:</label>
          <input
            name="sequence"
            type="number"
            value={method.sequence}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            name="mandatory"
            type="checkbox"
            checked={method.mandatory}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Mandatory</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Method
        </button>
      </form>

      <h3 className="text-lg font-bold mt-8">Existing Methods</h3>
      <ul className="space-y-2 mt-4">
        {methods
          .sort((a, b) => a.sequence - b.sequence)
          .map((method) => (
            <li
              key={method.id}
              className="p-2 border rounded bg-gray-50 flex justify-between"
            >
              <span>
                {method.sequence}. {method.name} ({method.description}) -
                {method.mandatory ? " Mandatory" : " Optional"}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MethodManager;
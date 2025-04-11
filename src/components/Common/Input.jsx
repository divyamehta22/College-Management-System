export function Input({ ...props }) {
    return (
      <input
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    );
  }
  
export function Button({ children, variant = "default", className = "", ...props }) {
  const baseClasses = "flex items-center justify-center font-medium rounded transition duration-200 focus:outline-none focus:ring-2";
  
  const variants = {
    default: "px-5 py-2.5 text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
    icon: "w-8 h-8 p-0 bg-transparent text-red-500 hover:text-red-700 focus:ring-red-300",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Button({
  title,
  type,
  onClick,
  disable,
}: {
  title: string;
  type: "reset" | "submit" | "button";
  onClick?: () => void;
  disable?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disable}
      className="text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium w-full rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      {title}
    </button>
  );
}

export default Button;

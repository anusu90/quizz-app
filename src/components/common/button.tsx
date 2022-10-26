import { ButtonPropsModel } from "../../models/button";

const Button: React.FunctionComponent<ButtonPropsModel> = (props) => {
  const { buttonText, loading, ...rest } = props;
  return (
    <button
      className="h-14 w-32 flex items-center justify-center bg-blue-500 text-white rounded-xl shadow-lg mx-3 disabled:opacity-30 disabled:cursor-not-allowed"
      {...rest}
    >
      {buttonText}
      {loading ? "..." : ""}
    </button>
  );
};

export default Button;

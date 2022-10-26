export interface InputPropsModel extends React.HTMLProps<HTMLInputElement> {
  isError?: boolean;
}

const Input: React.FunctionComponent<InputPropsModel> = (props) => {
  const { isError, ...rest } = props;
  return (
    <div>
      <input className="h-10 border rounded px-3" {...rest} />
    </div>
  );
};

export default Input;

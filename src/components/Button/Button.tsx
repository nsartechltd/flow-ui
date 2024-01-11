export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: 'submit' | 'button' | 'reset';
  className: string;
}

export const Button = ({
  text,
  type = 'submit',
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button className={`${className} rounded-lg`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

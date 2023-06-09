export type ButtonProps = {
  text: string;
  type?: "submit" | "button" | "reset";
  className: string;
};

export const Button = ({ text, type = "submit", className }: ButtonProps) => {
  return <button className={`${className} rounded-lg`} type={type}>{text}</button>;
};

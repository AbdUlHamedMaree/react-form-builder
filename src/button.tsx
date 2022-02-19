export type ButtonProps = {};

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button type='button'>{children}</button>;
};

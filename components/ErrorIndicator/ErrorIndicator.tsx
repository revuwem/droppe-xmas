import SystemMessage from "../SystemMessage";

interface IErrorIndicatorProps {
  children: string;
}

const ErrorIndicator: React.FC<IErrorIndicatorProps> = ({ children }) => (
  <SystemMessage>{`Error: ${children}`}</SystemMessage>
);

export default ErrorIndicator;

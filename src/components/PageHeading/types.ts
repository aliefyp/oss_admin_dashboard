export interface Props {
  title: string;
  children?: React.ReactNode;
  withBackButton?: boolean;
  onBack?: () => void;
}
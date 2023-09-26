import { TitleChat } from "../TitleChat";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header-chat">
      <TitleChat title={title} />
    </header>
  );
};

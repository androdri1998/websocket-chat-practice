import { Paragraph } from "../Paragraph";

interface TitleProps {
  title: string;
  adjustClassname?: string;
}

export const Title = ({ title, adjustClassname = "" }: TitleProps) => {
  return <Paragraph classNames={`title ${adjustClassname}`} text={title} />;
};

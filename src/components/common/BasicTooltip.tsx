import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ReactElement } from "react";

interface BasicTooltipProps {
  text: string;
  children: ReactElement;
}

const BasicTooltip: React.FC<BasicTooltipProps> = ({ text, children }) => {
  return (
    <Tooltip title={text}>
      <IconButton>{children}</IconButton>
    </Tooltip>
  );
};
export default BasicTooltip;

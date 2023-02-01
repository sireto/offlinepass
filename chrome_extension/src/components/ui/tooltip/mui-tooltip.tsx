import { InformationCircle } from "@app/components/icons/information-circle";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import cn from "classnames";

type ColorNames = "gray";

const colors: Record<ColorNames, string> = {
  gray: "text-gray-500",
};

interface IMuiTooltipProps {
  title: string;
  color?: ColorNames;
  className?: string;
}

export default function MuiTooltip({
  title,
  className,
  color = "gray",
}: IMuiTooltipProps) {
  const colorClassName = colors[color];

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      title={title}
      arrow
      className={cn("cursor-pointer", className)}
      placement="top-start"
    >
      <div>
        <InformationCircle className={cn("h-4 w-4", colorClassName)} />
      </div>
    </Tooltip>
  );
}

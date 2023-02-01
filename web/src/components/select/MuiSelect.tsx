import styled from "@emotion/styled";
import { MenuItem, Select, SelectProps } from "@mui/material";
import React, { useState } from "react";

interface IMuiSelect extends Omit<SelectProps, "options"> {
  options: string[];
}

const CustomSelect = styled(Select)({
  borderRadius: 4,
});

const customStyle = {
  fontSize: 12,
  height: 40,
};

export default function MuiSelect({
  options,
  className,
  onChange,
  value,
  style = customStyle,
}: IMuiSelect) {
  return (
    <CustomSelect
      value={value}
      style={style}
      className={className}
      onChange={onChange}
      size="small"
    >
      {options.map((item) => {
        return (
          <MenuItem
            style={{ fontSize: style.fontSize }}
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        );
      })}
    </CustomSelect>
  );
}

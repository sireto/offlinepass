import styled from "@emotion/styled";
import { MenuItem, Select, SelectProps } from "@mui/material";
import React, { useState } from "react";

interface IMuiSelect extends Omit<SelectProps, "options"> {
  options: string[];
}

const CustomSelect = styled(Select)({
  borderRadius: 12,
});

export default function MuiSelect({
  options,
  className,
  onChange,
  value,
}: IMuiSelect) {
  return (
    <CustomSelect value={value} className={className} onChange={onChange}>
      {options.map((item) => {
        return (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </CustomSelect>
  );
}

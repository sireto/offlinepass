import { GeneratePswStateDtos } from "@app/models/dtos/generatepsw";
import { Menu, Transition } from "@headlessui/react";
import { MenuItem } from "@mui/material";
import React, { Fragment, useState } from "react";
import { ChevronDown } from "../icons/chevrondown";

interface IDropdown {
  generatePswState: GeneratePswStateDtos;
  setGeneratePswState: any;
}
export default function Dropdown({
  generatePswState,
  setGeneratePswState,
}: IDropdown) {
  const years = ["2022", "2023", "2024"];
  const [DropDownState, setDropDownState] = useState(false);
  
  return (
    <div
      className="relative"
    >
      <button
        onClick={() => {
          setDropDownState(prevCheck => !prevCheck);
        }}
        className="flex h-5 w-full cursor-pointer border mb-3 border-slate-400 shrink-0 items-center justify-center rounded-md py-7 text-gray-900 "
      >
        <div className="flex justify-between items-center w-full px-3">
          <p>{generatePswState.date}</p>
          <ChevronDown className="h-6 w-6" />
        </div>
      </button>
      {DropDownState && (
        <div>
          <div className="absolute flex flex-col top-[10px] right-0 z-20 mt-14 bg-lightBackground rounded-lg w-full  shadow-large ltr:right-0 rtl:left-0 dark:bg-gray-800">
            {years.map((year) => {
              return (
                generatePswState.date !== year && (
                  <button
                    onClick={() => {
                      setGeneratePswState({ ...generatePswState, date: year });
                      setDropDownState(prevCheck => !prevCheck);
                    }}
                    className="py-2 px-3 text-start"
                    key={year}
                  >
                    {year}
                  </button>
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

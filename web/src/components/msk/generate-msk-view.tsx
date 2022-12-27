import {
  generateMskViewConstants,
  verifyMskViewConstants,
} from "@app/constants/form-view-constants";
import { generateMsk, validateMnemonic } from "@app/utils/msk-utils";
import React, { useEffect, useState } from "react";
import SeedCard from "../seed-card";
import Button from "../ui/button/button";
import { removeElementFromArray } from "@app/utils/helper-utils";
import SeedBubble from "../seed-bubble";

interface MskState {
  mnemonicWordList: string[];
  msk: string;
}

export default function GenerateMskView() {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [selectedSeeds, setSelectedSeeds] = useState<string[]>([]);
  const [titleDescriptionState, setTitleDescriptionState] = useState({
    title: generateMskViewConstants.title,
    description: generateMskViewConstants.description,
  });
  const [mskState, setMskState] = useState<MskState>({
    mnemonicWordList: [],
    msk: "",
  });

  const getSeedCard = (seed: string, index: number) => {
    return (
      <SeedCard
        key={seed}
        seed={seed}
        index={index + 1}
        isSelected={selectedSeeds.includes(seed)}
        disabled={!isNextClicked}
        onClick={() => {
          !selectedSeeds.includes(seed) &&
            setSelectedSeeds([...selectedSeeds, seed]);
        }}
      />
    );
  };

  const getSelectedSeedBubble = (seed: string) => {
    return (
      <SeedBubble
        key={`selected${seed}`}
        onClick={() => {
          if (selectedSeeds.includes(seed)) {
            setSelectedSeeds([...removeElementFromArray(selectedSeeds, seed)]);
          }
        }}
        seed={seed}
      />
    );
  };

  const handleButtonPressed = () => {
    if (!isNextClicked) {
      const shuffledMnemoicList = mskState.mnemonicWordList.sort(
        (a, b) => 0.5 - Math.random()
      );
      setMskState({ ...mskState, mnemonicWordList: shuffledMnemoicList });
      setTitleDescriptionState({
        title: verifyMskViewConstants.title,
        description: verifyMskViewConstants.description,
      });
      setIsNextClicked(true);
    } else {
      if (selectedSeeds.length === mskState.mnemonicWordList.length) {
        const result = validateMnemonic(selectedSeeds, mskState.msk);
        console.log(result);
      }
    }
  };

  useEffect(() => {
    const mskDetails: MskState = generateMsk();
    setMskState({ ...mskDetails });
  }, []);

  return (
    <div className="w-full h-full space-y-8">
      <div className="flex flex-col items-center space-y-2">
        <p className="font-bold text-2xl">{titleDescriptionState.title}</p>
        <p className="text-sm text-gray-500 text-center">
          {titleDescriptionState.description}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {mskState.mnemonicWordList &&
          mskState.mnemonicWordList.map((seed: string, index: number) =>
            getSeedCard(seed, index)
          )}
      </div>
      <div className="flex flex-wrap space-x-2">
        {selectedSeeds &&
          selectedSeeds.map((seed: string) => getSelectedSeedBubble(seed))}
      </div>
      <Button fullWidth onClick={handleButtonPressed}>
        {isNextClicked ? "Verify" : "Next"}
      </Button>
    </div>
  );
}

import React, { useState } from "react";
import Button from "../Button";
import Input from "../Form/Input";
import Label from "../Form/Label";
import styles from "./FilterPriceForm.module.css";

interface IFilterPriceForm {
  onSubmit: ({ min, max }: { min: number; max: number }) => void;
  onReset: () => void;
}

const FilterPriceForm: React.FC<IFilterPriceForm> = ({ onSubmit, onReset }) => {
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  const onPriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPriceMin(e.target.value);
  const onPriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPriceMax(e.target.value);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNaN(Number(priceMin)) || isNaN(Number(priceMax))) {
      alert("Price must be a number");
      return;
    }

    if (Number(priceMin) > Number(priceMax)) {
      alert("Incorrect price range");
      return;
    }

    onSubmit({ min: Number(priceMin), max: Number(priceMax) });
  };

  const onFormReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPriceMin("");
    setPriceMax("");

    onReset();
  };

  return (
    <form className={styles.form}>
      <Label htmlFor="priceMin">Filter by price, €</Label>
      <Input
        type="text"
        id="priceMin"
        placeholder="0"
        value={priceMin}
        onChange={onPriceMinChange}
      />
      <Input
        type="text"
        id="priceMax"
        placeholder="250"
        value={priceMax}
        onChange={onPriceMaxChange}
      />
      <Button onClick={onFormSubmit} type="outlined">
        Apply
      </Button>
      <Button onClick={onFormReset} type="outlined">
        Reset
      </Button>
    </form>
  );
};

export default FilterPriceForm;

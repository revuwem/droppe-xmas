import React, { useState } from "react";
import Button from "../Button";
import Input from "../Form/Input";
import Label from "../Form/Label";
import styles from "./FilterPriceForm.module.css";

interface IFilterPriceForm {
  onSubmit: () => void;
}

const FilterPriceForm: React.FC<IFilterPriceForm> = ({ onSubmit }) => {
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  const onPriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onPriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <form className={styles.form}>
      <Label htmlFor="priceMin">Filter by price, €</Label>
      <Input
        type="text"
        id="priceMin"
        placeholder="0"
        onChange={onPriceMinChange}
      />
      <Input
        type="text"
        id="priceMax"
        placeholder="250"
        onChange={onPriceMaxChange}
      />
      <Button onClick={onSubmit} type="outlined">
        Apply
      </Button>
    </form>
  );
};

export default FilterPriceForm;

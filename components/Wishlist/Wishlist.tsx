import { WishlistProduct } from "../../types/Wishlist";
import Product from "../Product";
import Button from "../Button";
import styles from "./Wishlist.module.css";
import { useEffect, useState } from "react";
import { Product as ProductT } from "../../types/Product";
import { getProductsData } from "../../services/api";

interface IWishlistProps {
  id: number;
  products: WishlistProduct[];
  onApproveAll: (id: number) => void;
  onDiscardAll: (id: number) => void;
}

const Wishlist: React.FC<IWishlistProps> = ({
  id,
  products,
  onApproveAll,
  onDiscardAll,
}) => {
  const [productsData, setProductsData] = useState<ProductT[]>([]);
  useEffect(() => {
    getProductsData(products).then((data) => setProductsData(data));
  }, []);

  const onButtonApproveAllClick = () => onApproveAll(id);
  const onButtonDiscardAllClick = () => onDiscardAll(id);

  return (
    <div className={styles.wishlist}>
      <div className={styles.header}>
        <h3 className={styles.title}>Kid {id} wishlist</h3>
        <div className={styles.userControls}>
          <Button onClick={onButtonDiscardAllClick} type="outlined">
            Discard All
          </Button>
          <Button onClick={onButtonApproveAllClick}>Approve All Gifts</Button>
        </div>
      </div>
      <ul className={styles.list}>
        {productsData.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;

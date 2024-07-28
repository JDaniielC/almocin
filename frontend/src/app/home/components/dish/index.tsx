import ItemMenuModel from '../../../admin/models/ItemMenuModel';
import styles from './index.module.css'

function DishComponent({ item }: {
  item: ItemMenuModel
}) {
  return (
    <div className={styles.dish}>
      <div className={styles.dishContainer}>
        <h2>{item.name}</h2>
        <p className={styles.dishPrice}>Preço: R$ {item.price.toFixed(2)}</p>
        <p className={styles.dishTimeToDelivery}>
          Tempo de preparo: {item.timeToPrepare} minutos
        </p>
        <p className={styles.dishCategory}>
          {item.category?.name ?? 'Sem categoria'}
        </p>
      </div>
      <img src={item.image} alt="img" />
    </div>
  )
}

export default DishComponent;
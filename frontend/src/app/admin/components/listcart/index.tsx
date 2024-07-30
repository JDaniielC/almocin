import { ListOrderCartProps } from '../../types/components-props';
import styles from './index.module.css';

  const ListOrderCart = ({
    name, totalPrice,items,timeToDelivery,editButtonCallback,selectButtonCallback, editDisabled,
  }: ListOrderCartProps) => {

    const onEditOrder = () => () => {
      if (editButtonCallback) editButtonCallback();
    }

    const onSelectOrder = () => () => {
      if (selectButtonCallback) selectButtonCallback();
    }

  
  return (
    <div className={styles.listOrder}>
      
      <div className={styles.topPanel}>
        <span
          data-cy={`id-${name}`}
          className={styles.listItemText}
        
        >{name}</span>

        <span
          data-cy={`id-${name}`}
          className={styles.listItemText}
        >total: R$ {totalPrice}</span>

        <span
          data-cy={`id-${name}`}
          className={styles.listItemText}
        >delivery time: {timeToDelivery}</span>
        
        <p>_______________</p>
        <p>items no pedido</p>
        {items.map((item)=>{
          return(
            <p>
              {item}
            </p>
          )
        })}
      </div>

      

      <div className={styles.buttons}>
      {
          selectButtonCallback &&
          <button
            name="select"
            className={styles.selectButton}
            onClick={
              onSelectOrder()
            }
            disabled={editDisabled}
          >
            confirmar
          </button>
        }

{
          editButtonCallback &&
          <button
            name="Cancelar"
            className={styles.editButton}
            onClick={
              onEditOrder()
            }
            disabled={editDisabled}
          >
            cancelar
          </button>
        }
      </div>
    </div>
  );
}

export default ListOrderCart;
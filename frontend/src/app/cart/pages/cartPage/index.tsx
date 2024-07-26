import { mockItems, mockOrders, mockOrderStatus } from "../../../../shared/types/mockorder";
import BaseLayout from "../../../../shared/components/BaseLayout";
import styles from "./index.module.css"
import { listItemUser } from "../../../../shared/types/base-layout-list-item";

const CartPage = () => {
  const cartOrders = mockOrders.filter((order)=> order.status === mockOrderStatus.inCart);
  const allItemsIds = cartOrders.flatMap(order => order.itemsId);
  const Items = mockItems.filter(item => allItemsIds.includes(item.id));


  return (
    <BaseLayout titlePage="cart" listItem={listItemUser}>
      <ul >
        <div>
            {Items.map((item, index) => (
              <div key={index}>
                  <li className= {styles.orderPanel}>
                    <div className="list-elem-left">
                      <p> name: {item.name}</p>
                      <p>cook time: {item.timeToPrepare} </p>
                      <p>description {item.description}</p>
                      <p>Price: ${item.price}</p>

                    </div>

                    <div className="list-elem-right">
                      <img className="orderImage" src={item.image}/>
                    </div>
                  </li>
              </div>
            ))}
        </div>

        <div className={styles.orderPanel}>
          <div>
            <p>total price: </p>
          </div>

          <div className={styles.summaryButtons}>
            <button className={styles.confirmButton}>
              confirmar
            </button>

            <button className={styles.cancelButton}>
              cancelar
            </button>
        </div>
      </div>
      </ul>



    </BaseLayout>

  );
}
export default CartPage;

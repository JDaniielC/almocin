import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../admin/context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/model";
import BaseLayout from "../../../admin/components/baseLayout";

import styles from './index.module.css';

const OrderPage = () => {
  const { service, state } = useContext(OrderContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);


  const closeModalAlert = useCallback(() => {
    setErrorMsg('');
  }, []);


  useEffect(() => {
    service.getOrders()
  }, 
  [service]);

  const inProgressOrders = mockOrders.filter((order)=> order.status === mockOrderStatus.inProgress);
  return (
    <BaseLayout titlePage="order">
      <ul >
        <div>
            {inProgressOrders.map((order, index) => (
              <div key={index}>
                  <li className={styles.orderPanel}>
                    <div className={styles.orderInfo}>
                      <p> id: {order.id}</p>
                      <p> delivery time: {order.totalDeliveryTime}</p>
                      <p> user id: {order.userID}</p>
                      <p>total Price: ${order.totalPrice}</p>
                    </div>

                    <div className={styles.itemInfo}>
                      {order.itemsId.map((itemId) => {
                        const item = mockItems.find((el) => el.id === itemId);
                        return item ? (
                          <div key={item.id} className={styles.itemInfo}>
                            <p>{item.name}</p>
                            <p>price: ${item.price}</p>
                            <img src={item.image}  />
                          </div>
                        ) : (
                          <div key={itemId} >
                            <p>Item not found</p>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div>
                      <div>
                        <p>total price: </p>
                      </div>
                  
                      <div className={styles.summaryButtons}>
                        <button className={styles.cancelButton}>
                          cancelar
                        </button>
                    </div>
                    </div> 

                  </li>
              </div>
            ))}
        

        
      </div>
      </ul>
    </BaseLayout>
  );
}

export default OrderPage;
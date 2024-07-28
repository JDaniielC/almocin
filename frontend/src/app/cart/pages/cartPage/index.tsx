import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../admin/context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/model";
import BaseLayout from "../../../admin/components/baseLayout";

import styles from './index.module.css';
import { OrderStatus } from "../../../../shared/types/order";

const CartPage = () => {
  const { service, state } = useContext(OrderContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);


  const closeModalAlert = useCallback(() => {
    setErrorMsg('');
  }, []);


  useEffect(() => {
    service.getOrders()
  }, 
  [service
  ]);

  return (
    <BaseLayout titlePage="Order">
      <div>
        {state.getOrdersRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => (
            <Modal
              open={true}
              title="Ocorreu um erro inesperado."
              closeButtonCallback={closeModalAlert}
            >
              <span>Erro ao carregar o order!</span>
            </Modal>
          ),
          succeeded: (orders) => (
            <>
              {orders.filter((order)=> order.status===OrderStatus.inCart).map((order,index) => {
                return (
                    <div key={index}>
                        <li className= {styles.orderPanel}>
                          <div className="list-elem-left">
                            <p>Items ID: {order.itemsId.join(', ')}</p>
                            <p>price: {order.totalPrice}</p>
                            <p>status: {order.status}</p>
                          </div>
                          <div className="list-elem-right">
                            
                          </div>
                            
                        </li>
                    </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
      
    </BaseLayout>
  );
};

export default CartPage;

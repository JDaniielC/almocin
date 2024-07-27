import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../admin/context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/model";
import BaseLayout from "../../../admin/components/baseLayout";

import styles from './index.module.css';

const HistoryPage = () => {
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
    <BaseLayout titlePage="Historico">
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
              {orders.map((order,index) => {
                return (
                    <div key={index}>
                        <li className= {styles.orderPanel}>
                          <div className="list-elem-left">
                            <p>ID: {order.id}</p>
                            <p>Items ID: {order.itemsId.join(', ')}</p>
                            <p>User ID: {order.userID}</p>
                            <p>Total Price: ${order.totalPrice}</p>
                            <p>Status: {order.status}</p>
                            <p>Total Delivery Time: {order.totalDeliveryTime} days</p>
                            <p>CEP: {order.cep}</p>
                            <p>Address Number: {order.address_number}</p>
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

export default HistoryPage;
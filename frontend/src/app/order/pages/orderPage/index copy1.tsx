import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../admin/context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/model";
import BaseLayout from "../../../admin/components/baseLayout";

import styles from './index.module.css';
import Order, { OrderStatus } from "../../../../shared/types/order";
import ListOrder from "../../../admin/components/listorder";

const OrderPage = () => {
  const { service, state } = useContext(OrderContext);
  const [OrEdit, setEdit] = useState<"create" | "edit">("create");
  const [errorMsg, setErrorMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [newOrderStatus,setNewOrderStatus] = useState<OrderStatus>(OrderStatus.inProgress);
  const [orderToEdit, setOrderToEdit] = useState<string | null>(null);



  const onChangeNewOrderStatus = useCallback((event) => {
    setNewOrderStatus(event.target.value);
  }, []);

  function editOrder() {
    return () => {
      if (!orderToEdit) return;
      service.updateOrder(orderToEdit, { status: newOrderStatus })
    };
  }

  const closeModalAlert = useCallback(() => {
    setErrorMsg('');
  }, []);

  /*function onEditOrder(orderId: string, orderStatus: OrderStatus) {
    return () => {
      if (orderToEdit === orderId) {
        setEdit("edit");
        setOrderToEdit(null);
        setNewOrderStatus(OrderStatus.canceled);
        return;
      }
      setOrderToEdit(orderId);
      setNewOrderStatus(orderStatus);
      setEdit("edit");
    };
  } */


    const onEditOrder = useCallback((orderId: string, orderStatus: OrderStatus) => {
      return () => {
        if (orderToEdit === orderId) {
          setEdit("edit");
          setOrderToEdit(null);
          setNewOrderStatus(OrderStatus.canceled);
          return;
        }
        setOrderToEdit(orderId);
        setNewOrderStatus(orderStatus);
        setEdit("edit");
      };
    }, [orderToEdit]);

  function loading() {
    setShowLoading(true)
    setTimeout(() => {
      setShowLoading(false) 
    }, 1000);
  }

  useEffect(() => {
    service.getOrders(),

    state.updateOrderRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => loading()
    })
  }, 
  [service,
    state.updateOrderRequestStatus
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
              {orders.filter((order)=> order.status===OrderStatus.inProgress).map((order,index) => {
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
                        <button onClick ={onEditOrder(order.id, OrderStatus.canceled)} className={styles.cancelButton}>
                          Cancelar
                        </button>
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

export default OrderPage;
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { OrderContext } from "../../../admin/context/OrderContext";


import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/model";
import ListOrderCart from "../../../admin/components/listcart";
import BaseLayout from "../../../admin/components/baseLayout";
import { OrderStatus } from "../../../../shared/types/order";

const CartPage = () => {
  const { service, state } = useContext(OrderContext);
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit">("create");
  const [orderToEdit, setOrderToEdit] = useState<string | null>(null);
  const [newOrderStatus, setNewOrderStatus] = useState(OrderStatus.inProgress);
  const [errorMsg, setErrorMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);


  function createOrder() {
    return () => {
      if (!newOrderStatus) return;
      service.createOrder({ status: newOrderStatus });
    }
  }

  const onChangeNewOrderStatus = useCallback((event) => {
    setNewOrderStatus(event.target.value);
  }, []);

  const closeModalAlert = useCallback(() => {
    setErrorMsg('');
  }, []);

  function editOrder() {
    return () => {
      if (!orderToEdit) return;
      service.updateOrder(orderToEdit, { status: newOrderStatus })
    };
  }

  function onEditOrder(orderId: string, orderStatus: OrderStatus) {
    return () => {
      if (createOrEdit === 'edit' && orderToEdit === orderId) {
        setCreateOrEdit("create");
        setOrderToEdit(null);
        setNewOrderStatus(OrderStatus.canceled);
        return;
      }
      setOrderToEdit(orderId);
      setNewOrderStatus(orderStatus);
      setCreateOrEdit("edit");
    };
  }

  function onSelectOrder(orderId: string, orderStatus: OrderStatus) {
    return () => {
      if (createOrEdit === 'edit' && orderToEdit === orderId) {
        setCreateOrEdit("create");
        setOrderToEdit(null);
        setNewOrderStatus(OrderStatus.inProgress);
        return;
      }
      setOrderToEdit(orderId);
      setNewOrderStatus(orderStatus);
      setCreateOrEdit("edit");
    };
  }


  useEffect(() => {
    service.getOrders()

    function loading() {
      setShowLoading(true)
      setTimeout(() => {
        setShowLoading(false) 
      }, 1000);
    }

    state.createOrderRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => loading()
    })
    state.updateOrderRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => loading()
    })
  }, 
  [service,
    state.updateOrderRequestStatus,
    state.createOrderRequestStatus
  ]);

  return (
    <BaseLayout titlePage="Pedidos">
      <div className={styles.listContainer}>
        {state.getOrdersRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => (
            <Modal
              open={true}
              title="Ocorreu um erro inesperado."
              closeButtonCallback={closeModalAlert}
            >
              <span>Erro ao carregar as categorias!</span>
            </Modal>
          ),
          succeeded: (orders) => (
            <>
              {orders.filter((order)=>(order.status===OrderStatus.inProgress )).map((order) => {
                return (
                  <ListOrderCart
                    key={order.id}
                    name={order.id}
                    totalPrice={order.totalPrice.toString()}
                    timeToDelivery={order.totalDeliveryTime.toString()}
                    items={order.itemsId}
                    selectButtonCallback={onSelectOrder(order.id, OrderStatus.inProgress)}
                    editButtonCallback={onEditOrder(order.id, OrderStatus.canceled)}
                    editDisabled={createOrEdit == 'edit' && order.id !== orderToEdit}
                  ></ListOrderCart>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />

      
      {showLoading && <LoadingComponent></LoadingComponent>}
      <Modal
        open={errorMsg !== ''}
        title="Ocorreu um erro inesperado."
        closeButtonCallback={closeModalAlert}
      >
        <span>{errorMsg}</span>
      </Modal>
    </BaseLayout>
  );
};

export default CartPage;
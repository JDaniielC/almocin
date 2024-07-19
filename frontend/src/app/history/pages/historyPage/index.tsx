import BaseLayout from "../../../admin/components/baseLayout";
import { mockOrders } from "../../../../shared/types/mockorder";
import { mockItems } from "../../../../shared/types/mockorder";

import styles from './index.module.css';


const HistoryPage = () => {
  return (
    <BaseLayout titlePage="historico">
    
      <ul >
        <div>
            {mockOrders.map((order, index) => (
              <div key={index}>
                  <li className= {styles.orderPanel}>
                    <div className="list-elem-left">
                      <p>Items ID: {order.itemsId.join(', ')}</p>
                      <p>User ID: {order.userID}</p>
                      <p>Total Price: ${order.totalPrice}</p>
                      <p>Status: {order.status}</p>
                      <p>Total Delivery Time: {order.totalDeliveryTime} days</p>
                      <p>CEP: {order.cep}</p>
                      <p>Address Number: {order.address_number}</p>
                    </div>
                    
                    <div className="list-elem-right">
                      <img className="orderImage" src={mockItems.filter((item) => item.id==order.itemsId[0])[0].image}/>
                    </div>
                      
                  </li>
              </div>
            ))}
        </div>

      </ul>
    </BaseLayout>
    
  );
}

export default HistoryPage;
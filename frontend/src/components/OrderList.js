import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { List, Message, Button } from "semantic-ui-react";

import Order from "./Order";

const OrderList = props => {
    console.log(props.orders);
  let ordersCollection = _.map(props.orders, (order, idx) => {
    return <Order key={idx} order={order} />;
  });

  const noOrdersMessage = (
    <Message info>You don't have any orders now.</Message>
  );

  return (
    <List selection divided relaxed>
      {props.orders && props.orders.length > 0
        ? ordersCollection
        : noOrdersMessage}
    </List>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array
};

export default OrderList;

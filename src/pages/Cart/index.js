import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { Container, ProductTable, Total } from './styles';
import * as actionsCart from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

export default function Cart() {
  const total = useSelector(state => formatPrice(
    state.cart.reduce((totalSum, product) => {
      return totalSum + product.price * product.amount;
    }, 0)
  ));

  const cart = useSelector(state => state.cart.map((product) => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })))

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(actionsCart.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(actionsCart.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th> </th>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(actionsCart.removeFromCart(product.id))}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

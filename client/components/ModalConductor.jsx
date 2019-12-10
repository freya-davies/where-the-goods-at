
import React from 'react';

import AddModal from './AddModal'
import UpdateItem from './UpdateItem'
import AddItemByAddress from './AddItemByAddress';


const ModalConductor = props => {
  switch (props.modal.currentModal) {
    case 'ADD_ITEM_MODAL':
      return <AddModal location={props.modal.itemLocation} />;
    case 'HIDE_MODAL':
      return null;
    case 'UPDATE_ITEM_MODAL':
      return <UpdateItem item={props.modal.item} />
      case 'ADD_ITEM_BY_ADDRESS_MODAL':
        return <AddItemByAddress />
    default:
      return null;
  }
};

export default ModalConductor;
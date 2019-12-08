
import React from 'react';

import AddModal from './AddModal'

const ModalConductor = props => {
  switch (props.modal.currentModal) {
    case 'ADD_ITEM_MODAL':
      return <AddModal location={props.modal.itemLocation} />;
    case 'HIDE_MODAL':
      return null;
    default:
      return null;
  }
};

export default ModalConductor;
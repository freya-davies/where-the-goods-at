
import React from 'react';

import AddModal from './AddModal'
import ViewModal from './ViewModal';

const ModalConductor = props => {
  switch (props.modal.currentModal) {
    case 'ADD_ITEM_MODAL':
      return <AddModal location={props.modal.itemLocation} />;
    case 'HIDE_MODAL':
      return null;
    case 'UPDATE_ITEM_MODAL':
      return <ViewModal item={props.modal.item} />
    default:
      return null;
  }
};

export default ModalConductor;
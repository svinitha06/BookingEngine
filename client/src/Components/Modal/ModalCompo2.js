import React, { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../BookNow/BookNow.css";
import Modal from "react-modal";
import RoomNum from "../BookNow/RoomNum";
import "../Modal/Modal.css";

// function setRooms(event) {
//     // console.log(event.target.value)
//     ReactDOM.render(
//       <RoomNum total={event.target.value} />,
//       document.getElementById("all-rooms")
//     );
//   };

const ModalCompo2 = (props) => {
  var modelIsOpen = props.open;

  const [modalIsOpen, setIsOpen] = React.useState(modelIsOpen);
  function openModal() {
    setIsOpen(true);
  }

  //   function afterOpenModal() {
  //     // references are now sync'd and can be accessed.
  //     subtitle.style.color = "#f00";
  //   }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="modal-container">
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        //   style={customStyles}
        //   contentLabel="Example Modal"
        className="modal-wrapper"
      >
        <RoomNum total={props.total} />
        <div className="btn-container">
          <button className="modal-close" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalCompo2;

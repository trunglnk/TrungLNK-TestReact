import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Api from "../../contains/api";

const DeleteModal = ({selectedSpecies, setSelectedSpecies, setIsDeleteModalOpen}) => {
  console.log(selectedSpecies);
  const token = localStorage.getItem("token");

  const handleDeleteSpecies = async () => {
    try {
      await axios.delete(
        `${Api.apiLoai}/${selectedSpecies.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Xóa user thành công!");

      setSelectedSpecies(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={true} onHide={() => setIsDeleteModalOpen(false)}>
    <div className="modal" id="deleteModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header delete">
            <h4 className="modal-title">Bạn có chắc chắn không?</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* Modal body */}
          <div className="modal-body" id="body-delete">
            Bạn có chắc chắn muốn xóa người dùng: 
          </div>

          {/* Modal footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
            >
              Không
            </button>
            <button
              type="button"
              className="btn btn-danger"
              id="delete"
              data-bs-dismiss="modal"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default DeleteModal;

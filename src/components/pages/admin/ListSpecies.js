import React, { useEffect, useState } from "react";
import "./ListSpecies.css";
import { useNavigate } from "react-router-dom";

import { FaShieldCat } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "axios";
import Api, { Url } from "../../../contains/api";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeaderAd from "../../layouts/HeaderAd";
import FooterAd from "../../layouts/FooterAd";

const ListSpecies = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState([]);
  const [selectPage, setSelectPage] = useState(10);
  const token = localStorage.getItem("token");

  const getSpecies = async (page) => {
    setIsLoad(true);
    try {
      let apiUrl = `${Api.apiLoai}?paginate=true&page=${page}&perpage=${selectPage}&with=roles,createdBy&search=${searchInput}&inactive=-1`;
      console.log(apiUrl);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

 
  let start = (currentPage - 1) * selectPage + 1;
  let end = currentPage * selectPage;
  if (end >= total) {
    end = total;
  }

  const handleLoadPage = async (page) => {
    const items = await getSpecies(page);
    console.log(items);
    setSpeciesInfo(items.list);
    setCurrentPage(page);
    setTotal(items.pagination.total);
    setTotalPages(items.pagination.total / selectPage);
  };

  useEffect(() => {
    handleLoadPage(currentPage);
    // eslint-disable-next-line
  }, [currentPage, selectPage, searchInput]);

  const handlePageChange = (selectedPage) => {
    handleLoadPage(selectedPage.selected + 1);
  };

  //Select page
  const handleSelectChange = (e) => {
    const newSelectPage = e.target.value;
    // console.log("Select value changed:", newSelectPage);
    setSelectPage(newSelectPage);
  };

  //Search
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleDeleteSpecies = async () => {
    try {
      let api = `${Api.apiLoai}/${selectedSpecies.id}`;
      // console.log(api);
      await axios.delete(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Xóa thành công!");

      const updatedSpeciesList = speciesInfo.filter(
        (species) => species.id !== selectedSpecies.id
      );
      setSpeciesInfo(updatedSpeciesList);
      handleLoadPage(currentPage);
      setSelectedSpecies(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = () => {
    navigate("/them-moi");
  };

  // Edit
  const handleEditSpecies = (id) => {
    navigate(`/chi-tiet/${id}`);
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <HeaderAd />
      {/* End header */}

      <div className="species-content">
        <div className="species-content-title">
          <div className="species-title-icon">
            <FaShieldCat className="icon-title" />
          </div>
          <div className="species-title-title">Loài nguy cấp quý hiếm</div>
        </div>
        <div className="species-content-action">
          <div className="species-action">
            <div className="species-action-search">
              <FaMagnifyingGlass className="icon-search" />
              <input
                placeholder="Tìm kiếm theo tên"
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <div className="species-action-add">
            <button
              color="#fff"
              colorhover="#da3a2c"
              backcolor="#da2a1c"
              className="btnAdd-species"
              onClick={handleChangePage}
            >
              + Thêm mới
            </button>
          </div>
        </div>
        <div className="species-table">
          <table>
            <thead>
              <tr className="species-table-head">
                <th>Tên</th>
                <th>Tên Khoa Học</th>
                <th>Giới</th>
                <th>Ngành</th>
                <th>Lớp</th>
                <th>Bộ</th>
                <th>Họ</th>
                <th>Chi</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {isLoad && (
                  <div load="0" class="horizontal-bar-wrap">
                    <div className="bar1 bar"></div>
                  </div>
                )}
              </tr>
              {speciesInfo.map((item, index) => (
                <tr className="species-info" key={item.id}>
                  <td>
                    <div className="species-detail">
                      <div className="species-img">
                        <img
                          src={
                            Url +
                            (item.attachments[0] && item.attachments[0].path
                              ? item.attachments[0].path
                              : "static/img/favicon.e4ca0e6e.png")
                          }
                          alt="anh loai"
                        />
                      </div>
                      <div className="species-name">{item.ten}</div>
                    </div>
                  </td>
                  <td>{item.ten_khoa_hoc}</td>
                  <td>{item.kingdom.ten}</td>
                  <td>
                    {item.phylumn.ten
                      ? item.phylumn.ten
                      : item.phylumn.ten_khoa_hoc}
                  </td>
                  <td>{item.class.ten ? item.class.ten : item.class.ten_khoa_hoc}</td>
                  <td>
                    {item.order.ten ? item.order.ten : item.order.ten_khoa_hoc}
                  </td>
                  <td>{item.family.ten_khoa_hoc}</td>
                  <td>{item.genus.ten_khoa_hoc}</td>
                  <td>
                    <div className="species-edit">
                      <FaPencil className="icon-action" onClick={() => handleEditSpecies(item.id)}/>
                    </div>
                    <div
                      className="species-delete"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => setSelectedSpecies(item)}
                    >
                      <FaTrashCan className="icon-action" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* paginate */}
        <div className="paginate-content d-flex justify-content-between">
          <div className="sc-lbyHcV bMbLTF">
            {start}-{end}/{total}
          </div>
          <div className="pagination-detail d-flex justify-content-center">
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageChange}
              forcePage={currentPage - 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              previousLabel={"‹"}
              nextLabel={"›"}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            value={selectPage}
            onChange={handleSelectChange}
          >
            <option value="5">5 / trang</option>
            <option value="10" selected>
              10 / trang
            </option>
            <option value="20">20 / trang</option>
            <option value="25">25 / trang</option>
          </select>
        </div>

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
                Bạn có chắc muốn xóa{" "}
                <b style={{ color: "#da2a1a" }}>
                  {selectedSpecies && selectedSpecies.ten}
                </b>{" "}
                ? Điều này hoàn toàn không thế hoàn tác!
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
                  onClick={handleDeleteSpecies}
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterAd />
    </div>
  );
};

export default ListSpecies;

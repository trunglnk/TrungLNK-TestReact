import React, { memo, useEffect, useState } from "react";
import HeaderAd from "../../layouts/HeaderAd";
import FooterAd from "../../layouts/FooterAd";
import { Select } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import "./EditPage.css";
import { useNavigate } from "react-router-dom";
// import { authContext } from "../../../useContext/authContext";
import Api, { YEARS } from "../../../contains/api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//data
const phylum = JSON.parse(sessionStorage.getItem("phylum"));
const CLASS = JSON.parse(sessionStorage.getItem("CLASS"));
const order = JSON.parse(sessionStorage.getItem("order"));
const family = JSON.parse(sessionStorage.getItem("family"));
const genus = JSON.parse(sessionStorage.getItem("genus"));

const EditPage = memo(() => {
  const navigate = useNavigate();
  const handleChangePage = () => {
    navigate("/species");
  };
  const token = localStorage.getItem("token");
  const [validateError, setValidateError] = useState([]);

  const [kingdomList, setKingdomList] = useState([]);
  const [phylumList, setPhylumList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [familyList, setFamilyList] = useState([]);
  const [genusList, setGenusList] = useState([]);
  const [redbookList, setRedbookList] = useState([]);
  const [iucnList, setIucnList] = useState([]);

  useEffect(() => {
    // Lấy data từ local
    const kingdomData = JSON.parse(sessionStorage.getItem("kingdom"));
    const phylumData = JSON.parse(sessionStorage.getItem("phylum"));
    const classData = JSON.parse(sessionStorage.getItem("CLASS"));
    const orderData = JSON.parse(sessionStorage.getItem("order"));
    const familyData = JSON.parse(sessionStorage.getItem("family"));
    const genusData = JSON.parse(sessionStorage.getItem("genus"));
    const redbookData = JSON.parse(sessionStorage.getItem("redbook"));
    const iucnData = JSON.parse(sessionStorage.getItem("iucn"));

    // console.log(iucnData);

    // Set data cho state
    setKingdomList(kingdomData);
    setPhylumList(phylumData);
    setClassList(classData);
    setOrderList(orderData);
    setFamilyList(familyData);
    setGenusList(genusData);
    setRedbookList(redbookData[0].childs);
    setIucnList(iucnData[0].childs);
  }, []);

  const [ten, setTen] = useState("");
  const [tenKhoahoc, setTenkhoahoc] = useState("");
  const [tenTacgia, setTentacgia] = useState("");
  const [tenDiaphuong, setTendiaphuong] = useState("");
  const [nguonDulieu, setNguondulieu] = useState("");
  const [kingId, setKingid] = useState("");
  const [phylumId, setPhylumid] = useState("");
  const [classId, setClassid] = useState("");
  const [orderId, setOderid] = useState("");
  const [familyId, setFamilyid] = useState("");
  const [genusId, setGenusid] = useState("");
  const [sinhCanhid, setSinhcanhid] = useState("");
  const [suyGiamid, setSuygiamid] = useState("");
  const [namRedbook, setNamreddbook] = useState("");
  const [namIucn, setNamiucn] = useState("");

  const handleAddSpecies = (e) => {
    const url = Api.apiLoai;
    e.preventDefault();

    const newSpecies = {
      attachments: [],
      class_id: classId,
      cong_bo: true,
      dac_diem_loai: "",
      dac_diem_sinh_thai: "",
      family_id: familyId,
      genus_id: genusId,
      gia_tri_loai: "",
      isTrusted: true,
      is_loai_dac_huu: null,
      iucns:
        namRedbook && sinhCanhid ? [{ nam: namRedbook, id: sinhCanhid }] : [],
      kingdom_id: kingId,
      loai_noi_bat: false,
      minh_hoa_attachments: [],
      nghi_dinhs: [],
      nguon_du_lieu: nguonDulieu ? nguonDulieu : null,
      order_id: orderId,
      phylum_id: phylumId,
      qrcode_color: "#fff",
      sach_dos: namIucn && suyGiamid ? [{ nam: namIucn, id: suyGiamid }] : [],
      show_qrcode: true,
      sinh_canh_bi_chia_cat_suy_giam: {
        mo_ta_chi_tiet: "",
        noi_cu_tru_hoac_phan_bo: "Không xác định",
        su_suy_giam_lien_tuc_khu_vuc_phan_bo: "Không xác định",
        thong_tin_khac: "",
      },
      su_suy_giam_quan_the: {
        mo_ta_chi_tiet: "",
        suy_giam_quan_the_theo_quan_sat: "Không xác định",
        suy_giam_quan_the_theo_thoi_diem_danh_gia: "Không xác định",
        thong_tin_khac: "",
      },
      ten_dia_phuong: tenDiaphuong ? tenDiaphuong : null,
      ten: ten,
      ten_khoa_hoc: tenKhoahoc,
      ten_tac_gia: tenTacgia ? tenTacgia : null,
      toa_dos: [],
    };

    axios
      .post(url, newSpecies, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Thêm mới thành công !!! ");
        navigate("/species");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        toast.error("Dữ liệu không thỏa mãn");
        setValidateError(error.response.data.errors);
      });
  };

  useEffect(() => {
    if (kingId) {
      setPhylumList(phylum.filter((data) => data.parent_id === kingId));
    }
    if (phylumId) {
      setClassList(CLASS.filter((data) => data.parent_id === phylumId));
    }
    if (classId) {
      setOrderList(order.filter((data) => data.parent_id === classId));
    }
    if (orderId) {
      setFamilyList(family.filter((data) => data.parent_id === orderId));
    }
    if (familyId) {
      setGenusList(genus.filter((data) => data.parent_id === familyId));
    }
  }, [kingId, phylumId, classId, orderId, familyId]);

  return (
    <>
      <HeaderAd />
      <div
        className="container-fluid position-absolute"
        style={{ top: "70px" }}
      >
        <div className="text-center pt-2 pb-4 d-flex title-form">
          <div className="mr-4">
            <button
              type="button"
              className="btn-back"
              onClick={handleChangePage}
            >
              <span className="v-btn__content">
                <FaArrowLeft className="icon-back" />
              </span>
            </button>
          </div>
          <div className="d-flex align-center flex-grow-1">
            <h2>
              {" "}
              THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN
              BẢO VỆ{" "}
            </h2>
          </div>
        </div>
        <form>
          <div className="indexing">
            <h3>I. Thông tin chung về loài</h3>
            <div className="row">
              <div className="col col-lg-12">
                <div className="row">
                  <div className="col col-12 p-2">
                    <label className="input-fiel">
                      Tên<span className="red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên"
                      name="name"
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
                    />
                    <div className="error-message-form mt-2">
                      {validateError.ten}
                    </div>
                  </div>
                  <div className="col col-6 p-2">
                    <label className="input-fiel">
                      Tên khoa học<span className="red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên khoa học"
                      name="tenkhoahoc"
                      value={tenKhoahoc}
                      onChange={(e) => setTenkhoahoc(e.target.value)}
                    />
                    <div className="error-message-form mt-2">
                      {validateError.ten_khoa_hoc}
                    </div>
                  </div>
                  <div className="col col-6 p-2">
                    <label className="input-fiel">Tên tác giả</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên tác giả"
                      name="tentacgia"
                      value={tenTacgia}
                      onChange={(e) => setTentacgia(e.target.value)}
                    />
                  </div>
                  <div className="col col-12 p-2">
                    <label className="input-fiel">Tên Địa Phương</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên Địa Phương"
                      name="tendiaphuong"
                      value={tenDiaphuong}
                      onChange={(e) => setTendiaphuong(e.target.value)}
                    />
                  </div>
                  <div className="col col-12 p-2">
                    <label className="input-fiel">Nguồn dữ liệu</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nguồn dữ liệu"
                      name="nguondulieu"
                      value={nguonDulieu}
                      onChange={(e) => setNguondulieu(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col col-lg-3">abc</div> */}
            </div>
          </div>

          <div className="indexing mt-4">
            <h3>II. Phân loại học</h3>
            <div className="row">
              <div className="col col-4 p-2">
                <label className="input-fiel">
                  Giới<span className="red">*</span>
                </label>
                <Select
                  placeholder="Giới"
                  style={{ width: "100%" }}
                  options={
                    kingdomList &&
                    kingdomList.map((data) => {
                      return {
                        label: `${data.ten_khoa_hoc} - ${data.ten}`,
                        value: data.uuid,
                      };
                    })
                  }
                  value={kingId}
                  onChange={(value) => {
                    console.log(value);
                    setKingid(value);
                  }}
                />
                <div className="error-message-form mt-2">
                  {validateError.kingdom_id}
                </div>
              </div>
              <div className="col col-4 p-2">
                <label className="input-fiel">
                  Ngành<span className="red">*</span>
                </label>
                <Select
                  placeholder="Ngành"
                  style={{ width: "100%" }}
                  options={
                    phylumList &&
                    phylumList.map((data) => {
                      return {
                        label: `${data.ten_khoa_hoc}${
                          data.ten ? ` - ${data.ten}` : ""
                        }`,
                        value: data.uuid,
                      };
                    })
                  }
                  value={phylumId}
                  onChange={(value) => {
                    setPhylumid(value);
                  }}
                />
                <div className="error-message-form mt-2">
                  {validateError.phylum_id}
                </div>
              </div>
              <div className="col col-4 p-2">
                <label className="input-fiel">
                  Lớp<span className="red">*</span>
                </label>
                <Select
                  placeholder="Lớp"
                  style={{ width: "100%" }}
                  options={
                    classList &&
                    classList.map((data) => {
                      return {
                        label: `${data.ten_khoa_hoc}${
                          data.ten ? ` - ${data.ten}` : ""
                        }`,
                        value: data.uuid,
                      };
                    })
                  }
                  value={classId}
                  onChange={(value) => setClassid(value)}
                />
                <div className="error-message-form mt-2">
                  {validateError.class_id}
                </div>
              </div>
              <div className="col col-4 p-2">
                <label className="input-fiel">
                  Bộ<span className="red">*</span>
                </label>
                <Select
                  placeholder="Bộ"
                  style={{ width: "100%" }}
                  options={
                    orderList &&
                    orderList.map((data) => {
                      return {
                        label: `${data.ten_khoa_hoc}${
                          data.ten ? ` - ${data.ten}` : ""
                        }`,
                        value: data.uuid,
                      };
                    })
                  }
                  value={orderId}
                  onChange={(value) => setOderid(value)}
                />
                <div className="error-message-form mt-2">
                  {validateError.order_id}
                </div>
              </div>
              <div className="col col-4 p-2">
                <label className="input-fiel">
                  Họ<span className="red">*</span>
                </label>
                <Select
                  placeholder="Họ"
                  style={{ width: "100%" }}
                  options={
                    familyList &&
                    familyList.map((data) => {
                      return {
                        label: `${data.ten_khoa_hoc}${
                          data.ten ? ` - ${data.ten}` : ""
                        }`,
                        value: data.uuid,
                      };
                    })
                  }
                  value={familyId}
                  onChange={(value) => setFamilyid(value)}
                />
                <div className="error-message-form mt-2">
                  {validateError.family_id}
                </div>
              </div>
              <div className="col col-4 p-2">
                <label className="input-fiel">
                  Chi<span className="red">*</span>
                </label>
                <Select
                  placeholder="Chi"
                  style={{ width: "100%" }}
                  options={
                    genusList &&
                    genusList.map((data) => {
                      return {
                        label: data.ten_khoa_hoc,
                        value: data.uuid,
                      };
                    })
                  }
                  value={genusId}
                  onChange={(value) => setGenusid(value)}
                />
                <div className="error-message-form mt-2">
                  {validateError.genus_id}
                </div>
              </div>
            </div>
          </div>

          <div className="indexing mt-4">
            <h3>III. Tình trạng bảo tồn</h3>
            <div className="row">
              <div className="col col-lg-6">
                <div className="row">
                  <h3>Sách đỏ</h3>
                  <div className="col col-6 p-2">
                    <label className="input-fiel">Năm</label>
                    <Select
                      style={{ width: "100%" }}
                      options={
                        YEARS &&
                        YEARS.map((data) => {
                          return {
                            label: data.nam,
                            value: data.nam,
                          };
                        })
                      }
                      value={namRedbook}
                      onChange={(value) => setNamreddbook(value)}
                    />
                  </div>
                  <div className="col col-6 p-2">
                    <label className="input-fiel">Hiện trạng</label>
                    <Select
                      style={{ width: "100%" }}
                      options={
                        redbookList &&
                        redbookList.map((data) => {
                          return {
                            label: `${data.ma_danh_muc} - ${data.ten}`,
                            value: data.id,
                          };
                        })
                      }
                      value={sinhCanhid}
                      onChange={(value) => setSinhcanhid(value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col col-lg-6">
                <div className="row">
                  <h3>IUCN</h3>
                  <div className="col col-6 p-2">
                    <label className="input-fiel">Năm</label>
                    <Select
                      style={{ width: "100%" }}
                      options={
                        YEARS &&
                        YEARS.map((data) => {
                          return {
                            label: data.nam,
                            value: data.nam,
                          };
                        })
                      }
                      value={namIucn}
                      onChange={(value) => setNamiucn(value)}
                    />
                  </div>
                  <div className="col col-6 p-2">
                    <label className="input-fiel">Hiện trạng</label>
                    <Select
                      style={{ width: "100%" }}
                      options={
                        iucnList &&
                        iucnList.map((data) => {
                          return {
                            label: `${data.ma_danh_muc} - ${data.ten}`,
                            value: data.id,
                          };
                        })
                      }
                      value={suyGiamid}
                      onChange={(value) => setSuygiamid(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="submit-addNew mb-5">
            <button
              color="#fff"
              colorhover="#cc592f"
              backcolor="#da2a1c"
              className="btn-addNew"
              onClick={handleAddSpecies}
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
      <FooterAd />
    </>
  );
});

export default EditPage;

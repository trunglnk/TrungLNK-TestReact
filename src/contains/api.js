const EndPoint = "https://wlp.howizbiz.com/api";
const Url = "https://wlp.howizbiz.com/";
const Api = {
  login: EndPoint + "/web-authenticate",
  apiMe: EndPoint + "/me",
  logout: EndPoint + "/logout",
  apiLoai: EndPoint + "/species",
  redbook: EndPoint + "/danhmuccha?ma_danh_mucs[]=REDBOOK",
  iucn: EndPoint + "/danhmuccha?ma_danh_mucs[]=IUCN",
  kingdom: EndPoint + "/phanloaihoc?ranks[]=Kingdom",
  phylum: EndPoint + "/phanloaihoc?ranks[]=Phylum",
  CLASS: EndPoint + "/phanloaihoc?ranks[]=Class",
  order: EndPoint + "/phanloaihoc?ranks[]=Order",
  family: EndPoint + "/phanloaihoc?ranks[]=Family",
  genus: EndPoint + "/phanloaihoc?ranks[]=Genus",
  sach_do: EndPoint + "/danhmuccha?ma_danh_mucs[]=REDBOOK&ma_danh_mucs[]=IUCN",
  phan_loai_hoc:
    EndPoint +
    "/phanloaihoc?ranks[]=Kingdom&ranks[]=Phylum&ranks[]=Class&ranks[]=Order&ranks[]=",
};

const currentYear = new Date().getFullYear();
const YEARS = [];
for (let year = currentYear; year >= 1990; year--) {
  YEARS.push({ nam: year.toString() });
}

export { EndPoint, Url, YEARS };
export default Api;

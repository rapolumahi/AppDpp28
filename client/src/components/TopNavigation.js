import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TopNavigation() {
  let storeObj = useSelector((store) => {
    return store;
  });
  console.log(storeObj);
  let navigate = useNavigate();
  useEffect(() => {
    if (
      storeObj &&
      storeObj.userData &&
      storeObj.userData.data &&
      storeObj.userData.data.firstName
    ) {
    } else {
      navigate("/");
    }
  }, []);
  let deleteAccount = async () => {
    let dataToSend = new FormData();
    dataToSend.append("gmail", storeObj.userData.data.gmail);
    let response = await axios.delete(
      "/deleteUser",
      dataToSend
    );
    console.log(response);
    if (response.data.status == "success") {
      alert(response.data.msg);
      navigate("/");
    } else {
      alert(response.data.msg);
    }
  };
  return (
    <div>
      <button>HOME</button>
      <button
        onClick={() => {
          navigate("/editprofile");
        }}
      >
        EDITPROFILE{" "}
      </button>
      <button
        onClick={() => {
          deleteAccount();
        }}
      >
        DELETE
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default TopNavigation;

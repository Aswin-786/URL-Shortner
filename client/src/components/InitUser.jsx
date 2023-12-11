import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import axios from "axios";
import { BASE_URL } from "../shared/config";
import { userState } from "../store/atom/user";

const InitUser = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          setUser({
            isLoading: false,
            userName: res.data.info.username,
            userId: res.data.info.id,
          });
          localStorage.setItem("token", res.data.token);
        }
      } catch (error) {
        setUser({
          isLoading: false,
          userName: null,
          userId: null,
        });
      }
    };
    checkProfile();
  }, []);

  return <></>;
};

export default InitUser;

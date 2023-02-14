import request from "umi-request";

export const getSdkList = () => {
  return request.get("/api/sdk").then((res) => res.data);
};

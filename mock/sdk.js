import mockjs from "mockjs";
export default {
  "GET /api/sdk": mockjs.mock({
    code: "0",
    msg: "服务运行成功",
    status: 10000,
    success: true,
    "data|30": [
      {
        "id|+1": 1,
        clientName: "11111", // 产品线id
        boardName: "boardName",
        tags: ["story", "feature", "nick"],
        requestor: "Kleven Yu",
      },
    ],
  }),
};

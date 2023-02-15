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
        clientName: "client@integer(0,100)", // 产品线id
        boardName: "boardName@integer(0,100)",
        "tags|1-4": ["story", "feature", "nick", "nick2", "nick3"],
        requestor: "Kleven Yu",
      },
    ],
  }),
};

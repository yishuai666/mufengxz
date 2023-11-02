export default {
  getTableData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          {
            name: "oppo",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "vivo",
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000,
          },
          {
            name: "苹果",
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000,
          },
          {
            name: "小米",
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: "三星",
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: "魅族",
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000,
          },
        ]
      }
    }
  },

  getCountData: () => {
    return {
      code: 200,
      data: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "starFilled",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9"
        },
        {
          "name": "本月收藏订单",
          "value": 210,
          "icon": "starFilled",
          "color": "#ffb980"
        },
        {
          "name": "本月未支付订单",
          "value": 1234,
          "icon": "GoodsFilled",
          "color": "#5ab1ef"
        },
      ]
    }
  },
  getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: [
          {
            date: [
              "20191001",
              "20191002",
              "20191003",
              "20191004",
              "20191005",
              "20191006",
              "20191007"
            ],
            data: [
              {
                "苹果": 1544,
                "小米": 1084,
                "华为": 3995,
                "oppo": 1482,
                "vivo": 4132,
                "一加": 4912
              },
              {
                "苹果": 2089,
                "小米": 3767,
                "华为": 3932,
                "oppo": 4926,
                "vivo": 2109,
                "一加": 1815
              },
              {
                "苹果": 1115,
                "小米": 2052,
                "华为": 2721,
                "oppo": 1028,
                "vivo": 1445,
                "一加": 1330
              },
              {
                "苹果": 3040,
                "小米": 3486,
                "华为": 3189,
                "oppo": 1604,
                "vivo": 2375,
                "一加": 3400
              },
              {
                "苹果": 2849,
                "小米": 1092,
                "华为": 2574,
                "oppo": 2018,
                "vivo": 3890,
                "一加": 4915
              },
              {
                "苹果": 1902,
                "小米": 3537,
                "华为": 4599,
                "oppo": 3345,
                "vivo": 3570,
                "一加": 3415
              },
              {
                "苹果": 3343,
                "小米": 4446,
                "华为": 2218,
                "oppo": 3713,
                "vivo": 4494,
                "一加": 4378
              }
            ],
            videoData: [
              {
                "name": "小米",
                "value": 2999
              },
              {
                "name": "苹果",
                "value": 5999
              },
              {
                "name": "vivo",
                "value": 1500
              },
              {
                "name": "oppo",
                "value": 1999
              },
              {
                "name": "魅族",
                "value": 2200
              },
              {
                "name": "三星",
                "value": 4500
              }
            ],
            "userData": [
              {
                "date": "周一",
                "new": 5,
                "active": 200
              },
              {
                "date": "周二",
                "new": 10,
                "active": 500
              },
              {
                "date": "周三",
                "new": 12,
                "active": 550
              },
              {
                "date": "周四",
                "new": 60,
                "active": 800
              },
              {
                "date": "周五",
                "new": 65,
                "active": 550
              },
              {
                "date": "周六",
                "new": 53,
                "active": 770
              },
              {
                "date": "周日",
                "new": 33,
                "active": 170
              }
            ]
          },

        ],
        userData: [
          {
            name: "oppo",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
        ],
        videoData: [
          {
            name: "oppo",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
        ],
      }
    }
  },
}
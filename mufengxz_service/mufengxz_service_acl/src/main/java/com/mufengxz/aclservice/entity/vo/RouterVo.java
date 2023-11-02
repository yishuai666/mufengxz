package com.mufengxz.aclservice.entity.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RouterVo {

    //路由名称
    private String name;
    //路由地址
    private String path;
    //路由对应组件
    private String component;
    //路由meta信息
    private Meta meta;

    @Data
    @AllArgsConstructor
    public class Meta {
        //标题
        private String title;
        //图标
        private String icon;
    }

    //子路由
    private List<RouterVo> children = new ArrayList<RouterVo>();
}

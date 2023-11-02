package com.mufengxz.aclservice.service;

import com.alibaba.fastjson.JSONObject;
import com.mufengxz.aclservice.entity.vo.RouterVo;

import java.util.List;
import java.util.Map;

public interface IndexService {

    /**
     * 根据用户名获取用户登录信息
     * @param username
     * @return
     */
    Map<String, Object> getUserInfo(String username);

    /**
     * 根据用户名获取动态菜单
     * @param username
     * @return
     */
    List<JSONObject> getMenu(String username);

    /**
     * 根据用户名获取动态菜单
     * @param username
     * @return
     */
    List<RouterVo> getMenuList(String username);

    /**
     * 根据用户名获取动态菜单
     * @param username
     * @return
     */
    List<RouterVo> getRouterList(String username);
}

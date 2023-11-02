package com.mufengxz.aclservice.helper;

import com.alibaba.fastjson.JSONObject;
import com.mufengxz.aclservice.entity.Permission;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 根据权限数据构建登录用户左侧菜单数据
 * </p>
 *
 * @author qy
 * @since 2019-11-11
 */
public class MenuHelper {

    /**
     * 构建菜单
     * @param treeNodes
     * @return
     */
    public static List<JSONObject> bulid(List<Permission> treeNodes) {
        List<JSONObject> menus = new ArrayList<>();
        if(treeNodes.size() == 1) {
            Permission topNode = treeNodes.get(0);
            //左侧一级菜单
            List<Permission> oneMenuList = topNode.getChildren();
            for(Permission one :oneMenuList) {
                JSONObject oneMenu = new JSONObject();
                oneMenu.put("path", one.getPath());
                oneMenu.put("component", one.getComponent());
                oneMenu.put("redirect", "noredirect");
//                oneMenu.put("name", "name_"+one.getId());
                oneMenu.put("name", one.getName());
                oneMenu.put("hidden", false);

                JSONObject oneMeta = new JSONObject();
                oneMeta.put("title", one.getName());
                oneMeta.put("icon", one.getIcon());
                oneMenu.put("meta", oneMeta);

                List<JSONObject> children = new ArrayList<>();
                List<Permission> twoMenuList = one.getChildren();
                for(Permission two :twoMenuList) {
                    JSONObject twoMenu = new JSONObject();
                    twoMenu.put("path", two.getPath());
                    twoMenu.put("component", two.getComponent());
//                    twoMenu.put("name", "name_"+two.getId());
                    twoMenu.put("name",  two.getName());
                    twoMenu.put("hidden", false);

                    JSONObject twoMeta = new JSONObject();
                    twoMenu.put("title", two.getName());
                    twoMenu.put("meta", twoMeta);

                    children.add(twoMenu);

                    List<Permission> threeMenuList = two.getChildren();
                    for(Permission three :threeMenuList) {
                        if(StringUtils.isEmpty(three.getPath())) continue;

                        JSONObject threeMenu = new JSONObject();
                        threeMenu.put("path", three.getPath());
                        threeMenu.put("component", three.getComponent());
//                        threeMenu.put("name", "name_"+three.getId());
                        threeMenu.put("name", three.getName());
                        threeMenu.put("hidden", true);

                        JSONObject threeMeta = new JSONObject();
                        threeMeta.put("title", three.getName());
                        threeMenu.put("meta", threeMeta);

                        children.add(threeMenu);
                    }
                }
                oneMenu.put("children", children);
                menus.add(oneMenu);
            }
        }
        return menus;
    }
}

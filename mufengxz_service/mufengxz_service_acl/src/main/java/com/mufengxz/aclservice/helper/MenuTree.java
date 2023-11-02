package com.mufengxz.aclservice.helper;

import com.mufengxz.aclservice.entity.Permission;
import com.mufengxz.aclservice.entity.vo.RouterVo;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * <p>
 * 生成菜单树
 * </p>
 *
 * @author yishuai666
 * @since 2023-10-31
 */
public class MenuTree {
    /**
     * <p>
     * 生成路由
     * </p>
     *
     * @author yishuai666
     * @since 2023-10-31
     */
    public static List<RouterVo> makeRouter(List<Permission> menuList, String pid) {
        List<RouterVo> routerList = new ArrayList<RouterVo>();
        Optional.ofNullable(menuList).orElse(new ArrayList<Permission>())
                .stream().filter(item -> item != null && Objects.equals(item.getPid(),pid))
                .forEach(item -> {
                    RouterVo router = new RouterVo();
                    router.setName(item.getName());
                    router.setPath(item.getPath());
                    router.setComponent(item.getComponent());
                    router.setMeta(router.new Meta(item.getName(), item.getIcon()));
                    List<RouterVo> children = makeRouter(menuList, item.getId());
                    router.setChildren(children);
                    routerList.add(router);
                });
        return routerList;
    }
    /**
     * <p>
     * 生成菜单树
     * </p>
     *
     * @author yishuai666
     * @since 2023-10-31
     */
    public static List<Permission> makeMenuTree(List<Permission> menuList, String pid) {
        List<Permission> permissionList = new ArrayList<Permission>();
        Optional.ofNullable(menuList).orElse(new ArrayList<Permission>())
                .stream().filter(item -> item != null && Objects.equals(item.getPid(),pid))
                .forEach(item -> {
                    Permission permission = new Permission();
                    BeanUtils.copyProperties(item, permission);
                    List<Permission> children = makeMenuTree(menuList, item.getId());
                    permission.setChildren(children);
                    permissionList.add(permission);
                });
        return permissionList;
    }
}

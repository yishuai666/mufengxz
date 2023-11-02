package com.mufengxz.aclservice.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mufengxz.aclservice.entity.Permission;
import com.mufengxz.aclservice.entity.Role;
import com.mufengxz.aclservice.entity.vo.RoleQueryVo;
import com.mufengxz.aclservice.service.PermissionService;
import com.mufengxz.commonutils.R;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 权限 菜单管理
 * </p>
 *
 * @author yishuai666
 * @since 2023-10-12
 */
@RestController
@RequestMapping("/admin/acl/permission")
//@CrossOrigin
public class PermissionController {

    @Autowired
    private PermissionService permissionService;


    @ApiOperation(value = "获取菜单分页列表")
    @GetMapping("{page}/{limit}")
    public R index(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数", required = true)
            @PathVariable Long limit,
            Permission permissionVo) {
        Page<Permission> pageParam = new Page<>(page, limit);
        QueryWrapper<Permission> wrapper = new QueryWrapper<>();
        if(!StringUtils.isEmpty(permissionVo.getName())) {
            wrapper.like("name",permissionVo.getName());
        }
        if(!StringUtils.isEmpty(permissionVo.getPath())) {
            wrapper.like("path",permissionVo.getPath());
        }
        if(!StringUtils.isEmpty(permissionVo.getComponent())) {
            wrapper.like("component",permissionVo.getComponent());
        }
        if(!StringUtils.isEmpty(permissionVo.getPermissionValue())) {
            wrapper.like("permission_value",permissionVo.getPermissionValue());
        }
        if(!StringUtils.isEmpty(permissionVo.getPid())) {
            wrapper.eq("pid",permissionVo.getPid());
        }
        if(!StringUtils.isEmpty(permissionVo.getType())) {
            wrapper.eq("type",permissionVo.getType());
        }
        if(!StringUtils.isEmpty(permissionVo.getStatus())) {
            wrapper.eq("status",permissionVo.getStatus());
        }
//        wrapper.ne("id","1");
        wrapper.orderByAsc("gmt_create");
        permissionService.page(pageParam,wrapper);
        return R.ok().data("items", pageParam.getRecords()).data("total", pageParam.getTotal());
    }

    //获取全部菜单
    @ApiOperation(value = "查询所有菜单")
    @GetMapping
    public R indexAllPermission() {
        List<Permission> list =  permissionService.queryAllMenuTy();
        return R.ok().data("children",list);
    }

    @ApiOperation(value = "递归删除菜单")
    @DeleteMapping("remove/{id}")
    public R remove(@PathVariable String id) {
        permissionService.removeChildByIdTy(id);
        return R.ok();
    }

    @ApiOperation(value = "给角色分配权限")
    @PostMapping("/doAssign")
    public R doAssign(String roleId,String[] permissionId) {
        permissionService.saveRolePermissionRealtionShipTy(roleId,permissionId);
        return R.ok();
    }

    @ApiOperation(value = "根据角色获取菜单")
    @GetMapping("toAssign/{roleId}")
    public R toAssign(@PathVariable String roleId) {
        List<Permission> list = permissionService.selectAllMenu(roleId);
        return R.ok().data("children", list);
    }



    @ApiOperation(value = "新增菜单")
    @PostMapping("save")
    public R save(@RequestBody Permission permission) {
        permissionService.save(permission);
        return R.ok();
    }

    @ApiOperation(value = "修改菜单")
    @PutMapping("update")
    public R updateById(@RequestBody Permission permission) {
        permissionService.updateById(permission);
        return R.ok();
    }

}


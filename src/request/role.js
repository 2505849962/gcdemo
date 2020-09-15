import $axios from "@/common/http"  // 导入封装好的axios!

// 获取菜单列表
export async function getRole(){
    let res = await $axios.get("/rolelist")
    if(res.code==200 && res.list){
        return res.list
    }else{
        return []
    }
}

// 添加菜单
export function addRole(data){
    return $axios.post("/roleadd",data)
}


// 修改菜单

export function editRole(data){
    return $axios.post("/roleedit",data)
}

// 删除菜单

export function delRole(id){
    return $axios.post("/roledelete",{id})
}


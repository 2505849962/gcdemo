import $axios from "@/common/http"  // 导入封装好的axios!

// 获取菜单列表
export async function getSpecs(page = 1,size = 10){
    let res = await $axios.get("/specslist?istree=1",{
        params:{
            size,
            page
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return []
    }
}

// 添加菜单
export function addSpecs(data){
    return $axios.post("/specsadd",data)
}


// 修改菜单

export function editSpecs(data){
    return $axios.post("/specsedit",data)
}

// 删除菜单

export function delSpecs(id){
    return $axios.post("/specsdelete",{id})
}


// 获取管理总数
export async function getTotal(){
    let res = await $axios.get("/specscount")
    console.log(res)
}
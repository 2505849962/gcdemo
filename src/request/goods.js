import $axios from "@/common/http"  // 导入封装好的axios!

// 获取菜单列表
export async function getGoods(page = 1,size = 10){
    let res = await $axios.get("/goodslist?istree=1",{
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
export function addGoods(data){
    return $axios.post("/goodsadd",data)
}


// 修改菜单

export function editGoods(data){
    return $axios.post("/goodsedit",data)
}

// 删除菜单

export function delGoods(id){
    return $axios.post("/goodsdelete",{id})
}


// 获取管理总数
export async function getTotal(){
    let res = await $axios.get("/goodscount")
    console.log(res)
}
import $axios from "@/common/http"  // 导入封装好的axios!

// 获取秒杀列表
export async function getSeck() {
    let res = await $axios.get("/secklist")
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}

// 添加秒杀
export function addSeck(data){
    return $axios.post("/seckadd",data)
}


// 修改秒杀
export function editSeck(data){
    return $axios.post("/seckedit",data)
}

// 删除秒杀

export function delSeck(id){
    return $axios.post("/seckdelete",{id})
}

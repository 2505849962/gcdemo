import dayjs from "dayjs"

export default {
    SETIMG(val){
     return "http://localhost:3030" + val
    },
    setTime(val,str ='YYYY/MM/DD HH:mm:ss'){
        return dayjs(val * 1).format(str) 
    }
}

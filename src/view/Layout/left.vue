<template>
  <div class="main">
    <h3 class="logo">小U商城后台</h3>
    <el-menu
      class="page-menu"
      router
      background-color="#444"
      text-color="#fff"
      :default-active="$route.path"
      :collapse="iscollapse"
    >
      <el-menu-item index="/index">
        <i class="el-icon-house"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <template v-for="(item,index) in menus">
          <el-menu-item v-if="item.type==2" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>

          <el-submenu v-else :index="index+''">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item :index="val.url" v-for="(val,idx) in item.children" :key="idx">{{val.title}}</el-menu-item>
          </el-submenu>
      </template>

    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      menus: "user/menus",
    }),
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped>
.main {
  width: 200px;
}
.logo{
  line-height: 60px;
  text-align: center;
  background-color: #666;
  white-space: nowrap;
  color: #fff;
  overflow: hidden;
}
.page-menu {
  border-right: none;
}
/* .page-menu span{
color: #fff;
} */

.el-submenu .el-menu-item {
  text-indent: 25px;
}
</style>
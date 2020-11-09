import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //在state中需要定义我们所需要管理的数组、对象、字符串
  state: {
    userId:0,
    username: 'root',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTU5MDMzMjQ0MX0.W5rSk8OqmU-guUw4nV6Zgnwl2m7NW0pFJpj2jSqhaNo',//localStorage.blogToken
    savedHTML:'',
    pageID:0,
    page:'',
    comment:'',
    followID:0
  },

  //只有getter中的依赖值（state中的某个需要派生状态的值）发生改变的时候才会被重新计算。
  getters:{
    userId:state => state.userId,
    username: state => state.username,
    token: state => state.token,
    comment:state => state.comment,
    savedHtml:state => state.savedHTML,
    pageID:state => state.pageID,
    page:state => state.page,
    followId:state => state.followID
  },

  // 更改store中state状态
  mutations: {
    setUserId(userId){
      this.state.userId = userId;
    },
    setUsername(username){
      this.state.username = username;
    },
    setComment(comment){
      this.state.comment = comment;
    },
    setSavedHTML(savedHTML){
      this.state.savedHTML = savedHTML;
    },
    setPageID(pageID){
      this.state.pageID = pageID;
    },
    setPage(page){
      this.state.page = page;
    },
    setFollowID(followID){
      this.state.followID = followID;
    }
  },

  //action可以提交mutation，在action中可以执行store.commit，而且action中可以有任何的异步操作。在页面中如果我们要用这个action，则需要执行store.dispatch
  actions: {
    commitUsername(username){
       this.commit('setUsername',username);
     },
    commitSavedHTML(savedHTML){
      this.commit('setSavedHTML',savedHTML);
    }
  },

  //module可以将store分割成模块，每个模块中拥有自己的state、mutation、action和getter。
  modules: {
  }
})

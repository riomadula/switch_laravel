"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_user_blogs_blog_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/user/blogs/blog.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/user/blogs/blog.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      blog_posts: [],
      createPost: {
        postTitle: "",
        postCategoryId: "",
        postContent: "",
        postAuthor: ""
      },
      /*editPost: {
          id: null,
          postTitle: "",
          postCategoryId: "",
          postContent: "",
          postAuthor: ""
      },
      deletePost: {
          id: null,
          postTitle: ""
      },*/

      blogPostTitleError: "",
      is_logged_in: true,
      is_calling_api: false
    };
  },
  created: function created() {
    this.fetchBlogPosts();
  },
  methods: {
    fetchBlogPosts: function fetchBlogPosts() {
      var _this = this;
      this.is_calling_api = true;
      this.$query("blog_post", {
        action_type: "list_all_blog_posts"
      }).then(function (res) {
        _this.is_calling_api = false;
        if (res.data.errors) {
          console.error(res.data.errors);
          return;
        }
        _this.blog_posts = res.data.data.blog_post || [];
      })["catch"](function (err) {
        _this.is_calling_api = false;
        console.error("Fetch blog posts failed:", err);
      });
    },
    // CREATE
    onSubmit: function onSubmit() {
      var _this2 = this;
      if (this.createPost.postTitle.trim() === "") {
        this.$swal("Error!", "Post title is required", "error");
        return;
      }
      this.blogPostTitleError = "";
      this.is_calling_api = true;
      this.$query("save_blog_post", {
        blog_posts: {
          action_type: "create_new_blog_post",
          post_title: this.createPost.postTitle,
          post_category_id: this.createPost.postCategoryId,
          post_content: this.createPost.postContent,
          post_author: this.createPost.postAuthor,
          date_created: new Date().toISOString().slice(0, 10),
          date_modified: new Date().toISOString().slice(0, 10)
        }
      }).then(function (res) {
        _this2.is_calling_api = false;
        if (res.data.errors) {
          var errors = Object.values(res.data.errors[0].extensions.validation).flat();
          _this2.blogPostTitleError = errors.length ? errors[0] : "";
        } else {
          _this2.$swal("Success!", "New Blog Post added successfully", "success");
          _this2.fetchBlogPosts();
          $("#newRecordModal").modal("hide");
        }
      })["catch"](function () {
        _this2.is_calling_api = false;
        _this2.$swal("Error!", _this2.global_error_message, "error");
      });
      this.resetForm();
    },
    resetForm: function resetForm() {
      this.newCategory.title = "";
    },
    dateFormatter: function dateFormatter(date) {
      return moment(date).format("MMMM D, YYYY");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/user/blogs/blog.vue?vue&type=template&id=2ed79096":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/user/blogs/blog.vue?vue&type=template&id=2ed79096 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0,
  "class": "loader"
};
var _hoisted_2 = {
  "class": "table table-bordered table-striped mt-3",
  cellpadding: "8",
  cellspacing: "0"
};
var _hoisted_3 = {
  "class": "modal fade",
  id: "newBlogPostsModal",
  tabindex: "-1",
  "aria-labelledby": "newBlogPostsModalLabel",
  "aria-hidden": "true"
};
var _hoisted_4 = {
  "class": "modal-dialog"
};
var _hoisted_5 = {
  "class": "modal-content"
};
var _hoisted_6 = {
  "class": "modal-body"
};
var _hoisted_7 = {
  "class": "mb-3"
};
var _hoisted_8 = {
  key: 0,
  "class": "text-danger mt-1"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [$data.is_calling_api ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "d-flex"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "Blog Posts"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-tools ms-auto"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": "btn btn-success",
    "data-bs-toggle": "modal",
    "data-bs-target": "#newRecordModal"
  }, " Create New Post ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_2, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "ID"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Title"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Category ID"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Content"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Author"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Date Created"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Date Modified"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "         Actions")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.blog_posts, function (post) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: post.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(post.id), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(post.postTitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(post.postCategoryId), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(post.postContent), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(post.postAuthor), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(post.postDateCreated), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(post.postDateModified), 1 /* TEXT */), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", {
      width: "150",
      align: "center"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      "class": "btn btn-warning me-2"
    }, "Edit"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      "class": "btn btn-danger"
    }, "Delete")], -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal for Create New Blog Post "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.onSubmit && $options.onSubmit.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    "class": "modal-title",
    id: "newBlogPostsModalLabel"
  }, "New Record"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "name",
    "class": "form-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "class": "form-control",
    id: "name",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.newCategory.title = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.newCategory.title]]), _ctx.blogCategoryTitleError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.blogCategoryTitleError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    "class": "btn btn-success"
  }, "Save changes")], -1 /* CACHED */))])])], 32 /* NEED_HYDRATION */)])]);
}

/***/ }),

/***/ "./resources/js/user/blogs/blog.vue":
/*!******************************************!*\
  !*** ./resources/js/user/blogs/blog.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blog_vue_vue_type_template_id_2ed79096__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blog.vue?vue&type=template&id=2ed79096 */ "./resources/js/user/blogs/blog.vue?vue&type=template&id=2ed79096");
/* harmony import */ var _blog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blog.vue?vue&type=script&lang=js */ "./resources/js/user/blogs/blog.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_blog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_blog_vue_vue_type_template_id_2ed79096__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/user/blogs/blog.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/user/blogs/blog.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./resources/js/user/blogs/blog.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./blog.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/user/blogs/blog.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/user/blogs/blog.vue?vue&type=template&id=2ed79096":
/*!************************************************************************!*\
  !*** ./resources/js/user/blogs/blog.vue?vue&type=template&id=2ed79096 ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_vue_vue_type_template_id_2ed79096__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_vue_vue_type_template_id_2ed79096__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./blog.vue?vue&type=template&id=2ed79096 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/user/blogs/blog.vue?vue&type=template&id=2ed79096");


/***/ })

}]);
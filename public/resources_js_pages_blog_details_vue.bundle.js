"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_blog_details_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/blog_details.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/blog_details.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BlogDetails",
  props: ["id"],
  data: function data() {
    return {
      blog_posts: {},
      blog_category: {},
      is_calling_api: false
    };
  },
  created: function created() {
    this.fetchSinglePost(this.id);
  },
  methods: {
    // Fetch Blog Posts Functions
    fetchSinglePost: function fetchSinglePost() {
      var _this = this;
      this.is_calling_api = true;
      this.$query("blogs", {
        action_type: "get_single_blog_post",
        id: this.$route.params.id
      }).then(function (res) {
        console.log(res.data.data.blog_posts);
        _this.is_calling_api = false;
        _this.blog_posts = res.data.data.blog_posts[0] || [];
      })["catch"](function (err) {
        _this.is_calling_api = false;
        console.error("Fetch blog posts failed:", err);
      });
    },
    fetchSinglePost2: function fetchSinglePost2() {
      var _this2 = this;
      this.is_calling_api = true;
      this.$query("save_blog_post", {
        blog_posts: {
          action_type: "get_single_blog_post",
          id: this.$route.params.id
        }
      }).then(function (res) {
        console.log(res);
        _this2.is_calling_api = false;
        _this2.blog_posts = res.data.data.blog_posts.blog || [];
      })["catch"](function (err) {
        _this2.is_calling_api = false;
        console.error("Fetch blog posts failed:", err);
      });
    },
    dateFormatter: function dateFormatter(date) {
      return moment(date).format("MMM D, YYYY");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/blog_details.vue?vue&type=template&id=d5bedbe4":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/blog_details.vue?vue&type=template&id=d5bedbe4 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  id: "main-content",
  "class": "blog-page"
};
var _hoisted_2 = {
  "class": "container"
};
var _hoisted_3 = {
  "class": "row clearfix"
};
var _hoisted_4 = {
  "class": "col-lg-8 col-md-12 left-box"
};
var _hoisted_5 = {
  "class": "card single_post"
};
var _hoisted_6 = {
  "class": "body"
};
var _hoisted_7 = {
  "class": "h5 mb-3"
};
var _hoisted_8 = {
  "class": "col-lg-4 col-md-12 right-box"
};
var _hoisted_9 = {
  "class": "card"
};
var _hoisted_10 = {
  "class": "body widget"
};
var _hoisted_11 = {
  "class": "list-unstyled categories-clouds m-b-0"
};
var _hoisted_12 = {
  href: "javascript:void(0);"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$data$blog_posts, _$data$blog_posts2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "img-post"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    "class": "d-block img-fluid",
    src: "https://www.bootdey.com/image/800x280/87CEFA/000000",
    alt: "First slide"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.blog_posts.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.blog_posts.author) + " | " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$blog_posts = $data.blog_posts) === null || _$data$blog_posts === void 0 || (_$data$blog_posts = _$data$blog_posts.blog_category) === null || _$data$blog_posts === void 0 ? void 0 : _$data$blog_posts.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.blog_posts.content), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Categories Clouds "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Categories Clouds")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$blog_posts2 = $data.blog_posts) === null || _$data$blog_posts2 === void 0 || (_$data$blog_posts2 = _$data$blog_posts2.blog_category) === null || _$data$blog_posts2 === void 0 ? void 0 : _$data$blog_posts2.title), 1 /* TEXT */)])])])])])])])]);
}

/***/ }),

/***/ "./resources/js/pages/blog_details.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/blog_details.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blog_details_vue_vue_type_template_id_d5bedbe4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blog_details.vue?vue&type=template&id=d5bedbe4 */ "./resources/js/pages/blog_details.vue?vue&type=template&id=d5bedbe4");
/* harmony import */ var _blog_details_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blog_details.vue?vue&type=script&lang=js */ "./resources/js/pages/blog_details.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_blog_details_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_blog_details_vue_vue_type_template_id_d5bedbe4__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/blog_details.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/blog_details.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/blog_details.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_details_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_details_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./blog_details.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/blog_details.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/blog_details.vue?vue&type=template&id=d5bedbe4":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/blog_details.vue?vue&type=template&id=d5bedbe4 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_details_vue_vue_type_template_id_d5bedbe4__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_blog_details_vue_vue_type_template_id_d5bedbe4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./blog_details.vue?vue&type=template&id=d5bedbe4 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/blog_details.vue?vue&type=template&id=d5bedbe4");


/***/ })

}]);
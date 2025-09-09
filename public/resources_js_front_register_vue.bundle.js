"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_front_register_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/register.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/register.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // variable declaration
  data: function data() {
    return {
      name: '',
      email: '',
      address: '',
      password: '',
      password_confirm: '',
      is_terms: false,
      // Error messages
      name_error: '',
      email_error: '',
      address_error: '',
      password_error: '',
      // Password
      password_confirm_error: '',
      // Password

      is_calling_api: false,
      is_logged_in: false,
      is_landing: true
    };
  },
  // method declaration
  methods: {
    // Function to handle form submission
    onSubmit: function onSubmit() {
      var _this = this;
      if (!this.is_terms) {
        this.$swal("Error!", "Please agree to all terms and conditions", "error");
        return;
      }
      // Logs
      //console.log(this.name, this.email, this.address, this.password, this.password_confirm, this.is_terms);
      this.is_calling_api = true;
      this.onClearError();
      this.$query("action_user", {
        // UserInput.php
        user: {
          action_type: "register",
          name: this.name,
          email: this.email,
          address: this.address,
          password: this.password,
          password_confirm: this.password_confirm
        }
      }).then(function (res) {
        console.log(res);
        _this.is_calling_api = false;
        if (res.data.errors) {
          var errors = Object.values(res.data.errors[0].extensions.validation).flat();
          var errors_keys = Object.keys(res.data.errors[0].extensions.validation).flat();
          _this.name_error = errors_keys.some(function (q) {
            return q == "user.name";
          }) ? errors[errors_keys.indexOf("user.name")] : "";
          _this.email_error = errors_keys.some(function (q) {
            return q == "user.email";
          }) ? errors[errors_keys.indexOf("user.email")] : "";
          _this.address_error = errors_keys.some(function (q) {
            return q == "user.address";
          }) ? errors[errors_keys.indexOf("user.address")] : "";
          _this.password_error = errors_keys.some(function (q) {
            return q == "user.password";
          }) ? errors[errors_keys.indexOf("user.password")] : "";
          _this.password_confirm_error = errors_keys.some(function (q) {
            return q == "user.password_confirm";
          }) ? errors[errors_keys.indexOf("user.password_confirm")] : "";
          //console.log('name_error', this.name_error);
        } else {
          // Success
          var response = res.data.data.user;
          if (response.error) {
            _this.$swal("Error!", response.message, "error");
          } else {
            _this.onClearFields();
            _this.$swal("Success!", response.message, "success").then(function () {
              _this.$router.push({
                name: 'login'
              });
            });
          }
        }
      })["catch"](function () {
        _this.is_calling_api = false;
        _this.$swal("Error!", _this.global_error_message, "error");
      });
    },
    onClearError: function onClearError() {
      this.name_error = "";
      this.email_error = "";
      this.address_error = "";
      this.password_error = "";
      this.password_confirm_error = "";
    },
    onClearFields: function onClearFields() {
      this.name = "";
      this.email = "";
      this.address = "";
      this.password = "";
      this.password_confirm = "";
      this.is_terms = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/register.vue?vue&type=template&id=1d918d72":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/register.vue?vue&type=template&id=1d918d72 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var _hoisted_1 = {
  "class": "vh-100 gradient-custom"
};
var _hoisted_2 = {
  "class": "mask d-flex align-items-center h-100 gradient-custom-3"
};
var _hoisted_3 = {
  "class": "container h-100"
};
var _hoisted_4 = {
  "class": "row d-flex justify-content-center align-items-center h-100"
};
var _hoisted_5 = {
  "class": "col-12 col-md-9 col-lg-7 col-xl-6"
};
var _hoisted_6 = {
  "class": "card bg-dark text-white",
  style: {
    "border-radius": "15px"
  }
};
var _hoisted_7 = {
  "class": "card-body p-5"
};
var _hoisted_8 = {
  "data-mdb-input-init": "",
  "class": "form-outline mb-4"
};
var _hoisted_9 = {
  "class": "text-danger"
};
var _hoisted_10 = {
  "data-mdb-input-init": "",
  "class": "form-outline mb-4"
};
var _hoisted_11 = {
  "class": "text-danger"
};
var _hoisted_12 = {
  "data-mdb-input-init": "",
  "class": "form-outline mb-4"
};
var _hoisted_13 = {
  "class": "text-danger"
};
var _hoisted_14 = {
  "data-mdb-input-init": "",
  "class": "form-outline mb-4"
};
var _hoisted_15 = {
  "class": "text-danger"
};
var _hoisted_16 = {
  "data-mdb-input-init": "",
  "class": "form-outline mb-4"
};
var _hoisted_17 = {
  "class": "text-danger"
};
var _hoisted_18 = {
  "class": "form-check d-flex justify-content-center mb-5"
};
var _hoisted_19 = {
  "class": "d-flex justify-content-center"
};
var _hoisted_20 = ["disabled"];
var _hoisted_21 = {
  key: 0,
  "class": "spinner-border spinner-border-sm me-2",
  role: "status",
  "aria-hidden": "true"
};
var _hoisted_22 = {
  "class": "text-center text-white-50 mt-5 mb-0"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    "class": "text-uppercase text-center mb-5"
  }, "Create an account", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.onSubmit && $options.onSubmit.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    id: "form3Example1cg",
    "class": "form-control form-control-lg",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.name = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.name]]), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-label",
    "for": "form3Example1cg"
  }, "Your Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.name_error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "email",
    id: "form3Example3cg",
    "class": "form-control form-control-lg",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.email = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.email]]), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-label",
    "for": "form3Example3cg"
  }, "Your Email", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.email_error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    id: "form3Example3cg",
    "class": "form-control form-control-lg",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.address = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.address]]), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-label",
    "for": "form3Example3cg"
  }, "Address", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.address_error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    id: "form3Example4cg",
    "class": "form-control form-control-lg",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.password = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.password]]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-label",
    "for": "form3Example4cg"
  }, "Password", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.password_error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    id: "form3Example4cdg",
    "class": "form-control form-control-lg",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.password_confirm = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.password_confirm]]), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-label",
    "for": "form3Example4cdg"
  }, "Repeat your password", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.password_confirm_error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "class": "form-check-input me-2",
    type: "checkbox",
    value: "",
    id: "form2Example3cg",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.is_terms = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.is_terms]]), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-check-label",
    "for": "form2Example3g"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" I agree all statements in "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#!",
    "class": "text-body text-white-50"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, "Terms of service")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <p class=\"text-danger\" v-if=\"is_terms_error\">{{ is_terms_error }}</p> ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    disabled: $data.is_calling_api,
    type: "submit",
    "data-mdb-button-init": "",
    "data-mdb-ripple-init": "",
    "class": "btn btn-outline-light btn-lg w-100"
  }, [$data.is_calling_api ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_21)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Register ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_20), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button  type=\"submit\" data-mdb-button-init\n                                data-mdb-ripple-init class=\"btn btn-outline-light btn-lg w-100\">Register</button> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Have already an account? ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    "class": "text-white-50 fw-bold",
    to: {
      name: 'login'
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _toConsumableArray(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, "Login here", -1 /* CACHED */)]));
    }),
    _: 1 /* STABLE */
  })])], 32 /* NEED_HYDRATION */)])])])])])])]);
}

/***/ }),

/***/ "./resources/js/front/register.vue":
/*!*****************************************!*\
  !*** ./resources/js/front/register.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _register_vue_vue_type_template_id_1d918d72__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.vue?vue&type=template&id=1d918d72 */ "./resources/js/front/register.vue?vue&type=template&id=1d918d72");
/* harmony import */ var _register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.vue?vue&type=script&lang=js */ "./resources/js/front/register.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_register_vue_vue_type_template_id_1d918d72__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/front/register.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/front/register.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./resources/js/front/register.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./register.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/register.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/front/register.vue?vue&type=template&id=1d918d72":
/*!***********************************************************************!*\
  !*** ./resources/js/front/register.vue?vue&type=template&id=1d918d72 ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_register_vue_vue_type_template_id_1d918d72__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_register_vue_vue_type_template_id_1d918d72__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./register.vue?vue&type=template&id=1d918d72 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/register.vue?vue&type=template&id=1d918d72");


/***/ })

}]);
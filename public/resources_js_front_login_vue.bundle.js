"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_front_login_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/login.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/login.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      //email: 'jessica.sanchez@vonjing.com',
      //password: 'Test_123456',

      // Error messages
      email_error: '',
      // Email
      password_error: '',
      // Password

      is_calling_api: false,
      is_logged_in: false
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      var _this = this;
      // Logs
      this.is_calling_api = true;
      this.onClearError();
      this.$query("action_user", {
        user: {
          action_type: "login",
          email: this.email,
          password: this.password
        }
      }).then(function (res) {
        //console.log(res);
        _this.is_calling_api = false;
        if (res.data.errors) {
          var errors = Object.values(res.data.errors[0].extensions.validation).flat();
          var errors_keys = Object.keys(res.data.errors[0].extensions.validation).flat();
          _this.email_error = errors_keys.some(function (q) {
            return q == "user.email";
          }) ? errors[errors_keys.indexOf("user.email")] : "";
          _this.password_error = errors_keys.some(function (q) {
            return q == "user.password";
          }) ? errors[errors_keys.indexOf("user.password")] : "";
        } else {
          // Success
          var response = res.data.data.user;
          if (response.error) {
            _this.$swal("Error!", response.message, "error");
            _this.email_error = response.message;
          } else {
            _this.onClearFields();
            var secret_passphrase = "DHdA27VY@%39";
            var encryptedToken = crypto_js__WEBPACK_IMPORTED_MODULE_0___default().AES.encrypt(response.access_token, secret_passphrase).toString();
            sessionStorage.setItem("access-token", encryptedToken);
            // this.$router.push({ name: "dashboard" });
            window.location.href = '/dashboard';
          }
        }
      })["catch"](function (err) {
        console.log(err);
        _this.is_calling_api = false;
        _this.$swal("Error!", _this.global_error_message, "error");
      });
    },
    onClearError: function onClearError() {
      this.email_error = "";
      this.password_error = "";
    },
    onClearFields: function onClearFields() {
      this.email = "";
      this.password = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/login.vue?vue&type=template&id=e146a116":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/login.vue?vue&type=template&id=e146a116 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "container py-5 h-100"
};
var _hoisted_3 = {
  "class": "row d-flex justify-content-center align-items-center h-100"
};
var _hoisted_4 = {
  "class": "col-12 col-md-8 col-lg-6 col-xl-5"
};
var _hoisted_5 = {
  "class": "card bg-dark text-white",
  style: {
    "border-radius": "1rem"
  }
};
var _hoisted_6 = {
  "class": "card-body p-5 text-center"
};
var _hoisted_7 = {
  "class": "mb-md-5 mt-md-4 pb-5"
};
var _hoisted_8 = {
  "data-mdb-input-init": "",
  "class": "form-outline form-white mb-4 text-start"
};
var _hoisted_9 = {
  "class": "text-danger"
};
var _hoisted_10 = {
  "data-mdb-input-init": "",
  "class": "form-outline form-white mb-4 text-start"
};
var _hoisted_11 = {
  "class": "text-danger"
};
var _hoisted_12 = {
  "class": "small mb-5 pb-lg-2"
};
var _hoisted_13 = ["disabled"];
var _hoisted_14 = {
  key: 0,
  "class": "spinner-border spinner-border-sm me-2",
  role: "status",
  "aria-hidden": "true"
};
var _hoisted_15 = {
  "class": "mb-0"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    "class": "fw-bold mb-2 text-uppercase"
  }, "Login", -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    "class": "text-white-50 mb-5"
  }, "Please enter your login and password!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.onSubmit && $options.onSubmit.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "email",
    id: "typeEmailX",
    "class": "form-control form-control-lg",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.email = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.email]]), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-label",
    "for": "typeEmailX"
  }, "Email", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.email_error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "password",
    id: "typePasswordX",
    "class": "form-control form-control-lg",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.password = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.password]]), _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "form-label",
    "for": "typePasswordX"
  }, "Password", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.password_error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    "class": "nav-link",
    to: {
      name: 'forgot-password'
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _toConsumableArray(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Forgot password?", -1 /* CACHED */)]));
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    disabled: $data.is_calling_api,
    type: "submit",
    "data-mdb-button-init": "",
    "data-mdb-ripple-init": "",
    "class": "btn btn-outline-light btn-lg w-100"
  }, [$data.is_calling_api ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_14)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Login ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_13), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex justify-content-center text-center mt-4 pt-1\"><a href=\"#!\" class=\"text-white\"><i class=\"fab fa-facebook-f fa-lg\"></i></a><a href=\"#!\" class=\"text-white\"><i class=\"fab fa-twitter fa-lg mx-4 px-2\"></i></a><a href=\"#!\" class=\"text-white\"><i class=\"fab fa-google fa-lg\"></i></a></div>", 1))], 32 /* NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Don't have an account? ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    "class": "text-white-50 fw-bold",
    to: {
      name: 'register'
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _toConsumableArray(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Sign Up", -1 /* CACHED */)]));
    }),
    _: 1 /* STABLE */
  })])])])])])])])]);
}

/***/ }),

/***/ "./resources/js/front/login.vue":
/*!**************************************!*\
  !*** ./resources/js/front/login.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _login_vue_vue_type_template_id_e146a116__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=e146a116 */ "./resources/js/front/login.vue?vue&type=template&id=e146a116");
/* harmony import */ var _login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js */ "./resources/js/front/login.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_login_vue_vue_type_template_id_e146a116__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/front/login.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/front/login.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./resources/js/front/login.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./login.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/login.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/front/login.vue?vue&type=template&id=e146a116":
/*!********************************************************************!*\
  !*** ./resources/js/front/login.vue?vue&type=template&id=e146a116 ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_login_vue_vue_type_template_id_e146a116__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_login_vue_vue_type_template_id_e146a116__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./login.vue?vue&type=template&id=e146a116 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/front/login.vue?vue&type=template&id=e146a116");


/***/ })

}]);
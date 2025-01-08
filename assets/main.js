/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
    enumerable: true,
    get: getter,
  });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module",
  });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value,
      });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
          return module["default"];
        }
        : /******/ function getModuleExports() {
          return module;
        };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__(
    (__webpack_require__.s = "./src/resources/scripts/main.js")
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./node_modules/axios/index.js":
      /*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! ./lib/axios */ "./node_modules/axios/lib/axios.js"
        );

        /***/
      },

    /***/ "./node_modules/axios/lib/adapters/xhr.js":
      /*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );
        var settle = __webpack_require__(
          /*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js"
        );
        var buildURL = __webpack_require__(
          /*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js"
        );
        var buildFullPath = __webpack_require__(
          /*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js"
        );
        var parseHeaders = __webpack_require__(
          /*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js"
        );
        var isURLSameOrigin = __webpack_require__(
          /*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js"
        );
        var createError = __webpack_require__(
          /*! ../core/createError */ "./node_modules/axios/lib/core/createError.js"
        );

        module.exports = function xhrAdapter(config) {
          return new Promise(function dispatchXhrRequest(resolve, reject) {
            var requestData = config.data;
            var requestHeaders = config.headers;

            if (utils.isFormData(requestData)) {
              delete requestHeaders["Content-Type"]; // Let the browser set it
            }

            var request = new XMLHttpRequest();

            // HTTP basic authentication
            if (config.auth) {
              var username = config.auth.username || "";
              var password = config.auth.password || "";
              requestHeaders.Authorization =
                "Basic " + btoa(username + ":" + password);
            }

            var fullPath = buildFullPath(config.baseURL, config.url);
            request.open(
              config.method.toUpperCase(),
              buildURL(fullPath, config.params, config.paramsSerializer),
              true
            );

            // Set the request timeout in MS
            request.timeout = config.timeout;

            // Listen for ready state
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }

              // The request errored out and we didn't get a response, this will be
              // handled by onerror instead
              // With one exception: request that using file: protocol, most browsers
              // will return status as 0 even though it's a successful request
              if (
                request.status === 0 &&
                !(
                  request.responseURL &&
                  request.responseURL.indexOf("file:") === 0
                )
              ) {
                return;
              }

              // Prepare the response
              var responseHeaders =
                "getAllResponseHeaders" in request
                  ? parseHeaders(request.getAllResponseHeaders())
                  : null;
              var responseData =
                !config.responseType || config.responseType === "text"
                  ? request.responseText
                  : request.response;
              var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request,
              };

              settle(resolve, reject, response);

              // Clean up request
              request = null;
            };

            // Handle browser request cancellation (as opposed to a manual cancellation)
            request.onabort = function handleAbort() {
              if (!request) {
                return;
              }

              reject(
                createError("Request aborted", config, "ECONNABORTED", request)
              );

              // Clean up request
              request = null;
            };

            // Handle low level network errors
            request.onerror = function handleError() {
              // Real errors are hidden from us by the browser
              // onerror should only fire if it's a network error
              reject(createError("Network Error", config, null, request));

              // Clean up request
              request = null;
            };

            // Handle timeout
            request.ontimeout = function handleTimeout() {
              var timeoutErrorMessage =
                "timeout of " + config.timeout + "ms exceeded";
              if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
              }
              reject(
                createError(
                  timeoutErrorMessage,
                  config,
                  "ECONNABORTED",
                  request
                )
              );

              // Clean up request
              request = null;
            };

            // Add xsrf header
            // This is only done if running in a standard browser environment.
            // Specifically not if we're in a web worker, or react-native.
            if (utils.isStandardBrowserEnv()) {
              var cookies = __webpack_require__(
                /*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js"
              );

              // Add xsrf header
              var xsrfValue =
                (config.withCredentials || isURLSameOrigin(fullPath)) &&
                  config.xsrfCookieName
                  ? cookies.read(config.xsrfCookieName)
                  : undefined;

              if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
              }
            }

            // Add headers to the request
            if ("setRequestHeader" in request) {
              utils.forEach(
                requestHeaders,
                function setRequestHeader(val, key) {
                  if (
                    typeof requestData === "undefined" &&
                    key.toLowerCase() === "content-type"
                  ) {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key];
                  } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val);
                  }
                }
              );
            }

            // Add withCredentials to request if needed
            if (!utils.isUndefined(config.withCredentials)) {
              request.withCredentials = !!config.withCredentials;
            }

            // Add responseType to request if needed
            if (config.responseType) {
              try {
                request.responseType = config.responseType;
              } catch (e) {
                // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                if (config.responseType !== "json") {
                  throw e;
                }
              }
            }

            // Handle progress if needed
            if (typeof config.onDownloadProgress === "function") {
              request.addEventListener("progress", config.onDownloadProgress);
            }

            // Not all browsers support upload events
            if (
              typeof config.onUploadProgress === "function" &&
              request.upload
            ) {
              request.upload.addEventListener(
                "progress",
                config.onUploadProgress
              );
            }

            if (config.cancelToken) {
              // Handle cancellation
              config.cancelToken.promise.then(function onCanceled(cancel) {
                if (!request) {
                  return;
                }

                request.abort();
                reject(cancel);
                // Clean up request
                request = null;
              });
            }

            if (requestData === undefined) {
              requestData = null;
            }

            // Send the request
            request.send(requestData);
          });
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/axios.js":
      /*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./utils */ "./node_modules/axios/lib/utils.js"
        );
        var bind = __webpack_require__(
          /*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js"
        );
        var Axios = __webpack_require__(
          /*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js"
        );
        var mergeConfig = __webpack_require__(
          /*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js"
        );
        var defaults = __webpack_require__(
          /*! ./defaults */ "./node_modules/axios/lib/defaults.js"
        );

        /**
         * Create an instance of Axios
         *
         * @param {Object} defaultConfig The default config for the instance
         * @return {Axios} A new instance of Axios
         */
        function createInstance(defaultConfig) {
          var context = new Axios(defaultConfig);
          var instance = bind(Axios.prototype.request, context);

          // Copy axios.prototype to instance
          utils.extend(instance, Axios.prototype, context);

          // Copy context to instance
          utils.extend(instance, context);

          return instance;
        }

        // Create the default instance to be exported
        var axios = createInstance(defaults);

        // Expose Axios class to allow class inheritance
        axios.Axios = Axios;

        // Factory for creating new instances
        axios.create = function create(instanceConfig) {
          return createInstance(mergeConfig(axios.defaults, instanceConfig));
        };

        // Expose Cancel & CancelToken
        axios.Cancel = __webpack_require__(
          /*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js"
        );
        axios.CancelToken = __webpack_require__(
          /*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js"
        );
        axios.isCancel = __webpack_require__(
          /*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js"
        );

        // Expose all/spread
        axios.all = function all(promises) {
          return Promise.all(promises);
        };
        axios.spread = __webpack_require__(
          /*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js"
        );

        module.exports = axios;

        // Allow use of default import syntax in TypeScript
        module.exports.default = axios;

        /***/
      },

    /***/ "./node_modules/axios/lib/cancel/Cancel.js":
      /*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /**
         * A `Cancel` is an object that is thrown when an operation is canceled.
         *
         * @class
         * @param {string=} message The message.
         */
        function Cancel(message) {
          this.message = message;
        }

        Cancel.prototype.toString = function toString() {
          return "Cancel" + (this.message ? ": " + this.message : "");
        };

        Cancel.prototype.__CANCEL__ = true;

        module.exports = Cancel;

        /***/
      },

    /***/ "./node_modules/axios/lib/cancel/CancelToken.js":
      /*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var Cancel = __webpack_require__(
          /*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js"
        );

        /**
         * A `CancelToken` is an object that can be used to request cancellation of an operation.
         *
         * @class
         * @param {Function} executor The executor function.
         */
        function CancelToken(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
          }

          var resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });

          var token = this;
          executor(function cancel(message) {
            if (token.reason) {
              // Cancellation has already been requested
              return;
            }

            token.reason = new Cancel(message);
            resolvePromise(token.reason);
          });
        }

        /**
         * Throws a `Cancel` if cancellation has been requested.
         */
        CancelToken.prototype.throwIfRequested = function throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        };

        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */
        CancelToken.source = function source() {
          var cancel;
          var token = new CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token: token,
            cancel: cancel,
          };
        };

        module.exports = CancelToken;

        /***/
      },

    /***/ "./node_modules/axios/lib/cancel/isCancel.js":
      /*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = function isCancel(value) {
          return !!(value && value.__CANCEL__);
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/core/Axios.js":
      /*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );
        var buildURL = __webpack_require__(
          /*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js"
        );
        var InterceptorManager = __webpack_require__(
          /*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js"
        );
        var dispatchRequest = __webpack_require__(
          /*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js"
        );
        var mergeConfig = __webpack_require__(
          /*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js"
        );

        /**
         * Create a new instance of Axios
         *
         * @param {Object} instanceConfig The default config for the instance
         */
        function Axios(instanceConfig) {
          this.defaults = instanceConfig;
          this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
          };
        }

        /**
         * Dispatch a request
         *
         * @param {Object} config The config specific for this request (merged with this.defaults)
         */
        Axios.prototype.request = function request(config) {
          /*eslint no-param-reassign:0*/
          // Allow for axios('example/url'[, config]) a la fetch API
          if (typeof config === "string") {
            config = arguments[1] || {};
            config.url = arguments[0];
          } else {
            config = config || {};
          }

          config = mergeConfig(this.defaults, config);

          // Set config.method
          if (config.method) {
            config.method = config.method.toLowerCase();
          } else if (this.defaults.method) {
            config.method = this.defaults.method.toLowerCase();
          } else {
            config.method = "get";
          }

          // Hook up interceptors middleware
          var chain = [dispatchRequest, undefined];
          var promise = Promise.resolve(config);

          this.interceptors.request.forEach(function unshiftRequestInterceptors(
            interceptor
          ) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
          });

          this.interceptors.response.forEach(function pushResponseInterceptors(
            interceptor
          ) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
          });

          while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
          }

          return promise;
        };

        Axios.prototype.getUri = function getUri(config) {
          config = mergeConfig(this.defaults, config);
          return buildURL(
            config.url,
            config.params,
            config.paramsSerializer
          ).replace(/^\?/, "");
        };

        // Provide aliases for supported request methods
        utils.forEach(
          ["delete", "get", "head", "options"],
          function forEachMethodNoData(method) {
            /*eslint func-names:0*/
            Axios.prototype[method] = function (url, config) {
              return this.request(
                utils.merge(config || {}, {
                  method: method,
                  url: url,
                })
              );
            };
          }
        );

        utils.forEach(
          ["post", "put", "patch"],
          function forEachMethodWithData(method) {
            /*eslint func-names:0*/
            Axios.prototype[method] = function (url, data, config) {
              return this.request(
                utils.merge(config || {}, {
                  method: method,
                  url: url,
                  data: data,
                })
              );
            };
          }
        );

        module.exports = Axios;

        /***/
      },

    /***/ "./node_modules/axios/lib/core/InterceptorManager.js":
      /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );

        function InterceptorManager() {
          this.handlers = [];
        }

        /**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         *
         * @return {Number} An ID used to remove interceptor later
         */
        InterceptorManager.prototype.use = function use(fulfilled, rejected) {
          this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected,
          });
          return this.handlers.length - 1;
        };

        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         */
        InterceptorManager.prototype.eject = function eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        };

        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         */
        InterceptorManager.prototype.forEach = function forEach(fn) {
          utils.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h);
            }
          });
        };

        module.exports = InterceptorManager;

        /***/
      },

    /***/ "./node_modules/axios/lib/core/buildFullPath.js":
      /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isAbsoluteURL = __webpack_require__(
          /*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js"
        );
        var combineURLs = __webpack_require__(
          /*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js"
        );

        /**
         * Creates a new URL by combining the baseURL with the requestedURL,
         * only when the requestedURL is not already an absolute URL.
         * If the requestURL is absolute, this function returns the requestedURL untouched.
         *
         * @param {string} baseURL The base URL
         * @param {string} requestedURL Absolute or relative URL to combine
         * @returns {string} The combined full path
         */
        module.exports = function buildFullPath(baseURL, requestedURL) {
          if (baseURL && !isAbsoluteURL(requestedURL)) {
            return combineURLs(baseURL, requestedURL);
          }
          return requestedURL;
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/core/createError.js":
      /*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var enhanceError = __webpack_require__(
          /*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js"
        );

        /**
         * Create an Error with the specified message, config, error code, request and response.
         *
         * @param {string} message The error message.
         * @param {Object} config The config.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         * @returns {Error} The created error.
         */
        module.exports = function createError(
          message,
          config,
          code,
          request,
          response
        ) {
          var error = new Error(message);
          return enhanceError(error, config, code, request, response);
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/core/dispatchRequest.js":
      /*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );
        var transformData = __webpack_require__(
          /*! ./transformData */ "./node_modules/axios/lib/core/transformData.js"
        );
        var isCancel = __webpack_require__(
          /*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js"
        );
        var defaults = __webpack_require__(
          /*! ../defaults */ "./node_modules/axios/lib/defaults.js"
        );

        /**
         * Throws a `Cancel` if cancellation has been requested.
         */
        function throwIfCancellationRequested(config) {
          if (config.cancelToken) {
            config.cancelToken.throwIfRequested();
          }
        }

        /**
         * Dispatch a request to the server using the configured adapter.
         *
         * @param {object} config The config that is to be used for the request
         * @returns {Promise} The Promise to be fulfilled
         */
        module.exports = function dispatchRequest(config) {
          throwIfCancellationRequested(config);

          // Ensure headers exist
          config.headers = config.headers || {};

          // Transform request data
          config.data = transformData(
            config.data,
            config.headers,
            config.transformRequest
          );

          // Flatten headers
          config.headers = utils.merge(
            config.headers.common || {},
            config.headers[config.method] || {},
            config.headers
          );

          utils.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            function cleanHeaderConfig(method) {
              delete config.headers[method];
            }
          );

          var adapter = config.adapter || defaults.adapter;

          return adapter(config).then(
            function onAdapterResolution(response) {
              throwIfCancellationRequested(config);

              // Transform response data
              response.data = transformData(
                response.data,
                response.headers,
                config.transformResponse
              );

              return response;
            },
            function onAdapterRejection(reason) {
              if (!isCancel(reason)) {
                throwIfCancellationRequested(config);

                // Transform response data
                if (reason && reason.response) {
                  reason.response.data = transformData(
                    reason.response.data,
                    reason.response.headers,
                    config.transformResponse
                  );
                }
              }

              return Promise.reject(reason);
            }
          );
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/core/enhanceError.js":
      /*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /**
         * Update an Error with the specified config, error code, and response.
         *
         * @param {Error} error The error to update.
         * @param {Object} config The config.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         * @returns {Error} The error.
         */
        module.exports = function enhanceError(
          error,
          config,
          code,
          request,
          response
        ) {
          error.config = config;
          if (code) {
            error.code = code;
          }

          error.request = request;
          error.response = response;
          error.isAxiosError = true;

          error.toJSON = function () {
            return {
              // Standard
              message: this.message,
              name: this.name,
              // Microsoft
              description: this.description,
              number: this.number,
              // Mozilla
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              // Axios
              config: this.config,
              code: this.code,
            };
          };
          return error;
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/core/mergeConfig.js":
      /*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ../utils */ "./node_modules/axios/lib/utils.js"
        );

        /**
         * Config-specific merge-function which creates a new config-object
         * by merging two configuration objects together.
         *
         * @param {Object} config1
         * @param {Object} config2
         * @returns {Object} New object resulting from merging config2 to config1
         */
        module.exports = function mergeConfig(config1, config2) {
          // eslint-disable-next-line no-param-reassign
          config2 = config2 || {};
          var config = {};

          var valueFromConfig2Keys = ["url", "method", "params", "data"];
          var mergeDeepPropertiesKeys = ["headers", "auth", "proxy"];
          var defaultToConfig2Keys = [
            "baseURL",
            "url",
            "transformRequest",
            "transformResponse",
            "paramsSerializer",
            "timeout",
            "withCredentials",
            "adapter",
            "responseType",
            "xsrfCookieName",
            "xsrfHeaderName",
            "onUploadProgress",
            "onDownloadProgress",
            "maxContentLength",
            "validateStatus",
            "maxRedirects",
            "httpAgent",
            "httpsAgent",
            "cancelToken",
            "socketPath",
          ];

          utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
            if (typeof config2[prop] !== "undefined") {
              config[prop] = config2[prop];
            }
          });

          utils.forEach(
            mergeDeepPropertiesKeys,
            function mergeDeepProperties(prop) {
              if (utils.isObject(config2[prop])) {
                config[prop] = utils.deepMerge(config1[prop], config2[prop]);
              } else if (typeof config2[prop] !== "undefined") {
                config[prop] = config2[prop];
              } else if (utils.isObject(config1[prop])) {
                config[prop] = utils.deepMerge(config1[prop]);
              } else if (typeof config1[prop] !== "undefined") {
                config[prop] = config1[prop];
              }
            }
          );

          utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
            if (typeof config2[prop] !== "undefined") {
              config[prop] = config2[prop];
            } else if (typeof config1[prop] !== "undefined") {
              config[prop] = config1[prop];
            }
          });

          var axiosKeys = valueFromConfig2Keys
            .concat(mergeDeepPropertiesKeys)
            .concat(defaultToConfig2Keys);

          var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(
            key
          ) {
            return axiosKeys.indexOf(key) === -1;
          });

          utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
            if (typeof config2[prop] !== "undefined") {
              config[prop] = config2[prop];
            } else if (typeof config1[prop] !== "undefined") {
              config[prop] = config1[prop];
            }
          });

          return config;
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/core/settle.js":
      /*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var createError = __webpack_require__(
          /*! ./createError */ "./node_modules/axios/lib/core/createError.js"
        );

        /**
         * Resolve or reject a Promise based on response status.
         *
         * @param {Function} resolve A function that resolves the promise.
         * @param {Function} reject A function that rejects the promise.
         * @param {object} response The response.
         */
        module.exports = function settle(resolve, reject, response) {
          var validateStatus = response.config.validateStatus;
          if (!validateStatus || validateStatus(response.status)) {
            resolve(response);
          } else {
            reject(
              createError(
                "Request failed with status code " + response.status,
                response.config,
                null,
                response.request,
                response
              )
            );
          }
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/core/transformData.js":
      /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );

        /**
         * Transform the data for a request or a response
         *
         * @param {Object|String} data The data to be transformed
         * @param {Array} headers The headers for the request or response
         * @param {Array|Function} fns A single function or Array of functions
         * @returns {*} The resulting transformed data
         */
        module.exports = function transformData(data, headers, fns) {
          /*eslint no-param-reassign:0*/
          utils.forEach(fns, function transform(fn) {
            data = fn(data, headers);
          });

          return data;
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/defaults.js":
      /*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */ (function (process) {
          var utils = __webpack_require__(
            /*! ./utils */ "./node_modules/axios/lib/utils.js"
          );
          var normalizeHeaderName = __webpack_require__(
            /*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js"
          );

          var DEFAULT_CONTENT_TYPE = {
            "Content-Type": "application/x-www-form-urlencoded",
          };

          function setContentTypeIfUnset(headers, value) {
            if (
              !utils.isUndefined(headers) &&
              utils.isUndefined(headers["Content-Type"])
            ) {
              headers["Content-Type"] = value;
            }
          }

          function getDefaultAdapter() {
            var adapter;
            if (typeof XMLHttpRequest !== "undefined") {
              // For browsers use XHR adapter
              adapter = __webpack_require__(
                /*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js"
              );
            } else if (
              typeof process !== "undefined" &&
              Object.prototype.toString.call(process) === "[object process]"
            ) {
              // For node use HTTP adapter
              adapter = __webpack_require__(
                /*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js"
              );
            }
            return adapter;
          }

          var defaults = {
            adapter: getDefaultAdapter(),

            transformRequest: [
              function transformRequest(data, headers) {
                normalizeHeaderName(headers, "Accept");
                normalizeHeaderName(headers, "Content-Type");
                if (
                  utils.isFormData(data) ||
                  utils.isArrayBuffer(data) ||
                  utils.isBuffer(data) ||
                  utils.isStream(data) ||
                  utils.isFile(data) ||
                  utils.isBlob(data)
                ) {
                  return data;
                }
                if (utils.isArrayBufferView(data)) {
                  return data.buffer;
                }
                if (utils.isURLSearchParams(data)) {
                  setContentTypeIfUnset(
                    headers,
                    "application/x-www-form-urlencoded;charset=utf-8"
                  );
                  return data.toString();
                }
                if (utils.isObject(data)) {
                  setContentTypeIfUnset(
                    headers,
                    "application/json;charset=utf-8"
                  );
                  return JSON.stringify(data);
                }
                return data;
              },
            ],

            transformResponse: [
              function transformResponse(data) {
                /*eslint no-param-reassign:0*/
                if (typeof data === "string") {
                  try {
                    data = JSON.parse(data);
                  } catch (e) {
                    /* Ignore */
                  }
                }
                return data;
              },
            ],

            /**
             * A timeout in milliseconds to abort a request. If set to 0 (default) a
             * timeout is not created.
             */
            timeout: 0,

            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",

            maxContentLength: -1,

            validateStatus: function validateStatus(status) {
              return status >= 200 && status < 300;
            },
          };

          defaults.headers = {
            common: {
              Accept: "application/json, text/plain, */*",
            },
          };

          utils.forEach(
            ["delete", "get", "head"],
            function forEachMethodNoData(method) {
              defaults.headers[method] = {};
            }
          );

          utils.forEach(
            ["post", "put", "patch"],
            function forEachMethodWithData(method) {
              defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
            }
          );

          module.exports = defaults;

          /* WEBPACK VAR INJECTION */
        }).call(
          this,
          __webpack_require__(
            /*! ./../../process/browser.js */ "./node_modules/process/browser.js"
          )
        );

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/bind.js":
      /*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = function bind(fn, thisArg) {
          return function wrap() {
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i];
            }
            return fn.apply(thisArg, args);
          };
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/buildURL.js":
      /*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );

        function encode(val) {
          return encodeURIComponent(val)
            .replace(/%40/gi, "@")
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]");
        }

        /**
         * Build a URL by appending params to the end
         *
         * @param {string} url The base of the url (e.g., http://www.google.com)
         * @param {object} [params] The params to be appended
         * @returns {string} The formatted url
         */
        module.exports = function buildURL(url, params, paramsSerializer) {
          /*eslint no-param-reassign:0*/
          if (!params) {
            return url;
          }

          var serializedParams;
          if (paramsSerializer) {
            serializedParams = paramsSerializer(params);
          } else if (utils.isURLSearchParams(params)) {
            serializedParams = params.toString();
          } else {
            var parts = [];

            utils.forEach(params, function serialize(val, key) {
              if (val === null || typeof val === "undefined") {
                return;
              }

              if (utils.isArray(val)) {
                key = key + "[]";
              } else {
                val = [val];
              }

              utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                  v = v.toISOString();
                } else if (utils.isObject(v)) {
                  v = JSON.stringify(v);
                }
                parts.push(encode(key) + "=" + encode(v));
              });
            });

            serializedParams = parts.join("&");
          }

          if (serializedParams) {
            var hashmarkIndex = url.indexOf("#");
            if (hashmarkIndex !== -1) {
              url = url.slice(0, hashmarkIndex);
            }

            url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
          }

          return url;
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/combineURLs.js":
      /*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /**
         * Creates a new URL by combining the specified URLs
         *
         * @param {string} baseURL The base URL
         * @param {string} relativeURL The relative URL
         * @returns {string} The combined URL
         */
        module.exports = function combineURLs(baseURL, relativeURL) {
          return relativeURL
            ? baseURL.replace(/\/+$/, "") +
            "/" +
            relativeURL.replace(/^\/+/, "")
            : baseURL;
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/cookies.js":
      /*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs support document.cookie
          (function standardBrowserEnv() {
            return {
              write: function write(
                name,
                value,
                expires,
                path,
                domain,
                secure
              ) {
                var cookie = [];
                cookie.push(name + "=" + encodeURIComponent(value));

                if (utils.isNumber(expires)) {
                  cookie.push("expires=" + new Date(expires).toGMTString());
                }

                if (utils.isString(path)) {
                  cookie.push("path=" + path);
                }

                if (utils.isString(domain)) {
                  cookie.push("domain=" + domain);
                }

                if (secure === true) {
                  cookie.push("secure");
                }

                document.cookie = cookie.join("; ");
              },

              read: function read(name) {
                var match = document.cookie.match(
                  new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
                );
                return match ? decodeURIComponent(match[3]) : null;
              },

              remove: function remove(name) {
                this.write(name, "", Date.now() - 86400000);
              },
            };
          })()
          : // Non standard browser env (web workers, react-native) lack needed support.
          (function nonStandardBrowserEnv() {
            return {
              write: function write() { },
              read: function read() {
                return null;
              },
              remove: function remove() { },
            };
          })();

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
      /*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /**
         * Determines whether the specified URL is absolute
         *
         * @param {string} url The URL to test
         * @returns {boolean} True if the specified URL is absolute, otherwise false
         */
        module.exports = function isAbsoluteURL(url) {
          // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
          // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
          // by any combination of letters, digits, plus, period, or hyphen.
          return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
      /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs have full support of the APIs needed to test
          // whether the request URL is of the same origin as current location.
          (function standardBrowserEnv() {
            var msie = /(msie|trident)/i.test(navigator.userAgent);
            var urlParsingNode = document.createElement("a");
            var originURL;

            /**
             * Parse a URL to discover it's components
             *
             * @param {String} url The URL to be parsed
             * @returns {Object}
             */
            function resolveURL(url) {
              var href = url;

              if (msie) {
                // IE needs attribute set twice to normalize properties
                urlParsingNode.setAttribute("href", href);
                href = urlParsingNode.href;
              }

              urlParsingNode.setAttribute("href", href);

              // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
              return {
                href: urlParsingNode.href,
                protocol: urlParsingNode.protocol
                  ? urlParsingNode.protocol.replace(/:$/, "")
                  : "",
                host: urlParsingNode.host,
                search: urlParsingNode.search
                  ? urlParsingNode.search.replace(/^\?/, "")
                  : "",
                hash: urlParsingNode.hash
                  ? urlParsingNode.hash.replace(/^#/, "")
                  : "",
                hostname: urlParsingNode.hostname,
                port: urlParsingNode.port,
                pathname:
                  urlParsingNode.pathname.charAt(0) === "/"
                    ? urlParsingNode.pathname
                    : "/" + urlParsingNode.pathname,
              };
            }

            originURL = resolveURL(window.location.href);

            /**
             * Determine if a URL shares the same origin as the current location
             *
             * @param {String} requestURL The URL to test
             * @returns {boolean} True if URL shares the same origin, otherwise false
             */
            return function isURLSameOrigin(requestURL) {
              var parsed = utils.isString(requestURL)
                ? resolveURL(requestURL)
                : requestURL;
              return (
                parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host
              );
            };
          })()
          : // Non standard browser envs (web workers, react-native) lack needed support.
          (function nonStandardBrowserEnv() {
            return function isURLSameOrigin() {
              return true;
            };
          })();

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
      /*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ../utils */ "./node_modules/axios/lib/utils.js"
        );

        module.exports = function normalizeHeaderName(headers, normalizedName) {
          utils.forEach(headers, function processHeader(value, name) {
            if (
              name !== normalizedName &&
              name.toUpperCase() === normalizedName.toUpperCase()
            ) {
              headers[normalizedName] = value;
              delete headers[name];
            }
          });
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
      /*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var utils = __webpack_require__(
          /*! ./../utils */ "./node_modules/axios/lib/utils.js"
        );

        // Headers whose duplicates are ignored by node
        // c.f. https://nodejs.org/api/http.html#http_message_headers
        var ignoreDuplicateOf = [
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent",
        ];

        /**
         * Parse headers into an object
         *
         * ```
         * Date: Wed, 27 Aug 2014 08:58:49 GMT
         * Content-Type: application/json
         * Connection: keep-alive
         * Transfer-Encoding: chunked
         * ```
         *
         * @param {String} headers Headers needing to be parsed
         * @returns {Object} Headers parsed into an object
         */
        module.exports = function parseHeaders(headers) {
          var parsed = {};
          var key;
          var val;
          var i;

          if (!headers) {
            return parsed;
          }

          utils.forEach(headers.split("\n"), function parser(line) {
            i = line.indexOf(":");
            key = utils.trim(line.substr(0, i)).toLowerCase();
            val = utils.trim(line.substr(i + 1));

            if (key) {
              if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
              }
              if (key === "set-cookie") {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
              } else {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
              }
            }
          });

          return parsed;
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/helpers/spread.js":
      /*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /**
         * Syntactic sugar for invoking a function and expanding an array for arguments.
         *
         * Common use case would be to use `Function.prototype.apply`.
         *
         *  ```js
         *  function f(x, y, z) {}
         *  var args = [1, 2, 3];
         *  f.apply(null, args);
         *  ```
         *
         * With `spread` this example can be re-written.
         *
         *  ```js
         *  spread(function(x, y, z) {})([1, 2, 3]);
         *  ```
         *
         * @param {Function} callback
         * @returns {Function}
         */
        module.exports = function spread(callback) {
          return function wrap(arr) {
            return callback.apply(null, arr);
          };
        };

        /***/
      },

    /***/ "./node_modules/axios/lib/utils.js":
      /*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var bind = __webpack_require__(
          /*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js"
        );

        /*global toString:true*/

        // utils is a library of generic helper functions non-specific to axios

        var toString = Object.prototype.toString;

        /**
         * Determine if a value is an Array
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Array, otherwise false
         */
        function isArray(val) {
          return toString.call(val) === "[object Array]";
        }

        /**
         * Determine if a value is undefined
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if the value is undefined, otherwise false
         */
        function isUndefined(val) {
          return typeof val === "undefined";
        }

        /**
         * Determine if a value is a Buffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Buffer, otherwise false
         */
        function isBuffer(val) {
          return (
            val !== null &&
            !isUndefined(val) &&
            val.constructor !== null &&
            !isUndefined(val.constructor) &&
            typeof val.constructor.isBuffer === "function" &&
            val.constructor.isBuffer(val)
          );
        }

        /**
         * Determine if a value is an ArrayBuffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an ArrayBuffer, otherwise false
         */
        function isArrayBuffer(val) {
          return toString.call(val) === "[object ArrayBuffer]";
        }

        /**
         * Determine if a value is a FormData
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an FormData, otherwise false
         */
        function isFormData(val) {
          return typeof FormData !== "undefined" && val instanceof FormData;
        }

        /**
         * Determine if a value is a view on an ArrayBuffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
         */
        function isArrayBufferView(val) {
          var result;
          if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
            result = ArrayBuffer.isView(val);
          } else {
            result = val && val.buffer && val.buffer instanceof ArrayBuffer;
          }
          return result;
        }

        /**
         * Determine if a value is a String
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a String, otherwise false
         */
        function isString(val) {
          return typeof val === "string";
        }

        /**
         * Determine if a value is a Number
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Number, otherwise false
         */
        function isNumber(val) {
          return typeof val === "number";
        }

        /**
         * Determine if a value is an Object
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Object, otherwise false
         */
        function isObject(val) {
          return val !== null && typeof val === "object";
        }

        /**
         * Determine if a value is a Date
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Date, otherwise false
         */
        function isDate(val) {
          return toString.call(val) === "[object Date]";
        }

        /**
         * Determine if a value is a File
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a File, otherwise false
         */
        function isFile(val) {
          return toString.call(val) === "[object File]";
        }

        /**
         * Determine if a value is a Blob
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Blob, otherwise false
         */
        function isBlob(val) {
          return toString.call(val) === "[object Blob]";
        }

        /**
         * Determine if a value is a Function
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Function, otherwise false
         */
        function isFunction(val) {
          return toString.call(val) === "[object Function]";
        }

        /**
         * Determine if a value is a Stream
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Stream, otherwise false
         */
        function isStream(val) {
          return isObject(val) && isFunction(val.pipe);
        }

        /**
         * Determine if a value is a URLSearchParams object
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a URLSearchParams object, otherwise false
         */
        function isURLSearchParams(val) {
          return (
            typeof URLSearchParams !== "undefined" &&
            val instanceof URLSearchParams
          );
        }

        /**
         * Trim excess whitespace off the beginning and end of a string
         *
         * @param {String} str The String to trim
         * @returns {String} The String freed of excess whitespace
         */
        function trim(str) {
          return str.replace(/^\s*/, "").replace(/\s*$/, "");
        }

        /**
         * Determine if we're running in a standard browser environment
         *
         * This allows axios to run in a web worker, and react-native.
         * Both environments support XMLHttpRequest, but not fully standard globals.
         *
         * web workers:
         *  typeof window -> undefined
         *  typeof document -> undefined
         *
         * react-native:
         *  navigator.product -> 'ReactNative'
         * nativescript
         *  navigator.product -> 'NativeScript' or 'NS'
         */
        function isStandardBrowserEnv() {
          if (
            typeof navigator !== "undefined" &&
            (navigator.product === "ReactNative" ||
              navigator.product === "NativeScript" ||
              navigator.product === "NS")
          ) {
            return false;
          }
          return (
            typeof window !== "undefined" && typeof document !== "undefined"
          );
        }

        /**
         * Iterate over an Array or an Object invoking a function for each item.
         *
         * If `obj` is an Array callback will be called passing
         * the value, index, and complete array for each item.
         *
         * If 'obj' is an Object callback will be called passing
         * the value, key, and complete object for each property.
         *
         * @param {Object|Array} obj The object to iterate
         * @param {Function} fn The callback to invoke for each item
         */
        function forEach(obj, fn) {
          // Don't bother if no value provided
          if (obj === null || typeof obj === "undefined") {
            return;
          }

          // Force an array if not already something iterable
          if (typeof obj !== "object") {
            /*eslint no-param-reassign:0*/
            obj = [obj];
          }

          if (isArray(obj)) {
            // Iterate over array values
            for (var i = 0, l = obj.length; i < l; i++) {
              fn.call(null, obj[i], i, obj);
            }
          } else {
            // Iterate over object keys
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
              }
            }
          }
        }

        /**
         * Accepts varargs expecting each argument to be an object, then
         * immutably merges the properties of each object and returns result.
         *
         * When multiple objects contain the same key the later object in
         * the arguments list will take precedence.
         *
         * Example:
         *
         * ```js
         * var result = merge({foo: 123}, {foo: 456});
         * console.log(result.foo); // outputs 456
         * ```
         *
         * @param {Object} obj1 Object to merge
         * @returns {Object} Result of all merge properties
         */
        function merge(/* obj1, obj2, obj3, ... */) {
          var result = {};
          function assignValue(val, key) {
            if (typeof result[key] === "object" && typeof val === "object") {
              result[key] = merge(result[key], val);
            } else {
              result[key] = val;
            }
          }

          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }

        /**
         * Function equal to merge with the difference being that no reference
         * to original objects is kept.
         *
         * @see merge
         * @param {Object} obj1 Object to merge
         * @returns {Object} Result of all merge properties
         */
        function deepMerge(/* obj1, obj2, obj3, ... */) {
          var result = {};
          function assignValue(val, key) {
            if (typeof result[key] === "object" && typeof val === "object") {
              result[key] = deepMerge(result[key], val);
            } else if (typeof val === "object") {
              result[key] = deepMerge({}, val);
            } else {
              result[key] = val;
            }
          }

          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }

        /**
         * Extends object a by mutably adding to it the properties of object b.
         *
         * @param {Object} a The object to be extended
         * @param {Object} b The object to copy properties from
         * @param {Object} thisArg The object to bind function to
         * @return {Object} The resulting value of object a
         */
        function extend(a, b, thisArg) {
          forEach(b, function assignValue(val, key) {
            if (thisArg && typeof val === "function") {
              a[key] = bind(val, thisArg);
            } else {
              a[key] = val;
            }
          });
          return a;
        }

        module.exports = {
          isArray: isArray,
          isArrayBuffer: isArrayBuffer,
          isBuffer: isBuffer,
          isFormData: isFormData,
          isArrayBufferView: isArrayBufferView,
          isString: isString,
          isNumber: isNumber,
          isObject: isObject,
          isUndefined: isUndefined,
          isDate: isDate,
          isFile: isFile,
          isBlob: isBlob,
          isFunction: isFunction,
          isStream: isStream,
          isURLSearchParams: isURLSearchParams,
          isStandardBrowserEnv: isStandardBrowserEnv,
          forEach: forEach,
          merge: merge,
          deepMerge: deepMerge,
          extend: extend,
          trim: trim,
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/a-callable.js":
      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var tryToString = __webpack_require__(
          /*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js"
        );

        var $TypeError = TypeError;

        // `Assert: IsCallable(argument) is true`
        module.exports = function (argument) {
          if (isCallable(argument)) return argument;
          throw $TypeError(tryToString(argument) + " is not a function");
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/a-possible-prototype.js":
      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );

        var $String = String;
        var $TypeError = TypeError;

        module.exports = function (argument) {
          if (typeof argument == "object" || isCallable(argument))
            return argument;
          throw $TypeError(
            "Can't set " + $String(argument) + " as a prototype"
          );
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/add-to-unscopables.js":
      /*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );
        var create = __webpack_require__(
          /*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js"
        );
        var defineProperty = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        ).f;

        var UNSCOPABLES = wellKnownSymbol("unscopables");
        var ArrayPrototype = Array.prototype;

        // Array.prototype[@@unscopables]
        // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
        if (ArrayPrototype[UNSCOPABLES] === undefined) {
          defineProperty(ArrayPrototype, UNSCOPABLES, {
            configurable: true,
            value: create(null),
          });
        }

        // add a key to Array.prototype[@@unscopables]
        module.exports = function (key) {
          ArrayPrototype[UNSCOPABLES][key] = true;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/advance-string-index.js":
      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var charAt = __webpack_require__(
          /*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js"
        ).charAt;

        // `AdvanceStringIndex` abstract operation
        // https://tc39.es/ecma262/#sec-advancestringindex
        module.exports = function (S, index, unicode) {
          return index + (unicode ? charAt(S, index).length : 1);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/an-instance.js":
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isPrototypeOf = __webpack_require__(
          /*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js"
        );

        var $TypeError = TypeError;

        module.exports = function (it, Prototype) {
          if (isPrototypeOf(Prototype, it)) return it;
          throw $TypeError("Incorrect invocation");
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/an-object.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isObject = __webpack_require__(
          /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
        );

        var $String = String;
        var $TypeError = TypeError;

        // `Assert: Type(argument) is Object`
        module.exports = function (argument) {
          if (isObject(argument)) return argument;
          throw $TypeError($String(argument) + " is not an object");
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/array-includes.js":
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toIndexedObject = __webpack_require__(
          /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
        );
        var toAbsoluteIndex = __webpack_require__(
          /*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js"
        );
        var lengthOfArrayLike = __webpack_require__(
          /*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js"
        );

        // `Array.prototype.{ indexOf, includes }` methods implementation
        var createMethod = function (IS_INCLUDES) {
          return function ($this, el, fromIndex) {
            var O = toIndexedObject($this);
            var length = lengthOfArrayLike(O);
            var index = toAbsoluteIndex(fromIndex, length);
            var value;
            // Array#includes uses SameValueZero equality algorithm
            // eslint-disable-next-line no-self-compare -- NaN check
            if (IS_INCLUDES && el !== el)
              while (length > index) {
                value = O[index++];
                // eslint-disable-next-line no-self-compare -- NaN check
                if (value !== value) return true;
                // Array#indexOf ignores holes, Array#includes - not
              }
            else
              for (; length > index; index++) {
                if ((IS_INCLUDES || index in O) && O[index] === el)
                  return IS_INCLUDES || index || 0;
              }
            return !IS_INCLUDES && -1;
          };
        };

        module.exports = {
          // `Array.prototype.includes` method
          // https://tc39.es/ecma262/#sec-array.prototype.includes
          includes: createMethod(true),
          // `Array.prototype.indexOf` method
          // https://tc39.es/ecma262/#sec-array.prototype.indexof
          indexOf: createMethod(false),
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/array-slice-simple.js":
      /*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/array-slice-simple.js ***!
  \**************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toAbsoluteIndex = __webpack_require__(
          /*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js"
        );
        var lengthOfArrayLike = __webpack_require__(
          /*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js"
        );
        var createProperty = __webpack_require__(
          /*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js"
        );

        var $Array = Array;
        var max = Math.max;

        module.exports = function (O, start, end) {
          var length = lengthOfArrayLike(O);
          var k = toAbsoluteIndex(start, length);
          var fin = toAbsoluteIndex(end === undefined ? length : end, length);
          var result = $Array(max(fin - k, 0));
          var n = 0;
          for (; k < fin; k++, n++) createProperty(result, n, O[k]);
          result.length = n;
          return result;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/array-sort.js":
      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-sort.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var arraySlice = __webpack_require__(
          /*! ../internals/array-slice-simple */ "./node_modules/core-js/internals/array-slice-simple.js"
        );

        var floor = Math.floor;

        var mergeSort = function (array, comparefn) {
          var length = array.length;
          var middle = floor(length / 2);
          return length < 8
            ? insertionSort(array, comparefn)
            : merge(
              array,
              mergeSort(arraySlice(array, 0, middle), comparefn),
              mergeSort(arraySlice(array, middle), comparefn),
              comparefn
            );
        };

        var insertionSort = function (array, comparefn) {
          var length = array.length;
          var i = 1;
          var element, j;

          while (i < length) {
            j = i;
            element = array[i];
            while (j && comparefn(array[j - 1], element) > 0) {
              array[j] = array[--j];
            }
            if (j !== i++) array[j] = element;
          }
          return array;
        };

        var merge = function (array, left, right, comparefn) {
          var llength = left.length;
          var rlength = right.length;
          var lindex = 0;
          var rindex = 0;

          while (lindex < llength || rindex < rlength) {
            array[lindex + rindex] =
              lindex < llength && rindex < rlength
                ? comparefn(left[lindex], right[rindex]) <= 0
                  ? left[lindex++]
                  : right[rindex++]
                : lindex < llength
                  ? left[lindex++]
                  : right[rindex++];
          }
          return array;
        };

        module.exports = mergeSort;

        /***/
      },

    /***/ "./node_modules/core-js/internals/classof-raw.js":
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );

        var toString = uncurryThis({}.toString);
        var stringSlice = uncurryThis("".slice);

        module.exports = function (it) {
          return stringSlice(toString(it), 8, -1);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/classof.js":
      /*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var TO_STRING_TAG_SUPPORT = __webpack_require__(
          /*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var classofRaw = __webpack_require__(
          /*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );

        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var $Object = Object;

        // ES3 wrong here
        var CORRECT_ARGUMENTS =
          classofRaw(
            (function () {
              return arguments;
            })()
          ) === "Arguments";

        // fallback for IE11 Script Access Denied error
        var tryGet = function (it, key) {
          try {
            return it[key];
          } catch (error) {
            /* empty */
          }
        };

        // getting tag from ES6+ `Object.prototype.toString`
        module.exports = TO_STRING_TAG_SUPPORT
          ? classofRaw
          : function (it) {
            var O, tag, result;
            return it === undefined
              ? "Undefined"
              : it === null
                ? "Null"
                : // @@toStringTag case
                typeof (tag = tryGet((O = $Object(it)), TO_STRING_TAG)) ==
                  "string"
                  ? tag
                  : // builtinTag case
                  CORRECT_ARGUMENTS
                    ? classofRaw(O)
                    : // ES3 arguments fallback
                    (result = classofRaw(O)) === "Object" && isCallable(O.callee)
                      ? "Arguments"
                      : result;
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
      /*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var ownKeys = __webpack_require__(
          /*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js"
        );
        var getOwnPropertyDescriptorModule = __webpack_require__(
          /*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
        );
        var definePropertyModule = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        );

        module.exports = function (target, source, exceptions) {
          var keys = ownKeys(source);
          var defineProperty = definePropertyModule.f;
          var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (
              !hasOwn(target, key) &&
              !(exceptions && hasOwn(exceptions, key))
            ) {
              defineProperty(
                target,
                key,
                getOwnPropertyDescriptor(source, key)
              );
            }
          }
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );

        module.exports = !fails(function () {
          function F() {
            /* empty */
          }
          F.prototype.constructor = null;
          // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
          return Object.getPrototypeOf(new F()) !== F.prototype;
        });

        /***/
      },

    /***/ "./node_modules/core-js/internals/create-iter-result-object.js":
      /*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iter-result-object.js ***!
  \*********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // `CreateIterResultObject` abstract operation
        // https://tc39.es/ecma262/#sec-createiterresultobject
        module.exports = function (value, done) {
          return { value: value, done: done };
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
      /*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var definePropertyModule = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        );
        var createPropertyDescriptor = __webpack_require__(
          /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
        );

        module.exports = DESCRIPTORS
          ? function (object, key, value) {
            return definePropertyModule.f(
              object,
              key,
              createPropertyDescriptor(1, value)
            );
          }
          : function (object, key, value) {
            object[key] = value;
            return object;
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/create-property-descriptor.js":
      /*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = function (bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value,
          };
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/create-property.js":
      /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toPropertyKey = __webpack_require__(
          /*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js"
        );
        var definePropertyModule = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        );
        var createPropertyDescriptor = __webpack_require__(
          /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
        );

        module.exports = function (object, key, value) {
          var propertyKey = toPropertyKey(key);
          if (propertyKey in object)
            definePropertyModule.f(
              object,
              propertyKey,
              createPropertyDescriptor(0, value)
            );
          else object[propertyKey] = value;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/define-built-in-accessor.js":
      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in-accessor.js ***!
  \********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var makeBuiltIn = __webpack_require__(
          /*! ../internals/make-built-in */ "./node_modules/core-js/internals/make-built-in.js"
        );
        var defineProperty = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        );

        module.exports = function (target, name, descriptor) {
          if (descriptor.get)
            makeBuiltIn(descriptor.get, name, { getter: true });
          if (descriptor.set)
            makeBuiltIn(descriptor.set, name, { setter: true });
          return defineProperty.f(target, name, descriptor);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/define-built-in.js":
      /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var definePropertyModule = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        );
        var makeBuiltIn = __webpack_require__(
          /*! ../internals/make-built-in */ "./node_modules/core-js/internals/make-built-in.js"
        );
        var defineGlobalProperty = __webpack_require__(
          /*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js"
        );

        module.exports = function (O, key, value, options) {
          if (!options) options = {};
          var simple = options.enumerable;
          var name = options.name !== undefined ? options.name : key;
          if (isCallable(value)) makeBuiltIn(value, name, options);
          if (options.global) {
            if (simple) O[key] = value;
            else defineGlobalProperty(key, value);
          } else {
            try {
              if (!options.unsafe) delete O[key];
              else if (O[key]) simple = true;
            } catch (error) {
              /* empty */
            }
            if (simple) O[key] = value;
            else
              definePropertyModule.f(O, key, {
                value: value,
                enumerable: false,
                configurable: !options.nonConfigurable,
                writable: !options.nonWritable,
              });
          }
          return O;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/define-built-ins.js":
      /*!************************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-ins.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var defineBuiltIn = __webpack_require__(
          /*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js"
        );

        module.exports = function (target, src, options) {
          for (var key in src) defineBuiltIn(target, key, src[key], options);
          return target;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/define-global-property.js":
      /*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/define-global-property.js ***!
  \******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );

        // eslint-disable-next-line es/no-object-defineproperty -- safe
        var defineProperty = Object.defineProperty;

        module.exports = function (key, value) {
          try {
            defineProperty(global, key, {
              value: value,
              configurable: true,
              writable: true,
            });
          } catch (error) {
            global[key] = value;
          }
          return value;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/descriptors.js":
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );

        // Detect IE8's incomplete defineProperty implementation
        module.exports = !fails(function () {
          // eslint-disable-next-line es/no-object-defineproperty -- required for testing
          return (
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1] !== 7
          );
        });

        /***/
      },

    /***/ "./node_modules/core-js/internals/document-all.js":
      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/document-all.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var documentAll = typeof document == "object" && document.all;

        // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
        // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
        var IS_HTMLDDA =
          typeof documentAll == "undefined" && documentAll !== undefined;

        module.exports = {
          all: documentAll,
          IS_HTMLDDA: IS_HTMLDDA,
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/document-create-element.js":
      /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var isObject = __webpack_require__(
          /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
        );

        var document = global.document;
        // typeof document.createElement is 'object' in old IE
        var EXISTS = isObject(document) && isObject(document.createElement);

        module.exports = function (it) {
          return EXISTS ? document.createElement(it) : {};
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/dom-iterables.js":
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // iterable DOM collections
        // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
        module.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0,
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/dom-token-list-prototype.js":
      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/dom-token-list-prototype.js ***!
  \********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
        var documentCreateElement = __webpack_require__(
          /*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js"
        );

        var classList = documentCreateElement("span").classList;
        var DOMTokenListPrototype =
          classList && classList.constructor && classList.constructor.prototype;

        module.exports =
          DOMTokenListPrototype === Object.prototype
            ? undefined
            : DOMTokenListPrototype;

        /***/
      },

    /***/ "./node_modules/core-js/internals/engine-user-agent.js":
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports =
          (typeof navigator != "undefined" && String(navigator.userAgent)) ||
          "";

        /***/
      },

    /***/ "./node_modules/core-js/internals/engine-v8-version.js":
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var userAgent = __webpack_require__(
          /*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js"
        );

        var process = global.process;
        var Deno = global.Deno;
        var versions = (process && process.versions) || (Deno && Deno.version);
        var v8 = versions && versions.v8;
        var match, version;

        if (v8) {
          match = v8.split(".");
          // in old Chrome, versions of V8 isn't V8 = Chrome / 10
          // but their correct versions are not interesting for us
          version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
        }

        // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
        // so check `userAgent` even if `.v8` exists, but 0
        if (!version && userAgent) {
          match = userAgent.match(/Edge\/(\d+)/);
          if (!match || match[1] >= 74) {
            match = userAgent.match(/Chrome\/(\d+)/);
            if (match) version = +match[1];
          }
        }

        module.exports = version;

        /***/
      },

    /***/ "./node_modules/core-js/internals/enum-bug-keys.js":
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // IE8- don't enum bug keys
        module.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];

        /***/
      },

    /***/ "./node_modules/core-js/internals/export.js":
      /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var getOwnPropertyDescriptor = __webpack_require__(
          /*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
        ).f;
        var createNonEnumerableProperty = __webpack_require__(
          /*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js"
        );
        var defineBuiltIn = __webpack_require__(
          /*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js"
        );
        var defineGlobalProperty = __webpack_require__(
          /*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js"
        );
        var copyConstructorProperties = __webpack_require__(
          /*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js"
        );
        var isForced = __webpack_require__(
          /*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js"
        );

        /*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
        module.exports = function (options, source) {
          var TARGET = options.target;
          var GLOBAL = options.global;
          var STATIC = options.stat;
          var FORCED, target, key, targetProperty, sourceProperty, descriptor;
          if (GLOBAL) {
            target = global;
          } else if (STATIC) {
            target = global[TARGET] || defineGlobalProperty(TARGET, {});
          } else {
            target = (global[TARGET] || {}).prototype;
          }
          if (target)
            for (key in source) {
              sourceProperty = source[key];
              if (options.dontCallGetSet) {
                descriptor = getOwnPropertyDescriptor(target, key);
                targetProperty = descriptor && descriptor.value;
              } else targetProperty = target[key];
              FORCED = isForced(
                GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
                options.forced
              );
              // contained in target
              if (!FORCED && targetProperty !== undefined) {
                if (typeof sourceProperty == typeof targetProperty) continue;
                copyConstructorProperties(sourceProperty, targetProperty);
              }
              // add a flag to not completely full polyfills
              if (options.sham || (targetProperty && targetProperty.sham)) {
                createNonEnumerableProperty(sourceProperty, "sham", true);
              }
              defineBuiltIn(target, key, sourceProperty, options);
            }
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/fails.js":
      /*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = function (exec) {
          try {
            return !!exec();
          } catch (error) {
            return true;
          }
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
      /*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // TODO: Remove from `core-js@4` since it's moved to entry points
        __webpack_require__(
          /*! ../modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js"
        );
        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js"
        );
        var defineBuiltIn = __webpack_require__(
          /*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js"
        );
        var regexpExec = __webpack_require__(
          /*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js"
        );
        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );
        var createNonEnumerableProperty = __webpack_require__(
          /*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js"
        );

        var SPECIES = wellKnownSymbol("species");
        var RegExpPrototype = RegExp.prototype;

        module.exports = function (KEY, exec, FORCED, SHAM) {
          var SYMBOL = wellKnownSymbol(KEY);

          var DELEGATES_TO_SYMBOL = !fails(function () {
            // String methods call symbol-named RegEp methods
            var O = {};
            O[SYMBOL] = function () {
              return 7;
            };
            return ""[KEY](O) !== 7;
          });

          var DELEGATES_TO_EXEC =
            DELEGATES_TO_SYMBOL &&
            !fails(function () {
              // Symbol-named RegExp methods call .exec
              var execCalled = false;
              var re = /a/;

              if (KEY === "split") {
                // We can't use real regex here since it causes deoptimization
                // and serious performance degradation in V8
                // https://github.com/zloirock/core-js/issues/306
                re = {};
                // RegExp[@@split] doesn't call the regex's exec method, but first creates
                // a new one. We need to return the patched regex when creating the new one.
                re.constructor = {};
                re.constructor[SPECIES] = function () {
                  return re;
                };
                re.flags = "";
                re[SYMBOL] = /./[SYMBOL];
              }

              re.exec = function () {
                execCalled = true;
                return null;
              };

              re[SYMBOL]("");
              return !execCalled;
            });

          if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
            var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
            var methods = exec(
              SYMBOL,
              ""[KEY],
              function (nativeMethod, regexp, str, arg2, forceStringMethod) {
                var uncurriedNativeMethod = uncurryThis(nativeMethod);
                var $exec = regexp.exec;
                if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
                  if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                    // The native String method already delegates to @@method (this
                    // polyfilled function), leasing to infinite recursion.
                    // We avoid it by directly calling the native @@method method.
                    return {
                      done: true,
                      value: uncurriedNativeRegExpMethod(regexp, str, arg2),
                    };
                  }
                  return {
                    done: true,
                    value: uncurriedNativeMethod(str, regexp, arg2),
                  };
                }
                return { done: false };
              }
            );

            defineBuiltIn(String.prototype, KEY, methods[0]);
            defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
          }

          if (SHAM)
            createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-apply.js":
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/function-apply.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var NATIVE_BIND = __webpack_require__(
          /*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js"
        );

        var FunctionPrototype = Function.prototype;
        var apply = FunctionPrototype.apply;
        var call = FunctionPrototype.call;

        // eslint-disable-next-line es/no-reflect -- safe
        module.exports =
          (typeof Reflect == "object" && Reflect.apply) ||
          (NATIVE_BIND
            ? call.bind(apply)
            : function () {
              return call.apply(apply, arguments);
            });

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-bind-context.js":
      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js"
        );
        var aCallable = __webpack_require__(
          /*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js"
        );
        var NATIVE_BIND = __webpack_require__(
          /*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js"
        );

        var bind = uncurryThis(uncurryThis.bind);

        // optional / simple context binding
        module.exports = function (fn, that) {
          aCallable(fn);
          return that === undefined
            ? fn
            : NATIVE_BIND
              ? bind(fn, that)
              : function (/* ...args */) {
                return fn.apply(that, arguments);
              };
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-bind-native.js":
      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-native.js ***!
  \****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );

        module.exports = !fails(function () {
          // eslint-disable-next-line es/no-function-prototype-bind -- safe
          var test = function () {
            /* empty */
          }.bind();
          // eslint-disable-next-line no-prototype-builtins -- safe
          return typeof test != "function" || test.hasOwnProperty("prototype");
        });

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-call.js":
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var NATIVE_BIND = __webpack_require__(
          /*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js"
        );

        var call = Function.prototype.call;

        module.exports = NATIVE_BIND
          ? call.bind(call)
          : function () {
            return call.apply(call, arguments);
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-name.js":
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );

        var FunctionPrototype = Function.prototype;
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

        var EXISTS = hasOwn(FunctionPrototype, "name");
        // additional protection from minified / mangled / dropped function names
        var PROPER =
          EXISTS &&
          function something() {
            /* empty */
          }.name === "something";
        var CONFIGURABLE =
          EXISTS &&
          (!DESCRIPTORS ||
            (DESCRIPTORS &&
              getDescriptor(FunctionPrototype, "name").configurable));

        module.exports = {
          EXISTS: EXISTS,
          PROPER: PROPER,
          CONFIGURABLE: CONFIGURABLE,
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-uncurry-this-accessor.js":
      /*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this-accessor.js ***!
  \**************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var aCallable = __webpack_require__(
          /*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js"
        );

        module.exports = function (object, key, method) {
          try {
            // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
            return uncurryThis(
              aCallable(Object.getOwnPropertyDescriptor(object, key)[method])
            );
          } catch (error) {
            /* empty */
          }
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-uncurry-this-clause.js":
      /*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var classofRaw = __webpack_require__(
          /*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js"
        );
        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );

        module.exports = function (fn) {
          // Nashorn bug:
          //   https://github.com/zloirock/core-js/issues/1128
          //   https://github.com/zloirock/core-js/issues/1130
          if (classofRaw(fn) === "Function") return uncurryThis(fn);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/function-uncurry-this.js":
      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var NATIVE_BIND = __webpack_require__(
          /*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js"
        );

        var FunctionPrototype = Function.prototype;
        var call = FunctionPrototype.call;
        var uncurryThisWithBind =
          NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

        module.exports = NATIVE_BIND
          ? uncurryThisWithBind
          : function (fn) {
            return function () {
              return call.apply(fn, arguments);
            };
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/get-built-in.js":
      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );

        var aFunction = function (argument) {
          return isCallable(argument) ? argument : undefined;
        };

        module.exports = function (namespace, method) {
          return arguments.length < 2
            ? aFunction(global[namespace])
            : global[namespace] && global[namespace][method];
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/get-iterator-method.js":
      /*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var classof = __webpack_require__(
          /*! ../internals/classof */ "./node_modules/core-js/internals/classof.js"
        );
        var getMethod = __webpack_require__(
          /*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js"
        );
        var isNullOrUndefined = __webpack_require__(
          /*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js"
        );
        var Iterators = __webpack_require__(
          /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );

        var ITERATOR = wellKnownSymbol("iterator");

        module.exports = function (it) {
          if (!isNullOrUndefined(it))
            return (
              getMethod(it, ITERATOR) ||
              getMethod(it, "@@iterator") ||
              Iterators[classof(it)]
            );
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/get-iterator.js":
      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var aCallable = __webpack_require__(
          /*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var tryToString = __webpack_require__(
          /*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js"
        );
        var getIteratorMethod = __webpack_require__(
          /*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js"
        );

        var $TypeError = TypeError;

        module.exports = function (argument, usingIterator) {
          var iteratorMethod =
            arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
          if (aCallable(iteratorMethod))
            return anObject(call(iteratorMethod, argument));
          throw $TypeError(tryToString(argument) + " is not iterable");
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/get-method.js":
      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var aCallable = __webpack_require__(
          /*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js"
        );
        var isNullOrUndefined = __webpack_require__(
          /*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js"
        );

        // `GetMethod` abstract operation
        // https://tc39.es/ecma262/#sec-getmethod
        module.exports = function (V, P) {
          var func = V[P];
          return isNullOrUndefined(func) ? undefined : aCallable(func);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/get-substitution.js":
      /*!************************************************************!*\
  !*** ./node_modules/core-js/internals/get-substitution.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var toObject = __webpack_require__(
          /*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js"
        );

        var floor = Math.floor;
        var charAt = uncurryThis("".charAt);
        var replace = uncurryThis("".replace);
        var stringSlice = uncurryThis("".slice);
        // eslint-disable-next-line redos/no-vulnerable -- safe
        var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
        var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

        // `GetSubstitution` abstract operation
        // https://tc39.es/ecma262/#sec-getsubstitution
        module.exports = function (
          matched,
          str,
          position,
          captures,
          namedCaptures,
          replacement
        ) {
          var tailPos = position + matched.length;
          var m = captures.length;
          var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
          if (namedCaptures !== undefined) {
            namedCaptures = toObject(namedCaptures);
            symbols = SUBSTITUTION_SYMBOLS;
          }
          return replace(replacement, symbols, function (match, ch) {
            var capture;
            switch (charAt(ch, 0)) {
              case "$":
                return "$";
              case "&":
                return matched;
              case "`":
                return stringSlice(str, 0, position);
              case "'":
                return stringSlice(str, tailPos);
              case "<":
                capture = namedCaptures[stringSlice(ch, 1, -1)];
                break;
              default: // \d\d?
                var n = +ch;
                if (n === 0) return match;
                if (n > m) {
                  var f = floor(n / 10);
                  if (f === 0) return match;
                  if (f <= m)
                    return captures[f - 1] === undefined
                      ? charAt(ch, 1)
                      : captures[f - 1] + charAt(ch, 1);
                  return match;
                }
                capture = captures[n - 1];
            }
            return capture === undefined ? "" : capture;
          });
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/global.js":
      /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */ (function (global) {
          var check = function (it) {
            return it && it.Math === Math && it;
          };

          // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
          module.exports =
            // eslint-disable-next-line es/no-global-this -- safe
            check(typeof globalThis == "object" && globalThis) ||
            check(typeof window == "object" && window) ||
            // eslint-disable-next-line no-restricted-globals -- safe
            check(typeof self == "object" && self) ||
            check(typeof global == "object" && global) ||
            // eslint-disable-next-line no-new-func -- fallback
            (function () {
              return this;
            })() ||
            this ||
            Function("return this")();

          /* WEBPACK VAR INJECTION */
        }).call(
          this,
          __webpack_require__(
            /*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"
          )
        );

        /***/
      },

    /***/ "./node_modules/core-js/internals/has-own-property.js":
      /*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var toObject = __webpack_require__(
          /*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js"
        );

        var hasOwnProperty = uncurryThis({}.hasOwnProperty);

        // `HasOwnProperty` abstract operation
        // https://tc39.es/ecma262/#sec-hasownproperty
        // eslint-disable-next-line es/no-object-hasown -- safe
        module.exports =
          Object.hasOwn ||
          function hasOwn(it, key) {
            return hasOwnProperty(toObject(it), key);
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/hidden-keys.js":
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = {};

        /***/
      },

    /***/ "./node_modules/core-js/internals/html.js":
      /*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var getBuiltIn = __webpack_require__(
          /*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js"
        );

        module.exports = getBuiltIn("document", "documentElement");

        /***/
      },

    /***/ "./node_modules/core-js/internals/ie8-dom-define.js":
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var createElement = __webpack_require__(
          /*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js"
        );

        // Thanks to IE8 for its funny defineProperty
        module.exports =
          !DESCRIPTORS &&
          !fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- required for testing
            return (
              Object.defineProperty(createElement("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a !== 7
            );
          });

        /***/
      },

    /***/ "./node_modules/core-js/internals/indexed-object.js":
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var classof = __webpack_require__(
          /*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js"
        );

        var $Object = Object;
        var split = uncurryThis("".split);

        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        module.exports = fails(function () {
          // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
          // eslint-disable-next-line no-prototype-builtins -- safe
          return !$Object("z").propertyIsEnumerable(0);
        })
          ? function (it) {
            return classof(it) === "String" ? split(it, "") : $Object(it);
          }
          : $Object;

        /***/
      },

    /***/ "./node_modules/core-js/internals/inspect-source.js":
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var store = __webpack_require__(
          /*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js"
        );

        var functionToString = uncurryThis(Function.toString);

        // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
        if (!isCallable(store.inspectSource)) {
          store.inspectSource = function (it) {
            return functionToString(it);
          };
        }

        module.exports = store.inspectSource;

        /***/
      },

    /***/ "./node_modules/core-js/internals/internal-state.js":
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var NATIVE_WEAK_MAP = __webpack_require__(
          /*! ../internals/weak-map-basic-detection */ "./node_modules/core-js/internals/weak-map-basic-detection.js"
        );
        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var isObject = __webpack_require__(
          /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
        );
        var createNonEnumerableProperty = __webpack_require__(
          /*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js"
        );
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var shared = __webpack_require__(
          /*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js"
        );
        var sharedKey = __webpack_require__(
          /*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js"
        );
        var hiddenKeys = __webpack_require__(
          /*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js"
        );

        var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
        var TypeError = global.TypeError;
        var WeakMap = global.WeakMap;
        var set, get, has;

        var enforce = function (it) {
          return has(it) ? get(it) : set(it, {});
        };

        var getterFor = function (TYPE) {
          return function (it) {
            var state;
            if (!isObject(it) || (state = get(it)).type !== TYPE) {
              throw TypeError("Incompatible receiver, " + TYPE + " required");
            }
            return state;
          };
        };

        if (NATIVE_WEAK_MAP || shared.state) {
          var store = shared.state || (shared.state = new WeakMap());
          /* eslint-disable no-self-assign -- prototype methods protection */
          store.get = store.get;
          store.has = store.has;
          store.set = store.set;
          /* eslint-enable no-self-assign -- prototype methods protection */
          set = function (it, metadata) {
            if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
            metadata.facade = it;
            store.set(it, metadata);
            return metadata;
          };
          get = function (it) {
            return store.get(it) || {};
          };
          has = function (it) {
            return store.has(it);
          };
        } else {
          var STATE = sharedKey("state");
          hiddenKeys[STATE] = true;
          set = function (it, metadata) {
            if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
            metadata.facade = it;
            createNonEnumerableProperty(it, STATE, metadata);
            return metadata;
          };
          get = function (it) {
            return hasOwn(it, STATE) ? it[STATE] : {};
          };
          has = function (it) {
            return hasOwn(it, STATE);
          };
        }

        module.exports = {
          set: set,
          get: get,
          has: has,
          enforce: enforce,
          getterFor: getterFor,
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/is-callable.js":
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var $documentAll = __webpack_require__(
          /*! ../internals/document-all */ "./node_modules/core-js/internals/document-all.js"
        );

        var documentAll = $documentAll.all;

        // `IsCallable` abstract operation
        // https://tc39.es/ecma262/#sec-iscallable
        module.exports = $documentAll.IS_HTMLDDA
          ? function (argument) {
            return typeof argument == "function" || argument === documentAll;
          }
          : function (argument) {
            return typeof argument == "function";
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/is-forced.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );

        var replacement = /#|\.prototype\./;

        var isForced = function (feature, detection) {
          var value = data[normalize(feature)];
          return value === POLYFILL
            ? true
            : value === NATIVE
              ? false
              : isCallable(detection)
                ? fails(detection)
                : !!detection;
        };

        var normalize = (isForced.normalize = function (string) {
          return String(string).replace(replacement, ".").toLowerCase();
        });

        var data = (isForced.data = {});
        var NATIVE = (isForced.NATIVE = "N");
        var POLYFILL = (isForced.POLYFILL = "P");

        module.exports = isForced;

        /***/
      },

    /***/ "./node_modules/core-js/internals/is-null-or-undefined.js":
      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/is-null-or-undefined.js ***!
  \****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // we can't use just `it == null` since of `document.all` special case
        // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
        module.exports = function (it) {
          return it === null || it === undefined;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/is-object.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var $documentAll = __webpack_require__(
          /*! ../internals/document-all */ "./node_modules/core-js/internals/document-all.js"
        );

        var documentAll = $documentAll.all;

        module.exports = $documentAll.IS_HTMLDDA
          ? function (it) {
            return typeof it == "object"
              ? it !== null
              : isCallable(it) || it === documentAll;
          }
          : function (it) {
            return typeof it == "object" ? it !== null : isCallable(it);
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/is-pure.js":
      /*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = false;

        /***/
      },

    /***/ "./node_modules/core-js/internals/is-symbol.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var getBuiltIn = __webpack_require__(
          /*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var isPrototypeOf = __webpack_require__(
          /*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js"
        );
        var USE_SYMBOL_AS_UID = __webpack_require__(
          /*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js"
        );

        var $Object = Object;

        module.exports = USE_SYMBOL_AS_UID
          ? function (it) {
            return typeof it == "symbol";
          }
          : function (it) {
            var $Symbol = getBuiltIn("Symbol");
            return (
              isCallable($Symbol) &&
              isPrototypeOf($Symbol.prototype, $Object(it))
            );
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/iterator-create-constructor.js":
      /*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-create-constructor.js ***!
  \***********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var IteratorPrototype = __webpack_require__(
          /*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js"
        ).IteratorPrototype;
        var create = __webpack_require__(
          /*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js"
        );
        var createPropertyDescriptor = __webpack_require__(
          /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
        );
        var setToStringTag = __webpack_require__(
          /*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js"
        );
        var Iterators = __webpack_require__(
          /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
        );

        var returnThis = function () {
          return this;
        };

        module.exports = function (
          IteratorConstructor,
          NAME,
          next,
          ENUMERABLE_NEXT
        ) {
          var TO_STRING_TAG = NAME + " Iterator";
          IteratorConstructor.prototype = create(IteratorPrototype, {
            next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next),
          });
          setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
          Iterators[TO_STRING_TAG] = returnThis;
          return IteratorConstructor;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/iterator-define.js":
      /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-define.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var $ = __webpack_require__(
          /*! ../internals/export */ "./node_modules/core-js/internals/export.js"
        );
        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var IS_PURE = __webpack_require__(
          /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
        );
        var FunctionName = __webpack_require__(
          /*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var createIteratorConstructor = __webpack_require__(
          /*! ../internals/iterator-create-constructor */ "./node_modules/core-js/internals/iterator-create-constructor.js"
        );
        var getPrototypeOf = __webpack_require__(
          /*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js"
        );
        var setPrototypeOf = __webpack_require__(
          /*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js"
        );
        var setToStringTag = __webpack_require__(
          /*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js"
        );
        var createNonEnumerableProperty = __webpack_require__(
          /*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js"
        );
        var defineBuiltIn = __webpack_require__(
          /*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );
        var Iterators = __webpack_require__(
          /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
        );
        var IteratorsCore = __webpack_require__(
          /*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js"
        );

        var PROPER_FUNCTION_NAME = FunctionName.PROPER;
        var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
        var IteratorPrototype = IteratorsCore.IteratorPrototype;
        var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
        var ITERATOR = wellKnownSymbol("iterator");
        var KEYS = "keys";
        var VALUES = "values";
        var ENTRIES = "entries";

        var returnThis = function () {
          return this;
        };

        module.exports = function (
          Iterable,
          NAME,
          IteratorConstructor,
          next,
          DEFAULT,
          IS_SET,
          FORCED
        ) {
          createIteratorConstructor(IteratorConstructor, NAME, next);

          var getIterationMethod = function (KIND) {
            if (KIND === DEFAULT && defaultIterator) return defaultIterator;
            if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
              return IterablePrototype[KIND];
            switch (KIND) {
              case KEYS:
                return function keys() {
                  return new IteratorConstructor(this, KIND);
                };
              case VALUES:
                return function values() {
                  return new IteratorConstructor(this, KIND);
                };
              case ENTRIES:
                return function entries() {
                  return new IteratorConstructor(this, KIND);
                };
            }
            return function () {
              return new IteratorConstructor(this);
            };
          };

          var TO_STRING_TAG = NAME + " Iterator";
          var INCORRECT_VALUES_NAME = false;
          var IterablePrototype = Iterable.prototype;
          var nativeIterator =
            IterablePrototype[ITERATOR] ||
            IterablePrototype["@@iterator"] ||
            (DEFAULT && IterablePrototype[DEFAULT]);
          var defaultIterator =
            (!BUGGY_SAFARI_ITERATORS && nativeIterator) ||
            getIterationMethod(DEFAULT);
          var anyNativeIterator =
            NAME === "Array"
              ? IterablePrototype.entries || nativeIterator
              : nativeIterator;
          var CurrentIteratorPrototype, methods, KEY;

          // fix native
          if (anyNativeIterator) {
            CurrentIteratorPrototype = getPrototypeOf(
              anyNativeIterator.call(new Iterable())
            );
            if (
              CurrentIteratorPrototype !== Object.prototype &&
              CurrentIteratorPrototype.next
            ) {
              if (
                !IS_PURE &&
                getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype
              ) {
                if (setPrototypeOf) {
                  setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
                  defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
                }
              }
              // Set @@toStringTag to native iterators
              setToStringTag(
                CurrentIteratorPrototype,
                TO_STRING_TAG,
                true,
                true
              );
              if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
            }
          }

          // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
          if (
            PROPER_FUNCTION_NAME &&
            DEFAULT === VALUES &&
            nativeIterator &&
            nativeIterator.name !== VALUES
          ) {
            if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
              createNonEnumerableProperty(IterablePrototype, "name", VALUES);
            } else {
              INCORRECT_VALUES_NAME = true;
              defaultIterator = function values() {
                return call(nativeIterator, this);
              };
            }
          }

          // export additional methods
          if (DEFAULT) {
            methods = {
              values: getIterationMethod(VALUES),
              keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
              entries: getIterationMethod(ENTRIES),
            };
            if (FORCED)
              for (KEY in methods) {
                if (
                  BUGGY_SAFARI_ITERATORS ||
                  INCORRECT_VALUES_NAME ||
                  !(KEY in IterablePrototype)
                ) {
                  defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
                }
              }
            else
              $(
                {
                  target: NAME,
                  proto: true,
                  forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
                },
                methods
              );
          }

          // define iterator
          if (
            (!IS_PURE || FORCED) &&
            IterablePrototype[ITERATOR] !== defaultIterator
          ) {
            defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, {
              name: DEFAULT,
            });
          }
          Iterators[NAME] = defaultIterator;

          return methods;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/iterators-core.js":
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var isObject = __webpack_require__(
          /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
        );
        var create = __webpack_require__(
          /*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js"
        );
        var getPrototypeOf = __webpack_require__(
          /*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js"
        );
        var defineBuiltIn = __webpack_require__(
          /*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );
        var IS_PURE = __webpack_require__(
          /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
        );

        var ITERATOR = wellKnownSymbol("iterator");
        var BUGGY_SAFARI_ITERATORS = false;

        // `%IteratorPrototype%` object
        // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
        var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

        /* eslint-disable es/no-array-prototype-keys -- safe */
        if ([].keys) {
          arrayIterator = [].keys();
          // Safari 8 has buggy iterators w/o `next`
          if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
          else {
            PrototypeOfArrayIteratorPrototype = getPrototypeOf(
              getPrototypeOf(arrayIterator)
            );
            if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
              IteratorPrototype = PrototypeOfArrayIteratorPrototype;
          }
        }

        var NEW_ITERATOR_PROTOTYPE =
          !isObject(IteratorPrototype) ||
          fails(function () {
            var test = {};
            // FF44- legacy iterators case
            return IteratorPrototype[ITERATOR].call(test) !== test;
          });

        if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
        else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

        // `%IteratorPrototype%[@@iterator]()` method
        // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
        if (!isCallable(IteratorPrototype[ITERATOR])) {
          defineBuiltIn(IteratorPrototype, ITERATOR, function () {
            return this;
          });
        }

        module.exports = {
          IteratorPrototype: IteratorPrototype,
          BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/iterators.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = {};

        /***/
      },

    /***/ "./node_modules/core-js/internals/length-of-array-like.js":
      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toLength = __webpack_require__(
          /*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js"
        );

        // `LengthOfArrayLike` abstract operation
        // https://tc39.es/ecma262/#sec-lengthofarraylike
        module.exports = function (obj) {
          return toLength(obj.length);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/make-built-in.js":
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/make-built-in.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var CONFIGURABLE_FUNCTION_NAME = __webpack_require__(
          /*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js"
        ).CONFIGURABLE;
        var inspectSource = __webpack_require__(
          /*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js"
        );
        var InternalStateModule = __webpack_require__(
          /*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js"
        );

        var enforceInternalState = InternalStateModule.enforce;
        var getInternalState = InternalStateModule.get;
        var $String = String;
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        var defineProperty = Object.defineProperty;
        var stringSlice = uncurryThis("".slice);
        var replace = uncurryThis("".replace);
        var join = uncurryThis([].join);

        var CONFIGURABLE_LENGTH =
          DESCRIPTORS &&
          !fails(function () {
            return (
              defineProperty(
                function () {
                  /* empty */
                },
                "length",
                { value: 8 }
              ).length !== 8
            );
          });

        var TEMPLATE = String(String).split("String");

        var makeBuiltIn = (module.exports = function (value, name, options) {
          if (stringSlice($String(name), 0, 7) === "Symbol(") {
            name =
              "[" + replace($String(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
          }
          if (options && options.getter) name = "get " + name;
          if (options && options.setter) name = "set " + name;
          if (
            !hasOwn(value, "name") ||
            (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
          ) {
            if (DESCRIPTORS)
              defineProperty(value, "name", {
                value: name,
                configurable: true,
              });
            else value.name = name;
          }
          if (
            CONFIGURABLE_LENGTH &&
            options &&
            hasOwn(options, "arity") &&
            value.length !== options.arity
          ) {
            defineProperty(value, "length", { value: options.arity });
          }
          try {
            if (
              options &&
              hasOwn(options, "constructor") &&
              options.constructor
            ) {
              if (DESCRIPTORS)
                defineProperty(value, "prototype", { writable: false });
              // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
            } else if (value.prototype) value.prototype = undefined;
          } catch (error) {
            /* empty */
          }
          var state = enforceInternalState(value);
          if (!hasOwn(state, "source")) {
            state.source = join(TEMPLATE, typeof name == "string" ? name : "");
          }
          return value;
        });

        // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        // eslint-disable-next-line no-extend-native -- required
        Function.prototype.toString = makeBuiltIn(function toString() {
          return (
            (isCallable(this) && getInternalState(this).source) ||
            inspectSource(this)
          );
        }, "toString");

        /***/
      },

    /***/ "./node_modules/core-js/internals/math-trunc.js":
      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/math-trunc.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var ceil = Math.ceil;
        var floor = Math.floor;

        // `Math.trunc` method
        // https://tc39.es/ecma262/#sec-math.trunc
        // eslint-disable-next-line es/no-math-trunc -- safe
        module.exports =
          Math.trunc ||
          function trunc(x) {
            var n = +x;
            return (n > 0 ? floor : ceil)(n);
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-create.js":
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /* global ActiveXObject -- old IE, WSH */
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var definePropertiesModule = __webpack_require__(
          /*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js"
        );
        var enumBugKeys = __webpack_require__(
          /*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js"
        );
        var hiddenKeys = __webpack_require__(
          /*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js"
        );
        var html = __webpack_require__(
          /*! ../internals/html */ "./node_modules/core-js/internals/html.js"
        );
        var documentCreateElement = __webpack_require__(
          /*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js"
        );
        var sharedKey = __webpack_require__(
          /*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js"
        );

        var GT = ">";
        var LT = "<";
        var PROTOTYPE = "prototype";
        var SCRIPT = "script";
        var IE_PROTO = sharedKey("IE_PROTO");

        var EmptyConstructor = function () {
          /* empty */
        };

        var scriptTag = function (content) {
          return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
        };

        // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
        var NullProtoObjectViaActiveX = function (activeXDocument) {
          activeXDocument.write(scriptTag(""));
          activeXDocument.close();
          var temp = activeXDocument.parentWindow.Object;
          activeXDocument = null; // avoid memory leak
          return temp;
        };

        // Create object with fake `null` prototype: use iframe Object with cleared prototype
        var NullProtoObjectViaIFrame = function () {
          // Thrash, waste and sodomy: IE GC bug
          var iframe = documentCreateElement("iframe");
          var JS = "java" + SCRIPT + ":";
          var iframeDocument;
          iframe.style.display = "none";
          html.appendChild(iframe);
          // https://github.com/zloirock/core-js/issues/475
          iframe.src = String(JS);
          iframeDocument = iframe.contentWindow.document;
          iframeDocument.open();
          iframeDocument.write(scriptTag("document.F=Object"));
          iframeDocument.close();
          return iframeDocument.F;
        };

        // Check for document.domain and active x support
        // No need to use active x approach when document.domain is not set
        // see https://github.com/es-shims/es5-shim/issues/150
        // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
        // avoid IE GC bug
        var activeXDocument;
        var NullProtoObject = function () {
          try {
            activeXDocument = new ActiveXObject("htmlfile");
          } catch (error) {
            /* ignore */
          }
          NullProtoObject =
            typeof document != "undefined"
              ? document.domain && activeXDocument
                ? NullProtoObjectViaActiveX(activeXDocument) // old IE
                : NullProtoObjectViaIFrame()
              : NullProtoObjectViaActiveX(activeXDocument); // WSH
          var length = enumBugKeys.length;
          while (length--)
            delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
          return NullProtoObject();
        };

        hiddenKeys[IE_PROTO] = true;

        // `Object.create` method
        // https://tc39.es/ecma262/#sec-object.create
        // eslint-disable-next-line es/no-object-create -- safe
        module.exports =
          Object.create ||
          function create(O, Properties) {
            var result;
            if (O !== null) {
              EmptyConstructor[PROTOTYPE] = anObject(O);
              result = new EmptyConstructor();
              EmptyConstructor[PROTOTYPE] = null;
              // add "__proto__" for Object.getPrototypeOf polyfill
              result[IE_PROTO] = O;
            } else result = NullProtoObject();
            return Properties === undefined
              ? result
              : definePropertiesModule.f(result, Properties);
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-define-properties.js":
      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(
          /*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js/internals/v8-prototype-define-bug.js"
        );
        var definePropertyModule = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var toIndexedObject = __webpack_require__(
          /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
        );
        var objectKeys = __webpack_require__(
          /*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js"
        );

        // `Object.defineProperties` method
        // https://tc39.es/ecma262/#sec-object.defineproperties
        // eslint-disable-next-line es/no-object-defineproperties -- safe
        exports.f =
          DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG
            ? Object.defineProperties
            : function defineProperties(O, Properties) {
              anObject(O);
              var props = toIndexedObject(Properties);
              var keys = objectKeys(Properties);
              var length = keys.length;
              var index = 0;
              var key;
              while (length > index)
                definePropertyModule.f(O, (key = keys[index++]), props[key]);
              return O;
            };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-define-property.js":
      /*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var IE8_DOM_DEFINE = __webpack_require__(
          /*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js"
        );
        var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(
          /*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js/internals/v8-prototype-define-bug.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var toPropertyKey = __webpack_require__(
          /*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js"
        );

        var $TypeError = TypeError;
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        var $defineProperty = Object.defineProperty;
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var ENUMERABLE = "enumerable";
        var CONFIGURABLE = "configurable";
        var WRITABLE = "writable";

        // `Object.defineProperty` method
        // https://tc39.es/ecma262/#sec-object.defineproperty
        exports.f = DESCRIPTORS
          ? V8_PROTOTYPE_DEFINE_BUG
            ? function defineProperty(O, P, Attributes) {
              anObject(O);
              P = toPropertyKey(P);
              anObject(Attributes);
              if (
                typeof O === "function" &&
                P === "prototype" &&
                "value" in Attributes &&
                WRITABLE in Attributes &&
                !Attributes[WRITABLE]
              ) {
                var current = $getOwnPropertyDescriptor(O, P);
                if (current && current[WRITABLE]) {
                  O[P] = Attributes.value;
                  Attributes = {
                    configurable:
                      CONFIGURABLE in Attributes
                        ? Attributes[CONFIGURABLE]
                        : current[CONFIGURABLE],
                    enumerable:
                      ENUMERABLE in Attributes
                        ? Attributes[ENUMERABLE]
                        : current[ENUMERABLE],
                    writable: false,
                  };
                }
              }
              return $defineProperty(O, P, Attributes);
            }
            : $defineProperty
          : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPropertyKey(P);
            anObject(Attributes);
            if (IE8_DOM_DEFINE)
              try {
                return $defineProperty(O, P, Attributes);
              } catch (error) {
                /* empty */
              }
            if ("get" in Attributes || "set" in Attributes)
              throw $TypeError("Accessors not supported");
            if ("value" in Attributes) O[P] = Attributes.value;
            return O;
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
      /*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var propertyIsEnumerableModule = __webpack_require__(
          /*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js"
        );
        var createPropertyDescriptor = __webpack_require__(
          /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
        );
        var toIndexedObject = __webpack_require__(
          /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
        );
        var toPropertyKey = __webpack_require__(
          /*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js"
        );
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var IE8_DOM_DEFINE = __webpack_require__(
          /*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js"
        );

        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

        // `Object.getOwnPropertyDescriptor` method
        // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
        exports.f = DESCRIPTORS
          ? $getOwnPropertyDescriptor
          : function getOwnPropertyDescriptor(O, P) {
            O = toIndexedObject(O);
            P = toPropertyKey(P);
            if (IE8_DOM_DEFINE)
              try {
                return $getOwnPropertyDescriptor(O, P);
              } catch (error) {
                /* empty */
              }
            if (hasOwn(O, P))
              return createPropertyDescriptor(
                !call(propertyIsEnumerableModule.f, O, P),
                O[P]
              );
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
      /*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var internalObjectKeys = __webpack_require__(
          /*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js"
        );
        var enumBugKeys = __webpack_require__(
          /*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js"
        );

        var hiddenKeys = enumBugKeys.concat("length", "prototype");

        // `Object.getOwnPropertyNames` method
        // https://tc39.es/ecma262/#sec-object.getownpropertynames
        // eslint-disable-next-line es/no-object-getownpropertynames -- safe
        exports.f =
          Object.getOwnPropertyNames ||
          function getOwnPropertyNames(O) {
            return internalObjectKeys(O, hiddenKeys);
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
      /*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
        exports.f = Object.getOwnPropertySymbols;

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
      /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var toObject = __webpack_require__(
          /*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js"
        );
        var sharedKey = __webpack_require__(
          /*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js"
        );
        var CORRECT_PROTOTYPE_GETTER = __webpack_require__(
          /*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js"
        );

        var IE_PROTO = sharedKey("IE_PROTO");
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;

        // `Object.getPrototypeOf` method
        // https://tc39.es/ecma262/#sec-object.getprototypeof
        // eslint-disable-next-line es/no-object-getprototypeof -- safe
        module.exports = CORRECT_PROTOTYPE_GETTER
          ? $Object.getPrototypeOf
          : function (O) {
            var object = toObject(O);
            if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
            var constructor = object.constructor;
            if (isCallable(constructor) && object instanceof constructor) {
              return constructor.prototype;
            }
            return object instanceof $Object ? ObjectPrototype : null;
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
      /*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );

        module.exports = uncurryThis({}.isPrototypeOf);

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-keys-internal.js":
      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var toIndexedObject = __webpack_require__(
          /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
        );
        var indexOf = __webpack_require__(
          /*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js"
        ).indexOf;
        var hiddenKeys = __webpack_require__(
          /*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js"
        );

        var push = uncurryThis([].push);

        module.exports = function (object, names) {
          var O = toIndexedObject(object);
          var i = 0;
          var result = [];
          var key;
          for (key in O)
            !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
          // Don't enum bug & hidden keys
          while (names.length > i)
            if (hasOwn(O, (key = names[i++]))) {
              ~indexOf(result, key) || push(result, key);
            }
          return result;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-keys.js":
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var internalObjectKeys = __webpack_require__(
          /*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js"
        );
        var enumBugKeys = __webpack_require__(
          /*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js"
        );

        // `Object.keys` method
        // https://tc39.es/ecma262/#sec-object.keys
        // eslint-disable-next-line es/no-object-keys -- safe
        module.exports =
          Object.keys ||
          function keys(O) {
            return internalObjectKeys(O, enumBugKeys);
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
      /*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var $propertyIsEnumerable = {}.propertyIsEnumerable;
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

        // Nashorn ~ JDK8 bug
        var NASHORN_BUG =
          getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

        // `Object.prototype.propertyIsEnumerable` method implementation
        // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
        exports.f = NASHORN_BUG
          ? function propertyIsEnumerable(V) {
            var descriptor = getOwnPropertyDescriptor(this, V);
            return !!descriptor && descriptor.enumerable;
          }
          : $propertyIsEnumerable;

        /***/
      },

    /***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
      /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /* eslint-disable no-proto -- safe */
        var uncurryThisAccessor = __webpack_require__(
          /*! ../internals/function-uncurry-this-accessor */ "./node_modules/core-js/internals/function-uncurry-this-accessor.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var aPossiblePrototype = __webpack_require__(
          /*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js"
        );

        // `Object.setPrototypeOf` method
        // https://tc39.es/ecma262/#sec-object.setprototypeof
        // Works with __proto__ only. Old v8 can't work with null proto objects.
        // eslint-disable-next-line es/no-object-setprototypeof -- safe
        module.exports =
          Object.setPrototypeOf ||
          ("__proto__" in {}
            ? (function () {
              var CORRECT_SETTER = false;
              var test = {};
              var setter;
              try {
                setter = uncurryThisAccessor(
                  Object.prototype,
                  "__proto__",
                  "set"
                );
                setter(test, []);
                CORRECT_SETTER = test instanceof Array;
              } catch (error) {
                /* empty */
              }
              return function setPrototypeOf(O, proto) {
                anObject(O);
                aPossiblePrototype(proto);
                if (CORRECT_SETTER) setter(O, proto);
                else O.__proto__ = proto;
                return O;
              };
            })()
            : undefined);

        /***/
      },

    /***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var isObject = __webpack_require__(
          /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
        );

        var $TypeError = TypeError;

        // `OrdinaryToPrimitive` abstract operation
        // https://tc39.es/ecma262/#sec-ordinarytoprimitive
        module.exports = function (input, pref) {
          var fn, val;
          if (
            pref === "string" &&
            isCallable((fn = input.toString)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          if (
            isCallable((fn = input.valueOf)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          if (
            pref !== "string" &&
            isCallable((fn = input.toString)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          throw $TypeError("Can't convert object to primitive value");
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/own-keys.js":
      /*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var getBuiltIn = __webpack_require__(
          /*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js"
        );
        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var getOwnPropertyNamesModule = __webpack_require__(
          /*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js"
        );
        var getOwnPropertySymbolsModule = __webpack_require__(
          /*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );

        var concat = uncurryThis([].concat);

        // all object keys, includes non-enumerable and symbols
        module.exports =
          getBuiltIn("Reflect", "ownKeys") ||
          function ownKeys(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it));
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols
              ? concat(keys, getOwnPropertySymbols(it))
              : keys;
          };

        /***/
      },

    /***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var classof = __webpack_require__(
          /*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js"
        );
        var regexpExec = __webpack_require__(
          /*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js"
        );

        var $TypeError = TypeError;

        // `RegExpExec` abstract operation
        // https://tc39.es/ecma262/#sec-regexpexec
        module.exports = function (R, S) {
          var exec = R.exec;
          if (isCallable(exec)) {
            var result = call(exec, R, S);
            if (result !== null) anObject(result);
            return result;
          }
          if (classof(R) === "RegExp") return call(regexpExec, R, S);
          throw $TypeError("RegExp#exec called on incompatible receiver");
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/regexp-exec.js":
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
        /* eslint-disable regexp/no-useless-quantifier -- testing */
        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var toString = __webpack_require__(
          /*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js"
        );
        var regexpFlags = __webpack_require__(
          /*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js"
        );
        var stickyHelpers = __webpack_require__(
          /*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js"
        );
        var shared = __webpack_require__(
          /*! ../internals/shared */ "./node_modules/core-js/internals/shared.js"
        );
        var create = __webpack_require__(
          /*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js"
        );
        var getInternalState = __webpack_require__(
          /*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js"
        ).get;
        var UNSUPPORTED_DOT_ALL = __webpack_require__(
          /*! ../internals/regexp-unsupported-dot-all */ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js"
        );
        var UNSUPPORTED_NCG = __webpack_require__(
          /*! ../internals/regexp-unsupported-ncg */ "./node_modules/core-js/internals/regexp-unsupported-ncg.js"
        );

        var nativeReplace = shared(
          "native-string-replace",
          String.prototype.replace
        );
        var nativeExec = RegExp.prototype.exec;
        var patchedExec = nativeExec;
        var charAt = uncurryThis("".charAt);
        var indexOf = uncurryThis("".indexOf);
        var replace = uncurryThis("".replace);
        var stringSlice = uncurryThis("".slice);

        var UPDATES_LAST_INDEX_WRONG = (function () {
          var re1 = /a/;
          var re2 = /b*/g;
          call(nativeExec, re1, "a");
          call(nativeExec, re2, "a");
          return re1.lastIndex !== 0 || re2.lastIndex !== 0;
        })();

        var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

        // nonparticipating capturing group, copied from es5-shim's String#split patch.
        var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

        var PATCH =
          UPDATES_LAST_INDEX_WRONG ||
          NPCG_INCLUDED ||
          UNSUPPORTED_Y ||
          UNSUPPORTED_DOT_ALL ||
          UNSUPPORTED_NCG;

        if (PATCH) {
          patchedExec = function exec(string) {
            var re = this;
            var state = getInternalState(re);
            var str = toString(string);
            var raw = state.raw;
            var result, reCopy, lastIndex, match, i, object, group;

            if (raw) {
              raw.lastIndex = re.lastIndex;
              result = call(patchedExec, raw, str);
              re.lastIndex = raw.lastIndex;
              return result;
            }

            var groups = state.groups;
            var sticky = UNSUPPORTED_Y && re.sticky;
            var flags = call(regexpFlags, re);
            var source = re.source;
            var charsAdded = 0;
            var strCopy = str;

            if (sticky) {
              flags = replace(flags, "y", "");
              if (indexOf(flags, "g") === -1) {
                flags += "g";
              }

              strCopy = stringSlice(str, re.lastIndex);
              // Support anchored sticky behavior.
              if (
                re.lastIndex > 0 &&
                (!re.multiline ||
                  (re.multiline && charAt(str, re.lastIndex - 1) !== "\n"))
              ) {
                source = "(?: " + source + ")";
                strCopy = " " + strCopy;
                charsAdded++;
              }
              // ^(? + rx + ) is needed, in combination with some str slicing, to
              // simulate the 'y' flag.
              reCopy = new RegExp("^(?:" + source + ")", flags);
            }

            if (NPCG_INCLUDED) {
              reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
            }
            if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

            match = call(nativeExec, sticky ? reCopy : re, strCopy);

            if (sticky) {
              if (match) {
                match.input = stringSlice(match.input, charsAdded);
                match[0] = stringSlice(match[0], charsAdded);
                match.index = re.lastIndex;
                re.lastIndex += match[0].length;
              } else re.lastIndex = 0;
            } else if (UPDATES_LAST_INDEX_WRONG && match) {
              re.lastIndex = re.global
                ? match.index + match[0].length
                : lastIndex;
            }
            if (NPCG_INCLUDED && match && match.length > 1) {
              // Fix browsers whose `exec` methods don't consistently return `undefined`
              // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
              call(nativeReplace, match[0], reCopy, function () {
                for (i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undefined) match[i] = undefined;
                }
              });
            }

            if (match && groups) {
              match.groups = object = create(null);
              for (i = 0; i < groups.length; i++) {
                group = groups[i];
                object[group[0]] = match[group[1]];
              }
            }

            return match;
          };
        }

        module.exports = patchedExec;

        /***/
      },

    /***/ "./node_modules/core-js/internals/regexp-flags.js":
      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );

        // `RegExp.prototype.flags` getter implementation
        // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
        module.exports = function () {
          var that = anObject(this);
          var result = "";
          if (that.hasIndices) result += "d";
          if (that.global) result += "g";
          if (that.ignoreCase) result += "i";
          if (that.multiline) result += "m";
          if (that.dotAll) result += "s";
          if (that.unicode) result += "u";
          if (that.unicodeSets) result += "v";
          if (that.sticky) result += "y";
          return result;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/regexp-sticky-helpers.js":
      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );

        // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
        var $RegExp = global.RegExp;

        var UNSUPPORTED_Y = fails(function () {
          var re = $RegExp("a", "y");
          re.lastIndex = 2;
          return re.exec("abcd") !== null;
        });

        // UC Browser bug
        // https://github.com/zloirock/core-js/issues/1008
        var MISSED_STICKY =
          UNSUPPORTED_Y ||
          fails(function () {
            return !$RegExp("a", "y").sticky;
          });

        var BROKEN_CARET =
          UNSUPPORTED_Y ||
          fails(function () {
            // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
            var re = $RegExp("^r", "gy");
            re.lastIndex = 2;
            return re.exec("str") !== null;
          });

        module.exports = {
          BROKEN_CARET: BROKEN_CARET,
          MISSED_STICKY: MISSED_STICKY,
          UNSUPPORTED_Y: UNSUPPORTED_Y,
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js":
      /*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );

        // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
        var $RegExp = global.RegExp;

        module.exports = fails(function () {
          var re = $RegExp(".", "s");
          return !(re.dotAll && re.exec("\n") && re.flags === "s");
        });

        /***/
      },

    /***/ "./node_modules/core-js/internals/regexp-unsupported-ncg.js":
      /*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );

        // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
        var $RegExp = global.RegExp;

        module.exports = fails(function () {
          var re = $RegExp("(?<a>b)", "g");
          return (
            re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc"
          );
        });

        /***/
      },

    /***/ "./node_modules/core-js/internals/require-object-coercible.js":
      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var isNullOrUndefined = __webpack_require__(
          /*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js"
        );

        var $TypeError = TypeError;

        // `RequireObjectCoercible` abstract operation
        // https://tc39.es/ecma262/#sec-requireobjectcoercible
        module.exports = function (it) {
          if (isNullOrUndefined(it))
            throw $TypeError("Can't call method on " + it);
          return it;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/set-to-string-tag.js":
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var defineProperty = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        ).f;
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );

        var TO_STRING_TAG = wellKnownSymbol("toStringTag");

        module.exports = function (target, TAG, STATIC) {
          if (target && !STATIC) target = target.prototype;
          if (target && !hasOwn(target, TO_STRING_TAG)) {
            defineProperty(target, TO_STRING_TAG, {
              configurable: true,
              value: TAG,
            });
          }
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/shared-key.js":
      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var shared = __webpack_require__(
          /*! ../internals/shared */ "./node_modules/core-js/internals/shared.js"
        );
        var uid = __webpack_require__(
          /*! ../internals/uid */ "./node_modules/core-js/internals/uid.js"
        );

        var keys = shared("keys");

        module.exports = function (key) {
          return keys[key] || (keys[key] = uid(key));
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/shared-store.js":
      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var defineGlobalProperty = __webpack_require__(
          /*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js"
        );

        var SHARED = "__core-js_shared__";
        var store = global[SHARED] || defineGlobalProperty(SHARED, {});

        module.exports = store;

        /***/
      },

    /***/ "./node_modules/core-js/internals/shared.js":
      /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var IS_PURE = __webpack_require__(
          /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
        );
        var store = __webpack_require__(
          /*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js"
        );

        (module.exports = function (key, value) {
          return store[key] || (store[key] = value !== undefined ? value : {});
        })("versions", []).push({
          version: "3.32.1",
          mode: IS_PURE ? "pure" : "global",
          copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
          license: "https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });

        /***/
      },

    /***/ "./node_modules/core-js/internals/string-multibyte.js":
      /*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var toIntegerOrInfinity = __webpack_require__(
          /*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js"
        );
        var toString = __webpack_require__(
          /*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js"
        );
        var requireObjectCoercible = __webpack_require__(
          /*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"
        );

        var charAt = uncurryThis("".charAt);
        var charCodeAt = uncurryThis("".charCodeAt);
        var stringSlice = uncurryThis("".slice);

        var createMethod = function (CONVERT_TO_STRING) {
          return function ($this, pos) {
            var S = toString(requireObjectCoercible($this));
            var position = toIntegerOrInfinity(pos);
            var size = S.length;
            var first, second;
            if (position < 0 || position >= size)
              return CONVERT_TO_STRING ? "" : undefined;
            first = charCodeAt(S, position);
            return first < 0xd800 ||
              first > 0xdbff ||
              position + 1 === size ||
              (second = charCodeAt(S, position + 1)) < 0xdc00 ||
              second > 0xdfff
              ? CONVERT_TO_STRING
                ? charAt(S, position)
                : first
              : CONVERT_TO_STRING
                ? stringSlice(S, position, position + 2)
                : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
          };
        };

        module.exports = {
          // `String.prototype.codePointAt` method
          // https://tc39.es/ecma262/#sec-string.prototype.codepointat
          codeAt: createMethod(false),
          // `String.prototype.at` method
          // https://github.com/mathiasbynens/String.prototype.at
          charAt: createMethod(true),
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/symbol-constructor-detection.js":
      /*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /* eslint-disable es/no-symbol -- required for testing */
        var V8_VERSION = __webpack_require__(
          /*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js"
        );
        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );

        var $String = global.String;

        // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
        module.exports =
          !!Object.getOwnPropertySymbols &&
          !fails(function () {
            var symbol = Symbol("symbol detection");
            // Chrome 38 Symbol has incorrect toString conversion
            // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
            // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
            // of course, fail.
            return (
              !$String(symbol) ||
              !(Object(symbol) instanceof Symbol) ||
              // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
              (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
            );
          });

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-absolute-index.js":
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toIntegerOrInfinity = __webpack_require__(
          /*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js"
        );

        var max = Math.max;
        var min = Math.min;

        // Helper for a popular repeating case of the spec:
        // Let integer be ? ToInteger(index).
        // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
        module.exports = function (index, length) {
          var integer = toIntegerOrInfinity(index);
          return integer < 0 ? max(integer + length, 0) : min(integer, length);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-indexed-object.js":
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // toObject with fallback for non-array-like ES3 strings
        var IndexedObject = __webpack_require__(
          /*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js"
        );
        var requireObjectCoercible = __webpack_require__(
          /*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"
        );

        module.exports = function (it) {
          return IndexedObject(requireObjectCoercible(it));
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
      /*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var trunc = __webpack_require__(
          /*! ../internals/math-trunc */ "./node_modules/core-js/internals/math-trunc.js"
        );

        // `ToIntegerOrInfinity` abstract operation
        // https://tc39.es/ecma262/#sec-tointegerorinfinity
        module.exports = function (argument) {
          var number = +argument;
          // eslint-disable-next-line no-self-compare -- NaN check
          return number !== number || number === 0 ? 0 : trunc(number);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-length.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toIntegerOrInfinity = __webpack_require__(
          /*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js"
        );

        var min = Math.min;

        // `ToLength` abstract operation
        // https://tc39.es/ecma262/#sec-tolength
        module.exports = function (argument) {
          return argument > 0
            ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff)
            : 0; // 2 ** 53 - 1 == 9007199254740991
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-object.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var requireObjectCoercible = __webpack_require__(
          /*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"
        );

        var $Object = Object;

        // `ToObject` abstract operation
        // https://tc39.es/ecma262/#sec-toobject
        module.exports = function (argument) {
          return $Object(requireObjectCoercible(argument));
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-primitive.js":
      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var isObject = __webpack_require__(
          /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
        );
        var isSymbol = __webpack_require__(
          /*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js"
        );
        var getMethod = __webpack_require__(
          /*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js"
        );
        var ordinaryToPrimitive = __webpack_require__(
          /*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );

        var $TypeError = TypeError;
        var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");

        // `ToPrimitive` abstract operation
        // https://tc39.es/ecma262/#sec-toprimitive
        module.exports = function (input, pref) {
          if (!isObject(input) || isSymbol(input)) return input;
          var exoticToPrim = getMethod(input, TO_PRIMITIVE);
          var result;
          if (exoticToPrim) {
            if (pref === undefined) pref = "default";
            result = call(exoticToPrim, input, pref);
            if (!isObject(result) || isSymbol(result)) return result;
            throw $TypeError("Can't convert object to primitive value");
          }
          if (pref === undefined) pref = "number";
          return ordinaryToPrimitive(input, pref);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-property-key.js":
      /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toPrimitive = __webpack_require__(
          /*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js"
        );
        var isSymbol = __webpack_require__(
          /*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js"
        );

        // `ToPropertyKey` abstract operation
        // https://tc39.es/ecma262/#sec-topropertykey
        module.exports = function (argument) {
          var key = toPrimitive(argument, "string");
          return isSymbol(key) ? key : key + "";
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-string-tag-support.js":
      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );

        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var test = {};

        test[TO_STRING_TAG] = "z";

        module.exports = String(test) === "[object z]";

        /***/
      },

    /***/ "./node_modules/core-js/internals/to-string.js":
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var classof = __webpack_require__(
          /*! ../internals/classof */ "./node_modules/core-js/internals/classof.js"
        );

        var $String = String;

        module.exports = function (argument) {
          if (classof(argument) === "Symbol")
            throw TypeError("Cannot convert a Symbol value to a string");
          return $String(argument);
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/try-to-string.js":
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var $String = String;

        module.exports = function (argument) {
          try {
            return $String(argument);
          } catch (error) {
            return "Object";
          }
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/uid.js":
      /*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );

        var id = 0;
        var postfix = Math.random();
        var toString = uncurryThis((1.0).toString);

        module.exports = function (key) {
          return (
            "Symbol(" +
            (key === undefined ? "" : key) +
            ")_" +
            toString(++id + postfix, 36)
          );
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/url-constructor-detection.js":
      /*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/url-constructor-detection.js ***!
  \*********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );
        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var IS_PURE = __webpack_require__(
          /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
        );

        var ITERATOR = wellKnownSymbol("iterator");

        module.exports = !fails(function () {
          // eslint-disable-next-line unicorn/relative-url-style -- required for testing
          var url = new URL("b?a=1&b=2&c=3", "http://a");
          var params = url.searchParams;
          var params2 = new URLSearchParams("a=1&a=2&b=3");
          var result = "";
          url.pathname = "c%20d";
          params.forEach(function (value, key) {
            params["delete"]("b");
            result += key + value;
          });
          params2["delete"]("a", 2);
          // `undefined` case is a Chromium 117 bug
          // https://bugs.chromium.org/p/v8/issues/detail?id=14222
          params2["delete"]("b", undefined);
          return (
            (IS_PURE &&
              (!url.toJSON ||
                !params2.has("a", 1) ||
                params2.has("a", 2) ||
                !params2.has("a", undefined) ||
                params2.has("b"))) ||
            (!params.size && (IS_PURE || !DESCRIPTORS)) ||
            !params.sort ||
            url.href !== "http://a/c%20d?a=1&c=3" ||
            params.get("c") !== "3" ||
            String(new URLSearchParams("?a=1")) !== "a=1" ||
            !params[ITERATOR] ||
            // throws in Edge
            new URL("https://a@b").username !== "a" ||
            new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" ||
            // not punycoded in Edge
            new URL("http://тест").host !== "xn--e1aybc" ||
            // not escaped in Chrome 62-
            new URL("http://a#б").hash !== "#%D0%B1" ||
            // fails in Chrome 66-
            result !== "a1c3" ||
            // throws in Safari
            new URL("http://x", undefined).host !== "x"
          );
        });

        /***/
      },

    /***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        /* eslint-disable es/no-symbol -- required for testing */
        var NATIVE_SYMBOL = __webpack_require__(
          /*! ../internals/symbol-constructor-detection */ "./node_modules/core-js/internals/symbol-constructor-detection.js"
        );

        module.exports =
          NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";

        /***/
      },

    /***/ "./node_modules/core-js/internals/v8-prototype-define-bug.js":
      /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \*******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );

        // V8 ~ Chrome 36-
        // https://bugs.chromium.org/p/v8/issues/detail?id=3334
        module.exports =
          DESCRIPTORS &&
          fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- required for testing
            return (
              Object.defineProperty(
                function () {
                  /* empty */
                },
                "prototype",
                {
                  value: 42,
                  writable: false,
                }
              ).prototype !== 42
            );
          });

        /***/
      },

    /***/ "./node_modules/core-js/internals/validate-arguments-length.js":
      /*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/validate-arguments-length.js ***!
  \*********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var $TypeError = TypeError;

        module.exports = function (passed, required) {
          if (passed < required) throw $TypeError("Not enough arguments");
          return passed;
        };

        /***/
      },

    /***/ "./node_modules/core-js/internals/weak-map-basic-detection.js":
      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );

        var WeakMap = global.WeakMap;

        module.exports =
          isCallable(WeakMap) && /native code/.test(String(WeakMap));

        /***/
      },

    /***/ "./node_modules/core-js/internals/well-known-symbol.js":
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var shared = __webpack_require__(
          /*! ../internals/shared */ "./node_modules/core-js/internals/shared.js"
        );
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var uid = __webpack_require__(
          /*! ../internals/uid */ "./node_modules/core-js/internals/uid.js"
        );
        var NATIVE_SYMBOL = __webpack_require__(
          /*! ../internals/symbol-constructor-detection */ "./node_modules/core-js/internals/symbol-constructor-detection.js"
        );
        var USE_SYMBOL_AS_UID = __webpack_require__(
          /*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js"
        );

        var Symbol = global.Symbol;
        var WellKnownSymbolsStore = shared("wks");
        var createWellKnownSymbol = USE_SYMBOL_AS_UID
          ? Symbol["for"] || Symbol
          : (Symbol && Symbol.withoutSetter) || uid;

        module.exports = function (name) {
          if (!hasOwn(WellKnownSymbolsStore, name)) {
            WellKnownSymbolsStore[name] =
              NATIVE_SYMBOL && hasOwn(Symbol, name)
                ? Symbol[name]
                : createWellKnownSymbol("Symbol." + name);
          }
          return WellKnownSymbolsStore[name];
        };

        /***/
      },

    /***/ "./node_modules/core-js/modules/es.array.iterator.js":
      /*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var toIndexedObject = __webpack_require__(
          /*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js"
        );
        var addToUnscopables = __webpack_require__(
          /*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js"
        );
        var Iterators = __webpack_require__(
          /*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js"
        );
        var InternalStateModule = __webpack_require__(
          /*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js"
        );
        var defineProperty = __webpack_require__(
          /*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js"
        ).f;
        var defineIterator = __webpack_require__(
          /*! ../internals/iterator-define */ "./node_modules/core-js/internals/iterator-define.js"
        );
        var createIterResultObject = __webpack_require__(
          /*! ../internals/create-iter-result-object */ "./node_modules/core-js/internals/create-iter-result-object.js"
        );
        var IS_PURE = __webpack_require__(
          /*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js"
        );
        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );

        var ARRAY_ITERATOR = "Array Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

        // `Array.prototype.entries` method
        // https://tc39.es/ecma262/#sec-array.prototype.entries
        // `Array.prototype.keys` method
        // https://tc39.es/ecma262/#sec-array.prototype.keys
        // `Array.prototype.values` method
        // https://tc39.es/ecma262/#sec-array.prototype.values
        // `Array.prototype[@@iterator]` method
        // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
        // `CreateArrayIterator` internal method
        // https://tc39.es/ecma262/#sec-createarrayiterator
        module.exports = defineIterator(
          Array,
          "Array",
          function (iterated, kind) {
            setInternalState(this, {
              type: ARRAY_ITERATOR,
              target: toIndexedObject(iterated), // target
              index: 0, // next index
              kind: kind, // kind
            });
            // `%ArrayIteratorPrototype%.next` method
            // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
          },
          function () {
            var state = getInternalState(this);
            var target = state.target;
            var kind = state.kind;
            var index = state.index++;
            if (!target || index >= target.length) {
              state.target = undefined;
              return createIterResultObject(undefined, true);
            }
            switch (kind) {
              case "keys":
                return createIterResultObject(index, false);
              case "values":
                return createIterResultObject(target[index], false);
            }
            return createIterResultObject([index, target[index]], false);
          },
          "values"
        );

        // argumentsList[@@iterator] is %ArrayProto_values%
        // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
        // https://tc39.es/ecma262/#sec-createmappedargumentsobject
        var values = (Iterators.Arguments = Iterators.Array);

        // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
        addToUnscopables("keys");
        addToUnscopables("values");
        addToUnscopables("entries");

        // V8 ~ Chrome 45- bug
        if (!IS_PURE && DESCRIPTORS && values.name !== "values")
          try {
            defineProperty(values, "name", { value: "values" });
          } catch (error) {
            /* empty */
          }

        /***/
      },

    /***/ "./node_modules/core-js/modules/es.regexp.exec.js":
      /*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var $ = __webpack_require__(
          /*! ../internals/export */ "./node_modules/core-js/internals/export.js"
        );
        var exec = __webpack_require__(
          /*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js"
        );

        // `RegExp.prototype.exec` method
        // https://tc39.es/ecma262/#sec-regexp.prototype.exec
        $(
          { target: "RegExp", proto: true, forced: /./.exec !== exec },
          {
            exec: exec,
          }
        );

        /***/
      },

    /***/ "./node_modules/core-js/modules/es.string.replace.js":
      /*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var apply = __webpack_require__(
          /*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js"
        );
        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var fixRegExpWellKnownSymbolLogic = __webpack_require__(
          /*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js"
        );
        var fails = __webpack_require__(
          /*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var isNullOrUndefined = __webpack_require__(
          /*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js"
        );
        var toIntegerOrInfinity = __webpack_require__(
          /*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js"
        );
        var toLength = __webpack_require__(
          /*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js"
        );
        var toString = __webpack_require__(
          /*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js"
        );
        var requireObjectCoercible = __webpack_require__(
          /*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"
        );
        var advanceStringIndex = __webpack_require__(
          /*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js"
        );
        var getMethod = __webpack_require__(
          /*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js"
        );
        var getSubstitution = __webpack_require__(
          /*! ../internals/get-substitution */ "./node_modules/core-js/internals/get-substitution.js"
        );
        var regExpExec = __webpack_require__(
          /*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );

        var REPLACE = wellKnownSymbol("replace");
        var max = Math.max;
        var min = Math.min;
        var concat = uncurryThis([].concat);
        var push = uncurryThis([].push);
        var stringIndexOf = uncurryThis("".indexOf);
        var stringSlice = uncurryThis("".slice);

        var maybeToString = function (it) {
          return it === undefined ? it : String(it);
        };

        // IE <= 11 replaces $0 with the whole match, as if it was $&
        // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
        var REPLACE_KEEPS_$0 = (function () {
          // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
          return "a".replace(/./, "$0") === "$0";
        })();

        // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
        var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
          if (/./[REPLACE]) {
            return /./[REPLACE]("a", "$0") === "";
          }
          return false;
        })();

        var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
          var re = /./;
          re.exec = function () {
            var result = [];
            result.groups = { a: "7" };
            return result;
          };
          // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
          return "".replace(re, "$<a>") !== "7";
        });

        // @@replace logic
        fixRegExpWellKnownSymbolLogic(
          "replace",
          function (_, nativeReplace, maybeCallNative) {
            var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
              ? "$"
              : "$0";

            return [
              // `String.prototype.replace` method
              // https://tc39.es/ecma262/#sec-string.prototype.replace
              function replace(searchValue, replaceValue) {
                var O = requireObjectCoercible(this);
                var replacer = isNullOrUndefined(searchValue)
                  ? undefined
                  : getMethod(searchValue, REPLACE);
                return replacer
                  ? call(replacer, searchValue, O, replaceValue)
                  : call(nativeReplace, toString(O), searchValue, replaceValue);
              },
              // `RegExp.prototype[@@replace]` method
              // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
              function (string, replaceValue) {
                var rx = anObject(this);
                var S = toString(string);

                if (
                  typeof replaceValue == "string" &&
                  stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
                  stringIndexOf(replaceValue, "$<") === -1
                ) {
                  var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
                  if (res.done) return res.value;
                }

                var functionalReplace = isCallable(replaceValue);
                if (!functionalReplace) replaceValue = toString(replaceValue);

                var global = rx.global;
                var fullUnicode;
                if (global) {
                  fullUnicode = rx.unicode;
                  rx.lastIndex = 0;
                }

                var results = [];
                var result;
                while (true) {
                  result = regExpExec(rx, S);
                  if (result === null) break;

                  push(results, result);
                  if (!global) break;

                  var matchStr = toString(result[0]);
                  if (matchStr === "")
                    rx.lastIndex = advanceStringIndex(
                      S,
                      toLength(rx.lastIndex),
                      fullUnicode
                    );
                }

                var accumulatedResult = "";
                var nextSourcePosition = 0;
                for (var i = 0; i < results.length; i++) {
                  result = results[i];

                  var matched = toString(result[0]);
                  var position = max(
                    min(toIntegerOrInfinity(result.index), S.length),
                    0
                  );
                  var captures = [];
                  var replacement;
                  // NOTE: This is equivalent to
                  //   captures = result.slice(1).map(maybeToString)
                  // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
                  // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
                  // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
                  for (var j = 1; j < result.length; j++)
                    push(captures, maybeToString(result[j]));
                  var namedCaptures = result.groups;
                  if (functionalReplace) {
                    var replacerArgs = concat([matched], captures, position, S);
                    if (namedCaptures !== undefined)
                      push(replacerArgs, namedCaptures);
                    replacement = toString(
                      apply(replaceValue, undefined, replacerArgs)
                    );
                  } else {
                    replacement = getSubstitution(
                      matched,
                      S,
                      position,
                      captures,
                      namedCaptures,
                      replaceValue
                    );
                  }
                  if (position >= nextSourcePosition) {
                    accumulatedResult +=
                      stringSlice(S, nextSourcePosition, position) +
                      replacement;
                    nextSourcePosition = position + matched.length;
                  }
                }

                return accumulatedResult + stringSlice(S, nextSourcePosition);
              },
            ];
          },
          !REPLACE_SUPPORTS_NAMED_GROUPS ||
          !REPLACE_KEEPS_$0 ||
          REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        );

        /***/
      },

    /***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
      /*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var DOMIterables = __webpack_require__(
          /*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js"
        );
        var DOMTokenListPrototype = __webpack_require__(
          /*! ../internals/dom-token-list-prototype */ "./node_modules/core-js/internals/dom-token-list-prototype.js"
        );
        var ArrayIteratorMethods = __webpack_require__(
          /*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js"
        );
        var createNonEnumerableProperty = __webpack_require__(
          /*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );

        var ITERATOR = wellKnownSymbol("iterator");
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var ArrayValues = ArrayIteratorMethods.values;

        var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
          if (CollectionPrototype) {
            // some Chrome versions have non-configurable methods on DOMTokenList
            if (CollectionPrototype[ITERATOR] !== ArrayValues)
              try {
                createNonEnumerableProperty(
                  CollectionPrototype,
                  ITERATOR,
                  ArrayValues
                );
              } catch (error) {
                CollectionPrototype[ITERATOR] = ArrayValues;
              }
            if (!CollectionPrototype[TO_STRING_TAG]) {
              createNonEnumerableProperty(
                CollectionPrototype,
                TO_STRING_TAG,
                COLLECTION_NAME
              );
            }
            if (DOMIterables[COLLECTION_NAME])
              for (var METHOD_NAME in ArrayIteratorMethods) {
                // some Chrome versions have non-configurable methods on DOMTokenList
                if (
                  CollectionPrototype[METHOD_NAME] !==
                  ArrayIteratorMethods[METHOD_NAME]
                )
                  try {
                    createNonEnumerableProperty(
                      CollectionPrototype,
                      METHOD_NAME,
                      ArrayIteratorMethods[METHOD_NAME]
                    );
                  } catch (error) {
                    CollectionPrototype[METHOD_NAME] =
                      ArrayIteratorMethods[METHOD_NAME];
                  }
              }
          }
        };

        for (var COLLECTION_NAME in DOMIterables) {
          handlePrototype(
            global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype,
            COLLECTION_NAME
          );
        }

        handlePrototype(DOMTokenListPrototype, "DOMTokenList");

        /***/
      },

    /***/ "./node_modules/core-js/modules/web.url-search-params.constructor.js":
      /*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/web.url-search-params.constructor.js ***!
  \***************************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
        __webpack_require__(
          /*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js"
        );
        var $ = __webpack_require__(
          /*! ../internals/export */ "./node_modules/core-js/internals/export.js"
        );
        var global = __webpack_require__(
          /*! ../internals/global */ "./node_modules/core-js/internals/global.js"
        );
        var call = __webpack_require__(
          /*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js"
        );
        var uncurryThis = __webpack_require__(
          /*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js"
        );
        var DESCRIPTORS = __webpack_require__(
          /*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js"
        );
        var USE_NATIVE_URL = __webpack_require__(
          /*! ../internals/url-constructor-detection */ "./node_modules/core-js/internals/url-constructor-detection.js"
        );
        var defineBuiltIn = __webpack_require__(
          /*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js"
        );
        var defineBuiltInAccessor = __webpack_require__(
          /*! ../internals/define-built-in-accessor */ "./node_modules/core-js/internals/define-built-in-accessor.js"
        );
        var defineBuiltIns = __webpack_require__(
          /*! ../internals/define-built-ins */ "./node_modules/core-js/internals/define-built-ins.js"
        );
        var setToStringTag = __webpack_require__(
          /*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js"
        );
        var createIteratorConstructor = __webpack_require__(
          /*! ../internals/iterator-create-constructor */ "./node_modules/core-js/internals/iterator-create-constructor.js"
        );
        var InternalStateModule = __webpack_require__(
          /*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js"
        );
        var anInstance = __webpack_require__(
          /*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js"
        );
        var isCallable = __webpack_require__(
          /*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js"
        );
        var hasOwn = __webpack_require__(
          /*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js"
        );
        var bind = __webpack_require__(
          /*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js"
        );
        var classof = __webpack_require__(
          /*! ../internals/classof */ "./node_modules/core-js/internals/classof.js"
        );
        var anObject = __webpack_require__(
          /*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"
        );
        var isObject = __webpack_require__(
          /*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"
        );
        var $toString = __webpack_require__(
          /*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js"
        );
        var create = __webpack_require__(
          /*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js"
        );
        var createPropertyDescriptor = __webpack_require__(
          /*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js"
        );
        var getIterator = __webpack_require__(
          /*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js"
        );
        var getIteratorMethod = __webpack_require__(
          /*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js"
        );
        var validateArgumentsLength = __webpack_require__(
          /*! ../internals/validate-arguments-length */ "./node_modules/core-js/internals/validate-arguments-length.js"
        );
        var wellKnownSymbol = __webpack_require__(
          /*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js"
        );
        var arraySort = __webpack_require__(
          /*! ../internals/array-sort */ "./node_modules/core-js/internals/array-sort.js"
        );

        var ITERATOR = wellKnownSymbol("iterator");
        var URL_SEARCH_PARAMS = "URLSearchParams";
        var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + "Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalParamsState =
          InternalStateModule.getterFor(URL_SEARCH_PARAMS);
        var getInternalIteratorState = InternalStateModule.getterFor(
          URL_SEARCH_PARAMS_ITERATOR
        );
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

        // Avoid NodeJS experimental warning
        var safeGetBuiltIn = function (name) {
          if (!DESCRIPTORS) return global[name];
          var descriptor = getOwnPropertyDescriptor(global, name);
          return descriptor && descriptor.value;
        };

        var nativeFetch = safeGetBuiltIn("fetch");
        var NativeRequest = safeGetBuiltIn("Request");
        var Headers = safeGetBuiltIn("Headers");
        var RequestPrototype = NativeRequest && NativeRequest.prototype;
        var HeadersPrototype = Headers && Headers.prototype;
        var RegExp = global.RegExp;
        var TypeError = global.TypeError;
        var decodeURIComponent = global.decodeURIComponent;
        var encodeURIComponent = global.encodeURIComponent;
        var charAt = uncurryThis("".charAt);
        var join = uncurryThis([].join);
        var push = uncurryThis([].push);
        var replace = uncurryThis("".replace);
        var shift = uncurryThis([].shift);
        var splice = uncurryThis([].splice);
        var split = uncurryThis("".split);
        var stringSlice = uncurryThis("".slice);

        var plus = /\+/g;
        var sequences = Array(4);

        var percentSequence = function (bytes) {
          return (
            sequences[bytes - 1] ||
            (sequences[bytes - 1] = RegExp(
              "((?:%[\\da-f]{2}){" + bytes + "})",
              "gi"
            ))
          );
        };

        var percentDecode = function (sequence) {
          try {
            return decodeURIComponent(sequence);
          } catch (error) {
            return sequence;
          }
        };

        var deserialize = function (it) {
          var result = replace(it, plus, " ");
          var bytes = 4;
          try {
            return decodeURIComponent(result);
          } catch (error) {
            while (bytes) {
              result = replace(result, percentSequence(bytes--), percentDecode);
            }
            return result;
          }
        };

        var find = /[!'()~]|%20/g;

        var replacements = {
          "!": "%21",
          "'": "%27",
          "(": "%28",
          ")": "%29",
          "~": "%7E",
          "%20": "+",
        };

        var replacer = function (match) {
          return replacements[match];
        };

        var serialize = function (it) {
          return replace(encodeURIComponent(it), find, replacer);
        };

        var URLSearchParamsIterator = createIteratorConstructor(
          function Iterator(params, kind) {
            setInternalState(this, {
              type: URL_SEARCH_PARAMS_ITERATOR,
              iterator: getIterator(getInternalParamsState(params).entries),
              kind: kind,
            });
          },
          "Iterator",
          function next() {
            var state = getInternalIteratorState(this);
            var kind = state.kind;
            var step = state.iterator.next();
            var entry = step.value;
            if (!step.done) {
              step.value =
                kind === "keys"
                  ? entry.key
                  : kind === "values"
                    ? entry.value
                    : [entry.key, entry.value];
            }
            return step;
          },
          true
        );

        var URLSearchParamsState = function (init) {
          this.entries = [];
          this.url = null;

          if (init !== undefined) {
            if (isObject(init)) this.parseObject(init);
            else
              this.parseQuery(
                typeof init == "string"
                  ? charAt(init, 0) === "?"
                    ? stringSlice(init, 1)
                    : init
                  : $toString(init)
              );
          }
        };

        URLSearchParamsState.prototype = {
          type: URL_SEARCH_PARAMS,
          bindURL: function (url) {
            this.url = url;
            this.update();
          },
          parseObject: function (object) {
            var iteratorMethod = getIteratorMethod(object);
            var iterator, next, step, entryIterator, entryNext, first, second;

            if (iteratorMethod) {
              iterator = getIterator(object, iteratorMethod);
              next = iterator.next;
              while (!(step = call(next, iterator)).done) {
                entryIterator = getIterator(anObject(step.value));
                entryNext = entryIterator.next;
                if (
                  (first = call(entryNext, entryIterator)).done ||
                  (second = call(entryNext, entryIterator)).done ||
                  !call(entryNext, entryIterator).done
                )
                  throw TypeError("Expected sequence with length 2");
                push(this.entries, {
                  key: $toString(first.value),
                  value: $toString(second.value),
                });
              }
            } else
              for (var key in object)
                if (hasOwn(object, key)) {
                  push(this.entries, {
                    key: key,
                    value: $toString(object[key]),
                  });
                }
          },
          parseQuery: function (query) {
            if (query) {
              var attributes = split(query, "&");
              var index = 0;
              var attribute, entry;
              while (index < attributes.length) {
                attribute = attributes[index++];
                if (attribute.length) {
                  entry = split(attribute, "=");
                  push(this.entries, {
                    key: deserialize(shift(entry)),
                    value: deserialize(join(entry, "=")),
                  });
                }
              }
            }
          },
          serialize: function () {
            var entries = this.entries;
            var result = [];
            var index = 0;
            var entry;
            while (index < entries.length) {
              entry = entries[index++];
              push(result, serialize(entry.key) + "=" + serialize(entry.value));
            }
            return join(result, "&");
          },
          update: function () {
            this.entries.length = 0;
            this.parseQuery(this.url.query);
          },
          updateURL: function () {
            if (this.url) this.url.update();
          },
        };

        // `URLSearchParams` constructor
        // https://url.spec.whatwg.org/#interface-urlsearchparams
        var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
          anInstance(this, URLSearchParamsPrototype);
          var init = arguments.length > 0 ? arguments[0] : undefined;
          var state = setInternalState(this, new URLSearchParamsState(init));
          if (!DESCRIPTORS) this.size = state.entries.length;
        };

        var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

        defineBuiltIns(
          URLSearchParamsPrototype,
          {
            // `URLSearchParams.prototype.append` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-append
            append: function append(name, value) {
              var state = getInternalParamsState(this);
              validateArgumentsLength(arguments.length, 2);
              push(state.entries, {
                key: $toString(name),
                value: $toString(value),
              });
              if (!DESCRIPTORS) this.length++;
              state.updateURL();
            },
            // `URLSearchParams.prototype.delete` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
            delete: function (name /* , value */) {
              var state = getInternalParamsState(this);
              var length = validateArgumentsLength(arguments.length, 1);
              var entries = state.entries;
              var key = $toString(name);
              var $value = length < 2 ? undefined : arguments[1];
              var value = $value === undefined ? $value : $toString($value);
              var index = 0;
              while (index < entries.length) {
                var entry = entries[index];
                if (
                  entry.key === key &&
                  (value === undefined || entry.value === value)
                ) {
                  splice(entries, index, 1);
                  if (value !== undefined) break;
                } else index++;
              }
              if (!DESCRIPTORS) this.size = entries.length;
              state.updateURL();
            },
            // `URLSearchParams.prototype.get` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-get
            get: function get(name) {
              var entries = getInternalParamsState(this).entries;
              validateArgumentsLength(arguments.length, 1);
              var key = $toString(name);
              var index = 0;
              for (; index < entries.length; index++) {
                if (entries[index].key === key) return entries[index].value;
              }
              return null;
            },
            // `URLSearchParams.prototype.getAll` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
            getAll: function getAll(name) {
              var entries = getInternalParamsState(this).entries;
              validateArgumentsLength(arguments.length, 1);
              var key = $toString(name);
              var result = [];
              var index = 0;
              for (; index < entries.length; index++) {
                if (entries[index].key === key)
                  push(result, entries[index].value);
              }
              return result;
            },
            // `URLSearchParams.prototype.has` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-has
            has: function has(name /* , value */) {
              var entries = getInternalParamsState(this).entries;
              var length = validateArgumentsLength(arguments.length, 1);
              var key = $toString(name);
              var $value = length < 2 ? undefined : arguments[1];
              var value = $value === undefined ? $value : $toString($value);
              var index = 0;
              while (index < entries.length) {
                var entry = entries[index++];
                if (
                  entry.key === key &&
                  (value === undefined || entry.value === value)
                )
                  return true;
              }
              return false;
            },
            // `URLSearchParams.prototype.set` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-set
            set: function set(name, value) {
              var state = getInternalParamsState(this);
              validateArgumentsLength(arguments.length, 1);
              var entries = state.entries;
              var found = false;
              var key = $toString(name);
              var val = $toString(value);
              var index = 0;
              var entry;
              for (; index < entries.length; index++) {
                entry = entries[index];
                if (entry.key === key) {
                  if (found) splice(entries, index--, 1);
                  else {
                    found = true;
                    entry.value = val;
                  }
                }
              }
              if (!found) push(entries, { key: key, value: val });
              if (!DESCRIPTORS) this.size = entries.length;
              state.updateURL();
            },
            // `URLSearchParams.prototype.sort` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
            sort: function sort() {
              var state = getInternalParamsState(this);
              arraySort(state.entries, function (a, b) {
                return a.key > b.key ? 1 : -1;
              });
              state.updateURL();
            },
            // `URLSearchParams.prototype.forEach` method
            forEach: function forEach(callback /* , thisArg */) {
              var entries = getInternalParamsState(this).entries;
              var boundFunction = bind(
                callback,
                arguments.length > 1 ? arguments[1] : undefined
              );
              var index = 0;
              var entry;
              while (index < entries.length) {
                entry = entries[index++];
                boundFunction(entry.value, entry.key, this);
              }
            },
            // `URLSearchParams.prototype.keys` method
            keys: function keys() {
              return new URLSearchParamsIterator(this, "keys");
            },
            // `URLSearchParams.prototype.values` method
            values: function values() {
              return new URLSearchParamsIterator(this, "values");
            },
            // `URLSearchParams.prototype.entries` method
            entries: function entries() {
              return new URLSearchParamsIterator(this, "entries");
            },
          },
          { enumerable: true }
        );

        // `URLSearchParams.prototype[@@iterator]` method
        defineBuiltIn(
          URLSearchParamsPrototype,
          ITERATOR,
          URLSearchParamsPrototype.entries,
          { name: "entries" }
        );

        // `URLSearchParams.prototype.toString` method
        // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
        defineBuiltIn(
          URLSearchParamsPrototype,
          "toString",
          function toString() {
            return getInternalParamsState(this).serialize();
          },
          { enumerable: true }
        );

        // `URLSearchParams.prototype.size` getter
        // https://github.com/whatwg/url/pull/734
        if (DESCRIPTORS)
          defineBuiltInAccessor(URLSearchParamsPrototype, "size", {
            get: function size() {
              return getInternalParamsState(this).entries.length;
            },
            configurable: true,
            enumerable: true,
          });

        setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

        $(
          { global: true, constructor: true, forced: !USE_NATIVE_URL },
          {
            URLSearchParams: URLSearchParamsConstructor,
          }
        );

        // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
        if (!USE_NATIVE_URL && isCallable(Headers)) {
          var headersHas = uncurryThis(HeadersPrototype.has);
          var headersSet = uncurryThis(HeadersPrototype.set);

          var wrapRequestOptions = function (init) {
            if (isObject(init)) {
              var body = init.body;
              var headers;
              if (classof(body) === URL_SEARCH_PARAMS) {
                headers = init.headers
                  ? new Headers(init.headers)
                  : new Headers();
                if (!headersHas(headers, "content-type")) {
                  headersSet(
                    headers,
                    "content-type",
                    "application/x-www-form-urlencoded;charset=UTF-8"
                  );
                }
                return create(init, {
                  body: createPropertyDescriptor(0, $toString(body)),
                  headers: createPropertyDescriptor(0, headers),
                });
              }
            }
            return init;
          };

          if (isCallable(nativeFetch)) {
            $(
              {
                global: true,
                enumerable: true,
                dontCallGetSet: true,
                forced: true,
              },
              {
                fetch: function fetch(input /* , init */) {
                  return nativeFetch(
                    input,
                    arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {}
                  );
                },
              }
            );
          }

          if (isCallable(NativeRequest)) {
            var RequestConstructor = function Request(input /* , init */) {
              anInstance(this, RequestPrototype);
              return new NativeRequest(
                input,
                arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {}
              );
            };

            RequestPrototype.constructor = RequestConstructor;
            RequestConstructor.prototype = RequestPrototype;

            $(
              {
                global: true,
                constructor: true,
                dontCallGetSet: true,
                forced: true,
              },
              {
                Request: RequestConstructor,
              }
            );
          }
        }

        module.exports = {
          URLSearchParams: URLSearchParamsConstructor,
          getState: getInternalParamsState,
        };

        /***/
      },

    /***/ "./node_modules/core-js/modules/web.url-search-params.js":
      /*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/web.url-search-params.js ***!
  \***************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        // TODO: Remove this module from `core-js@4` since it's replaced to module below
        __webpack_require__(
          /*! ../modules/web.url-search-params.constructor */ "./node_modules/core-js/modules/web.url-search-params.constructor.js"
        );

        /***/
      },

    /***/ "./node_modules/detect-browser/es/index.js":
      /*!*************************************************!*\
  !*** ./node_modules/detect-browser/es/index.js ***!
  \*************************************************/
      /*! exports provided: BrowserInfo, NodeInfo, SearchBotDeviceInfo, BotInfo, ReactNativeInfo, detect, browserName, parseUserAgent, detectOS, getNodeVersion */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* WEBPACK VAR INJECTION */ (function (process) {
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "BrowserInfo",
          function () {
            return BrowserInfo;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "NodeInfo",
          function () {
            return NodeInfo;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "SearchBotDeviceInfo",
          function () {
            return SearchBotDeviceInfo;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "BotInfo",
          function () {
            return BotInfo;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "ReactNativeInfo",
          function () {
            return ReactNativeInfo;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "detect",
          function () {
            return detect;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "browserName",
          function () {
            return browserName;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "parseUserAgent",
          function () {
            return parseUserAgent;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "detectOS",
          function () {
            return detectOS;
          }
        );
          /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getNodeVersion",
          function () {
            return getNodeVersion;
          }
        );
          var __spreadArray =
            (undefined && undefined.__spreadArray) ||
            function (to, from, pack) {
              if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
              return to.concat(ar || Array.prototype.slice.call(from));
            };
          var BrowserInfo = /** @class */ (function () {
            function BrowserInfo(name, version, os) {
              this.name = name;
              this.version = version;
              this.os = os;
              this.type = "browser";
            }
            return BrowserInfo;
          })();

          var NodeInfo = /** @class */ (function () {
            function NodeInfo(version) {
              this.version = version;
              this.type = "node";
              this.name = "node";
              this.os = process.platform;
            }
            return NodeInfo;
          })();

          var SearchBotDeviceInfo = /** @class */ (function () {
            function SearchBotDeviceInfo(name, version, os, bot) {
              this.name = name;
              this.version = version;
              this.os = os;
              this.bot = bot;
              this.type = "bot-device";
            }
            return SearchBotDeviceInfo;
          })();

          var BotInfo = /** @class */ (function () {
            function BotInfo() {
              this.type = "bot";
              this.bot = true; // NOTE: deprecated test name instead
              this.name = "bot";
              this.version = null;
              this.os = null;
            }
            return BotInfo;
          })();

          var ReactNativeInfo = /** @class */ (function () {
            function ReactNativeInfo() {
              this.type = "react-native";
              this.name = "react-native";
              this.version = null;
              this.os = null;
            }
            return ReactNativeInfo;
          })();

          // tslint:disable-next-line:max-line-length
          var SEARCHBOX_UA_REGEX =
            /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
          var SEARCHBOT_OS_REGEX =
            /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
          var REQUIRED_VERSION_PARTS = 3;
          var userAgentRules = [
            ["aol", /AOLShield\/([0-9\._]+)/],
            ["edge", /Edge\/([0-9\._]+)/],
            ["edge-ios", /EdgiOS\/([0-9\._]+)/],
            ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
            ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
            ["samsung", /SamsungBrowser\/([0-9\.]+)/],
            ["silk", /\bSilk\/([0-9._-]+)\b/],
            ["miui", /MiuiBrowser\/([0-9\.]+)$/],
            ["beaker", /BeakerBrowser\/([0-9\.]+)/],
            ["edge-chromium", /EdgA?\/([0-9\.]+)/],
            [
              "chromium-webview",
              /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
            ],
            ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
            ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
            ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
            ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
            ["fxios", /FxiOS\/([0-9\.]+)/],
            ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
            ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
            ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
            ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
            [
              "pie",
              /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/,
            ],
            ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
            ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
            ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
            ["ie", /MSIE\s(7\.0)/],
            ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
            ["android", /Android\s([0-9\.]+)/],
            ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
            ["safari", /Version\/([0-9\._]+).*Safari/],
            ["facebook", /FB[AS]V\/([0-9\.]+)/],
            ["instagram", /Instagram\s([0-9\.]+)/],
            ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
            ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
            ["curl", /^curl\/([0-9\.]+)$/],
            ["searchbot", SEARCHBOX_UA_REGEX],
          ];
          var operatingSystemRules = [
            ["iOS", /iP(hone|od|ad)/],
            ["Android OS", /Android/],
            ["BlackBerry OS", /BlackBerry|BB10/],
            ["Windows Mobile", /IEMobile/],
            ["Amazon OS", /Kindle/],
            ["Windows 3.11", /Win16/],
            ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
            ["Windows 98", /(Windows 98)|(Win98)/],
            ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
            ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
            ["Windows Server 2003", /(Windows NT 5.2)/],
            ["Windows Vista", /(Windows NT 6.0)/],
            ["Windows 7", /(Windows NT 6.1)/],
            ["Windows 8", /(Windows NT 6.2)/],
            ["Windows 8.1", /(Windows NT 6.3)/],
            ["Windows 10", /(Windows NT 10.0)/],
            ["Windows ME", /Windows ME/],
            [
              "Windows CE",
              /Windows CE|WinCE|Microsoft Pocket Internet Explorer/,
            ],
            ["Open BSD", /OpenBSD/],
            ["Sun OS", /SunOS/],
            ["Chrome OS", /CrOS/],
            ["Linux", /(Linux)|(X11)/],
            ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
            ["QNX", /QNX/],
            ["BeOS", /BeOS/],
            ["OS/2", /OS\/2/],
          ];
          function detect(userAgent) {
            if (!!userAgent) {
              return parseUserAgent(userAgent);
            }
            if (
              typeof document === "undefined" &&
              typeof navigator !== "undefined" &&
              navigator.product === "ReactNative"
            ) {
              return new ReactNativeInfo();
            }
            if (typeof navigator !== "undefined") {
              return parseUserAgent(navigator.userAgent);
            }
            return getNodeVersion();
          }
          function matchUserAgent(ua) {
            // opted for using reduce here rather than Array#first with a regex.test call
            // this is primarily because using the reduce we only perform the regex
            // execution once rather than once for the test and for the exec again below
            // probably something that needs to be benchmarked though
            return (
              ua !== "" &&
              userAgentRules.reduce(function (matched, _a) {
                var browser = _a[0],
                  regex = _a[1];
                if (matched) {
                  return matched;
                }
                var uaMatch = regex.exec(ua);
                return !!uaMatch && [browser, uaMatch];
              }, false)
            );
          }
          function browserName(ua) {
            var data = matchUserAgent(ua);
            return data ? data[0] : null;
          }
          function parseUserAgent(ua) {
            var matchedRule = matchUserAgent(ua);
            if (!matchedRule) {
              return null;
            }
            var name = matchedRule[0],
              match = matchedRule[1];
            if (name === "searchbot") {
              return new BotInfo();
            }
            // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
            var versionParts =
              match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
            if (versionParts) {
              if (versionParts.length < REQUIRED_VERSION_PARTS) {
                versionParts = __spreadArray(
                  __spreadArray([], versionParts, true),
                  createVersionParts(
                    REQUIRED_VERSION_PARTS - versionParts.length
                  ),
                  true
                );
              }
            } else {
              versionParts = [];
            }
            var version = versionParts.join(".");
            var os = detectOS(ua);
            var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
            if (searchBotMatch && searchBotMatch[1]) {
              return new SearchBotDeviceInfo(
                name,
                version,
                os,
                searchBotMatch[1]
              );
            }
            return new BrowserInfo(name, version, os);
          }
          function detectOS(ua) {
            for (
              var ii = 0, count = operatingSystemRules.length;
              ii < count;
              ii++
            ) {
              var _a = operatingSystemRules[ii],
                os = _a[0],
                regex = _a[1];
              var match = regex.exec(ua);
              if (match) {
                return os;
              }
            }
            return null;
          }
          function getNodeVersion() {
            var isNode = typeof process !== "undefined" && process.version;
            return isNode ? new NodeInfo(process.version.slice(1)) : null;
          }
          function createVersionParts(count) {
            var output = [];
            for (var ii = 0; ii < count; ii++) {
              output.push("0");
            }
            return output;
          }

          /* WEBPACK VAR INJECTION */
        }).call(
          this,
          __webpack_require__(
            /*! ./../../process/browser.js */ "./node_modules/process/browser.js"
          )
        );

        /***/
      },

    /***/ "./node_modules/element-closest/index.mjs":
      /*!************************************************!*\
  !*** ./node_modules/element-closest/index.mjs ***!
  \************************************************/
      /*! exports provided: default */
      /***/ function (
        __webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        function polyfill(window) {
          var ElementPrototype = window.Element.prototype;

          if (typeof ElementPrototype.matches !== "function") {
            ElementPrototype.matches =
              ElementPrototype.msMatchesSelector ||
              ElementPrototype.mozMatchesSelector ||
              ElementPrototype.webkitMatchesSelector ||
              function matches(selector) {
                var element = this;
                var elements = (
                  element.document || element.ownerDocument
                ).querySelectorAll(selector);
                var index = 0;

                while (elements[index] && elements[index] !== element) {
                  ++index;
                }

                return Boolean(elements[index]);
              };
          }

          if (typeof ElementPrototype.closest !== "function") {
            ElementPrototype.closest = function closest(selector) {
              var element = this;

              while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                  return element;
                }

                element = element.parentNode;
              }

              return null;
            };
          }
        }

        /* harmony default export */ __webpack_exports__["default"] = polyfill;
        //# sourceMappingURL=index.mjs.map

        /***/
      },

    /***/ "./node_modules/evx/dist/evx.es.js":
      /*!*****************************************!*\
  !*** ./node_modules/evx/dist/evx.es.js ***!
  \*****************************************/
      /*! exports provided: on, emit, hydrate, getState, create */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "on",
          function () {
            return c;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "emit",
          function () {
            return r;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "hydrate",
          function () {
            return o;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getState",
          function () {
            return u;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "create",
          function () {
            return a;
          }
        );
        var n = function (n) {
          if ("object" != typeof (t = n) || Array.isArray(t))
            throw "state should be an object";
          var t;
        },
          t = function (n, t, e, c) {
            return ((r = n),
              r.reduce(function (n, t, e) {
                return n.indexOf(t) > -1 ? n : n.concat(t);
              }, []))
              .reduce(function (n, e) {
                return n.concat(t[e] || []);
              }, [])
              .map(function (n) {
                return n(e, c);
              });
            var r;
          },
          e = a(),
          c = e.on,
          r = e.emit,
          o = e.hydrate,
          u = e.getState;
        function a(e) {
          void 0 === e && (e = {});
          var c = {};
          return {
            getState: function () {
              return Object.assign({}, e);
            },
            hydrate: function (r) {
              return (
                n(r),
                Object.assign(e, r),
                function () {
                  var n = ["*"].concat(Object.keys(r));
                  t(n, c, e);
                }
              );
            },
            on: function (n, t) {
              return (
                (n = [].concat(n)).map(function (n) {
                  return (c[n] = (c[n] || []).concat(t));
                }),
                function () {
                  return n.map(function (n) {
                    return c[n].splice(c[n].indexOf(t), 1);
                  });
                }
              );
            },
            emit: function (r, o, u) {
              var a = ("*" === r ? [] : ["*"]).concat(r);
              (o = "function" == typeof o ? o(e) : o) &&
                (n(o), Object.assign(e, o), (a = a.concat(Object.keys(o)))),
                t(a, c, e, u);
            },
          };
        }
        //# sourceMappingURL=evx.es.js.map

        /***/
      },

    /***/ "./node_modules/keen-slider/keen-slider.es.js":
      /*!****************************************************!*\
  !*** ./node_modules/keen-slider/keen-slider.es.js ***!
  \****************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return y;
          }
        );
        var n = function () {
          return (
            (n =
              Object.assign ||
              function (n) {
                for (var t, i = 1, e = arguments.length; i < e; i++)
                  for (var r in (t = arguments[i]))
                    Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
                return n;
              }),
            n.apply(this, arguments)
          );
        };
        function t(n, t, i) {
          if (i || 2 === arguments.length)
            for (var e, r = 0, a = t.length; r < a; r++)
              (!e && r in t) ||
                (e || (e = Array.prototype.slice.call(t, 0, r)), (e[r] = t[r]));
          return n.concat(e || Array.prototype.slice.call(t));
        }
        function i(n) {
          return Array.prototype.slice.call(n);
        }
        function e(n, t) {
          var i = Math.floor(n);
          return i === t || i + 1 === t ? n : t;
        }
        function r() {
          return Date.now();
        }
        function a(n, t, i) {
          if (((t = "data-keen-slider-" + t), null === i))
            return n.removeAttribute(t);
          n.setAttribute(t, i || "");
        }
        function o(n, t) {
          return (
            (t = t || document),
            "function" == typeof n && (n = n(t)),
            Array.isArray(n)
              ? n
              : "string" == typeof n
                ? i(t.querySelectorAll(n))
                : n instanceof HTMLElement
                  ? [n]
                  : n instanceof NodeList
                    ? i(n)
                    : []
          );
        }
        function u(n) {
          n.raw && (n = n.raw),
            n.cancelable && !n.defaultPrevented && n.preventDefault();
        }
        function s(n) {
          n.raw && (n = n.raw), n.stopPropagation && n.stopPropagation();
        }
        function c() {
          var n = [];
          return {
            add: function (t, i, e, r) {
              t.addListener ? t.addListener(e) : t.addEventListener(i, e, r),
                n.push([t, i, e, r]);
            },
            input: function (n, t, i, e) {
              this.add(
                n,
                t,
                (function (n) {
                  return function (t) {
                    t.nativeEvent && (t = t.nativeEvent);
                    var i = t.changedTouches || [],
                      e = t.targetTouches || [],
                      r = t.detail && t.detail.x ? t.detail : null;
                    return n({
                      id: r
                        ? r.identifier
                          ? r.identifier
                          : "i"
                        : e[0]
                          ? e[0]
                            ? e[0].identifier
                            : "e"
                          : "d",
                      idChanged: r
                        ? r.identifier
                          ? r.identifier
                          : "i"
                        : i[0]
                          ? i[0]
                            ? i[0].identifier
                            : "e"
                          : "d",
                      raw: t,
                      x:
                        r && r.x
                          ? r.x
                          : e[0]
                            ? e[0].screenX
                            : r
                              ? r.x
                              : t.pageX,
                      y:
                        r && r.y
                          ? r.y
                          : e[0]
                            ? e[0].screenY
                            : r
                              ? r.y
                              : t.pageY,
                    });
                  };
                })(i),
                e
              );
            },
            purge: function () {
              n.forEach(function (n) {
                n[0].removeListener
                  ? n[0].removeListener(n[2])
                  : n[0].removeEventListener(n[1], n[2], n[3]);
              }),
                (n = []);
            },
          };
        }
        function d(n, t, i) {
          return Math.min(Math.max(n, t), i);
        }
        function l(n) {
          return (n > 0 ? 1 : 0) - (n < 0 ? 1 : 0) || +n;
        }
        function f(n) {
          var t = n.getBoundingClientRect();
          return {
            height: e(t.height, n.offsetHeight),
            width: e(t.width, n.offsetWidth),
          };
        }
        function p(n, t, i, e) {
          var r = n && n[t];
          return null == r ? i : e && "function" == typeof r ? r() : r;
        }
        function v(n) {
          return Math.round(1e6 * n) / 1e6;
        }
        function h(n) {
          var t, i, e, r, a, o;
          function u(t) {
            o || (o = t), s(!0);
            var a = t - o;
            a > e && (a = e);
            var l = r[i];
            if (l[3] < a) return i++, u(t);
            var f = l[2],
              p = l[4],
              v = l[0],
              h = l[1] * (0, l[5])(0 === p ? 1 : (a - f) / p);
            if ((h && n.track.to(v + h), a < e)) return d();
            (o = null), s(!1), c(null), n.emit("animationEnded");
          }
          function s(n) {
            t.active = n;
          }
          function c(n) {
            t.targetIdx = n;
          }
          function d() {
            var n;
            (n = u), (a = window.requestAnimationFrame(n));
          }
          function l() {
            var t;
            (t = a),
              window.cancelAnimationFrame(t),
              s(!1),
              c(null),
              o && n.emit("animationStopped"),
              (o = null);
          }
          return (t = {
            active: !1,
            start: function (t) {
              if ((l(), n.track.details)) {
                var a = 0,
                  o = n.track.details.position;
                (i = 0),
                  (e = 0),
                  (r = t.map(function (n) {
                    var t,
                      i = Number(o),
                      r =
                        null !== (t = n.earlyExit) && void 0 !== t
                          ? t
                          : n.duration,
                      u = n.easing,
                      s = n.distance * u(r / n.duration) || 0;
                    o += s;
                    var c = e;
                    return (
                      (e += r), (a += s), [i, n.distance, c, e, n.duration, u]
                    );
                  })),
                  c(n.track.distToIdx(a)),
                  d(),
                  n.emit("animationStarted");
              }
            },
            stop: l,
            targetIdx: null,
          });
        }
        function m(n) {
          var i,
            e,
            a,
            o,
            u,
            s,
            c,
            f,
            h,
            m,
            g,
            b,
            x,
            k,
            y = 1 / 0,
            w = [],
            M = null,
            T = 0;
          function C(n) {
            _(T + n);
          }
          function E(n) {
            var t = z(T + n).abs;
            return D(t) ? t : null;
          }
          function z(n) {
            var i = Math.floor(Math.abs(v(n / e))),
              r = v(((n % e) + e) % e);
            r === e && (r = 0);
            var a = l(n),
              o = c.indexOf(
                t([], c, !0).reduce(function (n, t) {
                  return Math.abs(t - r) < Math.abs(n - r) ? t : n;
                })
              ),
              u = o;
            return (
              a < 0 && i++,
              o === s && ((u = 0), (i += a > 0 ? 1 : -1)),
              { abs: u + i * s * a, origin: o, rel: u }
            );
          }
          function I(n, t, i) {
            var e;
            if (t || !S()) return A(n, i);
            if (!D(n)) return null;
            var r = z(null != i ? i : T),
              a = r.abs,
              o = n - r.rel,
              u = a + o;
            e = A(u);
            var c = A(u - s * l(o));
            return (
              ((null !== c && Math.abs(c) < Math.abs(e)) || null === e) &&
              (e = c),
              v(e)
            );
          }
          function A(n, t) {
            if ((null == t && (t = v(T)), !D(n) || null === n)) return null;
            n = Math.round(n);
            var i = z(t),
              r = i.abs,
              a = i.rel,
              o = i.origin,
              u = O(n),
              d = ((t % e) + e) % e,
              l = c[o],
              f = Math.floor((n - (r - a)) / s) * e;
            return v(l - d - l + c[u] + f + (o === s ? e : 0));
          }
          function D(n) {
            return L(n) === n;
          }
          function L(n) {
            return d(n, h, m);
          }
          function S() {
            return o.loop;
          }
          function O(n) {
            return ((n % s) + s) % s;
          }
          function _(t) {
            var i;
            (i = t - T),
              w.push({ distance: i, timestamp: r() }),
              w.length > 6 && (w = w.slice(-6)),
              (T = v(t));
            var e = H().abs;
            if (e !== M) {
              var a = null !== M;
              (M = e), a && n.emit("slideChanged");
            }
          }
          function H(t) {
            var r = t
              ? null
              : (function () {
                if (s) {
                  var n = S(),
                    t = n ? ((T % e) + e) % e : T,
                    i = (n ? T % e : T) - u[0][2],
                    r = 0 - (i < 0 && n ? e - Math.abs(i) : i),
                    c = 0,
                    d = z(T),
                    f = d.abs,
                    p = d.rel,
                    v = u[p][2],
                    y = u.map(function (t, i) {
                      var a = r + c;
                      (a < 0 - t[0] || a > 1) &&
                        (a += (Math.abs(a) > e - 1 && n ? e : 0) * l(-a));
                      var u = i - p,
                        d = l(u),
                        h = u + f;
                      n &&
                        (-1 === d && a > v && (h += s),
                          1 === d && a < v && (h -= s),
                          null !== g && h < g && (a += e),
                          null !== b && h > b && (a -= e));
                      var m = a + t[0] + t[1],
                        x = Math.max(
                          a >= 0 && m <= 1
                            ? 1
                            : m < 0 || a > 1
                              ? 0
                              : a < 0
                                ? Math.min(1, (t[0] + a) / t[0])
                                : (1 - a) / t[0],
                          0
                        );
                      return (
                        (c += t[0] + t[1]),
                        {
                          abs: h,
                          distance: o.rtl ? -1 * a + 1 - t[0] : a,
                          portion: x,
                          size: t[0],
                        }
                      );
                    });
                  return (
                    (f = L(f)),
                    (p = O(f)),
                    {
                      abs: L(f),
                      length: a,
                      max: k,
                      maxIdx: m,
                      min: x,
                      minIdx: h,
                      position: T,
                      progress: n ? t / e : T / a,
                      rel: p,
                      slides: y,
                      slidesLength: e,
                    }
                  );
                }
              })();
            return (i.details = r), n.emit("detailsChanged"), r;
          }
          return (i = {
            absToRel: O,
            add: C,
            details: null,
            distToIdx: E,
            idxToDist: I,
            init: function (t) {
              if (
                ((function () {
                  if (
                    ((o = n.options),
                      (u = (o.trackConfig || []).map(function (n) {
                        return [
                          p(n, "size", 1),
                          p(n, "spacing", 0),
                          p(n, "origin", 0),
                        ];
                      })),
                      (s = u.length))
                  ) {
                    e = v(
                      u.reduce(function (n, t) {
                        return n + t[0] + t[1];
                      }, 0)
                    );
                    var t,
                      i = s - 1;
                    (a = v(e + u[0][2] - u[i][0] - u[i][2] - u[i][1])),
                      (c = u.reduce(function (n, i) {
                        if (!n) return [0];
                        var e = u[n.length - 1],
                          r = n[n.length - 1] + (e[0] + e[2]) + e[1];
                        return (
                          (r -= i[2]),
                          n[n.length - 1] > r && (r = n[n.length - 1]),
                          (r = v(r)),
                          n.push(r),
                          (!t || t < r) && (f = n.length - 1),
                          (t = r),
                          n
                        );
                      }, null)),
                      0 === a && (f = 0),
                      c.push(v(e));
                  }
                })(),
                  !s)
              )
                return H(!0);
              var i;
              !(function () {
                var t = n.options.range,
                  i = n.options.loop;
                (g = h = i ? p(i, "min", -1 / 0) : 0),
                  (b = m = i ? p(i, "max", y) : f);
                var e = p(t, "min", null),
                  r = p(t, "max", null);
                null !== e && (h = e),
                  null !== r && (m = r),
                  (x = h === -1 / 0 ? h : n.track.idxToDist(h || 0, !0, 0)),
                  (k = m === y ? m : I(m, !0, 0)),
                  null === r && (b = m),
                  p(t, "align", !1) &&
                  m !== y &&
                  0 === u[O(m)][2] &&
                  ((k -= 1 - u[O(m)][0]), (m = E(k - T))),
                  (x = v(x)),
                  (k = v(k));
              })(),
                (i = t),
                Number(i) === i ? C(A(L(t))) : H();
            },
            to: _,
            velocity: function () {
              var n = r(),
                t = w.reduce(
                  function (t, i) {
                    var e = i.distance,
                      r = i.timestamp;
                    return (
                      n - r > 200 ||
                      (l(e) !== l(t.distance) &&
                        t.distance &&
                        (t = { distance: 0, lastTimestamp: 0, time: 0 }),
                        t.time && (t.distance += e),
                        t.lastTimestamp && (t.time += r - t.lastTimestamp),
                        (t.lastTimestamp = r)),
                      t
                    );
                  },
                  { distance: 0, lastTimestamp: 0, time: 0 }
                );
              return t.distance / t.time || 0;
            },
          });
        }
        function g(n) {
          var t, i, e, r, a, o, u, s;
          function c(n) {
            return 2 * n;
          }
          function f(n) {
            return d(n, u, s);
          }
          function p(n) {
            return 1 - Math.pow(1 - n, 3);
          }
          function v() {
            return e ? n.track.velocity() : 0;
          }
          function h() {
            b();
            var t = "free-snap" === n.options.mode,
              i = n.track,
              e = v();
            r = l(e);
            var u = n.track.details,
              s = [];
            if (e || !t) {
              var d = m(e),
                h = d.dist,
                g = d.dur;
              if (((g = c(g)), (h *= r), t)) {
                var x = i.idxToDist(i.distToIdx(h), !0);
                x && (h = x);
              }
              s.push({ distance: h, duration: g, easing: p });
              var k = u.position,
                y = k + h;
              if (y < a || y > o) {
                var w = y < a ? a - k : o - k,
                  M = 0,
                  T = e;
                if (l(w) === r) {
                  var C = Math.min(Math.abs(w) / Math.abs(h), 1),
                    E =
                      (function (n) {
                        return 1 - Math.pow(1 - n, 1 / 3);
                      })(C) * g;
                  (s[0].earlyExit = E), (T = e * (1 - C));
                } else (s[0].earlyExit = 0), (M += w);
                var z = m(T, 100),
                  I = z.dist * r;
                n.options.rubberband &&
                  (s.push({ distance: I, duration: c(z.dur), easing: p }),
                    s.push({ distance: -I + M, duration: 500, easing: p }));
              }
              n.animator.start(s);
            } else
              n.moveToIdx(f(u.abs), !0, {
                duration: 500,
                easing: function (n) {
                  return 1 + --n * n * n * n * n;
                },
              });
          }
          function m(n, t) {
            void 0 === t && (t = 1e3);
            var i = 147e-9 + (n = Math.abs(n)) / t;
            return { dist: Math.pow(n, 2) / i, dur: n / i };
          }
          function g() {
            var t = n.track.details;
            t && ((a = t.min), (o = t.max), (u = t.minIdx), (s = t.maxIdx));
          }
          function b() {
            n.animator.stop();
          }
          n.on("updated", g),
            n.on("optionsChanged", g),
            n.on("created", g),
            n.on("dragStarted", function () {
              (e = !1), b(), (t = i = n.track.details.abs);
            }),
            n.on("dragChecked", function () {
              e = !0;
            }),
            n.on("dragEnded", function () {
              var e = n.options.mode;
              "snap" === e &&
                (function () {
                  var e = n.track,
                    r = n.track.details,
                    u = r.position,
                    s = l(v());
                  (u > o || u < a) && (s = 0);
                  var c = t + s;
                  0 === r.slides[e.absToRel(c)].portion && (c -= s),
                    t !== i && (c = i),
                    l(e.idxToDist(c, !0)) !== s && (c += s),
                    (c = f(c));
                  var d = e.idxToDist(c, !0);
                  n.animator.start([
                    {
                      distance: d,
                      duration: 500,
                      easing: function (n) {
                        return 1 + --n * n * n * n * n;
                      },
                    },
                  ]);
                })(),
                ("free" !== e && "free-snap" !== e) || h();
            }),
            n.on("dragged", function () {
              i = n.track.details.abs;
            });
        }
        function b(n) {
          var t,
            i,
            e,
            r,
            a,
            f,
            p,
            v,
            h,
            m,
            g,
            b,
            x,
            k,
            y,
            w,
            M,
            T,
            C = c();
          function E(t) {
            if (f && v === t.id) {
              var o = D(t);
              if (h) {
                if (!A(t)) return I(t);
                (m = o), (h = !1), n.emit("dragChecked");
              }
              if (w) return (m = o);
              u(t);
              var c = (function (t) {
                if (M === -1 / 0 && T === 1 / 0) return t;
                var e = n.track.details,
                  o = e.length,
                  u = e.position,
                  s = d(t, M - u, T - u);
                if (0 === o) return 0;
                if (!n.options.rubberband) return s;
                if (u <= T && u >= M) return t;
                if ((u < M && i > 0) || (u > T && i < 0)) return t;
                var c = (u < M ? u - M : u - T) / o,
                  l = r * o,
                  f = Math.abs(c * l),
                  p = Math.max(0, 1 - (f / a) * 2);
                return p * p * t;
              })((p(m - o) / r) * e);
              i = l(c);
              var x = n.track.details.position;
              ((x > M && x < T) || (x === M && i > 0) || (x === T && i < 0)) &&
                s(t),
                (g += c),
                !b && Math.abs(g * r) > 5 && (b = !0),
                n.track.add(c),
                (m = o),
                n.emit("dragged");
            }
          }
          function z(t) {
            !f &&
              n.track.details &&
              n.track.details.length &&
              ((g = 0),
                (f = !0),
                (b = !1),
                (h = !0),
                (v = t.id),
                A(t),
                (m = D(t)),
                n.emit("dragStarted"));
          }
          function I(t) {
            f && v === t.idChanged && ((f = !1), n.emit("dragEnded"));
          }
          function A(n) {
            var t = L(),
              i = t ? n.y : n.x,
              e = t ? n.x : n.y,
              r =
                void 0 !== x &&
                void 0 !== k &&
                Math.abs(k - e) <= Math.abs(x - i);
            return (x = i), (k = e), r;
          }
          function D(n) {
            return L() ? n.y : n.x;
          }
          function L() {
            return n.options.vertical;
          }
          function S() {
            (r = n.size), (a = L() ? window.innerHeight : window.innerWidth);
            var t = n.track.details;
            t && ((M = t.min), (T = t.max));
          }
          function O(n) {
            b && (s(n), u(n));
          }
          function _() {
            if ((C.purge(), n.options.drag && !n.options.disabled)) {
              var i;
              (i = n.options.dragSpeed || 1),
                (p =
                  "function" == typeof i
                    ? i
                    : function (n) {
                      return n * i;
                    }),
                (e = n.options.rtl ? -1 : 1),
                S(),
                (t = n.container),
                (function () {
                  var n = "data-keen-slider-clickable";
                  o("[".concat(n, "]:not([").concat(n, "=false])"), t).map(
                    function (n) {
                      C.add(n, "dragstart", s),
                        C.add(n, "mousedown", s),
                        C.add(n, "touchstart", s);
                    }
                  );
                })(),
                C.add(t, "dragstart", function (n) {
                  u(n);
                }),
                C.add(t, "click", O, { capture: !0 }),
                C.input(t, "ksDragStart", z),
                C.input(t, "ksDrag", E),
                C.input(t, "ksDragEnd", I),
                C.input(t, "mousedown", z),
                C.input(t, "mousemove", E),
                C.input(t, "mouseleave", I),
                C.input(t, "mouseup", I),
                C.input(t, "touchstart", z, { passive: !0 }),
                C.input(t, "touchmove", E, { passive: !1 }),
                C.input(t, "touchend", I),
                C.input(t, "touchcancel", I),
                C.add(window, "wheel", function (n) {
                  f && u(n);
                });
              var r = "data-keen-slider-scrollable";
              o(
                "[".concat(r, "]:not([").concat(r, "=false])"),
                n.container
              ).map(function (n) {
                return (function (n) {
                  var t;
                  C.input(
                    n,
                    "touchstart",
                    function (n) {
                      (t = D(n)), (w = !0), (y = !0);
                    },
                    { passive: !0 }
                  ),
                    C.input(n, "touchmove", function (i) {
                      var e = L(),
                        r = e
                          ? n.scrollHeight - n.clientHeight
                          : n.scrollWidth - n.clientWidth,
                        a = t - D(i),
                        o = e ? n.scrollTop : n.scrollLeft,
                        s =
                          (e && "scroll" === n.style.overflowY) ||
                          (!e && "scroll" === n.style.overflowX);
                      if (
                        ((t = D(i)),
                          ((a < 0 && o > 0) || (a > 0 && o < r)) && y && s)
                      )
                        return (w = !0);
                      (y = !1), u(i), (w = !1);
                    }),
                    C.input(n, "touchend", function () {
                      w = !1;
                    });
                })(n);
              });
            }
          }
          n.on("updated", S),
            n.on("optionsChanged", _),
            n.on("created", _),
            n.on("destroyed", C.purge);
        }
        function x(n) {
          var t,
            i,
            e = null;
          function r(t, i, e) {
            n.animator.active
              ? o(t, i, e)
              : requestAnimationFrame(function () {
                return o(t, i, e);
              });
          }
          function a() {
            r(!1, !1, i);
          }
          function o(i, r, a) {
            var o = 0,
              u = n.size,
              d = n.track.details;
            if (d && t) {
              var l = d.slides;
              t.forEach(function (n, t) {
                if (i) !e && r && s(n, null, a), c(n, null, a);
                else {
                  if (!l[t]) return;
                  var d = l[t].size * u;
                  !e && r && s(n, d, a),
                    c(n, l[t].distance * u - o, a),
                    (o += d);
                }
              });
            }
          }
          function u(t) {
            return "performance" === n.options.renderMode ? Math.round(t) : t;
          }
          function s(n, t, i) {
            var e = i ? "height" : "width";
            null !== t && (t = u(t) + "px"),
              (n.style["min-" + e] = t),
              (n.style["max-" + e] = t);
          }
          function c(n, t, i) {
            if (null !== t) {
              t = u(t);
              var e = i ? t : 0;
              t = "translate3d(".concat(i ? 0 : t, "px, ").concat(e, "px, 0)");
            }
            (n.style.transform = t), (n.style["-webkit-transform"] = t);
          }
          function d() {
            t && (o(!0, !0, i), (t = null)), n.on("detailsChanged", a, !0);
          }
          function l() {
            r(!1, !0, i);
          }
          function f() {
            d(),
              (i = n.options.vertical),
              n.options.disabled ||
              "custom" === n.options.renderMode ||
              ((e = "auto" === p(n.options.slides, "perView", null)),
                n.on("detailsChanged", a),
                (t = n.slides).length && l());
          }
          n.on("created", f),
            n.on("optionsChanged", f),
            n.on("beforeOptionsChanged", function () {
              d();
            }),
            n.on("updated", l),
            n.on("destroyed", d);
        }
        function k(t, i) {
          return function (e) {
            var r,
              u,
              s,
              d,
              l,
              v,
              h = c();
            function m(n) {
              var t;
              a(
                e.container,
                "reverse",
                "rtl" !==
                  ((t = e.container),
                    window
                      .getComputedStyle(t, null)
                      .getPropertyValue("direction")) || n
                  ? null
                  : ""
              ),
                a(e.container, "v", e.options.vertical && !n ? "" : null),
                a(
                  e.container,
                  "disabled",
                  e.options.disabled && !n ? "" : null
                );
            }
            function g() {
              b() && M();
            }
            function b() {
              var t = null;
              if (
                (d.forEach(function (n) {
                  n.matches && (t = n.__media);
                }),
                  t === r)
              )
                return !1;
              r || e.emit("beforeOptionsChanged"), (r = t);
              var i = t ? s.breakpoints[t] : s;
              return (e.options = n(n({}, s), i)), m(), I(), A(), C(), !0;
            }
            function x(n) {
              var t = f(n);
              return (e.options.vertical ? t.height : t.width) / e.size || 1;
            }
            function k() {
              return e.options.trackConfig.length;
            }
            function y(t) {
              for (var a in ((r = !1),
                (s = n(n({}, i), t)),
                h.purge(),
                (u = e.size),
                (d = []),
                s.breakpoints || [])) {
                var o = window.matchMedia(a);
                (o.__media = a), d.push(o), h.add(o, "change", g);
              }
              h.add(window, "orientationchange", z),
                h.add(window, "resize", E),
                b();
            }
            function w(n) {
              e.animator.stop();
              var t = e.track.details;
              e.track.init(null != n ? n : t ? t.abs : 0);
            }
            function M(n) {
              w(n), e.emit("optionsChanged");
            }
            function T(n, t) {
              if (n) return y(n), void M(t);
              I(), A();
              var i = k();
              C(), k() !== i ? M(t) : w(t), e.emit("updated");
            }
            function C() {
              var n = e.options.slides;
              if ("function" == typeof n)
                return (e.options.trackConfig = n(e.size, e.slides));
              for (
                var t = e.slides,
                i = t.length,
                r = "number" == typeof n ? n : p(n, "number", i, !0),
                a = [],
                o = p(n, "perView", 1, !0),
                u = p(n, "spacing", 0, !0) / e.size || 0,
                s = "auto" === o ? u : u / o,
                c = p(n, "origin", "auto"),
                d = 0,
                l = 0;
                l < r;
                l++
              ) {
                var f = "auto" === o ? x(t[l]) : 1 / o - u + s,
                  v = "center" === c ? 0.5 - f / 2 : "auto" === c ? 0 : c;
                a.push({ origin: v, size: f, spacing: u }), (d += f);
              }
              if (
                ((d += u * (r - 1)), "auto" === c && !e.options.loop && 1 !== o)
              ) {
                var h = 0;
                a.map(function (n) {
                  var t = d - h;
                  return (
                    (h += n.size + u),
                    t >= 1 || (n.origin = 1 - t - (d > 1 ? 0 : 1 - d)),
                    n
                  );
                });
              }
              e.options.trackConfig = a;
            }
            function E() {
              I();
              var n = e.size;
              e.options.disabled || n === u || ((u = n), T());
            }
            function z() {
              E(), setTimeout(E, 500), setTimeout(E, 2e3);
            }
            function I() {
              var n = f(e.container);
              e.size = (e.options.vertical ? n.height : n.width) || 1;
            }
            function A() {
              e.slides = o(e.options.selector, e.container);
            }
            (e.container = (v = o(t, l || document)).length ? v[0] : null),
              (e.destroy = function () {
                h.purge(), e.emit("destroyed"), m(!0);
              }),
              (e.prev = function () {
                e.moveToIdx(e.track.details.abs - 1, !0);
              }),
              (e.next = function () {
                e.moveToIdx(e.track.details.abs + 1, !0);
              }),
              (e.update = T),
              y(e.options);
          };
        }
        var y = function (n, i, e) {
          try {
            return (function (n, t) {
              var i,
                e = {};
              return (
                (i = {
                  emit: function (n) {
                    e[n] &&
                      e[n].forEach(function (n) {
                        n(i);
                      });
                    var t = i.options && i.options[n];
                    t && t(i);
                  },
                  moveToIdx: function (n, t, e) {
                    var r = i.track.idxToDist(n, t);
                    if (r) {
                      var a = i.options.defaultAnimation;
                      i.animator.start([
                        {
                          distance: r,
                          duration: p(e || a, "duration", 500),
                          easing: p(e || a, "easing", function (n) {
                            return 1 + --n * n * n * n * n;
                          }),
                        },
                      ]);
                    }
                  },
                  on: function (n, t, i) {
                    void 0 === i && (i = !1), e[n] || (e[n] = []);
                    var r = e[n].indexOf(t);
                    r > -1 ? i && delete e[n][r] : i || e[n].push(t);
                  },
                  options: n,
                }),
                (function () {
                  if (((i.track = m(i)), (i.animator = h(i)), t))
                    for (var n = 0, e = t; n < e.length; n++) (0, e[n])(i);
                  i.track.init(i.options.initial || 0), i.emit("created");
                })(),
                i
              );
            })(
              i,
              t(
                [
                  k(n, {
                    drag: !0,
                    mode: "snap",
                    renderMode: "precision",
                    rubberband: !0,
                    selector: ".keen-slider__slide",
                  }),
                  x,
                  b,
                  g,
                ],
                e || [],
                !0
              )
            );
          } catch (n) {
            console.error(n);
          }
        };

        /***/
      },

    /***/ "./node_modules/marquee3000/marquee3k.js":
      /*!***********************************************!*\
  !*** ./node_modules/marquee3000/marquee3k.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_FACTORY__,
          __WEBPACK_AMD_DEFINE_ARRAY__,
          __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * MARQUEE 3000 MARQUEE 3000 MARQUEE 3000 MARQUEE 3000 MARQUEE 3000
         * http://github.com/ezekielaquino/marquee3000
         * Marquees for the new millennium v1.0
         * MIT License
         */

        (function (root, factory) {
          if (true) {
            !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
              (__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
              (__WEBPACK_AMD_DEFINE_RESULT__ =
                typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
                  ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                    exports,
                    __WEBPACK_AMD_DEFINE_ARRAY__
                  )
                  : __WEBPACK_AMD_DEFINE_FACTORY__),
              __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {
          }
        })(this, function () {
          "use strict";

          let animationId = 0;

          class Marquee3k {
            constructor(element, options) {
              this.element = element;
              this.selector = options.selector;
              this.speed = element.dataset.speed || 0.25;
              this.pausable = element.dataset.pausable;
              this.reverse = element.dataset.reverse;
              this.paused = false;
              this.parent = element.parentElement;
              this.parentProps = this.parent.getBoundingClientRect();
              this.content = element.children[0];
              this.innerContent = this.content.innerHTML;
              this.wrapStyles = "";
              this.offset = 0;

              this._setupWrapper();
              this._setupContent();
              this._setupEvents();

              this.wrapper.appendChild(this.content);
              this.element.appendChild(this.wrapper);
            }

            _setupWrapper() {
              this.wrapper = document.createElement("div");
              this.wrapper.classList.add("marquee3k__wrapper");
              this.wrapper.style.whiteSpace = "nowrap";
            }

            _setupContent() {
              this.content.classList.add(`${this.selector}__copy`);
              this.content.style.display = "inline-block";
              this.contentWidth = this.content.offsetWidth;

              this.requiredReps =
                this.contentWidth > this.parentProps.width
                  ? 2
                  : Math.ceil(
                    (this.parentProps.width - this.contentWidth) /
                    this.contentWidth
                  ) + 1;

              for (let i = 0; i < this.requiredReps; i++) {
                this._createClone();
              }

              if (this.reverse) {
                this.offset = this.contentWidth * -1;
              }

              this.element.classList.add("is-init");
            }

            _setupEvents() {
              this.element.addEventListener("mouseenter", () => {
                if (this.pausable) this.paused = true;
              });

              this.element.addEventListener("mouseleave", () => {
                if (this.pausable) this.paused = false;
              });
            }

            _createClone() {
              const clone = this.content.cloneNode(true);
              clone.style.display = "inline-block";
              clone.classList.add(`${this.selector}__copy`);
              this.wrapper.appendChild(clone);
            }

            animate() {
              if (!this.paused) {
                const isScrolled = this.reverse
                  ? this.offset < 0
                  : this.offset > this.contentWidth * -1;
                const direction = this.reverse ? -1 : 1;
                const reset = this.reverse ? this.contentWidth * -1 : 0;

                if (isScrolled) this.offset -= this.speed * direction;
                else this.offset = reset;

                this.wrapper.style.whiteSpace = "nowrap";
                this.wrapper.style.transform = `translate(${this.offset}px, 0) translateZ(0)`;
              }
            }

            _refresh() {
              this.contentWidth = this.content.offsetWidth;
            }

            repopulate(difference, isLarger) {
              this.contentWidth = this.content.offsetWidth;

              if (isLarger) {
                const amount = Math.ceil(difference / this.contentWidth) + 1;

                for (let i = 0; i < amount; i++) {
                  this._createClone();
                }
              }
            }

            static refresh(index) {
              MARQUEES[index]._refresh();
            }

            static pause(index) {
              MARQUEES[index].paused = true;
            }

            static play(index) {
              MARQUEES[index].paused = false;
            }

            static toggle(index) {
              MARQUEES[index].paused = !MARQUEES[index].paused;
            }

            static refreshAll() {
              for (let i = 0; i < MARQUEES.length; i++) {
                MARQUEES[i]._refresh();
              }
            }

            static pauseAll() {
              for (let i = 0; i < MARQUEES.length; i++) {
                MARQUEES[i].paused = true;
              }
            }

            static playAll() {
              for (let i = 0; i < MARQUEES.length; i++) {
                MARQUEES[i].paused = false;
              }
            }

            static toggleAll() {
              for (let i = 0; i < MARQUEES.length; i++) {
                MARQUEES[i].paused = !MARQUEES[i].paused;
              }
            }

            static init(options = { selector: "marquee3k" }) {
              if (animationId) window.cancelAnimationFrame(animationId);

              window.MARQUEES = [];
              const marquees = Array.from(
                document.querySelectorAll(`.${options.selector}`)
              );
              let previousWidth = window.innerWidth;
              let timer;

              for (let i = 0; i < marquees.length; i++) {
                const marquee = marquees[i];
                const instance = new Marquee3k(marquee, options);
                MARQUEES.push(instance);
              }

              animate();

              function animate() {
                for (let i = 0; i < MARQUEES.length; i++) {
                  MARQUEES[i].animate();
                }
                animationId = window.requestAnimationFrame(animate);
              }

              window.addEventListener("resize", () => {
                clearTimeout(timer);

                timer = setTimeout(() => {
                  const isLarger = previousWidth < window.innerWidth;
                  const difference = window.innerWidth - previousWidth;

                  for (let i = 0; i < MARQUEES.length; i++) {
                    MARQUEES[i].repopulate(difference, isLarger);
                  }

                  previousWidth = this.innerWidth;
                }, 250);
              });
            }
          }

          return Marquee3k;
        });

        /***/
      },

    /***/ "./node_modules/pinch-zoom-js/src/pinch-zoom.js":
      /*!******************************************************!*\
  !*** ./node_modules/pinch-zoom-js/src/pinch-zoom.js ***!
  \******************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /*

    PinchZoom.js
    Copyright (c) Manuel Stofer 2013 - today

    Author: Manuel Stofer (mst@rtp.ch)
    Version: 2.3.5

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

*/

        // polyfills
        if (typeof Object.assign != "function") {
          // Must be writable: true, enumerable: false, configurable: true
          Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
              // .length of function is 2
              if (target == null) {
                // TypeError if undefined or null
                throw new TypeError(
                  "Cannot convert undefined or null to object"
                );
              }

              var to = Object(target);

              for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                  // Skip over if undefined or null
                  for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (
                      Object.prototype.hasOwnProperty.call(nextSource, nextKey)
                    ) {
                      to[nextKey] = nextSource[nextKey];
                    }
                  }
                }
              }
              return to;
            },
            writable: true,
            configurable: true,
          });
        }

        if (typeof Array.from != "function") {
          Array.from = function (object) {
            return [].slice.call(object);
          };
        }

        // utils
        var buildElement = function (str) {
          // empty string as title argument required by IE and Edge
          var tmp = document.implementation.createHTMLDocument("");
          tmp.body.innerHTML = str;
          return Array.from(tmp.body.children)[0];
        };

        var triggerEvent = function (el, name) {
          var event = document.createEvent("HTMLEvents");
          event.initEvent(name, true, false);
          el.dispatchEvent(event);
        };

        var definePinchZoom = function () {
          /**
           * Pinch zoom
           * @param el
           * @param options
           * @constructor
           */
          var PinchZoom = function (el, options) {
            this.el = el;
            this.zoomFactor = 1;
            this.lastScale = 1;
            this.offset = {
              x: 0,
              y: 0,
            };
            this.initialOffset = {
              x: 0,
              y: 0,
            };
            this.options = Object.assign({}, this.defaults, options);
            this.setupMarkup();
            this.bindEvents();
            this.update();

            // The image may already be loaded when PinchZoom is initialized,
            // and then the load event (which trigger update) will never fire.
            if (this.isImageLoaded(this.el)) {
              this.updateAspectRatio();
              this.setupOffsets();
            }

            this.enable();
          },
            sum = function (a, b) {
              return a + b;
            },
            isCloseTo = function (value, expected) {
              return value > expected - 0.01 && value < expected + 0.01;
            };

          PinchZoom.prototype = {
            defaults: {
              tapZoomFactor: 2,
              zoomOutFactor: 1.3,
              animationDuration: 300,
              maxZoom: 4,
              minZoom: 0.5,
              draggableUnzoomed: true,
              lockDragAxis: false,
              setOffsetsOnce: false,
              use2d: true,
              zoomStartEventName: "pz_zoomstart",
              zoomUpdateEventName: "pz_zoomupdate",
              zoomEndEventName: "pz_zoomend",
              dragStartEventName: "pz_dragstart",
              dragUpdateEventName: "pz_dragupdate",
              dragEndEventName: "pz_dragend",
              doubleTapEventName: "pz_doubletap",
              verticalPadding: 0,
              horizontalPadding: 0,
              onZoomStart: null,
              onZoomEnd: null,
              onZoomUpdate: null,
              onDragStart: null,
              onDragEnd: null,
              onDragUpdate: null,
              onDoubleTap: null,
            },

            /**
             * Event handler for 'dragstart'
             * @param event
             */
            handleDragStart: function (event) {
              triggerEvent(this.el, this.options.dragStartEventName);
              if (typeof this.options.onDragStart == "function") {
                this.options.onDragStart(this, event);
              }
              this.stopAnimation();
              this.lastDragPosition = false;
              this.hasInteraction = true;
              this.handleDrag(event);
            },

            /**
             * Event handler for 'drag'
             * @param event
             */
            handleDrag: function (event) {
              var touch = this.getTouches(event)[0];
              this.drag(touch, this.lastDragPosition);
              this.offset = this.sanitizeOffset(this.offset);
              this.lastDragPosition = touch;
            },

            handleDragEnd: function () {
              triggerEvent(this.el, this.options.dragEndEventName);
              if (typeof this.options.onDragEnd == "function") {
                this.options.onDragEnd(this, event);
              }
              this.end();
            },

            /**
             * Event handler for 'zoomstart'
             * @param event
             */
            handleZoomStart: function (event) {
              triggerEvent(this.el, this.options.zoomStartEventName);
              if (typeof this.options.onZoomStart == "function") {
                this.options.onZoomStart(this, event);
              }
              this.stopAnimation();
              this.lastScale = 1;
              this.nthZoom = 0;
              this.lastZoomCenter = false;
              this.hasInteraction = true;
            },

            /**
             * Event handler for 'zoom'
             * @param event
             */
            handleZoom: function (event, newScale) {
              // a relative scale factor is used
              var touchCenter = this.getTouchCenter(this.getTouches(event)),
                scale = newScale / this.lastScale;
              this.lastScale = newScale;

              // the first touch events are thrown away since they are not precise
              this.nthZoom += 1;
              if (this.nthZoom > 3) {
                this.scale(scale, touchCenter);
                this.drag(touchCenter, this.lastZoomCenter);
              }
              this.lastZoomCenter = touchCenter;
            },

            handleZoomEnd: function () {
              triggerEvent(this.el, this.options.zoomEndEventName);
              if (typeof this.options.onZoomEnd == "function") {
                this.options.onZoomEnd(this, event);
              }
              this.end();
            },

            /**
             * Event handler for 'doubletap'
             * @param event
             */
            handleDoubleTap: function (event) {
              var center = this.getTouches(event)[0],
                zoomFactor =
                  this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
                startZoomFactor = this.zoomFactor,
                updateProgress = function (progress) {
                  this.scaleTo(
                    startZoomFactor + progress * (zoomFactor - startZoomFactor),
                    center
                  );
                }.bind(this);

              if (this.hasInteraction) {
                return;
              }

              this.isDoubleTap = true;

              if (startZoomFactor > zoomFactor) {
                center = this.getCurrentZoomCenter();
              }

              this.animate(
                this.options.animationDuration,
                updateProgress,
                this.swing
              );
              triggerEvent(this.el, this.options.doubleTapEventName);
              if (typeof this.options.onDoubleTap == "function") {
                this.options.onDoubleTap(this, event);
              }
            },

            /**
             * Compute the initial offset
             *
             * the element should be centered in the container upon initialization
             */
            computeInitialOffset: function () {
              this.initialOffset = {
                x:
                  -Math.abs(
                    this.el.offsetWidth * this.getInitialZoomFactor() -
                    this.container.offsetWidth
                  ) / 2,
                y:
                  -Math.abs(
                    this.el.offsetHeight * this.getInitialZoomFactor() -
                    this.container.offsetHeight
                  ) / 2,
              };
            },

            /**
             * Reset current image offset to that of the initial offset
             */
            resetOffset: function () {
              this.offset.x = this.initialOffset.x;
              this.offset.y = this.initialOffset.y;
            },

            /**
             * Determine if image is loaded
             */
            isImageLoaded: function (el) {
              if (el.nodeName === "IMG") {
                return el.complete && el.naturalHeight !== 0;
              } else {
                return Array.from(el.querySelectorAll("img")).every(
                  this.isImageLoaded
                );
              }
            },

            setupOffsets: function () {
              if (this.options.setOffsetsOnce && this._isOffsetsSet) {
                return;
              }

              this._isOffsetsSet = true;

              this.computeInitialOffset();
              this.resetOffset();
            },

            /**
             * Max / min values for the offset
             * @param offset
             * @return {Object} the sanitized offset
             */
            sanitizeOffset: function (offset) {
              var elWidth =
                this.el.offsetWidth *
                this.getInitialZoomFactor() *
                this.zoomFactor;
              var elHeight =
                this.el.offsetHeight *
                this.getInitialZoomFactor() *
                this.zoomFactor;
              var maxX =
                elWidth -
                this.getContainerX() +
                this.options.horizontalPadding,
                maxY =
                  elHeight -
                  this.getContainerY() +
                  this.options.verticalPadding,
                maxOffsetX = Math.max(maxX, 0),
                maxOffsetY = Math.max(maxY, 0),
                minOffsetX = Math.min(maxX, 0) - this.options.horizontalPadding,
                minOffsetY = Math.min(maxY, 0) - this.options.verticalPadding;

              return {
                x: Math.min(Math.max(offset.x, minOffsetX), maxOffsetX),
                y: Math.min(Math.max(offset.y, minOffsetY), maxOffsetY),
              };
            },

            /**
             * Scale to a specific zoom factor (not relative)
             * @param zoomFactor
             * @param center
             */
            scaleTo: function (zoomFactor, center) {
              this.scale(zoomFactor / this.zoomFactor, center);
            },

            /**
             * Scales the element from specified center
             * @param scale
             * @param center
             */
            scale: function (scale, center) {
              scale = this.scaleZoomFactor(scale);
              this.addOffset({
                x: (scale - 1) * (center.x + this.offset.x),
                y: (scale - 1) * (center.y + this.offset.y),
              });
              triggerEvent(this.el, this.options.zoomUpdateEventName);
              if (typeof this.options.onZoomUpdate == "function") {
                this.options.onZoomUpdate(this, event);
              }
            },

            /**
             * Scales the zoom factor relative to current state
             * @param scale
             * @return the actual scale (can differ because of max min zoom factor)
             */
            scaleZoomFactor: function (scale) {
              var originalZoomFactor = this.zoomFactor;
              this.zoomFactor *= scale;
              this.zoomFactor = Math.min(
                this.options.maxZoom,
                Math.max(this.zoomFactor, this.options.minZoom)
              );
              return this.zoomFactor / originalZoomFactor;
            },

            /**
             * Determine if the image is in a draggable state
             *
             * When the image can be dragged, the drag event is acted upon and cancelled.
             * When not draggable, the drag event bubbles through this component.
             *
             * @return {Boolean}
             */
            canDrag: function () {
              return (
                this.options.draggableUnzoomed || !isCloseTo(this.zoomFactor, 1)
              );
            },

            /**
             * Drags the element
             * @param center
             * @param lastCenter
             */
            drag: function (center, lastCenter) {
              if (lastCenter) {
                if (this.options.lockDragAxis) {
                  // lock scroll to position that was changed the most
                  if (
                    Math.abs(center.x - lastCenter.x) >
                    Math.abs(center.y - lastCenter.y)
                  ) {
                    this.addOffset({
                      x: -(center.x - lastCenter.x),
                      y: 0,
                    });
                  } else {
                    this.addOffset({
                      y: -(center.y - lastCenter.y),
                      x: 0,
                    });
                  }
                } else {
                  this.addOffset({
                    y: -(center.y - lastCenter.y),
                    x: -(center.x - lastCenter.x),
                  });
                }
                triggerEvent(this.el, this.options.dragUpdateEventName);
                if (typeof this.options.onDragUpdate == "function") {
                  this.options.onDragUpdate(this, event);
                }
              }
            },

            /**
             * Calculates the touch center of multiple touches
             * @param touches
             * @return {Object}
             */
            getTouchCenter: function (touches) {
              return this.getVectorAvg(touches);
            },

            /**
             * Calculates the average of multiple vectors (x, y values)
             */
            getVectorAvg: function (vectors) {
              return {
                x:
                  vectors
                    .map(function (v) {
                      return v.x;
                    })
                    .reduce(sum) / vectors.length,
                y:
                  vectors
                    .map(function (v) {
                      return v.y;
                    })
                    .reduce(sum) / vectors.length,
              };
            },

            /**
             * Adds an offset
             * @param offset the offset to add
             * @return return true when the offset change was accepted
             */
            addOffset: function (offset) {
              this.offset = {
                x: this.offset.x + offset.x,
                y: this.offset.y + offset.y,
              };
            },

            sanitize: function () {
              if (this.zoomFactor < this.options.zoomOutFactor) {
                this.zoomOutAnimation();
              } else if (this.isInsaneOffset(this.offset)) {
                this.sanitizeOffsetAnimation();
              }
            },

            /**
             * Checks if the offset is ok with the current zoom factor
             * @param offset
             * @return {Boolean}
             */
            isInsaneOffset: function (offset) {
              var sanitizedOffset = this.sanitizeOffset(offset);
              return (
                sanitizedOffset.x !== offset.x || sanitizedOffset.y !== offset.y
              );
            },

            /**
             * Creates an animation moving to a sane offset
             */
            sanitizeOffsetAnimation: function () {
              var targetOffset = this.sanitizeOffset(this.offset),
                startOffset = {
                  x: this.offset.x,
                  y: this.offset.y,
                },
                updateProgress = function (progress) {
                  this.offset.x =
                    startOffset.x + progress * (targetOffset.x - startOffset.x);
                  this.offset.y =
                    startOffset.y + progress * (targetOffset.y - startOffset.y);
                  this.update();
                }.bind(this);

              this.animate(
                this.options.animationDuration,
                updateProgress,
                this.swing
              );
            },

            /**
             * Zooms back to the original position,
             * (no offset and zoom factor 1)
             */
            zoomOutAnimation: function () {
              if (this.zoomFactor === 1) {
                return;
              }

              var startZoomFactor = this.zoomFactor,
                zoomFactor = 1,
                center = this.getCurrentZoomCenter(),
                updateProgress = function (progress) {
                  this.scaleTo(
                    startZoomFactor + progress * (zoomFactor - startZoomFactor),
                    center
                  );
                }.bind(this);

              this.animate(
                this.options.animationDuration,
                updateProgress,
                this.swing
              );
            },

            /**
             * Updates the container aspect ratio
             *
             * Any previous container height must be cleared before re-measuring the
             * parent height, since it depends implicitly on the height of any of its children
             */
            updateAspectRatio: function () {
              this.unsetContainerY();
              this.setContainerY(this.container.parentElement.offsetHeight);
            },

            /**
             * Calculates the initial zoom factor (for the element to fit into the container)
             * @return {number} the initial zoom factor
             */
            getInitialZoomFactor: function () {
              var xZoomFactor =
                this.container.offsetWidth / this.el.offsetWidth;
              var yZoomFactor =
                this.container.offsetHeight / this.el.offsetHeight;

              return Math.min(xZoomFactor, yZoomFactor);
            },

            /**
             * Calculates the aspect ratio of the element
             * @return the aspect ratio
             */
            getAspectRatio: function () {
              return this.el.offsetWidth / this.el.offsetHeight;
            },

            /**
             * Calculates the virtual zoom center for the current offset and zoom factor
             * (used for reverse zoom)
             * @return {Object} the current zoom center
             */
            getCurrentZoomCenter: function () {
              var offsetLeft = this.offset.x - this.initialOffset.x;
              var centerX =
                -1 * this.offset.x - offsetLeft / (1 / this.zoomFactor - 1);

              var offsetTop = this.offset.y - this.initialOffset.y;
              var centerY =
                -1 * this.offset.y - offsetTop / (1 / this.zoomFactor - 1);

              return {
                x: centerX,
                y: centerY,
              };
            },

            /**
             * Returns the touches of an event relative to the container offset
             * @param event
             * @return array touches
             */
            getTouches: function (event) {
              var rect = this.container.getBoundingClientRect();
              var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
              var scrollLeft =
                document.documentElement.scrollLeft || document.body.scrollLeft;
              var posTop = rect.top + scrollTop;
              var posLeft = rect.left + scrollLeft;

              return Array.prototype.slice
                .call(event.touches)
                .map(function (touch) {
                  return {
                    x: touch.pageX - posLeft,
                    y: touch.pageY - posTop,
                  };
                });
            },

            /**
             * Animation loop
             * does not support simultaneous animations
             * @param duration
             * @param framefn
             * @param timefn
             * @param callback
             */
            animate: function (duration, framefn, timefn, callback) {
              var startTime = new Date().getTime(),
                renderFrame = function () {
                  if (!this.inAnimation) {
                    return;
                  }
                  var frameTime = new Date().getTime() - startTime,
                    progress = frameTime / duration;
                  if (frameTime >= duration) {
                    framefn(1);
                    if (callback) {
                      callback();
                    }
                    this.update();
                    this.stopAnimation();
                    this.update();
                  } else {
                    if (timefn) {
                      progress = timefn(progress);
                    }
                    framefn(progress);
                    this.update();
                    requestAnimationFrame(renderFrame);
                  }
                }.bind(this);
              this.inAnimation = true;
              requestAnimationFrame(renderFrame);
            },

            /**
             * Stops the animation
             */
            stopAnimation: function () {
              this.inAnimation = false;
            },

            /**
             * Swing timing function for animations
             * @param p
             * @return {Number}
             */
            swing: function (p) {
              return -Math.cos(p * Math.PI) / 2 + 0.5;
            },

            getContainerX: function () {
              return this.container.offsetWidth;
            },

            getContainerY: function () {
              return this.container.offsetHeight;
            },

            setContainerY: function (y) {
              return (this.container.style.height = y + "px");
            },

            unsetContainerY: function () {
              this.container.style.height = null;
            },

            /**
             * Creates the expected html structure
             */
            setupMarkup: function () {
              this.container = buildElement(
                '<div class="pinch-zoom-container"></div>'
              );
              this.el.parentNode.insertBefore(this.container, this.el);
              this.container.appendChild(this.el);

              this.container.style.overflow = "hidden";
              this.container.style.position = "relative";

              this.el.style.webkitTransformOrigin = "0% 0%";
              this.el.style.mozTransformOrigin = "0% 0%";
              this.el.style.msTransformOrigin = "0% 0%";
              this.el.style.oTransformOrigin = "0% 0%";
              this.el.style.transformOrigin = "0% 0%";

              this.el.style.position = "absolute";
            },

            end: function () {
              this.hasInteraction = false;
              this.sanitize();
              this.update();
            },

            /**
             * Binds all required event listeners
             */
            bindEvents: function () {
              var self = this;
              detectGestures(this.container, this);

              this.resizeHandler = this.update.bind(this);
              window.addEventListener("resize", this.resizeHandler);
              Array.from(this.el.querySelectorAll("img")).forEach(function (
                imgEl
              ) {
                imgEl.addEventListener("load", self.update.bind(self));
              });

              if (this.el.nodeName === "IMG") {
                this.el.addEventListener("load", this.update.bind(this));
              }
            },

            /**
             * Updates the css values according to the current zoom factor and offset
             */
            update: function (event) {
              if (event && event.type === "resize") {
                this.updateAspectRatio();
                this.setupOffsets();
              }

              if (event && event.type === "load") {
                this.updateAspectRatio();
                this.setupOffsets();
              }

              if (this.updatePlanned) {
                return;
              }
              this.updatePlanned = true;

              window.setTimeout(
                function () {
                  this.updatePlanned = false;

                  var zoomFactor =
                    this.getInitialZoomFactor() * this.zoomFactor,
                    offsetX = -this.offset.x / zoomFactor,
                    offsetY = -this.offset.y / zoomFactor,
                    transform3d =
                      "scale3d(" +
                      zoomFactor +
                      ", " +
                      zoomFactor +
                      ",1) " +
                      "translate3d(" +
                      offsetX +
                      "px," +
                      offsetY +
                      "px,0px)",
                    transform2d =
                      "scale(" +
                      zoomFactor +
                      ", " +
                      zoomFactor +
                      ") " +
                      "translate(" +
                      offsetX +
                      "px," +
                      offsetY +
                      "px)",
                    removeClone = function () {
                      if (this.clone) {
                        this.clone.parentNode.removeChild(this.clone);
                        delete this.clone;
                      }
                    }.bind(this);

                  // Scale 3d and translate3d are faster (at least on ios)
                  // but they also reduce the quality.
                  // PinchZoom uses the 3d transformations during interactions
                  // after interactions it falls back to 2d transformations
                  if (
                    !this.options.use2d ||
                    this.hasInteraction ||
                    this.inAnimation
                  ) {
                    this.is3d = true;
                    removeClone();

                    this.el.style.webkitTransform = transform3d;
                    this.el.style.mozTransform = transform2d;
                    this.el.style.msTransform = transform2d;
                    this.el.style.oTransform = transform2d;
                    this.el.style.transform = transform3d;
                  } else {
                    // When changing from 3d to 2d transform webkit has some glitches.
                    // To avoid this, a copy of the 3d transformed element is displayed in the
                    // foreground while the element is converted from 3d to 2d transform
                    if (this.is3d) {
                      this.clone = this.el.cloneNode(true);
                      this.clone.style.pointerEvents = "none";
                      this.container.appendChild(this.clone);
                      window.setTimeout(removeClone, 200);
                    }

                    this.el.style.webkitTransform = transform2d;
                    this.el.style.mozTransform = transform2d;
                    this.el.style.msTransform = transform2d;
                    this.el.style.oTransform = transform2d;
                    this.el.style.transform = transform2d;

                    this.is3d = false;
                  }
                }.bind(this),
                0
              );
            },

            /**
             * Enables event handling for gestures
             */
            enable: function () {
              this.enabled = true;
            },

            /**
             * Disables event handling for gestures
             */
            disable: function () {
              this.enabled = false;
            },

            /**
             * Unmounts the zooming container and global event listeners
             */
            destroy: function () {
              window.removeEventListener("resize", this.resizeHandler);

              if (this.container) {
                this.container.remove();
                this.container = null;
              }
            },
          };

          var detectGestures = function (el, target) {
            var interaction = null,
              fingers = 0,
              lastTouchStart = null,
              startTouches = null,
              setInteraction = function (newInteraction, event) {
                if (interaction !== newInteraction) {
                  if (interaction && !newInteraction) {
                    switch (interaction) {
                      case "zoom":
                        target.handleZoomEnd(event);
                        break;
                      case "drag":
                        target.handleDragEnd(event);
                        break;
                    }
                  }

                  switch (newInteraction) {
                    case "zoom":
                      target.handleZoomStart(event);
                      break;
                    case "drag":
                      target.handleDragStart(event);
                      break;
                  }
                }
                interaction = newInteraction;
              },
              updateInteraction = function (event) {
                if (fingers === 2) {
                  setInteraction("zoom");
                } else if (fingers === 1 && target.canDrag()) {
                  setInteraction("drag", event);
                } else {
                  setInteraction(null, event);
                }
              },
              targetTouches = function (touches) {
                return Array.from(touches).map(function (touch) {
                  return {
                    x: touch.pageX,
                    y: touch.pageY,
                  };
                });
              },
              getDistance = function (a, b) {
                var x, y;
                x = a.x - b.x;
                y = a.y - b.y;
                return Math.sqrt(x * x + y * y);
              },
              calculateScale = function (startTouches, endTouches) {
                var startDistance = getDistance(
                  startTouches[0],
                  startTouches[1]
                ),
                  endDistance = getDistance(endTouches[0], endTouches[1]);
                return endDistance / startDistance;
              },
              cancelEvent = function (event) {
                event.stopPropagation();
                event.preventDefault();
              },
              detectDoubleTap = function (event) {
                var time = new Date().getTime();

                if (fingers > 1) {
                  lastTouchStart = null;
                }

                if (time - lastTouchStart < 300) {
                  cancelEvent(event);

                  target.handleDoubleTap(event);
                  switch (interaction) {
                    case "zoom":
                      target.handleZoomEnd(event);
                      break;
                    case "drag":
                      target.handleDragEnd(event);
                      break;
                  }
                } else {
                  target.isDoubleTap = false;
                }

                if (fingers === 1) {
                  lastTouchStart = time;
                }
              },
              firstMove = true;

            el.addEventListener(
              "touchstart",
              function (event) {
                if (target.enabled) {
                  firstMove = true;
                  fingers = event.touches.length;
                  detectDoubleTap(event);
                }
              },
              { passive: false }
            );

            el.addEventListener(
              "touchmove",
              function (event) {
                if (target.enabled && !target.isDoubleTap) {
                  if (firstMove) {
                    updateInteraction(event);
                    if (interaction) {
                      cancelEvent(event);
                    }
                    startTouches = targetTouches(event.touches);
                  } else {
                    switch (interaction) {
                      case "zoom":
                        if (
                          startTouches.length == 2 &&
                          event.touches.length == 2
                        ) {
                          target.handleZoom(
                            event,
                            calculateScale(
                              startTouches,
                              targetTouches(event.touches)
                            )
                          );
                        }
                        break;
                      case "drag":
                        target.handleDrag(event);
                        break;
                    }
                    if (interaction) {
                      cancelEvent(event);
                      target.update();
                    }
                  }

                  firstMove = false;
                }
              },
              { passive: false }
            );

            el.addEventListener("touchend", function (event) {
              if (target.enabled) {
                fingers = event.touches.length;
                updateInteraction(event);
              }
            });
          };

          return PinchZoom;
        };

        var PinchZoom = definePinchZoom();

        /* harmony default export */ __webpack_exports__["default"] = PinchZoom;

        /***/
      },

    /***/ "./node_modules/process/browser.js":
      /*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        // shim for using process in browser
        var process = (module.exports = {});

        // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function () {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
          }
          // if setTimeout wasn't available but was latter defined
          if (
            (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
            setTimeout
          ) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
          }
          // if clearTimeout wasn't available but was latter defined
          if (
            (cachedClearTimeout === defaultClearTimeout ||
              !cachedClearTimeout) &&
            clearTimeout
          ) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }

        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;

          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };

        // v8 likes predictible objects
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function () {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ""; // empty string to avoid regexp issues
        process.versions = {};

        function noop() { }

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
          return [];
        };

        process.binding = function (name) {
          throw new Error("process.binding is not supported");
        };

        process.cwd = function () {
          return "/";
        };
        process.chdir = function (dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function () {
          return 0;
        };

        /***/
      },

    /***/ "./node_modules/rivets/dist/rivets.js":
      /*!********************************************!*\
  !*** ./node_modules/rivets/dist/rivets.js ***!
  \********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */ (function (module) {
          var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; // Rivets.js
          // version: 0.9.6
          // author: Michael Richards
          // license: MIT
          (function () {
            var Rivets,
              bindMethod,
              jQuery,
              unbindMethod,
              _ref,
              __bind = function (fn, me) {
                return function () {
                  return fn.apply(me, arguments);
                };
              },
              __slice = [].slice,
              __hasProp = {}.hasOwnProperty,
              __extends = function (child, parent) {
                for (var key in parent) {
                  if (__hasProp.call(parent, key)) child[key] = parent[key];
                }
                function ctor() {
                  this.constructor = child;
                }
                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
              },
              __indexOf =
                [].indexOf ||
                function (item) {
                  for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i;
                  }
                  return -1;
                };

            Rivets = {
              options: [
                "prefix",
                "templateDelimiters",
                "rootInterface",
                "preloadData",
                "handler",
                "executeFunctions",
              ],
              extensions: ["binders", "formatters", "components", "adapters"],
              public: {
                binders: {},
                components: {},
                formatters: {},
                adapters: {},
                prefix: "rv",
                templateDelimiters: ["{", "}"],
                rootInterface: ".",
                preloadData: true,
                executeFunctions: false,
                iterationAlias: function (modelName) {
                  return "%" + modelName + "%";
                },
                handler: function (context, ev, binding) {
                  return this.call(context, ev, binding.view.models);
                },
                configure: function (options) {
                  var descriptor, key, option, value;
                  if (options == null) {
                    options = {};
                  }
                  for (option in options) {
                    value = options[option];
                    if (
                      option === "binders" ||
                      option === "components" ||
                      option === "formatters" ||
                      option === "adapters"
                    ) {
                      for (key in value) {
                        descriptor = value[key];
                        Rivets[option][key] = descriptor;
                      }
                    } else {
                      Rivets["public"][option] = value;
                    }
                  }
                },
                bind: function (el, models, options) {
                  var view;
                  if (models == null) {
                    models = {};
                  }
                  if (options == null) {
                    options = {};
                  }
                  view = new Rivets.View(el, models, options);
                  view.bind();
                  return view;
                },
                init: function (component, el, data) {
                  var scope, template, view;
                  if (data == null) {
                    data = {};
                  }
                  if (el == null) {
                    el = document.createElement("div");
                  }
                  component = Rivets["public"].components[component];
                  template = component.template.call(this, el);
                  if (template instanceof HTMLElement) {
                    while (el.firstChild) {
                      el.removeChild(el.firstChild);
                    }
                    el.appendChild(template);
                  } else {
                    el.innerHTML = template;
                  }
                  scope = component.initialize.call(this, el, data);
                  view = new Rivets.View(el, scope);
                  view.bind();
                  return view;
                },
              },
            };

            if (window["jQuery"] || window["$"]) {
              jQuery = window["jQuery"] || window["$"];
              (_ref =
                "on" in jQuery.prototype ? ["on", "off"] : ["bind", "unbind"]),
                (bindMethod = _ref[0]),
                (unbindMethod = _ref[1]);
              Rivets.Util = {
                bindEvent: function (el, event, handler) {
                  return jQuery(el)[bindMethod](event, handler);
                },
                unbindEvent: function (el, event, handler) {
                  return jQuery(el)[unbindMethod](event, handler);
                },
                getInputValue: function (el) {
                  var $el;
                  $el = jQuery(el);
                  if ($el.attr("type") === "checkbox") {
                    return $el.is(":checked");
                  } else {
                    return $el.val();
                  }
                },
              };
            } else {
              Rivets.Util = {
                bindEvent: (function () {
                  if ("addEventListener" in window) {
                    return function (el, event, handler) {
                      return el.addEventListener(event, handler, false);
                    };
                  }
                  return function (el, event, handler) {
                    return el.attachEvent("on" + event, handler);
                  };
                })(),
                unbindEvent: (function () {
                  if ("removeEventListener" in window) {
                    return function (el, event, handler) {
                      return el.removeEventListener(event, handler, false);
                    };
                  }
                  return function (el, event, handler) {
                    return el.detachEvent("on" + event, handler);
                  };
                })(),
                getInputValue: function (el) {
                  var o, _i, _len, _results;
                  if (el.type === "checkbox") {
                    return el.checked;
                  } else if (el.type === "select-multiple") {
                    _results = [];
                    for (_i = 0, _len = el.length; _i < _len; _i++) {
                      o = el[_i];
                      if (o.selected) {
                        _results.push(o.value);
                      }
                    }
                    return _results;
                  } else {
                    return el.value;
                  }
                },
              };
            }

            Rivets.TypeParser = (function () {
              function TypeParser() { }

              TypeParser.types = {
                primitive: 0,
                keypath: 1,
              };

              TypeParser.parse = function (string) {
                if (/^'.*'$|^".*"$/.test(string)) {
                  return {
                    type: this.types.primitive,
                    value: string.slice(1, -1),
                  };
                } else if (string === "true") {
                  return {
                    type: this.types.primitive,
                    value: true,
                  };
                } else if (string === "false") {
                  return {
                    type: this.types.primitive,
                    value: false,
                  };
                } else if (string === "null") {
                  return {
                    type: this.types.primitive,
                    value: null,
                  };
                } else if (string === "undefined") {
                  return {
                    type: this.types.primitive,
                    value: void 0,
                  };
                } else if (string === "") {
                  return {
                    type: this.types.primitive,
                    value: void 0,
                  };
                } else if (isNaN(Number(string)) === false) {
                  return {
                    type: this.types.primitive,
                    value: Number(string),
                  };
                } else {
                  return {
                    type: this.types.keypath,
                    value: string,
                  };
                }
              };

              return TypeParser;
            })();

            Rivets.TextTemplateParser = (function () {
              function TextTemplateParser() { }

              TextTemplateParser.types = {
                text: 0,
                binding: 1,
              };

              TextTemplateParser.parse = function (template, delimiters) {
                var index,
                  lastIndex,
                  lastToken,
                  length,
                  substring,
                  tokens,
                  value;
                tokens = [];
                length = template.length;
                index = 0;
                lastIndex = 0;
                while (lastIndex < length) {
                  index = template.indexOf(delimiters[0], lastIndex);
                  if (index < 0) {
                    tokens.push({
                      type: this.types.text,
                      value: template.slice(lastIndex),
                    });
                    break;
                  } else {
                    if (index > 0 && lastIndex < index) {
                      tokens.push({
                        type: this.types.text,
                        value: template.slice(lastIndex, index),
                      });
                    }
                    lastIndex = index + delimiters[0].length;
                    index = template.indexOf(delimiters[1], lastIndex);
                    if (index < 0) {
                      substring = template.slice(
                        lastIndex - delimiters[1].length
                      );
                      lastToken = tokens[tokens.length - 1];
                      if (
                        (lastToken != null ? lastToken.type : void 0) ===
                        this.types.text
                      ) {
                        lastToken.value += substring;
                      } else {
                        tokens.push({
                          type: this.types.text,
                          value: substring,
                        });
                      }
                      break;
                    }
                    value = template.slice(lastIndex, index).trim();
                    tokens.push({
                      type: this.types.binding,
                      value: value,
                    });
                    lastIndex = index + delimiters[1].length;
                  }
                }
                return tokens;
              };

              return TextTemplateParser;
            })();

            Rivets.View = (function () {
              function View(els, models, options) {
                var k,
                  option,
                  v,
                  _base,
                  _i,
                  _j,
                  _len,
                  _len1,
                  _ref1,
                  _ref2,
                  _ref3,
                  _ref4,
                  _ref5;
                this.els = els;
                this.models = models;
                if (options == null) {
                  options = {};
                }
                this.update = __bind(this.update, this);
                this.publish = __bind(this.publish, this);
                this.sync = __bind(this.sync, this);
                this.unbind = __bind(this.unbind, this);
                this.bind = __bind(this.bind, this);
                this.select = __bind(this.select, this);
                this.traverse = __bind(this.traverse, this);
                this.build = __bind(this.build, this);
                this.buildBinding = __bind(this.buildBinding, this);
                this.bindingRegExp = __bind(this.bindingRegExp, this);
                this.options = __bind(this.options, this);
                if (!(this.els.jquery || this.els instanceof Array)) {
                  this.els = [this.els];
                }
                _ref1 = Rivets.extensions;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  option = _ref1[_i];
                  this[option] = {};
                  if (options[option]) {
                    _ref2 = options[option];
                    for (k in _ref2) {
                      v = _ref2[k];
                      this[option][k] = v;
                    }
                  }
                  _ref3 = Rivets["public"][option];
                  for (k in _ref3) {
                    v = _ref3[k];
                    if ((_base = this[option])[k] == null) {
                      _base[k] = v;
                    }
                  }
                }
                _ref4 = Rivets.options;
                for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
                  option = _ref4[_j];
                  this[option] =
                    (_ref5 = options[option]) != null
                      ? _ref5
                      : Rivets["public"][option];
                }
                this.build();
              }

              View.prototype.options = function () {
                var option, options, _i, _len, _ref1;
                options = {};
                _ref1 = Rivets.extensions.concat(Rivets.options);
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  option = _ref1[_i];
                  options[option] = this[option];
                }
                return options;
              };

              View.prototype.bindingRegExp = function () {
                return new RegExp("^" + this.prefix + "-");
              };

              View.prototype.buildBinding = function (
                binding,
                node,
                type,
                declaration
              ) {
                var context, ctx, dependencies, keypath, options, pipe, pipes;
                options = {};
                pipes = (function () {
                  var _i, _len, _ref1, _results;
                  _ref1 = declaration.match(
                    /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g
                  );
                  _results = [];
                  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    pipe = _ref1[_i];
                    _results.push(pipe.trim());
                  }
                  return _results;
                })();
                context = (function () {
                  var _i, _len, _ref1, _results;
                  _ref1 = pipes.shift().split("<");
                  _results = [];
                  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    ctx = _ref1[_i];
                    _results.push(ctx.trim());
                  }
                  return _results;
                })();
                keypath = context.shift();
                options.formatters = pipes;
                if ((dependencies = context.shift())) {
                  options.dependencies = dependencies.split(/\s+/);
                }
                return this.bindings.push(
                  new Rivets[binding](this, node, type, keypath, options)
                );
              };

              View.prototype.build = function () {
                var el, parse, _i, _len, _ref1;
                this.bindings = [];
                parse = (function (_this) {
                  return function (node) {
                    var block,
                      childNode,
                      delimiters,
                      n,
                      parser,
                      text,
                      token,
                      tokens,
                      _i,
                      _j,
                      _len,
                      _len1,
                      _ref1;
                    if (node.nodeType === 3) {
                      parser = Rivets.TextTemplateParser;
                      if ((delimiters = _this.templateDelimiters)) {
                        if (
                          (tokens = parser.parse(node.data, delimiters)).length
                        ) {
                          if (
                            !(
                              tokens.length === 1 &&
                              tokens[0].type === parser.types.text
                            )
                          ) {
                            for (
                              _i = 0, _len = tokens.length;
                              _i < _len;
                              _i++
                            ) {
                              token = tokens[_i];
                              text = document.createTextNode(token.value);
                              node.parentNode.insertBefore(text, node);
                              if (token.type === 1) {
                                _this.buildBinding(
                                  "TextBinding",
                                  text,
                                  null,
                                  token.value
                                );
                              }
                            }
                            node.parentNode.removeChild(node);
                          }
                        }
                      }
                    } else if (node.nodeType === 1) {
                      block = _this.traverse(node);
                    }
                    if (!block) {
                      _ref1 = (function () {
                        var _k, _len1, _ref1, _results;
                        _ref1 = node.childNodes;
                        _results = [];
                        for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
                          n = _ref1[_k];
                          _results.push(n);
                        }
                        return _results;
                      })();
                      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                        childNode = _ref1[_j];
                        parse(childNode);
                      }
                    }
                  };
                })(this);
                _ref1 = this.els;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  el = _ref1[_i];
                  parse(el);
                }
                this.bindings.sort(function (a, b) {
                  var _ref2, _ref3;
                  return (
                    (((_ref2 = b.binder) != null ? _ref2.priority : void 0) ||
                      0) -
                    (((_ref3 = a.binder) != null ? _ref3.priority : void 0) ||
                      0)
                  );
                });
              };

              View.prototype.traverse = function (node) {
                var attribute,
                  attributes,
                  binder,
                  bindingRegExp,
                  block,
                  identifier,
                  regexp,
                  type,
                  value,
                  _i,
                  _j,
                  _len,
                  _len1,
                  _ref1,
                  _ref2,
                  _ref3;
                bindingRegExp = this.bindingRegExp();
                block = node.nodeName === "SCRIPT" || node.nodeName === "STYLE";
                _ref1 = node.attributes;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  attribute = _ref1[_i];
                  if (bindingRegExp.test(attribute.name)) {
                    type = attribute.name.replace(bindingRegExp, "");
                    if (!(binder = this.binders[type])) {
                      _ref2 = this.binders;
                      for (identifier in _ref2) {
                        value = _ref2[identifier];
                        if (
                          identifier !== "*" &&
                          identifier.indexOf("*") !== -1
                        ) {
                          regexp = new RegExp(
                            "^" + identifier.replace(/\*/g, ".+") + "$"
                          );
                          if (regexp.test(type)) {
                            binder = value;
                          }
                        }
                      }
                    }
                    binder || (binder = this.binders["*"]);
                    if (binder.block) {
                      block = true;
                      attributes = [attribute];
                    }
                  }
                }
                _ref3 = attributes || node.attributes;
                for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                  attribute = _ref3[_j];
                  if (bindingRegExp.test(attribute.name)) {
                    type = attribute.name.replace(bindingRegExp, "");
                    this.buildBinding("Binding", node, type, attribute.value);
                  }
                }
                if (!block) {
                  type = node.nodeName.toLowerCase();
                  if (this.components[type] && !node._bound) {
                    this.bindings.push(
                      new Rivets.ComponentBinding(this, node, type)
                    );
                    block = true;
                  }
                }
                return block;
              };

              View.prototype.select = function (fn) {
                var binding, _i, _len, _ref1, _results;
                _ref1 = this.bindings;
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  binding = _ref1[_i];
                  if (fn(binding)) {
                    _results.push(binding);
                  }
                }
                return _results;
              };

              View.prototype.bind = function () {
                var binding, _i, _len, _ref1;
                _ref1 = this.bindings;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  binding = _ref1[_i];
                  binding.bind();
                }
              };

              View.prototype.unbind = function () {
                var binding, _i, _len, _ref1;
                _ref1 = this.bindings;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  binding = _ref1[_i];
                  binding.unbind();
                }
              };

              View.prototype.sync = function () {
                var binding, _i, _len, _ref1;
                _ref1 = this.bindings;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  binding = _ref1[_i];
                  if (typeof binding.sync === "function") {
                    binding.sync();
                  }
                }
              };

              View.prototype.publish = function () {
                var binding, _i, _len, _ref1;
                _ref1 = this.select(function (b) {
                  var _ref1;
                  return (_ref1 = b.binder) != null ? _ref1.publishes : void 0;
                });
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  binding = _ref1[_i];
                  binding.publish();
                }
              };

              View.prototype.update = function (models) {
                var binding, key, model, _i, _len, _ref1;
                if (models == null) {
                  models = {};
                }
                for (key in models) {
                  model = models[key];
                  this.models[key] = model;
                }
                _ref1 = this.bindings;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  binding = _ref1[_i];
                  if (typeof binding.update === "function") {
                    binding.update(models);
                  }
                }
              };

              return View;
            })();

            Rivets.Binding = (function () {
              function Binding(view, el, type, keypath, options) {
                this.view = view;
                this.el = el;
                this.type = type;
                this.keypath = keypath;
                this.options = options != null ? options : {};
                this.getValue = __bind(this.getValue, this);
                this.update = __bind(this.update, this);
                this.unbind = __bind(this.unbind, this);
                this.bind = __bind(this.bind, this);
                this.publish = __bind(this.publish, this);
                this.sync = __bind(this.sync, this);
                this.set = __bind(this.set, this);
                this.eventHandler = __bind(this.eventHandler, this);
                this.formattedValue = __bind(this.formattedValue, this);
                this.parseFormatterArguments = __bind(
                  this.parseFormatterArguments,
                  this
                );
                this.parseTarget = __bind(this.parseTarget, this);
                this.observe = __bind(this.observe, this);
                this.setBinder = __bind(this.setBinder, this);
                this.formatters = this.options.formatters || [];
                this.dependencies = [];
                this.formatterObservers = {};
                this.model = void 0;
                this.setBinder();
              }

              Binding.prototype.setBinder = function () {
                var identifier, regexp, value, _ref1;
                if (!(this.binder = this.view.binders[this.type])) {
                  _ref1 = this.view.binders;
                  for (identifier in _ref1) {
                    value = _ref1[identifier];
                    if (identifier !== "*" && identifier.indexOf("*") !== -1) {
                      regexp = new RegExp(
                        "^" + identifier.replace(/\*/g, ".+") + "$"
                      );
                      if (regexp.test(this.type)) {
                        this.binder = value;
                        this.args = new RegExp(
                          "^" + identifier.replace(/\*/g, "(.+)") + "$"
                        ).exec(this.type);
                        this.args.shift();
                      }
                    }
                  }
                }
                this.binder || (this.binder = this.view.binders["*"]);
                if (this.binder instanceof Function) {
                  return (this.binder = {
                    routine: this.binder,
                  });
                }
              };

              Binding.prototype.observe = function (obj, keypath, callback) {
                return Rivets.sightglass(obj, keypath, callback, {
                  root: this.view.rootInterface,
                  adapters: this.view.adapters,
                });
              };

              Binding.prototype.parseTarget = function () {
                var token;
                token = Rivets.TypeParser.parse(this.keypath);
                if (token.type === Rivets.TypeParser.types.primitive) {
                  return (this.value = token.value);
                } else {
                  this.observer = this.observe(
                    this.view.models,
                    this.keypath,
                    this.sync
                  );
                  return (this.model = this.observer.target);
                }
              };

              Binding.prototype.parseFormatterArguments = function (
                args,
                formatterIndex
              ) {
                var ai, arg, observer, processedArgs, _base, _i, _len;
                args = (function () {
                  var _i, _len, _results;
                  _results = [];
                  for (_i = 0, _len = args.length; _i < _len; _i++) {
                    arg = args[_i];
                    _results.push(Rivets.TypeParser.parse(arg));
                  }
                  return _results;
                })();
                processedArgs = [];
                for (ai = _i = 0, _len = args.length; _i < _len; ai = ++_i) {
                  arg = args[ai];
                  processedArgs.push(
                    arg.type === Rivets.TypeParser.types.primitive
                      ? arg.value
                      : ((_base = this.formatterObservers)[formatterIndex] ||
                        (_base[formatterIndex] = {}),
                        !(observer =
                          this.formatterObservers[formatterIndex][ai])
                          ? ((observer = this.observe(
                            this.view.models,
                            arg.value,
                            this.sync
                          )),
                            (this.formatterObservers[formatterIndex][ai] =
                              observer))
                          : void 0,
                        observer.value())
                  );
                }
                return processedArgs;
              };

              Binding.prototype.formattedValue = function (value) {
                var args,
                  fi,
                  formatter,
                  id,
                  processedArgs,
                  _i,
                  _len,
                  _ref1,
                  _ref2;
                _ref1 = this.formatters;
                for (fi = _i = 0, _len = _ref1.length; _i < _len; fi = ++_i) {
                  formatter = _ref1[fi];
                  args = formatter.match(
                    /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g
                  );
                  id = args.shift();
                  formatter = this.view.formatters[id];
                  processedArgs = this.parseFormatterArguments(args, fi);
                  if (
                    (formatter != null ? formatter.read : void 0) instanceof
                    Function
                  ) {
                    value = (_ref2 = formatter.read).call.apply(
                      _ref2,
                      [this.model, value].concat(__slice.call(processedArgs))
                    );
                  } else if (formatter instanceof Function) {
                    value = formatter.call.apply(
                      formatter,
                      [this.model, value].concat(__slice.call(processedArgs))
                    );
                  }
                }
                return value;
              };

              Binding.prototype.eventHandler = function (fn) {
                var binding, handler;
                handler = (binding = this).view.handler;
                return function (ev) {
                  return handler.call(fn, this, ev, binding);
                };
              };

              Binding.prototype.set = function (value) {
                var _ref1;
                value =
                  value instanceof Function &&
                    !this.binder["function"] &&
                    Rivets["public"].executeFunctions
                    ? this.formattedValue(value.call(this.model))
                    : this.formattedValue(value);
                return (_ref1 = this.binder.routine) != null
                  ? _ref1.call(this, this.el, value)
                  : void 0;
              };

              Binding.prototype.sync = function () {
                var dependency, observer;
                return this.set(
                  function () {
                    var _i, _j, _len, _len1, _ref1, _ref2, _ref3;
                    if (this.observer) {
                      if (this.model !== this.observer.target) {
                        _ref1 = this.dependencies;
                        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                          observer = _ref1[_i];
                          observer.unobserve();
                        }
                        this.dependencies = [];
                        if (
                          (this.model = this.observer.target) != null &&
                          ((_ref2 = this.options.dependencies) != null
                            ? _ref2.length
                            : void 0)
                        ) {
                          _ref3 = this.options.dependencies;
                          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                            dependency = _ref3[_j];
                            observer = this.observe(
                              this.model,
                              dependency,
                              this.sync
                            );
                            this.dependencies.push(observer);
                          }
                        }
                      }
                      return this.observer.value();
                    } else {
                      return this.value;
                    }
                  }.call(this)
                );
              };

              Binding.prototype.publish = function () {
                var args,
                  fi,
                  fiReversed,
                  formatter,
                  id,
                  lastformatterIndex,
                  processedArgs,
                  value,
                  _i,
                  _len,
                  _ref1,
                  _ref2,
                  _ref3;
                if (this.observer) {
                  value = this.getValue(this.el);
                  lastformatterIndex = this.formatters.length - 1;
                  _ref1 = this.formatters.slice(0).reverse();
                  for (
                    fiReversed = _i = 0, _len = _ref1.length;
                    _i < _len;
                    fiReversed = ++_i
                  ) {
                    formatter = _ref1[fiReversed];
                    fi = lastformatterIndex - fiReversed;
                    args = formatter.split(/\s+/);
                    id = args.shift();
                    processedArgs = this.parseFormatterArguments(args, fi);
                    if (
                      (_ref2 = this.view.formatters[id]) != null
                        ? _ref2.publish
                        : void 0
                    ) {
                      value = (_ref3 = this.view.formatters[id]).publish.apply(
                        _ref3,
                        [value].concat(__slice.call(processedArgs))
                      );
                    }
                  }
                  return this.observer.setValue(value);
                }
              };

              Binding.prototype.bind = function () {
                var dependency, observer, _i, _len, _ref1, _ref2, _ref3;
                this.parseTarget();
                if ((_ref1 = this.binder.bind) != null) {
                  _ref1.call(this, this.el);
                }
                if (
                  this.model != null &&
                  ((_ref2 = this.options.dependencies) != null
                    ? _ref2.length
                    : void 0)
                ) {
                  _ref3 = this.options.dependencies;
                  for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                    dependency = _ref3[_i];
                    observer = this.observe(this.model, dependency, this.sync);
                    this.dependencies.push(observer);
                  }
                }
                if (this.view.preloadData) {
                  return this.sync();
                }
              };

              Binding.prototype.unbind = function () {
                var ai,
                  args,
                  fi,
                  observer,
                  _i,
                  _len,
                  _ref1,
                  _ref2,
                  _ref3,
                  _ref4;
                if ((_ref1 = this.binder.unbind) != null) {
                  _ref1.call(this, this.el);
                }
                if ((_ref2 = this.observer) != null) {
                  _ref2.unobserve();
                }
                _ref3 = this.dependencies;
                for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                  observer = _ref3[_i];
                  observer.unobserve();
                }
                this.dependencies = [];
                _ref4 = this.formatterObservers;
                for (fi in _ref4) {
                  args = _ref4[fi];
                  for (ai in args) {
                    observer = args[ai];
                    observer.unobserve();
                  }
                }
                return (this.formatterObservers = {});
              };

              Binding.prototype.update = function (models) {
                var _ref1, _ref2;
                if (models == null) {
                  models = {};
                }
                this.model =
                  (_ref1 = this.observer) != null ? _ref1.target : void 0;
                return (_ref2 = this.binder.update) != null
                  ? _ref2.call(this, models)
                  : void 0;
              };

              Binding.prototype.getValue = function (el) {
                if (this.binder && this.binder.getValue != null) {
                  return this.binder.getValue.call(this, el);
                } else {
                  return Rivets.Util.getInputValue(el);
                }
              };

              return Binding;
            })();

            Rivets.ComponentBinding = (function (_super) {
              __extends(ComponentBinding, _super);

              function ComponentBinding(view, el, type) {
                var attribute,
                  bindingRegExp,
                  propertyName,
                  token,
                  _i,
                  _len,
                  _ref1,
                  _ref2;
                this.view = view;
                this.el = el;
                this.type = type;
                this.unbind = __bind(this.unbind, this);
                this.bind = __bind(this.bind, this);
                this.locals = __bind(this.locals, this);
                this.component = this.view.components[this.type];
                this["static"] = {};
                this.observers = {};
                this.upstreamObservers = {};
                bindingRegExp = view.bindingRegExp();
                _ref1 = this.el.attributes || [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  attribute = _ref1[_i];
                  if (!bindingRegExp.test(attribute.name)) {
                    propertyName = this.camelCase(attribute.name);
                    token = Rivets.TypeParser.parse(attribute.value);
                    if (
                      __indexOf.call(
                        (_ref2 = this.component["static"]) != null ? _ref2 : [],
                        propertyName
                      ) >= 0
                    ) {
                      this["static"][propertyName] = attribute.value;
                    } else if (
                      token.type === Rivets.TypeParser.types.primitive
                    ) {
                      this["static"][propertyName] = token.value;
                    } else {
                      this.observers[propertyName] = attribute.value;
                    }
                  }
                }
              }

              ComponentBinding.prototype.sync = function () { };

              ComponentBinding.prototype.update = function () { };

              ComponentBinding.prototype.publish = function () { };

              ComponentBinding.prototype.locals = function () {
                var key, observer, result, value, _ref1, _ref2;
                result = {};
                _ref1 = this["static"];
                for (key in _ref1) {
                  value = _ref1[key];
                  result[key] = value;
                }
                _ref2 = this.observers;
                for (key in _ref2) {
                  observer = _ref2[key];
                  result[key] = observer.value();
                }
                return result;
              };

              ComponentBinding.prototype.camelCase = function (string) {
                return string.replace(/-([a-z])/g, function (grouped) {
                  return grouped[1].toUpperCase();
                });
              };

              ComponentBinding.prototype.bind = function () {
                var k,
                  key,
                  keypath,
                  observer,
                  option,
                  options,
                  scope,
                  v,
                  _base,
                  _i,
                  _j,
                  _len,
                  _len1,
                  _ref1,
                  _ref2,
                  _ref3,
                  _ref4,
                  _ref5,
                  _ref6,
                  _ref7;
                if (!this.bound) {
                  _ref1 = this.observers;
                  for (key in _ref1) {
                    keypath = _ref1[key];
                    this.observers[key] = this.observe(
                      this.view.models,
                      keypath,
                      (function (_this) {
                        return function (key) {
                          return function () {
                            return (_this.componentView.models[key] =
                              _this.observers[key].value());
                          };
                        };
                      })(this).call(this, key)
                    );
                  }
                  this.bound = true;
                }
                if (this.componentView != null) {
                  this.componentView.bind();
                } else {
                  this.el.innerHTML = this.component.template.call(this);
                  scope = this.component.initialize.call(
                    this,
                    this.el,
                    this.locals()
                  );
                  this.el._bound = true;
                  options = {};
                  _ref2 = Rivets.extensions;
                  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                    option = _ref2[_i];
                    options[option] = {};
                    if (this.component[option]) {
                      _ref3 = this.component[option];
                      for (k in _ref3) {
                        v = _ref3[k];
                        options[option][k] = v;
                      }
                    }
                    _ref4 = this.view[option];
                    for (k in _ref4) {
                      v = _ref4[k];
                      if ((_base = options[option])[k] == null) {
                        _base[k] = v;
                      }
                    }
                  }
                  _ref5 = Rivets.options;
                  for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
                    option = _ref5[_j];
                    options[option] =
                      (_ref6 = this.component[option]) != null
                        ? _ref6
                        : this.view[option];
                  }
                  this.componentView = new Rivets.View(
                    Array.prototype.slice.call(this.el.childNodes),
                    scope,
                    options
                  );
                  this.componentView.bind();
                  _ref7 = this.observers;
                  for (key in _ref7) {
                    observer = _ref7[key];
                    this.upstreamObservers[key] = this.observe(
                      this.componentView.models,
                      key,
                      (function (_this) {
                        return function (key, observer) {
                          return function () {
                            return observer.setValue(
                              _this.componentView.models[key]
                            );
                          };
                        };
                      })(this).call(this, key, observer)
                    );
                  }
                }
              };

              ComponentBinding.prototype.unbind = function () {
                var key, observer, _ref1, _ref2, _ref3;
                _ref1 = this.upstreamObservers;
                for (key in _ref1) {
                  observer = _ref1[key];
                  observer.unobserve();
                }
                _ref2 = this.observers;
                for (key in _ref2) {
                  observer = _ref2[key];
                  observer.unobserve();
                }
                return (_ref3 = this.componentView) != null
                  ? _ref3.unbind.call(this)
                  : void 0;
              };

              return ComponentBinding;
            })(Rivets.Binding);

            Rivets.TextBinding = (function (_super) {
              __extends(TextBinding, _super);

              function TextBinding(view, el, type, keypath, options) {
                this.view = view;
                this.el = el;
                this.type = type;
                this.keypath = keypath;
                this.options = options != null ? options : {};
                this.sync = __bind(this.sync, this);
                this.formatters = this.options.formatters || [];
                this.dependencies = [];
                this.formatterObservers = {};
              }

              TextBinding.prototype.binder = {
                routine: function (node, value) {
                  return (node.data = value != null ? value : "");
                },
              };

              TextBinding.prototype.sync = function () {
                return TextBinding.__super__.sync.apply(this, arguments);
              };

              return TextBinding;
            })(Rivets.Binding);

            Rivets["public"].binders.text = function (el, value) {
              if (el.textContent != null) {
                return (el.textContent = value != null ? value : "");
              } else {
                return (el.innerText = value != null ? value : "");
              }
            };

            Rivets["public"].binders.html = function (el, value) {
              return (el.innerHTML = value != null ? value : "");
            };

            Rivets["public"].binders.show = function (el, value) {
              return (el.style.display = value ? "" : "none");
            };

            Rivets["public"].binders.hide = function (el, value) {
              return (el.style.display = value ? "none" : "");
            };

            Rivets["public"].binders.enabled = function (el, value) {
              return (el.disabled = !value);
            };

            Rivets["public"].binders.disabled = function (el, value) {
              return (el.disabled = !!value);
            };

            Rivets["public"].binders.checked = {
              publishes: true,
              priority: 2000,
              bind: function (el) {
                return Rivets.Util.bindEvent(el, "change", this.publish);
              },
              unbind: function (el) {
                return Rivets.Util.unbindEvent(el, "change", this.publish);
              },
              routine: function (el, value) {
                var _ref1;
                if (el.type === "radio") {
                  return (el.checked =
                    ((_ref1 = el.value) != null ? _ref1.toString() : void 0) ===
                    (value != null ? value.toString() : void 0));
                } else {
                  return (el.checked = !!value);
                }
              },
            };

            Rivets["public"].binders.unchecked = {
              publishes: true,
              priority: 2000,
              bind: function (el) {
                return Rivets.Util.bindEvent(el, "change", this.publish);
              },
              unbind: function (el) {
                return Rivets.Util.unbindEvent(el, "change", this.publish);
              },
              routine: function (el, value) {
                var _ref1;
                if (el.type === "radio") {
                  return (el.checked =
                    ((_ref1 = el.value) != null ? _ref1.toString() : void 0) !==
                    (value != null ? value.toString() : void 0));
                } else {
                  return (el.checked = !value);
                }
              },
            };

            Rivets["public"].binders.value = {
              publishes: true,
              priority: 3000,
              bind: function (el) {
                if (!(el.tagName === "INPUT" && el.type === "radio")) {
                  this.event = el.tagName === "SELECT" ? "change" : "input";
                  return Rivets.Util.bindEvent(el, this.event, this.publish);
                }
              },
              unbind: function (el) {
                if (!(el.tagName === "INPUT" && el.type === "radio")) {
                  return Rivets.Util.unbindEvent(el, this.event, this.publish);
                }
              },
              routine: function (el, value) {
                var o, _i, _len, _ref1, _ref2, _ref3, _results;
                if (el.tagName === "INPUT" && el.type === "radio") {
                  return el.setAttribute("value", value);
                } else if (window.jQuery != null) {
                  el = jQuery(el);
                  if (
                    (value != null ? value.toString() : void 0) !==
                    ((_ref1 = el.val()) != null ? _ref1.toString() : void 0)
                  ) {
                    return el.val(value != null ? value : "");
                  }
                } else {
                  if (el.type === "select-multiple") {
                    if (value != null) {
                      _results = [];
                      for (_i = 0, _len = el.length; _i < _len; _i++) {
                        o = el[_i];
                        _results.push(
                          (o.selected =
                            ((_ref2 = o.value),
                              __indexOf.call(value, _ref2) >= 0))
                        );
                      }
                      return _results;
                    }
                  } else if (
                    (value != null ? value.toString() : void 0) !==
                    ((_ref3 = el.value) != null ? _ref3.toString() : void 0)
                  ) {
                    return (el.value = value != null ? value : "");
                  }
                }
              },
            };

            Rivets["public"].binders["if"] = {
              block: true,
              priority: 4000,
              bind: function (el) {
                var attr, declaration;
                if (this.marker == null) {
                  attr = [this.view.prefix, this.type]
                    .join("-")
                    .replace("--", "-");
                  declaration = el.getAttribute(attr);
                  this.marker = document.createComment(
                    " rivets: " + this.type + " " + declaration + " "
                  );
                  this.bound = false;
                  el.removeAttribute(attr);
                  el.parentNode.insertBefore(this.marker, el);
                  return el.parentNode.removeChild(el);
                }
              },
              unbind: function () {
                if (this.nested) {
                  this.nested.unbind();
                  return (this.bound = false);
                }
              },
              routine: function (el, value) {
                var key, model, models, _ref1;
                if (!!value === !this.bound) {
                  if (value) {
                    models = {};
                    _ref1 = this.view.models;
                    for (key in _ref1) {
                      model = _ref1[key];
                      models[key] = model;
                    }
                    (
                      this.nested ||
                      (this.nested = new Rivets.View(
                        el,
                        models,
                        this.view.options()
                      ))
                    ).bind();
                    this.marker.parentNode.insertBefore(
                      el,
                      this.marker.nextSibling
                    );
                    return (this.bound = true);
                  } else {
                    el.parentNode.removeChild(el);
                    this.nested.unbind();
                    return (this.bound = false);
                  }
                }
              },
              update: function (models) {
                var _ref1;
                return (_ref1 = this.nested) != null
                  ? _ref1.update(models)
                  : void 0;
              },
            };

            Rivets["public"].binders.unless = {
              block: true,
              priority: 4000,
              bind: function (el) {
                return Rivets["public"].binders["if"].bind.call(this, el);
              },
              unbind: function () {
                return Rivets["public"].binders["if"].unbind.call(this);
              },
              routine: function (el, value) {
                return Rivets["public"].binders["if"].routine.call(
                  this,
                  el,
                  !value
                );
              },
              update: function (models) {
                return Rivets["public"].binders["if"].update.call(this, models);
              },
            };

            Rivets["public"].binders["on-*"] = {
              function: true,
              priority: 1000,
              unbind: function (el) {
                if (this.handler) {
                  return Rivets.Util.unbindEvent(
                    el,
                    this.args[0],
                    this.handler
                  );
                }
              },
              routine: function (el, value) {
                if (this.handler) {
                  Rivets.Util.unbindEvent(el, this.args[0], this.handler);
                }
                return Rivets.Util.bindEvent(
                  el,
                  this.args[0],
                  (this.handler = this.eventHandler(value))
                );
              },
            };

            Rivets["public"].binders["each-*"] = {
              block: true,
              priority: 4000,
              bind: function (el) {
                var attr, view, _i, _len, _ref1;
                if (this.marker == null) {
                  attr = [this.view.prefix, this.type]
                    .join("-")
                    .replace("--", "-");
                  this.marker = document.createComment(
                    " rivets: " + this.type + " "
                  );
                  this.iterated = [];
                  el.removeAttribute(attr);
                  el.parentNode.insertBefore(this.marker, el);
                  el.parentNode.removeChild(el);
                } else {
                  _ref1 = this.iterated;
                  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    view = _ref1[_i];
                    view.bind();
                  }
                }
              },
              unbind: function (el) {
                var view, _i, _len, _ref1;
                if (this.iterated != null) {
                  _ref1 = this.iterated;
                  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    view = _ref1[_i];
                    view.unbind();
                  }
                }
              },
              routine: function (el, collection) {
                var binding,
                  data,
                  i,
                  index,
                  key,
                  model,
                  modelName,
                  options,
                  previous,
                  template,
                  view,
                  _i,
                  _j,
                  _k,
                  _len,
                  _len1,
                  _len2,
                  _ref1,
                  _ref2,
                  _ref3;
                modelName = this.args[0];
                collection = collection || [];
                if (this.iterated.length > collection.length) {
                  _ref1 = Array(this.iterated.length - collection.length);
                  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    i = _ref1[_i];
                    view = this.iterated.pop();
                    view.unbind();
                    this.marker.parentNode.removeChild(view.els[0]);
                  }
                }
                for (
                  index = _j = 0, _len1 = collection.length;
                  _j < _len1;
                  index = ++_j
                ) {
                  model = collection[index];
                  data = {
                    index: index,
                  };
                  data[Rivets["public"].iterationAlias(modelName)] = index;
                  data[modelName] = model;
                  if (this.iterated[index] == null) {
                    _ref2 = this.view.models;
                    for (key in _ref2) {
                      model = _ref2[key];
                      if (data[key] == null) {
                        data[key] = model;
                      }
                    }
                    previous = this.iterated.length
                      ? this.iterated[this.iterated.length - 1].els[0]
                      : this.marker;
                    options = this.view.options();
                    options.preloadData = true;
                    template = el.cloneNode(true);
                    view = new Rivets.View(template, data, options);
                    view.bind();
                    this.iterated.push(view);
                    this.marker.parentNode.insertBefore(
                      template,
                      previous.nextSibling
                    );
                  } else if (this.iterated[index].models[modelName] !== model) {
                    this.iterated[index].update(data);
                  }
                }
                if (el.nodeName === "OPTION") {
                  _ref3 = this.view.bindings;
                  for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
                    binding = _ref3[_k];
                    if (
                      binding.el === this.marker.parentNode &&
                      binding.type === "value"
                    ) {
                      binding.sync();
                    }
                  }
                }
              },
              update: function (models) {
                var data, key, model, view, _i, _len, _ref1;
                data = {};
                for (key in models) {
                  model = models[key];
                  if (key !== this.args[0]) {
                    data[key] = model;
                  }
                }
                _ref1 = this.iterated;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  view = _ref1[_i];
                  view.update(data);
                }
              },
            };

            Rivets["public"].binders["class-*"] = function (el, value) {
              var elClass;
              elClass = " " + el.className + " ";
              if (
                !value ===
                (elClass.indexOf(" " + this.args[0] + " ") !== -1)
              ) {
                return (el.className = value
                  ? "" + el.className + " " + this.args[0]
                  : elClass.replace(" " + this.args[0] + " ", " ").trim());
              }
            };

            Rivets["public"].binders["*"] = function (el, value) {
              if (value != null) {
                return el.setAttribute(this.type, value);
              } else {
                return el.removeAttribute(this.type);
              }
            };

            Rivets["public"].formatters["call"] = function () {
              var args, value;
              (value = arguments[0]),
                (args =
                  2 <= arguments.length ? __slice.call(arguments, 1) : []);
              return value.call.apply(value, [this].concat(__slice.call(args)));
            };

            Rivets["public"].adapters["."] = {
              id: "_rv",
              counter: 0,
              weakmap: {},
              weakReference: function (obj) {
                var id, _base, _name;
                if (!obj.hasOwnProperty(this.id)) {
                  id = this.counter++;
                  Object.defineProperty(obj, this.id, {
                    value: id,
                  });
                }
                return (
                  (_base = this.weakmap)[(_name = obj[this.id])] ||
                  (_base[_name] = {
                    callbacks: {},
                  })
                );
              },
              cleanupWeakReference: function (ref, id) {
                if (!Object.keys(ref.callbacks).length) {
                  if (!(ref.pointers && Object.keys(ref.pointers).length)) {
                    return delete this.weakmap[id];
                  }
                }
              },
              stubFunction: function (obj, fn) {
                var map, original, weakmap;
                original = obj[fn];
                map = this.weakReference(obj);
                weakmap = this.weakmap;
                return (obj[fn] = function () {
                  var callback,
                    k,
                    r,
                    response,
                    _i,
                    _len,
                    _ref1,
                    _ref2,
                    _ref3,
                    _ref4;
                  response = original.apply(obj, arguments);
                  _ref1 = map.pointers;
                  for (r in _ref1) {
                    k = _ref1[r];
                    _ref4 =
                      (_ref2 =
                        (_ref3 = weakmap[r]) != null
                          ? _ref3.callbacks[k]
                          : void 0) != null
                        ? _ref2
                        : [];
                    for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                      callback = _ref4[_i];
                      callback();
                    }
                  }
                  return response;
                });
              },
              observeMutations: function (obj, ref, keypath) {
                var fn, functions, map, _base, _i, _len;
                if (Array.isArray(obj)) {
                  map = this.weakReference(obj);
                  if (map.pointers == null) {
                    map.pointers = {};
                    functions = [
                      "push",
                      "pop",
                      "shift",
                      "unshift",
                      "sort",
                      "reverse",
                      "splice",
                    ];
                    for (_i = 0, _len = functions.length; _i < _len; _i++) {
                      fn = functions[_i];
                      this.stubFunction(obj, fn);
                    }
                  }
                  if ((_base = map.pointers)[ref] == null) {
                    _base[ref] = [];
                  }
                  if (__indexOf.call(map.pointers[ref], keypath) < 0) {
                    return map.pointers[ref].push(keypath);
                  }
                }
              },
              unobserveMutations: function (obj, ref, keypath) {
                var idx, map, pointers;
                if (Array.isArray(obj) && obj[this.id] != null) {
                  if ((map = this.weakmap[obj[this.id]])) {
                    if ((pointers = map.pointers[ref])) {
                      if ((idx = pointers.indexOf(keypath)) >= 0) {
                        pointers.splice(idx, 1);
                      }
                      if (!pointers.length) {
                        delete map.pointers[ref];
                      }
                      return this.cleanupWeakReference(map, obj[this.id]);
                    }
                  }
                }
              },
              observe: function (obj, keypath, callback) {
                var callbacks, desc, value;
                callbacks = this.weakReference(obj).callbacks;
                if (callbacks[keypath] == null) {
                  callbacks[keypath] = [];
                  desc = Object.getOwnPropertyDescriptor(obj, keypath);
                  if (
                    !(
                      (desc != null ? desc.get : void 0) ||
                      (desc != null ? desc.set : void 0)
                    )
                  ) {
                    value = obj[keypath];
                    Object.defineProperty(obj, keypath, {
                      enumerable: true,
                      get: function () {
                        return value;
                      },
                      set: (function (_this) {
                        return function (newValue) {
                          var cb, map, _i, _len, _ref1;
                          if (newValue !== value) {
                            _this.unobserveMutations(
                              value,
                              obj[_this.id],
                              keypath
                            );
                            value = newValue;
                            if ((map = _this.weakmap[obj[_this.id]])) {
                              callbacks = map.callbacks;
                              if (callbacks[keypath]) {
                                _ref1 = callbacks[keypath].slice();
                                for (
                                  _i = 0, _len = _ref1.length;
                                  _i < _len;
                                  _i++
                                ) {
                                  cb = _ref1[_i];
                                  if (
                                    __indexOf.call(callbacks[keypath], cb) >= 0
                                  ) {
                                    cb();
                                  }
                                }
                              }
                              return _this.observeMutations(
                                newValue,
                                obj[_this.id],
                                keypath
                              );
                            }
                          }
                        };
                      })(this),
                    });
                  }
                }
                if (__indexOf.call(callbacks[keypath], callback) < 0) {
                  callbacks[keypath].push(callback);
                }
                return this.observeMutations(
                  obj[keypath],
                  obj[this.id],
                  keypath
                );
              },
              unobserve: function (obj, keypath, callback) {
                var callbacks, idx, map;
                if ((map = this.weakmap[obj[this.id]])) {
                  if ((callbacks = map.callbacks[keypath])) {
                    if ((idx = callbacks.indexOf(callback)) >= 0) {
                      callbacks.splice(idx, 1);
                      if (!callbacks.length) {
                        delete map.callbacks[keypath];
                        this.unobserveMutations(
                          obj[keypath],
                          obj[this.id],
                          keypath
                        );
                      }
                    }
                    return this.cleanupWeakReference(map, obj[this.id]);
                  }
                }
              },
              get: function (obj, keypath) {
                return obj[keypath];
              },
              set: function (obj, keypath, value) {
                return (obj[keypath] = value);
              },
            };

            Rivets.factory = function (sightglass) {
              Rivets.sightglass = sightglass;
              Rivets["public"]._ = Rivets;
              return Rivets["public"];
            };

            if (
              typeof (true && module !== null ? module.exports : void 0) ===
              "object"
            ) {
              module.exports = Rivets.factory(
                __webpack_require__(
                  /*! sightglass */ "./node_modules/sightglass/index.js"
                )
              );
            } else if (true) {
              !((__WEBPACK_AMD_DEFINE_ARRAY__ = [
                __webpack_require__(
                  /*! sightglass */ "./node_modules/sightglass/index.js"
                ),
              ]),
                (__WEBPACK_AMD_DEFINE_RESULT__ = function (sightglass) {
                  return (this.rivets = Rivets.factory(sightglass));
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
                __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else {
            }
          }).call(this);

          /* WEBPACK VAR INJECTION */
        }).call(
          this,
          __webpack_require__(
            /*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js"
          )(module)
        );

        /***/
      },

    /***/ "./node_modules/sightglass/index.js":
      /*!******************************************!*\
  !*** ./node_modules/sightglass/index.js ***!
  \******************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        (function () {
          // Public sightglass interface.
          function sightglass(obj, keypath, callback, options) {
            return new Observer(obj, keypath, callback, options);
          }

          // Batteries not included.
          sightglass.adapters = {};

          // Constructs a new keypath observer and kicks things off.
          function Observer(obj, keypath, callback, options) {
            this.options = options || {};
            this.options.adapters = this.options.adapters || {};
            this.obj = obj;
            this.keypath = keypath;
            this.callback = callback;
            this.objectPath = [];
            this.update = this.update.bind(this);
            this.parse();

            if (isObject((this.target = this.realize()))) {
              this.set(true, this.key, this.target, this.callback);
            }
          }

          // Tokenizes the provided keypath string into interface + path tokens for the
          // observer to work with.
          Observer.tokenize = function (keypath, interfaces, root) {
            var tokens = [];
            var current = { i: root, path: "" };
            var index, chr;

            for (index = 0; index < keypath.length; index++) {
              chr = keypath.charAt(index);

              if (!!~interfaces.indexOf(chr)) {
                tokens.push(current);
                current = { i: chr, path: "" };
              } else {
                current.path += chr;
              }
            }

            tokens.push(current);
            return tokens;
          };

          // Parses the keypath using the interfaces defined on the view. Sets variables
          // for the tokenized keypath as well as the end key.
          Observer.prototype.parse = function () {
            var interfaces = this.interfaces();
            var root, path;

            if (!interfaces.length) {
              error("Must define at least one adapter interface.");
            }

            if (!!~interfaces.indexOf(this.keypath[0])) {
              root = this.keypath[0];
              path = this.keypath.substr(1);
            } else {
              if (
                typeof (root = this.options.root || sightglass.root) ===
                "undefined"
              ) {
                error("Must define a default root adapter.");
              }

              path = this.keypath;
            }

            this.tokens = Observer.tokenize(path, interfaces, root);
            this.key = this.tokens.pop();
          };

          // Realizes the full keypath, attaching observers for every key and correcting
          // old observers to any changed objects in the keypath.
          Observer.prototype.realize = function () {
            var current = this.obj;
            var unreached = false;
            var prev;

            this.tokens.forEach(function (token, index) {
              if (isObject(current)) {
                if (typeof this.objectPath[index] !== "undefined") {
                  if (current !== (prev = this.objectPath[index])) {
                    this.set(false, token, prev, this.update);
                    this.set(true, token, current, this.update);
                    this.objectPath[index] = current;
                  }
                } else {
                  this.set(true, token, current, this.update);
                  this.objectPath[index] = current;
                }

                current = this.get(token, current);
              } else {
                if (unreached === false) {
                  unreached = index;
                }

                if ((prev = this.objectPath[index])) {
                  this.set(false, token, prev, this.update);
                }
              }
            }, this);

            if (unreached !== false) {
              this.objectPath.splice(unreached);
            }

            return current;
          };

          // Updates the keypath. This is called when any intermediary key is changed.
          Observer.prototype.update = function () {
            var next, oldValue;

            if ((next = this.realize()) !== this.target) {
              if (isObject(this.target)) {
                this.set(false, this.key, this.target, this.callback);
              }

              if (isObject(next)) {
                this.set(true, this.key, next, this.callback);
              }

              oldValue = this.value();
              this.target = next;

              // Always call callback if value is a function. If not a function, call callback only if value changed
              if (this.value() instanceof Function || this.value() !== oldValue)
                this.callback();
            }
          };

          // Reads the current end value of the observed keypath. Returns undefined if
          // the full keypath is unreachable.
          Observer.prototype.value = function () {
            if (isObject(this.target)) {
              return this.get(this.key, this.target);
            }
          };

          // Sets the current end value of the observed keypath. Calling setValue when
          // the full keypath is unreachable is a no-op.
          Observer.prototype.setValue = function (value) {
            if (isObject(this.target)) {
              this.adapter(this.key).set(this.target, this.key.path, value);
            }
          };

          // Gets the provided key on an object.
          Observer.prototype.get = function (key, obj) {
            return this.adapter(key).get(obj, key.path);
          };

          // Observes or unobserves a callback on the object using the provided key.
          Observer.prototype.set = function (active, key, obj, callback) {
            var action = active ? "observe" : "unobserve";
            this.adapter(key)[action](obj, key.path, callback);
          };

          // Returns an array of all unique adapter interfaces available.
          Observer.prototype.interfaces = function () {
            var interfaces = Object.keys(this.options.adapters);

            Object.keys(sightglass.adapters).forEach(function (i) {
              if (!~interfaces.indexOf(i)) {
                interfaces.push(i);
              }
            });

            return interfaces;
          };

          // Convenience function to grab the adapter for a specific key.
          Observer.prototype.adapter = function (key) {
            return this.options.adapters[key.i] || sightglass.adapters[key.i];
          };

          // Unobserves the entire keypath.
          Observer.prototype.unobserve = function () {
            var obj;

            this.tokens.forEach(function (token, index) {
              if ((obj = this.objectPath[index])) {
                this.set(false, token, obj, this.update);
              }
            }, this);

            if (isObject(this.target)) {
              this.set(false, this.key, this.target, this.callback);
            }
          };

          // Check if a value is an object than can be observed.
          function isObject(obj) {
            return typeof obj === "object" && obj !== null;
          }

          // Error thrower.
          function error(message) {
            throw new Error("[sightglass] " + message);
          }

          // Export module for Node and the browser.
          if (true && module.exports) {
            module.exports = sightglass;
          } else if (true) {
            !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
              (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return (this.sightglass = sightglass);
              }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
              __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {
          }
        }).call(this);

        /***/
      },

    /***/ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js":
      /*!*****************************************************************!*\
  !*** ./node_modules/smoothscroll-polyfill/dist/smoothscroll.js ***!
  \*****************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
        (function () {
          "use strict";

          // polyfill
          function polyfill() {
            // aliases
            var w = window;
            var d = document;

            // return if scroll behavior is supported and polyfill is not forced
            if (
              "scrollBehavior" in d.documentElement.style &&
              w.__forceSmoothScrollPolyfill__ !== true
            ) {
              return;
            }

            // globals
            var Element = w.HTMLElement || w.Element;
            var SCROLL_TIME = 468;

            // object gathering original scroll methods
            var original = {
              scroll: w.scroll || w.scrollTo,
              scrollBy: w.scrollBy,
              elementScroll: Element.prototype.scroll || scrollElement,
              scrollIntoView: Element.prototype.scrollIntoView,
            };

            // define timing method
            var now =
              w.performance && w.performance.now
                ? w.performance.now.bind(w.performance)
                : Date.now;

            /**
             * indicates if a the current browser is made by Microsoft
             * @method isMicrosoftBrowser
             * @param {String} userAgent
             * @returns {Boolean}
             */
            function isMicrosoftBrowser(userAgent) {
              var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];

              return new RegExp(userAgentPatterns.join("|")).test(userAgent);
            }

            /*
             * IE has rounding bug rounding down clientHeight and clientWidth and
             * rounding up scrollHeight and scrollWidth causing false positives
             * on hasScrollableSpace
             */
            var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent)
              ? 1
              : 0;

            /**
             * changes scroll position inside an element
             * @method scrollElement
             * @param {Number} x
             * @param {Number} y
             * @returns {undefined}
             */
            function scrollElement(x, y) {
              this.scrollLeft = x;
              this.scrollTop = y;
            }

            /**
             * returns result of applying ease math function to a number
             * @method ease
             * @param {Number} k
             * @returns {Number}
             */
            function ease(k) {
              return 0.5 * (1 - Math.cos(Math.PI * k));
            }

            /**
             * indicates if a smooth behavior should be applied
             * @method shouldBailOut
             * @param {Number|Object} firstArg
             * @returns {Boolean}
             */
            function shouldBailOut(firstArg) {
              if (
                firstArg === null ||
                typeof firstArg !== "object" ||
                firstArg.behavior === undefined ||
                firstArg.behavior === "auto" ||
                firstArg.behavior === "instant"
              ) {
                // first argument is not an object/null
                // or behavior is auto, instant or undefined
                return true;
              }

              if (
                typeof firstArg === "object" &&
                firstArg.behavior === "smooth"
              ) {
                // first argument is an object and behavior is smooth
                return false;
              }

              // throw error when behavior is not supported
              throw new TypeError(
                "behavior member of ScrollOptions " +
                firstArg.behavior +
                " is not a valid value for enumeration ScrollBehavior."
              );
            }

            /**
             * indicates if an element has scrollable space in the provided axis
             * @method hasScrollableSpace
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function hasScrollableSpace(el, axis) {
              if (axis === "Y") {
                return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
              }

              if (axis === "X") {
                return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
              }
            }

            /**
             * indicates if an element has a scrollable overflow property in the axis
             * @method canOverflow
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function canOverflow(el, axis) {
              var overflowValue = w.getComputedStyle(el, null)[
                "overflow" + axis
              ];

              return overflowValue === "auto" || overflowValue === "scroll";
            }

            /**
             * indicates if an element can be scrolled in either axis
             * @method isScrollable
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function isScrollable(el) {
              var isScrollableY =
                hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
              var isScrollableX =
                hasScrollableSpace(el, "X") && canOverflow(el, "X");

              return isScrollableY || isScrollableX;
            }

            /**
             * finds scrollable parent of an element
             * @method findScrollableParent
             * @param {Node} el
             * @returns {Node} el
             */
            function findScrollableParent(el) {
              while (el !== d.body && isScrollable(el) === false) {
                el = el.parentNode || el.host;
              }

              return el;
            }

            /**
             * self invoked function that, given a context, steps through scrolling
             * @method step
             * @param {Object} context
             * @returns {undefined}
             */
            function step(context) {
              var time = now();
              var value;
              var currentX;
              var currentY;
              var elapsed = (time - context.startTime) / SCROLL_TIME;

              // avoid elapsed times higher than one
              elapsed = elapsed > 1 ? 1 : elapsed;

              // apply easing to elapsed time
              value = ease(elapsed);

              currentX = context.startX + (context.x - context.startX) * value;
              currentY = context.startY + (context.y - context.startY) * value;

              context.method.call(context.scrollable, currentX, currentY);

              // scroll more if we have not reached our destination
              if (currentX !== context.x || currentY !== context.y) {
                w.requestAnimationFrame(step.bind(w, context));
              }
            }

            /**
             * scrolls window or element with a smooth behavior
             * @method smoothScroll
             * @param {Object|Node} el
             * @param {Number} x
             * @param {Number} y
             * @returns {undefined}
             */
            function smoothScroll(el, x, y) {
              var scrollable;
              var startX;
              var startY;
              var method;
              var startTime = now();

              // define scroll context
              if (el === d.body) {
                scrollable = w;
                startX = w.scrollX || w.pageXOffset;
                startY = w.scrollY || w.pageYOffset;
                method = original.scroll;
              } else {
                scrollable = el;
                startX = el.scrollLeft;
                startY = el.scrollTop;
                method = scrollElement;
              }

              // scroll looping over a frame
              step({
                scrollable: scrollable,
                method: method,
                startTime: startTime,
                startX: startX,
                startY: startY,
                x: x,
                y: y,
              });
            }

            // ORIGINAL METHODS OVERRIDES
            // w.scroll and w.scrollTo
            w.scroll = w.scrollTo = function () {
              // avoid action when no arguments are passed
              if (arguments[0] === undefined) {
                return;
              }

              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0]) === true) {
                original.scroll.call(
                  w,
                  arguments[0].left !== undefined
                    ? arguments[0].left
                    : typeof arguments[0] !== "object"
                      ? arguments[0]
                      : w.scrollX || w.pageXOffset,
                  // use top prop, second argument if present or fallback to scrollY
                  arguments[0].top !== undefined
                    ? arguments[0].top
                    : arguments[1] !== undefined
                      ? arguments[1]
                      : w.scrollY || w.pageYOffset
                );

                return;
              }

              // LET THE SMOOTHNESS BEGIN!
              smoothScroll.call(
                w,
                d.body,
                arguments[0].left !== undefined
                  ? ~~arguments[0].left
                  : w.scrollX || w.pageXOffset,
                arguments[0].top !== undefined
                  ? ~~arguments[0].top
                  : w.scrollY || w.pageYOffset
              );
            };

            // w.scrollBy
            w.scrollBy = function () {
              // avoid action when no arguments are passed
              if (arguments[0] === undefined) {
                return;
              }

              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0])) {
                original.scrollBy.call(
                  w,
                  arguments[0].left !== undefined
                    ? arguments[0].left
                    : typeof arguments[0] !== "object"
                      ? arguments[0]
                      : 0,
                  arguments[0].top !== undefined
                    ? arguments[0].top
                    : arguments[1] !== undefined
                      ? arguments[1]
                      : 0
                );

                return;
              }

              // LET THE SMOOTHNESS BEGIN!
              smoothScroll.call(
                w,
                d.body,
                ~~arguments[0].left + (w.scrollX || w.pageXOffset),
                ~~arguments[0].top + (w.scrollY || w.pageYOffset)
              );
            };

            // Element.prototype.scroll and Element.prototype.scrollTo
            Element.prototype.scroll = Element.prototype.scrollTo =
              function () {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) {
                  return;
                }

                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                  // if one number is passed, throw error to match Firefox implementation
                  if (
                    typeof arguments[0] === "number" &&
                    arguments[1] === undefined
                  ) {
                    throw new SyntaxError("Value could not be converted");
                  }

                  original.elementScroll.call(
                    this,
                    // use left prop, first number argument or fallback to scrollLeft
                    arguments[0].left !== undefined
                      ? ~~arguments[0].left
                      : typeof arguments[0] !== "object"
                        ? ~~arguments[0]
                        : this.scrollLeft,
                    // use top prop, second argument or fallback to scrollTop
                    arguments[0].top !== undefined
                      ? ~~arguments[0].top
                      : arguments[1] !== undefined
                        ? ~~arguments[1]
                        : this.scrollTop
                  );

                  return;
                }

                var left = arguments[0].left;
                var top = arguments[0].top;

                // LET THE SMOOTHNESS BEGIN!
                smoothScroll.call(
                  this,
                  this,
                  typeof left === "undefined" ? this.scrollLeft : ~~left,
                  typeof top === "undefined" ? this.scrollTop : ~~top
                );
              };

            // Element.prototype.scrollBy
            Element.prototype.scrollBy = function () {
              // avoid action when no arguments are passed
              if (arguments[0] === undefined) {
                return;
              }

              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0]) === true) {
                original.elementScroll.call(
                  this,
                  arguments[0].left !== undefined
                    ? ~~arguments[0].left + this.scrollLeft
                    : ~~arguments[0] + this.scrollLeft,
                  arguments[0].top !== undefined
                    ? ~~arguments[0].top + this.scrollTop
                    : ~~arguments[1] + this.scrollTop
                );

                return;
              }

              this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior,
              });
            };

            // Element.prototype.scrollIntoView
            Element.prototype.scrollIntoView = function () {
              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0]) === true) {
                original.scrollIntoView.call(
                  this,
                  arguments[0] === undefined ? true : arguments[0]
                );

                return;
              }

              // LET THE SMOOTHNESS BEGIN!
              var scrollableParent = findScrollableParent(this);
              var parentRects = scrollableParent.getBoundingClientRect();
              var clientRects = this.getBoundingClientRect();

              if (scrollableParent !== d.body) {
                // reveal element inside parent
                smoothScroll.call(
                  this,
                  scrollableParent,
                  scrollableParent.scrollLeft +
                  clientRects.left -
                  parentRects.left,
                  scrollableParent.scrollTop + clientRects.top - parentRects.top
                );

                // reveal parent in viewport unless is fixed
                if (w.getComputedStyle(scrollableParent).position !== "fixed") {
                  w.scrollBy({
                    left: parentRects.left,
                    top: parentRects.top,
                    behavior: "smooth",
                  });
                }
              } else {
                // reveal element in viewport
                w.scrollBy({
                  left: clientRects.left,
                  top: clientRects.top,
                  behavior: "smooth",
                });
              }
            };
          }

          if (true) {
            // commonjs
            module.exports = { polyfill: polyfill };
          } else {
          }
        })();

        /***/
      },

    /***/ "./node_modules/vanilla-lazyload/dist/lazyload.min.js":
      /*!************************************************************!*\
  !*** ./node_modules/vanilla-lazyload/dist/lazyload.min.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        !(function (n, t) {
          true ? (module.exports = t()) : undefined;
        })(this, function () {
          "use strict";
          function n() {
            return (
              (n =
                Object.assign ||
                function (n) {
                  for (var t = 1; t < arguments.length; t++) {
                    var e = arguments[t];
                    for (var i in e)
                      Object.prototype.hasOwnProperty.call(e, i) &&
                        (n[i] = e[i]);
                  }
                  return n;
                }),
              n.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            e =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = t && "IntersectionObserver" in window,
            o = t && "classList" in document.createElement("p"),
            a = t && window.devicePixelRatio > 1,
            r = {
              elements_selector: ".lazy",
              container: e || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            c = function (t) {
              return n({}, r, t);
            },
            l = function (n, t) {
              var e,
                i = "LazyLoad::Initialized",
                o = new n(t);
              try {
                e = new CustomEvent(i, { detail: { instance: o } });
              } catch (n) {
                (e = document.createEvent("CustomEvent")).initCustomEvent(
                  i,
                  !1,
                  !1,
                  { instance: o }
                );
              }
              window.dispatchEvent(e);
            },
            u = "src",
            s = "srcset",
            d = "sizes",
            f = "poster",
            _ = "llOriginalAttrs",
            g = "data",
            v = "loading",
            b = "loaded",
            m = "applied",
            p = "error",
            h = "native",
            E = "data-",
            I = "ll-status",
            y = function (n, t) {
              return n.getAttribute(E + t);
            },
            k = function (n) {
              return y(n, I);
            },
            w = function (n, t) {
              return (function (n, t, e) {
                var i = "data-ll-status";
                null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
              })(n, 0, t);
            },
            A = function (n) {
              return w(n, null);
            },
            L = function (n) {
              return null === k(n);
            },
            O = function (n) {
              return k(n) === h;
            },
            x = [v, b, m, p],
            C = function (n, t, e, i) {
              n &&
                (void 0 === i ? (void 0 === e ? n(t) : n(t, e)) : n(t, e, i));
            },
            N = function (n, t) {
              o
                ? n.classList.add(t)
                : (n.className += (n.className ? " " : "") + t);
            },
            M = function (n, t) {
              o
                ? n.classList.remove(t)
                : (n.className = n.className
                  .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                  .replace(/^\s+/, "")
                  .replace(/\s+$/, ""));
            },
            z = function (n) {
              return n.llTempImage;
            },
            T = function (n, t) {
              if (t) {
                var e = t._observer;
                e && e.unobserve(n);
              }
            },
            R = function (n, t) {
              n && (n.loadingCount += t);
            },
            G = function (n, t) {
              n && (n.toLoadCount = t);
            },
            j = function (n) {
              for (var t, e = [], i = 0; (t = n.children[i]); i += 1)
                "SOURCE" === t.tagName && e.push(t);
              return e;
            },
            D = function (n, t) {
              var e = n.parentNode;
              e && "PICTURE" === e.tagName && j(e).forEach(t);
            },
            H = function (n, t) {
              j(n).forEach(t);
            },
            V = [u],
            F = [u, f],
            B = [u, s, d],
            J = [g],
            P = function (n) {
              return !!n[_];
            },
            S = function (n) {
              return n[_];
            },
            U = function (n) {
              return delete n[_];
            },
            $ = function (n, t) {
              if (!P(n)) {
                var e = {};
                t.forEach(function (t) {
                  e[t] = n.getAttribute(t);
                }),
                  (n[_] = e);
              }
            },
            q = function (n, t) {
              if (P(n)) {
                var e = S(n);
                t.forEach(function (t) {
                  !(function (n, t, e) {
                    e ? n.setAttribute(t, e) : n.removeAttribute(t);
                  })(n, t, e[t]);
                });
              }
            },
            K = function (n, t, e) {
              N(n, t.class_applied),
                w(n, m),
                e &&
                (t.unobserve_completed && T(n, t),
                  C(t.callback_applied, n, e));
            },
            Q = function (n, t, e) {
              N(n, t.class_loading),
                w(n, v),
                e && (R(e, 1), C(t.callback_loading, n, e));
            },
            W = function (n, t, e) {
              e && n.setAttribute(t, e);
            },
            X = function (n, t) {
              W(n, d, y(n, t.data_sizes)),
                W(n, s, y(n, t.data_srcset)),
                W(n, u, y(n, t.data_src));
            },
            Y = {
              IMG: function (n, t) {
                D(n, function (n) {
                  $(n, B), X(n, t);
                }),
                  $(n, B),
                  X(n, t);
              },
              IFRAME: function (n, t) {
                $(n, V), W(n, u, y(n, t.data_src));
              },
              VIDEO: function (n, t) {
                H(n, function (n) {
                  $(n, V), W(n, u, y(n, t.data_src));
                }),
                  $(n, F),
                  W(n, f, y(n, t.data_poster)),
                  W(n, u, y(n, t.data_src)),
                  n.load();
              },
              OBJECT: function (n, t) {
                $(n, J), W(n, g, y(n, t.data_src));
              },
            },
            Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            nn = function (n, t) {
              !t ||
                (function (n) {
                  return n.loadingCount > 0;
                })(t) ||
                (function (n) {
                  return n.toLoadCount > 0;
                })(t) ||
                C(n.callback_finish, t);
            },
            tn = function (n, t, e) {
              n.addEventListener(t, e), (n.llEvLisnrs[t] = e);
            },
            en = function (n, t, e) {
              n.removeEventListener(t, e);
            },
            on = function (n) {
              return !!n.llEvLisnrs;
            },
            an = function (n) {
              if (on(n)) {
                var t = n.llEvLisnrs;
                for (var e in t) {
                  var i = t[e];
                  en(n, e, i);
                }
                delete n.llEvLisnrs;
              }
            },
            rn = function (n, t, e) {
              !(function (n) {
                delete n.llTempImage;
              })(n),
                R(e, -1),
                (function (n) {
                  n && (n.toLoadCount -= 1);
                })(e),
                M(n, t.class_loading),
                t.unobserve_completed && T(n, e);
            },
            cn = function (n, t, e) {
              var i = z(n) || n;
              on(i) ||
                (function (n, t, e) {
                  on(n) || (n.llEvLisnrs = {});
                  var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
                  tn(n, i, t), tn(n, "error", e);
                })(
                  i,
                  function (o) {
                    !(function (n, t, e, i) {
                      var o = O(t);
                      rn(t, e, i),
                        N(t, e.class_loaded),
                        w(t, b),
                        C(e.callback_loaded, t, i),
                        o || nn(e, i);
                    })(0, n, t, e),
                      an(i);
                  },
                  function (o) {
                    !(function (n, t, e, i) {
                      var o = O(t);
                      rn(t, e, i),
                        N(t, e.class_error),
                        w(t, p),
                        C(e.callback_error, t, i),
                        e.restore_on_error && q(t, B),
                        o || nn(e, i);
                    })(0, n, t, e),
                      an(i);
                  }
                );
            },
            ln = function (n, t, e) {
              !(function (n) {
                return Z.indexOf(n.tagName) > -1;
              })(n)
                ? (function (n, t, e) {
                  !(function (n) {
                    n.llTempImage = document.createElement("IMG");
                  })(n),
                    cn(n, t, e),
                    (function (n) {
                      P(n) ||
                        (n[_] = { backgroundImage: n.style.backgroundImage });
                    })(n),
                    (function (n, t, e) {
                      var i = y(n, t.data_bg),
                        o = y(n, t.data_bg_hidpi),
                        r = a && o ? o : i;
                      r &&
                        ((n.style.backgroundImage = 'url("'.concat(r, '")')),
                          z(n).setAttribute(u, r),
                          Q(n, t, e));
                    })(n, t, e),
                    (function (n, t, e) {
                      var i = y(n, t.data_bg_multi),
                        o = y(n, t.data_bg_multi_hidpi),
                        r = a && o ? o : i;
                      r && ((n.style.backgroundImage = r), K(n, t, e));
                    })(n, t, e),
                    (function (n, t, e) {
                      var i = y(n, t.data_bg_set);
                      if (i) {
                        var o = i.split("|"),
                          a = o.map(function (n) {
                            return "image-set(".concat(n, ")");
                          });
                        (n.style.backgroundImage = a.join()),
                          "" === n.style.backgroundImage &&
                          ((a = o.map(function (n) {
                            return "-webkit-image-set(".concat(n, ")");
                          })),
                            (n.style.backgroundImage = a.join())),
                          K(n, t, e);
                      }
                    })(n, t, e);
                })(n, t, e)
                : (function (n, t, e) {
                  cn(n, t, e),
                    (function (n, t, e) {
                      var i = Y[n.tagName];
                      i && (i(n, t), Q(n, t, e));
                    })(n, t, e);
                })(n, t, e);
            },
            un = function (n) {
              n.removeAttribute(u), n.removeAttribute(s), n.removeAttribute(d);
            },
            sn = function (n) {
              D(n, function (n) {
                q(n, B);
              }),
                q(n, B);
            },
            dn = {
              IMG: sn,
              IFRAME: function (n) {
                q(n, V);
              },
              VIDEO: function (n) {
                H(n, function (n) {
                  q(n, V);
                }),
                  q(n, F),
                  n.load();
              },
              OBJECT: function (n) {
                q(n, J);
              },
            },
            fn = function (n, t) {
              (function (n) {
                var t = dn[n.tagName];
                t
                  ? t(n)
                  : (function (n) {
                    if (P(n)) {
                      var t = S(n);
                      n.style.backgroundImage = t.backgroundImage;
                    }
                  })(n);
              })(n),
                (function (n, t) {
                  L(n) ||
                    O(n) ||
                    (M(n, t.class_entered),
                      M(n, t.class_exited),
                      M(n, t.class_applied),
                      M(n, t.class_loading),
                      M(n, t.class_loaded),
                      M(n, t.class_error));
                })(n, t),
                A(n),
                U(n);
            },
            _n = ["IMG", "IFRAME", "VIDEO"],
            gn = function (n) {
              return n.use_native && "loading" in HTMLImageElement.prototype;
            },
            vn = function (n, t, e) {
              n.forEach(function (n) {
                return (function (n) {
                  return n.isIntersecting || n.intersectionRatio > 0;
                })(n)
                  ? (function (n, t, e, i) {
                    var o = (function (n) {
                      return x.indexOf(k(n)) >= 0;
                    })(n);
                    w(n, "entered"),
                      N(n, e.class_entered),
                      M(n, e.class_exited),
                      (function (n, t, e) {
                        t.unobserve_entered && T(n, e);
                      })(n, e, i),
                      C(e.callback_enter, n, t, i),
                      o || ln(n, e, i);
                  })(n.target, n, t, e)
                  : (function (n, t, e, i) {
                    L(n) ||
                      (N(n, e.class_exited),
                        (function (n, t, e, i) {
                          e.cancel_on_exit &&
                            (function (n) {
                              return k(n) === v;
                            })(n) &&
                            "IMG" === n.tagName &&
                            (an(n),
                              (function (n) {
                                D(n, function (n) {
                                  un(n);
                                }),
                                  un(n);
                              })(n),
                              sn(n),
                              M(n, e.class_loading),
                              R(i, -1),
                              A(n),
                              C(e.callback_cancel, n, t, i));
                        })(n, t, e, i),
                        C(e.callback_exit, n, t, i));
                  })(n.target, n, t, e);
              });
            },
            bn = function (n) {
              return Array.prototype.slice.call(n);
            },
            mn = function (n) {
              return n.container.querySelectorAll(n.elements_selector);
            },
            pn = function (n) {
              return (function (n) {
                return k(n) === p;
              })(n);
            },
            hn = function (n, t) {
              return (function (n) {
                return bn(n).filter(L);
              })(n || mn(t));
            },
            En = function (n, e) {
              var o = c(n);
              (this._settings = o),
                (this.loadingCount = 0),
                (function (n, t) {
                  i &&
                    !gn(n) &&
                    (t._observer = new IntersectionObserver(
                      function (e) {
                        vn(e, n, t);
                      },
                      (function (n) {
                        return {
                          root: n.container === document ? null : n.container,
                          rootMargin: n.thresholds || n.threshold + "px",
                        };
                      })(n)
                    ));
                })(o, this),
                (function (n, e) {
                  t &&
                    ((e._onlineHandler = function () {
                      !(function (n, t) {
                        var e;
                        ((e = mn(n)), bn(e).filter(pn)).forEach(function (t) {
                          M(t, n.class_error), A(t);
                        }),
                          t.update();
                      })(n, e);
                    }),
                      window.addEventListener("online", e._onlineHandler));
                })(o, this),
                this.update(e);
            };
          return (
            (En.prototype = {
              update: function (n) {
                var t,
                  o,
                  a = this._settings,
                  r = hn(n, a);
                G(this, r.length),
                  !e && i
                    ? gn(a)
                      ? (function (n, t, e) {
                        n.forEach(function (n) {
                          -1 !== _n.indexOf(n.tagName) &&
                            (function (n, t, e) {
                              n.setAttribute("loading", "lazy"),
                                cn(n, t, e),
                                (function (n, t) {
                                  var e = Y[n.tagName];
                                  e && e(n, t);
                                })(n, t),
                                w(n, h);
                            })(n, t, e);
                        }),
                          G(e, 0);
                      })(r, a, this)
                      : ((o = r),
                        (function (n) {
                          n.disconnect();
                        })((t = this._observer)),
                        (function (n, t) {
                          t.forEach(function (t) {
                            n.observe(t);
                          });
                        })(t, o))
                    : this.loadAll(r);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  t &&
                  window.removeEventListener("online", this._onlineHandler),
                  mn(this._settings).forEach(function (n) {
                    U(n);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (n) {
                var t = this,
                  e = this._settings;
                hn(n, e).forEach(function (n) {
                  T(n, t), ln(n, e, t);
                });
              },
              restoreAll: function () {
                var n = this._settings;
                mn(n).forEach(function (t) {
                  fn(t, n);
                });
              },
            }),
            (En.load = function (n, t) {
              var e = c(t);
              ln(n, e);
            }),
            (En.resetStatus = function (n) {
              A(n);
            }),
            t &&
            (function (n, t) {
              if (t)
                if (t.length) for (var e, i = 0; (e = t[i]); i += 1) l(n, e);
                else l(n, t);
            })(En, window.lazyLoadOptions),
            En
          );
        });

        /***/
      },

    /***/ "./node_modules/webpack/buildin/global.js":
      /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        var g;

        // This works in non-strict mode
        g = (function () {
          return this;
        })();

        try {
          // This works if eval is allowed (see CSP)
          g = g || new Function("return this")();
        } catch (e) {
          // This works if the window reference is available
          if (typeof window === "object") g = window;
        }

        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}

        module.exports = g;

        /***/
      },

    /***/ "./node_modules/webpack/buildin/module.js":
      /*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        module.exports = function (module) {
          if (!module.webpackPolyfill) {
            module.deprecate = function () { };
            module.paths = [];
            // module.parent = undefined by default
            if (!module.children) module.children = [];
            Object.defineProperty(module, "loaded", {
              enumerable: true,
              get: function () {
                return module.l;
              },
            });
            Object.defineProperty(module, "id", {
              enumerable: true,
              get: function () {
                return module.i;
              },
            });
            module.webpackPolyfill = 1;
          }
          return module;
        };

        /***/
      },

    /***/ "./src/resources/scripts/Theme.js":
      /*!****************************************!*\
  !*** ./src/resources/scripts/Theme.js ***!
  \****************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return Theme;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var evx__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! evx */ "./node_modules/evx/dist/evx.es.js");
        /* harmony import */ var element_closest__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! element-closest */ "./node_modules/element-closest/index.mjs"
          );
        /* harmony import */ var _lib_Queue__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./lib/Queue */ "./src/resources/scripts/lib/Queue.js"
          );
        /* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./lib/Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );
        /* harmony import */ var _components_LazyLoad__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./components/LazyLoad */ "./src/resources/scripts/components/LazyLoad.js"
          );
        /* harmony import */ var _components_SlideToggleGroup__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./components/SlideToggleGroup */ "./src/resources/scripts/components/SlideToggleGroup.js"
          );
        /* harmony import */ var _components_BundleBuilder__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ./components/BundleBuilder */ "./src/resources/scripts/components/BundleBuilder.js"
          );
        /* harmony import */ var _components_ClassChange__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./components/ClassChange */ "./src/resources/scripts/components/ClassChange.js"
          );
        /* harmony import */ var _components_Marquee__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! ./components/Marquee */ "./src/resources/scripts/components/Marquee.js"
          );
        /* harmony import */ var _components_Tabs__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! ./components/Tabs */ "./src/resources/scripts/components/Tabs.js"
          );
        /* harmony import */ var _components_AddToCart__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! ./components/AddToCart */ "./src/resources/scripts/components/AddToCart.js"
          );
        /* harmony import */ var _components_Cart__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(
            /*! ./components/Cart */ "./src/resources/scripts/components/Cart.js"
          );
        /* harmony import */ var _components_SideCart__WEBPACK_IMPORTED_MODULE_13__ =
          __webpack_require__(
            /*! ./components/SideCart */ "./src/resources/scripts/components/SideCart.js"
          );
        /* harmony import */ var _components_ImageWithZoom__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(
            /*! ./components/ImageWithZoom */ "./src/resources/scripts/components/ImageWithZoom.js"
          );
        /* harmony import */ var _components_Product__WEBPACK_IMPORTED_MODULE_15__ =
          __webpack_require__(
            /*! ./components/Product */ "./src/resources/scripts/components/Product.js"
          );
        /* harmony import */ var _components_KeenSlider__WEBPACK_IMPORTED_MODULE_16__ =
          __webpack_require__(
            /*! ./components/KeenSlider */ "./src/resources/scripts/components/KeenSlider.js"
          );
        /* harmony import */ var _components_DeliveryDate__WEBPACK_IMPORTED_MODULE_17__ =
          __webpack_require__(
            /*! ./components/DeliveryDate */ "./src/resources/scripts/components/DeliveryDate.js"
          );
        /* harmony import */ var _components_Klaviyo__WEBPACK_IMPORTED_MODULE_18__ =
          __webpack_require__(
            /*! ./components/Klaviyo */ "./src/resources/scripts/components/Klaviyo.js"
          );
        /* harmony import */ var _components_LoadMore__WEBPACK_IMPORTED_MODULE_19__ =
          __webpack_require__(
            /*! ./components/LoadMore */ "./src/resources/scripts/components/LoadMore.js"
          );

        const { detect } = __webpack_require__(
          /*! detect-browser */ "./node_modules/detect-browser/es/index.js"
        );

        const components = {
          "bundle-builder":
            _components_BundleBuilder__WEBPACK_IMPORTED_MODULE_7__["default"],
          "image-with-zoom":
            _components_ImageWithZoom__WEBPACK_IMPORTED_MODULE_14__["default"],
          "lazy-load":
            _components_LazyLoad__WEBPACK_IMPORTED_MODULE_5__["default"],
          "toggle-group":
            _components_SlideToggleGroup__WEBPACK_IMPORTED_MODULE_6__[
            "default"
            ],
          "class-change":
            _components_ClassChange__WEBPACK_IMPORTED_MODULE_8__["default"],
          marquee: _components_Marquee__WEBPACK_IMPORTED_MODULE_9__["default"],
          tabs: _components_Tabs__WEBPACK_IMPORTED_MODULE_10__["default"],
          "add-to-cart":
            _components_AddToCart__WEBPACK_IMPORTED_MODULE_11__["default"],
          cart: _components_Cart__WEBPACK_IMPORTED_MODULE_12__["default"],
          "side-cart":
            _components_SideCart__WEBPACK_IMPORTED_MODULE_13__["default"],
          "keen-slider":
            _components_KeenSlider__WEBPACK_IMPORTED_MODULE_16__["default"],
          product: _components_Product__WEBPACK_IMPORTED_MODULE_15__["default"],
          "delivery-date":
            _components_DeliveryDate__WEBPACK_IMPORTED_MODULE_17__["default"],
          klaviyo: _components_Klaviyo__WEBPACK_IMPORTED_MODULE_18__["default"],
          "load-more-comp":
            _components_LoadMore__WEBPACK_IMPORTED_MODULE_19__["default"],
        };
        const options = {
          turbolinks: false,
        };
        const state = {
          eventQueue: new _lib_Queue__WEBPACK_IMPORTED_MODULE_3__["default"](),
          ajaxCache: [],
        };
        class Theme {
          constructor() {
            let ctx =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : state;
            let passedOptions =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            this._options = {
              ...passedOptions,
              ...options,
            };
            let themeInfoElem = document.querySelector(
              "[data-theme-information]"
            );
            if (themeInfoElem) {
              ctx = {
                ...ctx,
                ...JSON.parse(themeInfoElem.innerHTML),
              };
            }
            this._ctx = Object(evx__WEBPACK_IMPORTED_MODULE_1__["create"])(ctx);
            this._viewportEvent();
            this._bodyScrollListen();
            this._runHooks();
            this._browserDetect();
            this._components = [];
          }
          _browserDetect() {
            const browser = detect();
            if (browser) {
              document.body.classList.add(
                "browser--".concat(
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                    "default"
                  ].handleize(browser.name)
                )
              );
              document.body.classList.add(
                "os--".concat(
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                    "default"
                  ].handleize(browser.os)
                )
              );
            }
          }
          _viewportEvent() {
            window.addEventListener(
              "resize",
              () => {
                this._viewportLogic();
              },
              {
                passive: true,
              }
            );
            this._viewportLogic();
          }
          _bodyScrollListen() {
            const targetNode = document.body;
            const config = {
              attributes: true,
              childList: false,
              subtree: false,
            };
            const callback = function (mutationsList, observer) {
              document.documentElement.style.setProperty(
                "--scroll-gap-right",
                getComputedStyle(document.body).paddingRight
              );
            };
            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
          }
          _viewportLogic() {
            let vh = window.innerHeight * 0.01;
            let vw = document.body.clientWidth * 0.01;
            document.documentElement.style.setProperty(
              "--vh",
              "".concat(vh, "px")
            );
            document.documentElement.style.setProperty(
              "--vw",
              "".concat(vw, "px")
            );
          }
          mountComponents() {
            let container =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : document;
            for (let componentKey in components) {
              if (components.hasOwnProperty(componentKey)) {
                let selector = "[data-".concat(componentKey, "]");
                let elements = container.querySelectorAll(selector);
                for (let elem of elements) {
                  this.mountComponent(componentKey, componentKey, elem);
                }
              }
            }
            window.__Theme = this;
            window.__ThemeComponents = this._components;
            this._ctx.emit("mounted");
          }
          unmountComponents() {
            let container =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : document;
            for (var i = this._components.length - 1; i >= 0; i--) {
              let component = this._components[i];
              if (container.contains(component.elem)) {
                let componentObj = component.component;
                if (typeof componentObj.unmount === "function") {
                  componentObj.unmount();
                }
                component = null;
                componentObj = null;
                this._components.splice(i, 1);
              }
            }
          }
          mountComponent(type, dataAttr, elem) {
            let optionStr = elem.getAttribute("data-".concat(dataAttr)).trim();
            let options = {};
            if (optionStr.startsWith("{") || optionStr.startsWith("[")) {
              options = JSON.parse(optionStr);
            }
            let compInstance = new components[type](
              elem,
              this,
              options,
              this._ctx
            );
            this._components.push({
              type: type,
              elem: elem,
              id: compInstance._options.id,
              component: compInstance,
            });
            try {
              compInstance.mount();
            } catch (e) {
              console.error(
                "-----ERROR IN COMPONENT----- \ntype: ".concat(
                  type,
                  "\nelement and stack trace below:"
                )
              );
              console.error(elem);
              console.error(e);
            }
          }
          getOptions() {
            return this._options;
          }
          getComponent(id) {
            return this._components.find((component) => component.id === id);
          }
          getComponentByElem(elem) {
            return this._components.find(
              (component) => component.elem === elem
            );
          }
          _runHooks() {
            this._ctx.on("cart-item-added", (state) => {
              if (window.pintrk) {
                pintrk("track", "addtocart", {
                  value: state.lastItemAdded.item.price / 100.0,
                  order_quantity: state.lastItemAdded.quantity,
                });
              }
              if (window.fbq) {
                fbq("track", "AddToCart");
              }
            });
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/AddToCart.js":
      /*!*******************************************************!*\
  !*** ./src/resources/scripts/components/AddToCart.js ***!
  \*******************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return AddToCart;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../lib/AjaxApi */ "./src/resources/scripts/lib/AjaxApi.js"
          );

        class AddToCart extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
            this._options = {
              ...{
                redirect: null,
                addingText: "Adding...",
                addedText: null,
                waitFor: 1500,
              },
              ...this._options,
            };
            // for bundles

            this._variantIdElem2 = this._elem.querySelector('[name="id_2"]');
            this._variantIdElem = this._elem.querySelector('[name="id"]');
            this._sellingPlanIdElems = this._elem.querySelectorAll(
              '[name="selling_plan"]'
            );
            this._quantityElem = this._elem.querySelector('[name="quantity"]');
            this._submitElems =
              this._elem.nodeName === "FORM"
                ? this._elem.querySelectorAll('[type="submit"]')
                : [this._elem];
            this._propertyElems = this._elem.querySelectorAll(
              '[name^="properties"]'
            );
            this._extraProductsInput = this._elem.querySelector(
              "[data-extra-products]"
            );
            this._globalExtraProducts = document.querySelector(
              "[data-extra-atc-products]"
            )
              ? JSON.parse(
                document.querySelector("[data-extra-atc-products]").innerHTML
              )
              : [];
          }
          mount() {
            console.log("AddToCart.js 13", this._elem, this);
            this._addListeners();
            document
              .getElementById("bundleSubmitButton")
              .addEventListener("click", function (e) {
                e.preventDefault(); //stop form from submitting
              });

            this._elem.addEventListener("submit", async (e) => {
              console.log("clicked form");
              e.preventDefault();
            });
          }
          _getProperties() {
            let properties = {};
            let propElems = Array.from(this._propertyElems).filter(
              (elem) => !elem.hasAttribute("disabled") && elem.value.length > 0
            );
            for (let elem of propElems) {
              properties[
                elem.getAttribute("name").match(/^properties\[(.+)\]$/)[1]
              ] = elem.value;
            }
            if (propElems.length === 0 && this._elem.dataset.properties) {
              properties = JSON.parse(this._elem.dataset.properties);
            }
            return properties;
          }
          _addListeners() {
            console.log("_addListeners", this._elem);
            let event = null;
            if (this._elem.nodeName === "FORM") {
              event = "submit";
              console.log("submit");
            } else {
              event = "click";
              console.log("click");
            }
            console.log(event);
            this._elem.addEventListener(event, async (e) => {
              console.log("clicked form");
              e.preventDefault();
              //let originalText = this._submitElem.innerHTML
              //this._submitElem.innerHTML = this._options.addingText
              for (let elem of this._submitElems) {
                elem.classList.add("bb--adding-to-cart");
              }
              let variantId = this._variantIdElem
                ? this._variantIdElem.value
                : this._elem.dataset.variantId;
              let quantity = this._quantityElem
                ? Number(this._quantityElem.value)
                : Number(this._elem.dataset.quantity);
              let variantId2 = this._variantIdElem2
                ? this._variantIdElem2.value
                : this._elem.dataset.variantId;
              let selling_plan = this._elem.dataset.sellingPlan || "";
              if (this._sellingPlanIdElems) {
                for (let elem of this._sellingPlanIdElems) {
                  if (elem.checked) {
                    selling_plan = elem.value;
                  }
                }
              }
              let properties = this._getProperties();
              let items = [
                {
                  id: variantId,
                  quantity: quantity,
                  properties: properties,
                  selling_plan: selling_plan,
                },
              ];
              if (this._quantityElem2 != "") {
                items.push({
                  id: variantId2,
                  quantity: quantity,
                  properties: properties,
                  selling_plan: selling_plan,
                });
              }

              // Add extra products to every atc (if quantity is less)
              if (this._globalExtraProducts.length) {
                let cart = await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_2__[
                  "default"
                ].getCart();
                let globalProductsToAdd = this._globalExtraProducts
                  .filter((product) => {
                    let item = cart.items.find(
                      (item) =>
                        "".concat(item.variant_id) === "".concat(product.id)
                    );
                    if (item && item.quantity >= product.quantity) {
                      return false;
                    }
                    return true;
                  })
                  .map((product) => {
                    let item = cart.items.find(
                      (item) =>
                        "".concat(item.variant_id) === "".concat(product.id)
                    );
                    if (item && item.quantity < product.quantity) {
                      product.quantity -= item.quantity;
                    }
                    return product;
                  });
                items = [...globalProductsToAdd, ...items];
              }
              if (this._extraProductsInput && this._extraProductsInput.value) {
                let extraProducts = JSON.parse(this._extraProductsInput.value);
                for (let prod of extraProducts) {
                  items.push({
                    id: prod.id,
                    quantity: Number(prod.quantity || 1),
                    properties: prod.properties || {},
                    selling_plan: prod.selling_plan,
                  });
                }
              }
              let data = await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_2__[
                "default"
              ].addToCart({
                items: items,
              });
              for (let item of data.items) {
                let matching = items.find(
                  (it) => "".concat(it.id) === "".concat(item.variant_id)
                );
                this._ctx.emit("cart-atc", null, {
                  item: item,
                  quantity: matching.quantity,
                  properties: matching.properties,
                });
              }
              this._ctx.emit("cart-item-added", {
                lastItemAdded: {
                  item: data,
                  quantity: quantity,
                  properties: properties,
                },
              });
              document.dispatchEvent(
                new CustomEvent("bb--cart-item-added", {
                  detail: {
                    product: data.items[0],
                    quantity: quantity,
                  },
                })
              );
              if (!this._options.redirect) {
                for (let elem of this._submitElems) {
                  elem.classList.remove("bb--adding-to-cart");
                  elem.classList.add("bb--added-to-cart");
                }
                //this._submitElem.innerHTML = this._options.addedText

                setTimeout(() => {
                  //this._submitElem.innerHTML = originalText
                  for (let elem of this._submitElems) {
                    elem.classList.remove("bb--added-to-cart");
                  }
                }, this._options.waitFor);
              }
              if (this._options.redirect) {
                window.location = this._options.redirect;
              }
            });
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/BundleBuilder.js":
      /*!***********************************************************!*\
  !*** ./src/resources/scripts/components/BundleBuilder.js ***!
  \***********************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return BundleBuilder;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../lib/AjaxApi */ "./src/resources/scripts/lib/AjaxApi.js"
          );
        /* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );

        let rivets = null;
        class BundleBuilder extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
            this._jsonElems = this._elem.querySelectorAll(
              "[data-bundle-builder-json]"
            );
            this._data = {
              ...{
                loading: true,
                addingItems: false,
                stages: [],
                current_step: 0,
                cart: {
                  items: [],
                  item_count: 0,
                },
                all_products_to_display: [],
                products_to_display: [],
                products_to_recommend: {},
                selected_products:
                  localStorage.BB_SAVED_BUNDLE &&
                    localStorage.BB_SAVED_BUNDLE.length > 0
                    ? JSON.parse(localStorage.BB_SAVED_BUNDLE)
                    : [],
                display_results: {},
                ometria: {},
                saved_for_later:
                  localStorage.BB_SAVED_BUNDLE &&
                    localStorage.BB_SAVED_BUNDLE.length > 0
                    ? true
                    : false,
                overflow_type: this._elem.querySelector("[data-overflow-type]")
                  .dataset.overflowType,
                svgs: {
                  tick: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m19.19 5.812-.188-.165-.165.188-9.459 10.743-4.197-4.968-.162-.191-.19.162-.99.839-.191.161.161.19 5.355 6.34.187.222.192-.217L20.188 7.023l.165-.187-.188-.166-.976-.858z" fill="#7FA17E" stroke="#7FA17E" stroke-width=".5"/></svg>',
                },
              },
            };
            this._binded = null;
          }
          _binders() {
            rivets.formatters.eq = (arg1, arg2) => {
              return arg1 === arg2;
            };
            rivets.formatters.add = function (target, val) {
              return target + val;
            };
            rivets.formatters.money = (value) => {
              if (value > 0) {
                return _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].formatMoney(value, this._ctx.getState().moneyFormat);
              } else {
                return this._ctx.getState().locale.free;
              }
            };
            rivets.formatters.getSizedImage = (src, size) => {
              return src
                ? _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].getSizedImageUrl(src, size)
                : "";
            };
            rivets.formatters.getTick = (value, message) => {
              return value && message
                ? value.toLowerCase() === message.toLowerCase()
                  ? this._data.svgs.tick
                  : ""
                : value;
            };
            rivets.formatters.not = (value) => {
              return !value;
            };
          }
          async mount() {
            this._doEditorListeners();
            rivets = await Promise.resolve(/*! import() */).then(
              __webpack_require__.t.bind(
                null,
                /*! rivets */ "./node_modules/rivets/dist/rivets.js",
                7
              )
            );
            for (let jsonElem of this._jsonElems) {
              this._data.stages.push(JSON.parse(jsonElem.innerHTML));
            }
            this._binders();
            this._data = await this._prepareData(this._data);
            this._binded = rivets.bind(this._elem, this._getModel());
            this._elem.classList.add("rendered");
            if (this._data.selected_products.length > 0) {
              await this._prepareResults(this._data);
              this._prepareCart(this._data);
              this._data.current_stage = this._data.stages[3];
            }
          }
          _doEditorListeners() {
            document.addEventListener("shopify:section:select", (e) => {
              let currentStepObj = JSON.parse(
                e.target.querySelector("[data-bundle-builder-json]").innerHTML
              );
              this._data.currentStep = currentStepObj.currentStep;
              this._data.currentStepObj =
                this._data.steps[this._data.currentStep];
              if (this._data.overflow_type == "slider") {
                document.dispatchEvent(new Event("BB-slider-reinit"));
              }
            });
            document.addEventListener("shopify:section:deselect", (e) => {
              this._data.currentStep = 0;
              this._data.currentStepObj =
                this._data.steps[this._data.currentStep];
              if (this._data.overflow_type == "slider") {
                document.dispatchEvent(new Event("BB-slider-reinit"));
              }
            });
          }
          async _prepareData(data) {
            data.current_stage = this._data.stages[0];
            data.current_step_title = this._data.stages[2].steps[0].step_title;
            data.current_step_is_required =
              this._data.stages[2].steps[0].is_required;
            data.current_step_header_title =
              this._data.stages[2].steps[0].header_title;
            data.stages[2].header.title = data.current_step_header_title;
            // data.stages[2].header.text = 'Step ' + (data.current_step + 1) + '  / ' + this._data.stages[2].steps.length
            data.stages[2].header.text = "";
            data.total_steps = this._data.stages[2].steps.length - 1;
            let products_to_display_handles = [];
            let all_products_to_display = [];
            let products_to_display = [];
            let promises = [];
            for (let step of data.stages[2].steps) {
              products_to_display = [];
              products_to_display_handles = step.products_to_compare;
              for (let [
                index,
                product_handle,
              ] of products_to_display_handles.entries()) {
                promises.push(
                  new Promise(async (res, rej) => {
                    try {
                      let handle = product_handle.product_handle;
                      let variant = product_handle.product_variant;
                      let productData =
                        await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_2__[
                          "default"
                        ].getCustomProduct(handle);
                      productData.step = step;
                      if (variant) {
                        productData.variant = variant;
                      }
                      products_to_display[index] = productData;
                      res();
                    } catch (e) {
                      rej(e);
                    }
                  })
                );
              }
              products_to_display = products_to_display.filter(Boolean);
              await Promise.all(promises);
              all_products_to_display.push(products_to_display);
            }
            data.all_products_to_display = all_products_to_display;
            data.products_to_display = all_products_to_display[0];
            data.loading = false;
            if (this._data.overflow_type == "slider") {
              document.dispatchEvent(new Event("BB-slider-reinit"));
            }
            console.log(data);
            return data;
          }
          _getModel() {
            return {
              data: this._data,
              controller: {
                nextStage: (e, model) => {
                  e.preventDefault();
                  let currentStageOrder = model.data.current_stage.stage_order;
                  let nextStageOrder = currentStageOrder + 1;

                  // assign recommended products after answere were selected
                  if (nextStageOrder == 2) {
                    for (let [prod_step, prod_handle] of Object.entries(
                      model.data.products_to_recommend
                    )) {
                      for (let item of model.data.all_products_to_display) {
                        for (let subitem of item) {
                          if (
                            subitem.step.step == prod_step &&
                            subitem.product.handle == prod_handle
                          ) {
                            subitem.recommended = true;
                          }
                        }
                      }
                    }
                  }
                  if (this._data.overflow_type == "slider") {
                    document.dispatchEvent(new Event("BB-slider-unmount"));
                  }
                  model.data.current_stage = model.data.stages[nextStageOrder]
                    ? model.data.stages[nextStageOrder]
                    : model.data.stages[currentStageOrder];
                  if (this._data.overflow_type == "slider") {
                    document.dispatchEvent(new Event("BB-slider-mount"));
                  } else {
                    this._doubleScroll();
                  }
                  console.log(model.data);
                },
                nextStageResults: async (e, model) => {
                  e.preventDefault();
                  await this._prepareResults(model.data);
                  this._prepareCart(model.data);
                  model.data.current_stage = model.data.stages[3];
                },
                nextStep: (e, model) => {
                  e.preventDefault();
                  if (this._data.overflow_type == "slider") {
                    document.dispatchEvent(new Event("BB-slider-unmount"));
                  }
                  let current_step = model.data.current_step;
                  let next_step = current_step + 1;
                  model.data.products_to_display =
                    model.data.all_products_to_display[next_step];
                  model.data.current_step = model.data.current_stage.questions[
                    next_step
                  ]
                    ? next_step
                    : current_step;
                  model.data.current_step_title = model.data.current_stage
                    .steps[next_step]
                    ? model.data.current_stage.steps[next_step].step_title
                    : model.data.current_step_title;
                  model.data.current_step_is_required = model.data.current_stage
                    .steps[next_step]
                    ? model.data.current_stage.steps[next_step].is_required
                    : model.data.current_step_is_required;
                  model.data.current_step_header_title = model.data
                    .current_stage.steps[next_step]
                    ? model.data.current_stage.steps[next_step].header_title
                    : model.data.current_step_header_title;
                  model.data.current_stage.header.title =
                    model.data.current_step_header_title;
                  // model.data.current_stage.header.text = 'Step ' + (model.data.current_step + 1) + '  / ' + model.data.current_stage.steps.length
                  model.data.current_stage.header.text = "";
                  model.data.current_stage.selected_product = {};
                  if (this._data.overflow_type == "slider") {
                    document.dispatchEvent(new Event("BB-slider-mount"));
                  } else {
                    this._doubleScroll();
                  }
                  for (let radio of document.querySelectorAll(
                    '.bundle-builder-product-item input[type="radio"]'
                  )) {
                    radio.checked = false;
                  }
                },
                setAnswer: (e, model) => {
                  let prod = e.target.value;
                  let product_handle = prod.split("|")[0];
                  let step = prod.split("|")[1];
                  model.data.products_to_recommend[step] = "";
                  model.data.products_to_recommend[step] = product_handle;
                  model.data.current_stage.all_answers_checked = false;
                  if (
                    Object.keys(model.data.products_to_recommend).length >=
                    model.data.current_stage.questions.length
                  )
                    model.data.current_stage.all_answers_checked = true;
                },
                setSelectedProduct: (e, model) => {
                  let product_handle = e.target.value;
                  let product_title = e.target.dataset.productTitle;
                  let product_step = model.data.current_step;
                  let product_variant = e.target.dataset.productVariant;
                  let set_obj = model.data.current_stage.steps[product_step];
                  set_obj.selected_handle = product_handle;
                  model.data.current_stage.selected_product = {};
                  model.data.current_stage.selected_product.handle =
                    product_handle;
                  model.data.current_stage.selected_product.title =
                    product_title;
                  model.data.current_stage.selected_product.step = product_step;
                  model.data.current_stage.selected_product.variant =
                    product_variant;
                  let selected_product = {
                    product_handle: product_handle,
                    product_title: product_title,
                    product_step: product_step,
                    product_variant: product_variant,
                  };
                  if (e.target.checked == true) {
                    model.data.selected_products =
                      model.data.selected_products.filter(
                        (prod) => prod.product_step !== product_step
                      );
                    model.data.selected_products.push(selected_product);
                  } else {
                    let i =
                      model.data.selected_products.indexOf(selected_product);
                    if (i > -1) {
                      model.data.selected_products.splice(i, 1);
                    }
                  }
                },
                returnToStep: async (e, model) => {
                  if (this._data.overflow_type == "slider") {
                    document.dispatchEvent(new Event("BB-slider-unmount"));
                  }
                  let stage = model.data.stages[2];
                  let step = Number(
                    e.target.closest(".bundle-builder-item").dataset
                      .questionStep
                  );
                  model.data.saved_for_later = false;
                  model.data.selected_products.length = step;
                  model.data.display_results = {};
                  stage.selected_product = {};
                  model.data.current_stage = stage;
                  model.data.current_step = step;
                  model.data.current_step_title = stage.steps[step].step_title;
                  model.data.current_step_is_required =
                    stage.steps[step].is_required;
                  model.data.current_step_header_title =
                    stage.steps[step].header_title;
                  model.data.stages[2].header.title =
                    model.data.current_step_header_title;
                  model.data.stages[2].header.text =
                    "Step " + (step + 1) + "  / " + stage.steps.length;
                  model.data.products_to_display =
                    model.data.all_products_to_display[step];
                  if (this._data.overflow_type == "slider") {
                    document.dispatchEvent(new Event("BB-slider-mount"));
                  } else {
                    this._doubleScroll();
                  }
                  let radios = this._elem.querySelectorAll(
                    ".bundle-builder-product-item input[data-product-variant]"
                  );
                  for (let radio of radios) {
                    radio.checked = false;
                    radio.dispatchEvent(new Event("change"));
                  }
                  console.log(model.data);
                },
                saveForLater: async (e, model) => {
                  localStorage.BB_SAVED_BUNDLE = JSON.stringify(
                    model.data.selected_products
                  );
                  this._data.saved_for_later = true;
                  this._ctx.emit("BB-builder-builder-save");
                },
                startAgain: (e, model) => {
                  e.preventDefault();
                  localStorage.removeItem("BB_SAVED_BUNDLE");
                  window.scrollTo(0, 0);
                  location.reload();
                },
                addToCart: async (e, model) => {
                  e.preventDefault();
                  this._data.addingItems = true;
                  let itemsToAdd = {
                    items: [],
                  };
                  for (let item of model.data.display_results.products) {
                    let cartItem = {};
                    let variant =
                      item.product.variants.find(
                        (variant) => variant.price === item.product.price_max
                      ) || item.product.variants[0];
                    let variant_id = variant.id;
                    console.log("++");
                    console.log(item);
                    if (item.variant) {
                      for (let variant of item.product.variants) {
                        if (variant.id == item.variant && variant.available) {
                          variant_id = item.variant;
                        }
                      }
                    }
                    console.log(variant_id);
                    cartItem.id = variant_id;
                    cartItem.quantity = 1;
                    cartItem.properties = {
                      "_bundle-text": this._options.bundleText,
                    };
                    itemsToAdd.items.push(cartItem);
                  }
                  await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_2__[
                    "default"
                  ].addToCart(itemsToAdd);
                  model.data.ometria["coprobdate"] = new Date();
                  localStorage.removeItem("BB_SAVED_BUNDLE");
                  localStorage.setItem(
                    "BB_OMETRIA_BUNDLE",
                    JSON.stringify(model.data.ometria)
                  );
                  this._ctx.emit("cart-item-added");
                  this._ctx.on("cart-item-added--refreshed", () => {
                    this._data.addingItems = false;
                    model.data.cart.items = [];
                    model.data.cart.item_count = 0;
                  });
                },
              },
            };
          }
          async _prepareResults(data) {
            let results = [];
            let promises = [];
            for (let [index, product] of data.selected_products.entries()) {
              promises.push(
                new Promise(async (res, rej) => {
                  try {
                    let handle = product.product_handle;
                    let variant = product.product_variant;
                    let productData =
                      await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_2__[
                        "default"
                      ].getCustomProduct(handle);
                    if (variant) {
                      productData.variant = variant;
                    }
                    productData.step = product.product_step;
                    results[index] = productData;
                    res();
                  } catch (e) {
                    rej(e);
                  }
                })
              );
            }
            results = results.filter(Boolean);
            await Promise.all(promises);
            data.display_results.products = results;
          }
          _prepareCart(data) {
            let total_price = 0;
            for (let item of data.display_results.products) {
              if (item.variant) {
                for (let variant of item.product.variants) {
                  if (variant.id == item.variant && variant.available) {
                    total_price += variant.price;
                  }
                }
              } else {
                total_price += item.product.variants[0].price;
              }
            }
            data.display_results.total_price = total_price;
            data.display_results.total_save =
              (data.stages[3].discount_percent / 100) * total_price;
            data.display_results.total_price_discounted =
              total_price - data.display_results.total_save;
            data.display_results.total_save_percents =
              data.stages[3].discount_percent;
          }
          _doubleScroll() {
            let element = document.querySelector(".products-slider");
            let scrollbar = document.querySelector(".details-slider");
            if (!scrollbar || !element) return;
            scrollbar.style.width = element.scrollWidth + "px";
            scrollbar.classList.add("double-scrollbar");
            scrollbar.appendChild(document.createTextNode("\xA0"));
            scrollbar.onscroll = function () {
              element.scrollLeft = scrollbar.scrollLeft;
            };
            element.onscroll = function () {
              scrollbar.scrollLeft = element.scrollLeft;
            };
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/Cart.js":
      /*!**************************************************!*\
  !*** ./src/resources/scripts/components/Cart.js ***!
  \**************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js"
          );
        /* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var rivets__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! rivets */ "./node_modules/rivets/dist/rivets.js"
          );
        /* harmony import */ var rivets__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            rivets__WEBPACK_IMPORTED_MODULE_3__
          );
        /* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );
        /* harmony import */ var _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../lib/AjaxApi */ "./src/resources/scripts/lib/AjaxApi.js"
          );

        class Cart extends _inherited_Component__WEBPACK_IMPORTED_MODULE_2__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
            this._setup();
            this._doEditorListeners();
          }
          _setup() {
            this._data = {
              cart: {},
              samplesLoading: true,
              hasFreeGift1: false,
              hasFreeGift2: false,
              hasFreeGift3: false,
            };
            this._upsellAdded = false;
            this._upsellHandles = [];
            this._upsellOptions = document.querySelector(
              "[data-upsell-options]"
            )
              ? JSON.parse(
                document.querySelector("[data-upsell-options]").innerHTML
              )
              : {
                enabled: false,
                limit: 5,
                handles: [],
              };
            this._upsellOptions.handles = this._upsellOptions.handles.map(
              (item) => {
                return {
                  handle: item,
                };
              }
            );
            this._shippingThresholdOptions = document.querySelector(
              "[data-shipping-threshold-options]"
            )
              ? JSON.parse(
                document.querySelector("[data-shipping-threshold-options]")
                  .innerHTML
              )
              : {
                enabled: false,
              };
            this._shippingThresholdOptions2 = document.querySelector(
              "[data-shipping-threshold-options-2]"
            )
              ? JSON.parse(
                document.querySelector("[data-shipping-threshold-options-2]")
                  .innerHTML
              )
              : {
                enabled: false,
              };

            this._abTestShipping40 = document.querySelector(
              "[data-split-test-40-shipping]"
            )
              ? JSON.parse(
                document.querySelector("[data-split-test-40-shipping]")
                  .innerHTML
              )
              : {
                enabled: false,
              };

            this._chooseAFreeGiftOptions = document.querySelector(
              "[data-choose-your-gift]"
            )
              ? JSON.parse(
                document.querySelector("[data-choose-your-gift]").innerHTML
              )
              : {
                enabled: false,
              };
            this._renderAreas = document.querySelectorAll("[data-cart-mount]");
            this._jquery = window.$ || null;
            this._binds = [];
          }
          _binders() {
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.binders["style-*"] =
              function (el, value) {
                el.style.setProperty(this.args[0], value);
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getSrcSet =
              (src, size) => {
                return src
                  ? ""
                    .concat(
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].getSizedImageUrl(src, size),
                      " 1x, "
                    )
                    .concat(
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].getSizedImageUrl(src, size + "@2x"),
                      " 2x"
                    )
                  : "";
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getSizedImage =
              (src, size) => {
                return src
                  ? _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                    "default"
                  ].getSizedImageUrl(src, size)
                  : "";
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.money = (
              value
            ) => {
              return _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                "default"
              ].formatMoney(value, this._ctx.getState());
            };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.length = (
              arr
            ) => {
              return arr ? arr.length : 0;
            };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.eq = (
              val,
              val2
            ) => {
              return val === val2;
            };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.gt = (
              val,
              val2
            ) => {
              return val > val2;
            };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.lt = (
              val,
              val2
            ) => {
              return val < val2;
            };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getUrl = (
              handle
            ) => {
              return "/products/".concat(handle);
            };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getMarket = (handle) => {
              if (window.location.href.includes('en-uk')) {
                return "/en-uk/products/".concat(handle);
              } else {
                return "/products/".concat(handle);
              }
            };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getImage =
              (product, variant) => {
                return variant.featured_image
                  ? variant.featured_image.src
                  : product.featured_image;
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.pluralize =
              (count, one, multiple) => {
                return count === 1 ? one : multiple;
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.sampleAdded =
              (item) => {
                let sampleItems = this._sampleItems();
                return sampleItems.find(
                  (cItem) => cItem.handle === item.handle
                );
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getProps =
              (item) => {
                let props = [];
                for (let key in item.properties) {
                  if (key !== "_bundle") continue;
                  let name = key.charAt(0).toUpperCase() + key.slice(1);
                  let value = item.properties[key];
                  if (value.includes("https://cdn.shopify.com")) {
                    value = '<img src="'.concat(value, '" />');
                  }
                  props.push({
                    name: name,
                    value: value,
                  });
                }
                return props;
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.hasVariants =
              (item) => {
                return (
                  item.variants && item.variants[0].title !== "Default Title"
                );
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getShippingHeader =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions.threshold * 100.0;
                let threshold2 =
                  this._shippingThresholdOptions.threshold2 * 100.0;
                let threshold3 =
                  this._shippingThresholdOptions.threshold3 * 100.0;
                let header = this._shippingThresholdOptions.header;
                let header2 = this._shippingThresholdOptions.header2;
                let header3 = this._shippingThresholdOptions.header3;
                let header4 = this._shippingThresholdOptions.header4;

                if (count >= threshold3) {
                  return header4;
                } else if (count >= threshold2) {
                  return header3;
                } else if (count >= threshold) {
                  return header2;
                } else {
                  return header;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getShippingHeaderChooseAGift =
              (count) => {
                let threshold = this._chooseAFreeGiftOptions.threshold * 100.0;
                let threshold2 =
                  this._chooseAFreeGiftOptions.threshold2 * 100.0;
                let threshold3 =
                  this._chooseAFreeGiftOptions.threshold3 * 100.0;
                let threshold4 =
                  this._chooseAFreeGiftOptions.threshold4 * 100.0;
                let header = this._chooseAFreeGiftOptions.header;
                let header2 = this._chooseAFreeGiftOptions.header2;
                let header3 = this._chooseAFreeGiftOptions.header3;
                let header4 = this._chooseAFreeGiftOptions.header4;
                let header5 = this._chooseAFreeGiftOptions.header5;
                if (window.abTests.activeTests.includes('new-upsell')) {
                  if (count >= threshold4) {
                    return header5;
                  } else if (count >= threshold3) {
                    // if (document.querySelector('.cart-sticker__info')) {
                    //   document.querySelectorAll('.cart-sticker__info').forEach(function (element) {
                    //     element.innerHTML = "Claim your 2 free gifts in cart";
                    //   });
                    // } else if (document.querySelector('.cart-sticker__info1')) {
                    //   document.querySelectorAll('.cart-sticker__info1').forEach(function (element) {
                    //     element.innerHTML = "Claim your 2nd free gift in cart";
                    //   });
                    // } else if (document.querySelectorAll('.cart-sticker__info2')) {
                    //   document.querySelectorAll('.cart-sticker__info2').forEach(function (element) {
                    //     element.innerHTML = "";
                    //   });
                    // }
                    return header4;
                  } else if (count >= threshold2) {
                    // if (document.querySelector('.cart-sticker__info')) {
                    //   document.querySelectorAll('.cart-sticker__info').forEach(function (element) {
                    //     element.innerHTML = "Claim your free gift in cart";
                    //   });
                    // } else if (document.querySelector('.cart-sticker__info1')) {
                    //   document.querySelectorAll('.cart-sticker__info1').forEach(function (element) {
                    //     element.innerHTML = "2nd free gift on orders £150+";
                    //   });
                    // } else if (document.querySelectorAll('.cart-sticker__info2')) {
                    //   document.querySelectorAll('.cart-sticker__info2').forEach(function (element) {
                    //     element.innerHTML = "2nd free gift on orders £150+";
                    //   });
                    // }
                    return header3;
                  } else if (count >= threshold) {
                    // if (document.querySelector('.cart-sticker__info')) {
                    //   document.querySelectorAll('.cart-sticker__info').forEach(function (element) {
                    //     element.innerHTML = "Free gift on orders £75+";
                    //   });
                    // } else if (document.querySelector('.cart-sticker__info1')) {
                    //   document.querySelectorAll('.cart-sticker__info1').forEach(function (element) {
                    //     element.innerHTML = "Free gift on orders £75+";
                    //   });
                    // } else if (document.querySelectorAll('.cart-sticker__info2')) {
                    //   document.querySelectorAll('.cart-sticker__info2').forEach(function (element) {
                    //     element.innerHTML = "Free gift on orders £75+";
                    //   });
                    // }
                    return header2;
                  } else {
                    return header;
                  }
                } else {
                  if (count >= threshold3) {
                    // if (document.querySelector('.cart-sticker__info')) {
                    //   document.querySelectorAll('.cart-sticker__info').forEach(function (element) {
                    //     element.innerHTML = "Claim your 2 free gifts in cart";
                    //   });
                    // } else if (document.querySelector('.cart-sticker__info1')) {
                    //   document.querySelectorAll('.cart-sticker__info1').forEach(function (element) {
                    //     element.innerHTML = "Claim your 2nd free gift in cart";
                    //   });
                    // } else if (document.querySelectorAll('.cart-sticker__info2')) {
                    //   document.querySelectorAll('.cart-sticker__info2').forEach(function (element) {
                    //     element.innerHTML = "";
                    //   });
                    // }
                    return header5;
                  } else if (count >= threshold2) {
                    // if (document.querySelector('.cart-sticker__info')) {
                    //   document.querySelectorAll('.cart-sticker__info').forEach(function (element) {
                    //     element.innerHTML = "Claim your free gift in cart";
                    //   });
                    // } else if (document.querySelector('.cart-sticker__info1')) {
                    //   document.querySelectorAll('.cart-sticker__info1').forEach(function (element) {
                    //     element.innerHTML = "2nd free gift on orders £150+";
                    //   });
                    // } else if (document.querySelectorAll('.cart-sticker__info2')) {
                    //   document.querySelectorAll('.cart-sticker__info2').forEach(function (element) {
                    //     element.innerHTML = "2nd free gift on orders £150+";
                    //   });
                    // }
                    return header3;
                  } else if (count >= threshold) {
                    // if (document.querySelector('.cart-sticker__info')) {
                    //   document.querySelectorAll('.cart-sticker__info').forEach(function (element) {
                    //     element.innerHTML = "Free gift on orders £75+";
                    //   });
                    // } else if (document.querySelector('.cart-sticker__info1')) {
                    //   document.querySelectorAll('.cart-sticker__info1').forEach(function (element) {
                    //     element.innerHTML = "Free gift on orders £75+";
                    //   });
                    // } else if (document.querySelectorAll('.cart-sticker__info2')) {
                    //   document.querySelectorAll('.cart-sticker__info2').forEach(function (element) {
                    //     element.innerHTML = "Free gift on orders £75+";
                    //   });
                    // }
                    return header2;
                  } else {
                    return header;
                  }
                }

              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getShippingHeader2 =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions2.threshold * 100.0;
                let threshold2 =
                  this._shippingThresholdOptions2.threshold2 * 100.0;
                let threshold3 =
                  this._shippingThresholdOptions2.threshold3 * 100.0;
                let header = this._shippingThresholdOptions2.header;
                let header2 = this._shippingThresholdOptions2.header2;
                let header3 = this._shippingThresholdOptions2.header3;
                let header4 = this._shippingThresholdOptions2.header4;

                if (count >= threshold3) {
                  return header4;
                } else if (count >= threshold2) {
                  return header3;
                } else if (count >= threshold) {
                  return header2;
                } else {
                  return header;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.hasFreeShippingAB40 =
              (count) => {
                let threshold = this._abTestShipping40.threshold * 100.0;
                return count >= threshold;
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.hasFreeShipping =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions.threshold * 100.0;
                return count >= threshold;
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getShippingNotice =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions.threshold * 100.0;
                let under = this._shippingThresholdOptions.under;
                let reachedNotice = this._shippingThresholdOptions.free;
                let remaining = threshold - count;
                under = under.replace(
                  "[x]",
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                    "default"
                  ].formatMoney(remaining, this._ctx.getState())
                );
                return count >= threshold ? reachedNotice : under;
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getThresholdNotice =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions.threshold * 100.0;
                let threshold2 =
                  this._shippingThresholdOptions.threshold2 * 100.0;
                let threshold3 =
                  this._shippingThresholdOptions.threshold3 * 100.0;
                let under = this._shippingThresholdOptions.under;
                let under2 = this._shippingThresholdOptions.under2;
                let under3 = this._shippingThresholdOptions.under3;
                let reachedNotice = this._shippingThresholdOptions.reached;

                if (count >= threshold3) {
                  return reachedNotice;
                } else if (count >= threshold2) {
                  let remainingToThreshold3 = threshold3 - count;
                  under3 = under3.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold3, this._ctx.getState())
                  );
                  return under3;
                } else if (count >= threshold) {
                  let remainingToThreshold2 = threshold2 - count;
                  under2 = under2.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold2, this._ctx.getState())
                  );
                  return under2;
                } else {
                  let remainingToThreshold = threshold - count;
                  under = under.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold, this._ctx.getState())
                  );
                  return under;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getThresholdNotice2 =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions2.threshold * 100.0;
                let threshold2 =
                  this._shippingThresholdOptions2.threshold2 * 100.0;
                let threshold3 =
                  this._shippingThresholdOptions2.threshold3 * 100.0;
                let under = this._shippingThresholdOptions2.under;
                let under2 = this._shippingThresholdOptions2.under2;
                let under3 = this._shippingThresholdOptions2.under3;
                let reachedNotice = this._shippingThresholdOptions2.reached;

                console.log("THRESHOLD2" + threshold2);
                if (count >= threshold3) {
                  return reachedNotice;
                } else if (count >= threshold2) {
                  let remainingToThreshold3 = threshold3 - count;
                  under3 = under3.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold3, this._ctx.getState())
                  );
                  return under3;
                } else if (count >= threshold) {
                  let remainingToThreshold2 = threshold2 - count;
                  under2 = under2.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold2, this._ctx.getState())
                  );
                  return under2;
                } else {
                  let remainingToThreshold = threshold - count;
                  under = under.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold, this._ctx.getState())
                  );
                  return under;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getPercentNotice =
              (count) => {
                let threshold3 =
                  this._shippingThresholdOptions.threshold3 * 100.0;
                let percentage = this._shippingThresholdOptions.percentage;
                percentage = parseInt(percentage, 10);

                if (count >= threshold3) {
                  percentage = percentage + "%";
                  return `background: linear-gradient(to right, #000 100%, #ededed 100%)`;
                } else {
                  let percentageOfThreshold3 =
                    Math.min((percentage * count) / threshold3, 100).toFixed(
                      2
                    ) + "%";
                  percentage = percentageOfThreshold3;
                  return `background: linear-gradient(to right, #000 ${percentage}, #ededed ${percentage})`;
                }
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNotice1 =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions.threshold * 100.0;
                if (count >= threshold) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 2000) {
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNotice2 =
              (count) => {
                let threshold2 =
                  this._shippingThresholdOptions.threshold2 * 100.0;

                if (count >= threshold2) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 12500) {
                  console.log(count);
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNotice3 =
              (count) => {
                let threshold3 =
                  this._shippingThresholdOptions.threshold3 * 100.0;

                if (count >= threshold3) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 20000) {
                  console.log(count);
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getPercentNotice2 =
              (count) => {
                let threshold3 =
                  this._shippingThresholdOptions2.threshold3 * 100.0;
                let percentage = this._shippingThresholdOptions2.percentage;
                percentage = parseInt(percentage, 10);
                let threshold4 =
                  this._shippingThresholdOptions2.threshold4 * 100.0;

                if (window.abTests.activeTests.includes('new-upsell')) {
                  if (count >= threshold4) {
                    percentage = percentage + "%";
                    return `background: linear-gradient(to right, #000 100%, #ededed 100%)`;
                  } else {
                    let percentageOfThreshold4 =
                      Math.min((percentage * count) / threshold4, 100).toFixed(
                        2
                      ) + "%";
                    percentage = percentageOfThreshold4;
                    return `background: linear-gradient(to right, #000 ${percentage}, #ededed ${percentage})`;
                  }
                } else {
                  if (count >= threshold3) {
                    percentage = percentage + "%";
                    return `background: linear-gradient(to right, #000 100%, #ededed 100%)`;
                  } else {
                    let percentageOfThreshold3 =
                      Math.min((percentage * count) / threshold3, 100).toFixed(
                        2
                      ) + "%";
                    percentage = percentageOfThreshold3;
                    return `background: linear-gradient(to right, #000 ${percentage}, #ededed ${percentage})`;
                  }
                }
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNotice12 =
              (count) => {
                let threshold =
                  this._shippingThresholdOptions2.threshold * 100.0;
                if (count >= threshold) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 2000) {
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNoticeAb40 =
              (count) => {
                let threshold = this._abTestShipping40.threshold * 100.0;
                if (count >= threshold) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 2000) {
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNotice22 =
              (count) => {
                let threshold2 =
                  this._shippingThresholdOptions2.threshold2 * 100.0;

                if (count >= threshold2) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 6000) {
                  console.log(count);
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };
            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNotice32 =
              (count) => {
                let threshold3 =
                  this._shippingThresholdOptions2.threshold3 * 100.0;

                if (count >= threshold3) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 10000) {
                  console.log(count);
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getBubbleNotice42 =
              (count) => {
                let threshold4 =
                  this._shippingThresholdOptions2.threshold4 * 100.0;

                if (count >= threshold4) {
                  return `tiered-bubble__outer tiered-bubble_filled`;
                } else if (count >= 20000) {
                  console.log(count);
                  return `tiered-bubble__outer tiered-bubble_half-filled`;
                } else {
                  return `tiered-bubble__outer`;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getChooseAGiftThresholdsAB40 =
              (count) => {
                let threshold = this._abTestShipping40.threshold * 100.0;
                let threshold2 = this._abTestShipping40.threshold2 * 100.0;
                let threshold3 = this._abTestShipping40.threshold3 * 100.0;
                let under = this._abTestShipping40.under;
                let under2 = this._abTestShipping40.under2;
                let under3 = this._abTestShipping40.under3;
                let reachedNotice = this._abTestShipping40.reached;

                if (count >= threshold3) {
                  return reachedNotice;
                } else if (count >= threshold2) {
                  let remainingToThreshold3 = threshold3 - count;
                  under3 = under3.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold3, this._ctx.getState())
                  );
                  return under3;
                } else if (count >= threshold) {
                  let remainingToThreshold2 = threshold2 - count;
                  under2 = under2.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold2, this._ctx.getState())
                  );
                  return under2;
                } else {
                  let remainingToThreshold = threshold - count;
                  under = under.replace(
                    "[x]",
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ].formatMoney(remainingToThreshold, this._ctx.getState())
                  );
                  return under;
                }
              };

            rivets__WEBPACK_IMPORTED_MODULE_3___default.a.formatters.getChooseAGiftThresholds =
              (count) => {
                let threshold = this._chooseAFreeGiftOptions.threshold * 100.0;
                let threshold2 =
                  this._chooseAFreeGiftOptions.threshold2 * 100.0;
                let threshold3 =
                  this._chooseAFreeGiftOptions.threshold3 * 100.0;
                let threshold4 =
                  this._chooseAFreeGiftOptions.threshold4 * 100.0;
                let under = this._chooseAFreeGiftOptions.under;
                let under2 = this._chooseAFreeGiftOptions.under2;
                let under3 = this._chooseAFreeGiftOptions.under3;
                let under4 = this._chooseAFreeGiftOptions.under4;
                let reachedNotice = this._chooseAFreeGiftOptions.reached;

                if (window.abTests.activeTests.includes('new-upsell')) {
                  if (count >= threshold4) {
                    return reachedNotice;
                  } else if (count >= threshold3) {
                    let remainingToThreshold4 = threshold4 - count;
                    under4 = under4.replace(
                      "[x]",
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].formatMoney(remainingToThreshold4, this._ctx.getState())
                    );
                    return under4;
                  } else if (count >= threshold2) {
                    let remainingToThreshold3 = threshold3 - count;
                    under3 = under3.replace(
                      "[x]",
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].formatMoney(remainingToThreshold3, this._ctx.getState())
                    );
                    return under3;
                  } else if (count >= threshold) {
                    let remainingToThreshold2 = threshold2 - count;
                    under2 = under2.replace(
                      "[x]",
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].formatMoney(remainingToThreshold2, this._ctx.getState())
                    );
                    return under2;
                  } else {
                    let remainingToThreshold = threshold - count;
                    under = under.replace(
                      "[x]",
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].formatMoney(remainingToThreshold, this._ctx.getState())
                    );
                    return under;
                  }
                } else {
                  if (count >= threshold3) {
                    return reachedNotice;
                  } else if (count >= threshold2) {
                    let remainingToThreshold3 = threshold3 - count;
                    under3 = under3.replace(
                      "[x]",
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].formatMoney(remainingToThreshold3, this._ctx.getState())
                    );
                    return under3;
                  } else if (count >= threshold) {
                    let remainingToThreshold2 = threshold2 - count;
                    under2 = under2.replace(
                      "[x]",
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].formatMoney(remainingToThreshold2, this._ctx.getState())
                    );
                    return under2;
                  } else {
                    let remainingToThreshold = threshold - count;
                    under = under.replace(
                      "[x]",
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__[
                        "default"
                      ].formatMoney(remainingToThreshold, this._ctx.getState())
                    );
                    return under;
                  }
                }

              };
          }

          _getFreeGiftProductFromCart(identifier) {
            const product = this._data.cart.items.find(
              (item) => item.properties[identifier] === "true"
            );

            return product;
          }

          _setFreeGiftData(identifier, isInCart) {
            if (identifier === "_free1") {
              this._data.hasFreeGift1 = isInCart;
            }
            if (identifier === "_free2") {
              this._data.hasFreeGift2 = isInCart;
            }
            if (identifier === "_free3") {
              this._data.hasFreeGift3 = isInCart;
            }
          }

          _showFreeGift(identifier, freeGiftSrc) {
            const image = document.querySelector(`#image${identifier}`);
            const questionMark = document.querySelector(
              `question-mark${identifier}`
            );
            const modal = document.querySelector(`#modal${identifier}`);

            if (image) {
              image.src = freeGiftSrc;
              image.classList.add("show");
            }

            if (questionMark) {
              questionMark.classList.remove("show");
            }

            if (modal) {
              modal.removeAttribute("open");
            }
          }

          _hideFreeGift(identifier) {
            const image = document.querySelector(`#image${identifier}`);
            const questionMark = document.querySelector(
              `#question-mark${identifier}`
            );

            if (image) {
              image.src = "";
              image.classList.remove("show");
            }

            if (questionMark) {
              questionMark.classList.add("show");
            }
          }

          _choose_a_gift() {
            const freeGift1 = this._getFreeGiftProductFromCart("_free1");
            const freeGift2 = this._getFreeGiftProductFromCart("_free2");
            const freeGift3 = this._getFreeGiftProductFromCart("_free3");

            if (freeGift1) {
              this._setFreeGiftData("_free1", true);
              this._showFreeGift("_free1", freeGift1.featured_image.url);
            } else {
              this._setFreeGiftData("_free1", false);
              this._hideFreeGift("_free1");
            }

            if (freeGift2) {
              this._setFreeGiftData("_free2", true);
              this._showFreeGift("_free2", freeGift2.featured_image.url);
            } else {
              this._setFreeGiftData("_free2", false);
              this._hideFreeGift("_free2");
            }

            if (freeGift3) {
              this._setFreeGiftData("_free3", true);
              this._showFreeGift("_free3", freeGift3.featured_image.url);
            } else {
              this._setFreeGiftData("_free3", false);
              this._hideFreeGift("_free3");
            }
          }
          async validateReChargeGift(cart) {
            const cartItems = cart.items
            const itemsWithoutParent = cartItems.filter(item => {
              // Check if the item has an `isGift` property
              if (item.properties?.isGift) {
                const parentProductId = Number(item.properties.isGift);

                // Find the parent product in the cart
                const parentProduct = cartItems.find(cartItem => cartItem.id === parentProductId);

                // If the parent product doesn't exist or doesn't have `selling_plan_allocation`, filter it
                return !parentProduct || !parentProduct.selling_plan_allocation;
              }
              return false; // No isGift property, don't include
            });
            const item = itemsWithoutParent.find(Boolean)
            if(item){
              await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                  "default"
                  ].removeCartItem(item.index);
              if (window.location.href.includes('/cart')) {
                window.location.reload()
              } else {
                await this._refresh()
              }
            }
          }

          async mount() {
            // Edgemesh Performance Note
            // Instead of loading the cart via SSR data (prone to being cached), pull it from the API instead (same way _refresh() does it)
            // this._data.cart = await this.prepareData(JSON.parse(this._elem.innerHTML));
            this._data.cart = await this.prepareData(
              await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                "default"
              ].getCart()
            );
            await this.validateReChargeGift(this._data.cart)

            if (
              typeof window.BOLD !== "undefined" &&
              typeof window.BOLD.common !== "undefined" &&
              typeof window.BOLD.common.cartDoctor !== "undefined"
            ) {
              // NOTE: "cart" should be the variable containing the cart JSON data
              this._data.cart = window.BOLD.common.cartDoctor.fix(
                this._data.cart
              );
            }
            this._data.cartBackup = {
              ...this._data.cart,
            };
            this._ctx.on("cart-item-added", async () => {
              this._data.cart.loading = true;
              await this._refresh();
              this._ctx.emit("cart-item-added--refreshed");
            });
            this._binders();
            this._render();
            this._choose_a_gift();
            window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
            window.KlarnaOnsiteService.push({
              eventName: "refresh-placements",
            });
            if (
              window.BOLD &&
              BOLD.common &&
              BOLD.common.eventEmitter &&
              typeof BOLD.common.eventEmitter.emit === "function"
            ) {
              BOLD.common.eventEmitter.emit(
                "BOLD_COMMON_cart_loaded",
                this._data.cart
              );
            }
            if (!window.SwymCallbacks) {
              window.SwymCallbacks = [];
            }
            window.SwymCallbacks.push(() => {
              var replayAddToCartOriginalFn = _swat.replayAddToCart;
              let instance = this;
              window._swat.replayAddToCart = function () {
                //save the successCallback
                var successCallbackFn = arguments[2];
                arguments[2] = function (data) {
                  let item = JSON.parse(data);
                  if (successCallbackFn) {
                    successCallbackFn(data);
                    instance._ctx.emit("cart-item-added", {
                      lastItemAdded: {
                        item: item,
                        quantity: item.quantity,
                        properties: item.properties,
                      },
                    });
                  }
                };
                //call the orginal fn
                replayAddToCartOriginalFn.apply(this, arguments);
              };
            });
          }
          async prepareData(data) {
            // Check if the cart is empty immediately
            if (!data.items || data.items.length === 0) {
              return {
                items: [],
                item_count: 0,
                loading: false,
              };
            }

            let promises = [];

            for (const [i, item] of data.items.entries()) {
              promises.push(
                (async () => {
                  item.index = i + 1;
                  let productData = await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__["default"].getCustomProduct(item.handle);

                  // Check if productData and productData.product are valid
                  if (!productData || !productData.product) {
                    console.error(`No product data for handle ${item.handle}`);
                    return;
                  }

                  item.product = productData.product;
                  item.product.metafields = productData.metafields;
                  item.originalItem = { ...item };
                  item.variant = item.product.variants.find(
                    (variant) => variant.id === item.variant_id
                  );
                })()
              );
            }

            await Promise.all(promises);
            data.loading = false;
            return data;
          }
          _render() {
            for (let cartSection of this._renderAreas) {
              this._binds.push(
                rivets__WEBPACK_IMPORTED_MODULE_3___default.a.bind(
                  cartSection,
                  this._getModel(cartSection)
                )
              );
            }
            this._data.cart.loading = false;
            for (let cartSection of this._renderAreas) {
              cartSection.classList.add("rendered");
            }
          }
          unmount() {
            for (let bind of this._binds) {
              bind.unbind();
            }
          }
          _getModel(cartSection) {
            return {
              data: this._data,
              controller: {
                removeItem: async (e, model) => {
                  e.preventDefault();
                  model.data.cart.loading = true;
                  let item = model.item;
                  let currentIndex = item.index;
                  const items = model.data.cart.items
                  const currentItem = items[currentIndex - 1]
                  if (currentItem?.selling_plan_allocation) {// remove gift product purchase
                    const currentItemID = currentItem.id
                    const index = currentItemID && items.findIndex(item => item.properties?.isGift == currentItemID)
                    if (index > -1) {
                      await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                        "default"
                      ].removeCartItem(index + 1);
                      currentIndex -= 1
                    }
                  }
                  await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                    "default"
                  ].removeCartItem(currentIndex);
                  this._refresh();
                },
                updateQuantity: async (e, model) => {
                  e.preventDefault();
                  if (
                    model.item.quantity.length &&
                    isNaN(parseInt(model.item.quantity))
                  ) {
                    model.item.quantity = 1;
                    return false;
                  }
                  if (model.item.quantity.length) {
                    model.data.cart.loading = true;
                    var newQuantity = model.item.quantity;
                    var properties = model.item.properties;
                    try {
                      await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                        "default"
                      ].updateCartItem(
                        model.item.index,
                        newQuantity,
                        properties
                      );
                      this._refresh();
                    } catch (err) {
                      model.data.cart.loading = false;
                      this._data.errorMessage = "All ".concat(
                        model.item.title,
                        " are currently in your cart"
                      );
                    }
                  }
                },
                incrementQuantity: async (e, model) => {
                  e.preventDefault();
                  model.data.cart.loading = true;
                  var newQuantity = model.item.quantity + 1;
                  var properties = model.item.properties;
                  try {
                    await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                      "default"
                    ].updateCartItem(model.item.index, newQuantity, properties);
                    this._refresh();
                  } catch (err) {
                    model.data.cart.loading = false;
                    this._data.errorMessage = "All ".concat(
                      model.item.title,
                      " are currently in your cart"
                    );
                  }
                },
                decrementQuantity: async (e, model) => {
                  e.preventDefault();
                  model.data.cart.loading = true;
                  var newQuantity = model.item.quantity - 1;
                  var properties = model.item.properties;
                  let currentIndex = model.item.index;
                  const items = model.data.cart.items
                  const currentItem = items[currentIndex - 1]
                  try {
                    if (newQuantity === 0 && currentItem?.selling_plan_allocation) { // remove gift product purchase
                      const currentItemID = currentItem.id
                      const index = currentItemID && items.findIndex(item => item.properties?.isGift == currentItemID)
                      if (index > -1) {
                        await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                          "default"
                        ].removeCartItem(index + 1);
                        currentIndex -= 1
                      }
                    }
                    await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                      "default"
                    ].updateCartItem(currentIndex, newQuantity, properties);
                    this._refresh();
                  } catch (err) {
                    model.data.cart.loading = false;
                    this._data.errorMessage = "All ".concat(
                      model.item.title,
                      " are currently in your cart"
                    );
                  }
                },
                updateSellingPlan: async (e, model) => {
                  const itemKey = model.item.key;
                  const itemQuantity = model.item.originalItem.quantity;
                  const checkbox = e.target;
                  const sellingPlanId = checkbox.checked
                    ? model.item.product.selling_plan_groups[0].selling_plans[0]
                      .id
                    : "";

                  model.data.cart.loading = true;
                  try {
                    await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                      "default"
                    ].updateSellingPlanItem(
                      itemKey,
                      itemQuantity,
                      sellingPlanId
                    );
                    this._refresh();
                  } catch (err) {
                    console.error("Error updating selling plan:", err);
                    model.data.cart.loading = false;
                    this._data.errorMessage = `Failed to update selling plan for ${model.item.title}`;
                  }
                },
                clearError: (e, model) => {
                  e.preventDefault();
                  model.data.errorMessage = null;
                },
                changeReducePackaging: async (e, model) => {
                  e.preventDefault();
                  model.data.cart.loading = true;
                  try {
                    await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__[
                      "default"
                    ].updateCart({
                      attributes: model.data.cart.attributes,
                    });
                    model.data.cart.loading = false;
                  } catch (err) {
                    model.data.cart.loading = false;
                    this._data.errorMessage =
                      "Some error occured. Please reload the page";
                  }
                },
              },
            };
          }
          async _refresh() {
            let cartData = await _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_5__["default"].getCart();
            this._data.cart = await this.prepareData(cartData);
            this._choose_a_gift();
            await this.validateReChargeGift(this._data.cart)
            if (
              typeof window.BOLD !== "undefined" &&
              typeof window.BOLD.common !== "undefined" &&
              typeof window.BOLD.common.cartDoctor !== "undefined"
            ) {
              // NOTE: "cart" should be the variable containing the cart JSON data
              this._data.cart = window.BOLD.common.cartDoctor.fix(
                this._data.cart
              );
            }
            this._data.cartBackup = {
              ...this._data.cart,
            };
            if (window.Shopify && Shopify.StorefrontExpressButtons) {
              Shopify.StorefrontExpressButtons.initialize();
            }
            window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
            window.KlarnaOnsiteService.push({
              eventName: "refresh-placements",
            });
            if (
              window.BOLD &&
              BOLD.common &&
              BOLD.common.eventEmitter &&
              typeof BOLD.common.eventEmitter.emit === "function"
            ) {
              BOLD.common.eventEmitter.emit(
                "BOLD_COMMON_cart_loaded",
                this._data.cart
              );
            }
          }
          _getVariant(selectedOptions, variants) {
            let theVariant = false;
            for (let variant of variants) {
              let foundVariant = variant;
              for (let [index, option] of selectedOptions.entries()) {
                if (variant["option".concat(index + 1)] !== option) {
                  foundVariant = false;
                }
              }
              if (foundVariant) {
                theVariant = foundVariant;
                break;
              }
            }
            return theVariant;
          }
          _getUpdatesMap() {
            let items =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._data.cart.items;
            return items.map((item) => item.quantity);
          }

          publicRefresh() {
            this._refresh();
          }

          _doEditorListeners() {
            document.addEventListener("shopify:section:unload", (e) => {
              this.unmount();
            });
            document.addEventListener("shopify:section:load", (e) => {
              this._setup();
              this.mount();
            });
            document.addEventListener("maurten:cart:add", (event) => {
              this.publicRefresh();

              setTimeout(() => {
                this.publicRefresh();
              }, 1000);
            });
            document.addEventListener("status:cart:add", (event) => {
              this.publicRefresh();
              var shadowHost = document.querySelector("#status-app");
              var shadowRoot = shadowHost.shadowRoot;
              var closeButton = shadowRoot.querySelector(".close-button");

              setTimeout(() => {
                if (closeButton) {
                  closeButton.click();
                }
                this.publicRefresh();
              }, 1000);
            });
            if (window.location.href.includes("quiz")) {
              document.addEventListener("click", (event) => {
                if (
                  event.target.matches(
                    '[data-element="oct-quiz-resultitem"] button'
                  )
                ) {
                  const loading = document.querySelector(".side-cart.rendered");
                  loading.classList.add("loading");
                  setTimeout(() => {
                    this.publicRefresh();
                  }, 1500);
                }
              });
            }
            if (window.location.href.includes("wishlist")) {
              document.addEventListener("click", (event) => {
                if (event.target.matches(".wishlist-cart")) {
                  this.publicRefresh();
                  setTimeout(() => {
                    this.publicRefresh();
                  }, 1000);
                }
              });
            }
          }
        }
        /* harmony default export */ __webpack_exports__["default"] = Cart;

        /***/
      },

    /***/ "./src/resources/scripts/components/ClassChange.js":
      /*!*********************************************************!*\
  !*** ./src/resources/scripts/components/ClassChange.js ***!
  \*********************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return ClassChange;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );

        class ClassChange extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
          }
          mount() {
            if (this._options.length) {
              for (let option of this._options) {
                this._optionLogic(option);
              }
            } else {
              this._optionLogic(this._options);
            }
          }
          _optionLogic(option) {
            if (!option.on) {
              option.on = "click";
            }
            if (option.whenOutside) {
              document.addEventListener(
                option.on,
                (e) => {
                  let clickIsInside =
                    this._elem.contains(e.target) || this._elem === e.target;
                  let toExclude = document.querySelectorAll(
                    option.whenOutsideExcept
                  );
                  let hasClickedExclude = Array.from(toExclude).some(
                    (elem) => elem.contains(e.target) || elem === e.target
                  );
                  if (clickIsInside || hasClickedExclude) return false;
                  this._eventLogic(option, e);
                },
                option.preventDefault
                  ? {
                    passive: false,
                  }
                  : {
                    passive: true,
                  }
              );
            } else {
              this._elem.addEventListener(
                option.on,
                (e) => {
                  this._eventLogic(option, e);
                },
                option.preventDefault
                  ? {
                    passive: false,
                  }
                  : {
                    passive: true,
                  }
              );
            }
          }
          _eventLogic(option, e) {
            if (option.onlyThisElem && e.target !== this._elem) {
              return false;
            }
            if (option.preventDefault) {
              e.preventDefault();
            }
            if (option.target.includes("closest:")) {
              let parentSelector = option.target.split("closest:")[1].trim();
              if (option.subTarget) {
                this._elem
                  .closest(parentSelector)
                  .querySelector(option.subTarget)
                  .classList[option.method](option.class);
              } else {
                this._elem
                  .closest(parentSelector)
                  .classList[option.method](option.class);
              }
            } else if (option.target === "this") {
              this._elem.classList[option.method](option.class);
            } else {
              let targets = document.querySelectorAll(option.target);
              for (let target of targets) {
                target.classList[option.method](option.class);
              }
            }
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/DeliveryDate.js":
      /*!**********************************************************!*\
  !*** ./src/resources/scripts/components/DeliveryDate.js ***!
  \**********************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return DeliveryDate;
          }
        );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );

        class DeliveryDate extends _inherited_Component__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
          }
          mount() {
            let date = new Date();
            let hours = date.getHours();
            let day = date.getDay();
            const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            if (day != 6) {
              if (hours < 16) {
                date.setDate(date.getDate() + 1);
                this._elem.innerHTML = ""
                  .concat(weekday[date.getDay()], ", ")
                  .concat(date.getDate(), " ")
                  .concat(monthNames[date.getMonth()]);
              } else {
                date.setDate(date.getDate() + 2);
                this._elem.innerHTML = ""
                  .concat(weekday[date.getDay()], ", ")
                  .concat(date.getDate(), " ")
                  .concat(monthNames[date.getMonth()]);
              }
            } else {
              date.setDate(date.getDate() + 2);
              this._elem.innerHTML = ""
                .concat(weekday[date.getDay()], ", ")
                .concat(date.getDate(), " ")
                .concat(monthNames[date.getMonth()]);
            }
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/ImageWithZoom.js":
      /*!***********************************************************!*\
  !*** ./src/resources/scripts/components/ImageWithZoom.js ***!
  \***********************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return ImageWithZoom;
          }
        );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );

        class ImageWithZoom extends _inherited_Component__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
          }
          mount() {
            this._elem.addEventListener("click", () => {
              this._elem.classList.add("active");
            });
            this._elem.addEventListener("mousemove", (e) => {
              this._elem.style.backgroundPositionX =
                (e.offsetX / this._elem.clientWidth) * 100 + "%";
              this._elem.style.backgroundPositionY =
                (e.offsetY / this._elem.clientHeight) * 100 + "%";
            });
            this._elem.addEventListener("mouseleave", () => {
              this._elem.classList.remove("active");
            });
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/KeenSlider.js":
      /*!********************************************************!*\
  !*** ./src/resources/scripts/components/KeenSlider.js ***!
  \********************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return KeenSliderComp;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var evx__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! evx */ "./node_modules/evx/dist/evx.es.js");
        /* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );
        /* harmony import */ var keen_slider__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! keen-slider */ "./node_modules/keen-slider/keen-slider.es.js"
          );
        /* harmony import */ var pinch_zoom_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! pinch-zoom-js */ "./node_modules/pinch-zoom-js/src/pinch-zoom.js"
          );

        class KeenSliderComp extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            options = {
              ...{
                dragSpeed: 1,
                autoplaySpeed: 5000,
                duration: 500,
                arrowSvg:
                  '<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M0.329508 1.19813C0.689466 0.838172 1.27307 0.838172 1.63303 1.19813L6.51165 6.07675L11.3903 1.19813C11.7502 0.838173 12.3338 0.838173 12.6938 1.19813C13.0538 1.55809 13.0538 2.1417 12.6938 2.50165L7.16341 8.03203C6.80345 8.39199 6.21985 8.39199 5.85989 8.03203L0.329508 2.50165C-0.0304497 2.1417 -0.0304496 1.55809 0.329508 1.19813Z" clip-rule="evenodd" fill="black" fill-rule="evenodd"/>\n      </svg>\n\n      ',
              },
              ...options,
            };
            let optionsCopy = {
              ...options,
            };
            super(elem, theme, options, ctx);
            this._slider = null;
            this._autoplayInterval = null;
            this.shouldAutoplay = false;
            this._localCtx = Object(
              evx__WEBPACK_IMPORTED_MODULE_2__["create"]
            )();
            this._isMounted = false;
            this._addedListener = false;
            super.reinitOnResize(optionsCopy);
          }
          mount() {
            if (this._options.mount === false) {
              return false;
            }
            if (this._options.enableWhen && !this._addedListener) {
              window.addEventListener(
                "resize",
                (e) => {
                  if (
                    matchMedia(
                      "only screen and ".concat(this._options.enableWhen)
                    ).matches &&
                    !this._isMounted
                  ) {
                    this.mount();
                  } else if (
                    !matchMedia(
                      "only screen and ".concat(this._options.enableWhen)
                    ).matches &&
                    this._isMounted
                  ) {
                    this.unmount();
                    this._isMounted = false;
                  }
                },
                {
                  passive: true,
                }
              );
              this._addedListener = true;
            }
            if (
              this._options.enableWhen &&
              !matchMedia("only screen and ".concat(this._options.enableWhen))
                .matches
            ) {
              return false;
            }
            this._convertOldOptions();
            this._slidesPerView =
              typeof this._options.slides === "object"
                ? this._options.slides.perView || this._options.slides.number
                : this._options.slides;
            this._elem.classList.add("keen-slider");
            for (let elem of this._elem.children) {
              if (
                elem.hasAttribute("data-keen-dots") ||
                elem.hasAttribute("data-keen-nav")
              )
                continue;
              elem.classList.add("keen-slider__slide");
              if (this._options.fade) {
                elem.classList.add("fader-slide");
              }
            }
            this._slides = this._elem.querySelectorAll(".keen-slider__slide");

            // AS NAV FOR
            if (this._options.asNavFor) {
              this._parentSlider = this._theme.getComponent(
                this._options.asNavFor
              );
              this._parentSlider = this._parentSlider.component;

              //   this._parentSlider._localCtx.on('slide-change', (state, data) => {
              //     this.goToSlide(Number(data.slide))
              //   })
            }

            if (this._options.arrows) this._createArrows();
            if (this._slides.length === this._slidesPerView) {
              this._options.loop = false;
              this._options.controls = false;
            }
            if (!this._prevArrow)
              this._prevArrow = this._elem.querySelector("[data-keen-prev]");
            if (!this._nextArrow)
              this._nextArrow = this._elem.querySelector("[data-keen-next]");
            this._options.animationStarted = (slider) => {
              this._localCtx.emit("animation-started", null, {
                slider: slider,
              });
            };
            this._options.slideChanged = (slider) => {
              if (slider.options.selector == ".ambassador-slide") {
                const currentSlideIndex = slider.track.details.rel; // Get the current slide index
                const practitioners =
                  document.querySelectorAll(".ambassador-title");
                practitioners.forEach((p) =>
                  p.classList.remove("ambassador-title__underline")
                );
                if (practitioners[currentSlideIndex]) {
                  practitioners[currentSlideIndex].classList.add(
                    "ambassador-title__underline"
                  );
                }
              }
              this.updateClasses(slider);
              this.updateFadeHeight(slider);
              this._localCtx.emit("slide-change", null, {
                slider: slider,
              });
              this.adaptiveHeight(slider);
              if (this._isMounted) this.scrollRevealFix(slider);
              this._pauseVideos();
              if (this._options.playVideos) this._playVideos(slider);
              if (this._options.setSlideCount) this._setSlideCount(slider);
              this._doSlideCSSVars(slider);
              if (this._options.asNavFor && this._parentSlider) {
                let parentSlider = this._parentSlider._slider;
                const next = this._slider.track.details.rel || 0;
                parentSlider.moveToIdx(
                  Math.min(parentSlider.track.details.maxIdx, next)
                );
              }
            };
            this._options.created = (slider) => {
              this._elem.classList.add("keen-slider--ready");
              if (this._options.dots && this._slides.length > 1)
                this._createDots(slider);
              this._dotsContainer = this._options.dotsContainer
                ? document.querySelector(this._options.dotsContainer) ||
                this._elem
                : this._elem;
              this._dots = this._dotsContainer.querySelectorAll("[data-dot]");
              for (let dot of this._dots) {
                dot.addEventListener("click", (e) => {
                  e.preventDefault();
                  this.goToSlide(Number(dot.dataset.dot), false);
                  if (this._parentSlider) {
                    this._parentSlider.goToSlide(Number(dot.dataset.dot));
                  }
                });
              }
              this.updateClasses(slider);
              this.updateFadeHeight(slider);
              this.adaptiveHeight(slider);
              this._doSlideCSSVars(slider);
              if (this._options.autoplay) this._setupAutoplay(slider);
              if (this._options.autoplayWhenVisibleOnly)
                this._doAutoplayOnScroll();
              if (this._options.alignArrowsTo) this.alignArrows();
              if (this._options.arrowKeyNavigation) this._addArrowKeyEvents();
              if (this._options.playVideos) this._playVideos(slider);
              if (this._options.setSlideCount) this._setSlideCount(slider);
              if (this._options.focusOnSelect) this.focusOnSelect(slider);
              window.addEventListener(
                "resize",
                (e) => {
                  this.updateFadeHeight();
                  this.adaptiveHeight();
                  if (this._options.alignArrowsTo) {
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__[
                      "default"
                    ].nextFrame(() => {
                      this.alignArrows();
                    });
                  }
                },
                {
                  passive: true,
                }
              );
            };
            this._options.dragStarted = () => {
              this.shouldAutoplay = false;
            };
            this._options.dragEnded = () => {
              this.shouldAutoplay = true;
            };
            if (this._options.fade) {
              this._options.detailsChanged = (slider) => this.fader(slider);
              this._options.renderMode = "custom";
            }
            this._slider = new keen_slider__WEBPACK_IMPORTED_MODULE_4__[
              "default"
            ](this._elem, this._options);
            if (this._prevArrow)
              this._prevArrow.addEventListener("click", (e) =>
                this.goToPrev(e)
              );
            if (this._nextArrow)
              this._nextArrow.addEventListener("click", (e) =>
                this.goToNext(e)
              );
            this._isMounted = true;
            if (this._options.triggerOnMount) {
              this._ctx.emit(this._options.triggerOnMount);
            }
            this._ctx.on(
              "BB-slider-reinit",
              (e) => {
                this.unmount();
                this.mount();
              },
              {
                passive: true,
              }
            );
            this._addPinchZoom();
          }
          focusOnSelect() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            for (let [index, slide] of this._slides.entries()) {
              slide.addEventListener("click", (e) => {
                this.goToSlide(index);
              });
            }
          }
          _setSlideCount() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            let slideCountParentElem = document.querySelector(
              this._options.setSlideCount
            );
            let totalElem =
              slideCountParentElem.querySelector("[data-slide-total]");
            let currentElem = slideCountParentElem.querySelector(
              "[data-slide-current]"
            );
            totalElem.innerHTML = slider.details().size;
            currentElem.innerHTML = slider.details().relativeSlide + 1;
            if (this.isAtEnd(slider) && slider.details().relativeSlide == 0) {
              slideCountParentElem.classList.add("hide");
            }
          }
          unmount() {
            if (this._slider) {
              this._slider.destroy();
            }
            if (this._navContainer && this._navContainer.parentNode) {
              this._navContainer.parentNode.removeChild(this._navContainer);
            }
            this._elem.classList.remove("keen-slider");
            for (let elem of this._elem.children) {
              elem.classList.remove("keen-slider__slide");
              elem.classList.remove("fader-slide");
              elem.removeAttribute("style");
            }
            // this._elem.style.height = ''
          }

          _setupAutoplay(slider) {
            if (!this._options.autoplay) {
              clearTimeout(this.autoplayTimeout);
              return false;
            }
            this.shouldAutoplay = true;
            this.shouldAutoplayVisible = true;
            if (this._options.pauseAutoplayOnHover) {
              this._elem.addEventListener("mouseover", (e) => {
                this.shouldAutoplay = false;
                clearTimeout(this.autoplayTimeout);
              });
              this._elem.addEventListener("mouseout", (e) => {
                this.shouldAutoplay = true;
                this.autoplay();
              });
            }
            this.autoplay();
            slider.on("dragStarted", () => {
              if (this.autoplayTimeout) clearTimeout(this.autoplayTimeout);
            });
            slider.on("animationEnded", () => {
              this.autoplay();
            });
            slider.on("updated", () => {
              this.autoplay();
            });
          }
          autoplay() {
            clearTimeout(this.autoplayTimeout);
            this.autoplayTimeout = setTimeout(() => {
              if (!this.shouldAutoplay || !this.shouldAutoplayVisible) return;
              if (this._slider) {
                if (this.isAtEnd() && !this._options.loop) {
                  this.goToSlide(0);
                } else {
                  this._slider.next();
                }
              }
            }, this._options.autoplaySpeed);
          }
          _doAutoplayOnScroll() {
            if (!this._options.autoplay) return false;
            let visibleCheck = () => {
              if (
                _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].isInViewport(this._elem) &&
                this.shouldAutoplayVisible == false
              ) {
                this.shouldAutoplayVisible = true;
                this.autoplay();
              } else {
                this.shouldAutoplayVisible = false;
                if (this.autoplayTimeout) clearTimeout(this.autoplayTimeout);
              }
            };
            window.addEventListener(
              "scroll",
              (e) => {
                visibleCheck();
              },
              {
                passive: true,
              }
            );
            visibleCheck();
          }
          _doSlideCSSVars() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            let slide = this.getActiveSlideElem(slider);
            if (slide && slide.dataset.slideCssVars) {
              let varArr = JSON.parse(slide.dataset.slideCssVars);
              for (let cssVar of varArr) {
                this._elem.style.setProperty(cssVar.name, cssVar.value);
              }
            }
          }
          _addArrowKeyEvents() {
            document.addEventListener("keydown", (e) => {
              let ev = e || window.event;
              if (ev.keyCode === 37) {
                // left arrow
                this._slider.prev();
              } else if (ev.keyCode === 39) {
                // right arrow
                this._slider.next();
              }
            });
          }
          _createArrows() {
            var e = document.createElement("ul");
            e.classList.add("keen-nav");
            e.setAttribute("data-keen-nav", true);
            e.innerHTML =
              '\n        <li>\n          <button data-keen-prev class="keen-arrow-prev keen-arrow" aria-label="Previous Slide">\n            <span class="keen-arrow-inner">\n              '
                .concat(
                  this._options.arrowSvg || "",
                  '\n            </span>\n          </button>\n        </li>\n        <li>\n          <button data-keen-next class="keen-arrow-next keen-arrow" aria-label="Next Slide">\n            <span class="keen-arrow-inner">\n              '
                )
                .concat(
                  this._options.arrowSvg || "",
                  "\n            </span>\n          </button>\n        </li>\n    "
                );
            this._navContainer = e;
            this._prevArrow =
              this._navContainer.querySelector("[data-keen-prev]");
            this._nextArrow =
              this._navContainer.querySelector("[data-keen-next]");
            if (this._options.appendArrows) {
              let toAppend = document.querySelector(this._options.appendArrows);
              if (toAppend) toAppend.appendChild(e);
            } else {
              this._elem.appendChild(e);
            }
          }
          _createDots(slider) {
            var e = document.createElement("ul");
            e.classList.add("keen-dots");
            e.setAttribute("data-keen-dots", true);
            let dotsToMake = slider.track.details.slidesLength;
            for (let i = 0; i < dotsToMake; i++) {
              e.innerHTML +=
                "\n        <li>\n          <button data-dot='".concat(
                  i,
                  "'></button>\n        </li>\n      "
                );
            }
            this._elem.classList.add("keen--dotted");
            this._elem.appendChild(e);
          }
          _playVideos() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            this._pauseVideos();
            _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__["default"].nextFrame(
              () => {
                let active = this.getActiveSlideElem();
                let activeVideo = active.querySelector("video");
                if (activeVideo) {
                  if (
                    activeVideo.hasAttribute("[data-lazy]") &&
                    !activeVideo.classList.contains("loaded")
                  ) {
                    activeVideo.addEventListener("bb--loaded", (e) => {
                      activeVideo.play();
                    });
                  } else {
                    activeVideo.play();
                  }
                }
              }
            );
          }
          _pauseVideos() {
            let videos = this._elem.querySelectorAll("video");
            for (let video of videos) {
              video.pause();
            }
          }
          fader() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            for (let [index, slide] of slider.slides.entries()) {
              slide.style.opacity = slider.track.details.slides[index].portion;
            }
          }
          goToSlide(index) {
            let dontAnimate =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : false;
            if (!this._slider) return;
            let duration = dontAnimate ? 0 : this._options.duration;
            let nearest = false;
            if (
              this._options.loop &&
              this._slider.track.details.slides.length > 2
            ) {
              nearest = true;
            }
            this._slider.moveToIdx(index, nearest, duration);
          }
          goToPrev(e) {
            e.preventDefault();
            this._slider.prev();
          }
          goToNext(e) {
            e.preventDefault();
            this._slider.next();
          }
          scrollRevealFix() {
            for (let slide of this._slides) {
              if (
                slide.hasAttribute("data-sr-id") ||
                slide.hasAttribute("data-reveal")
              ) {
                slide.style.removeProperty("opacity");
                slide.style.removeProperty("transition");
                slide.style.removeProperty("visibility");
                slide.removeAttribute("data-sr-id");
                slide.removeAttribute("data-reveal");
              }
            }
          }
          getActiveSlideElem() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            let slideIndex = slider.track.details.rel;
            for (let [index, slide] of this._slides.entries()) {
              if (index === slideIndex) {
                return slide;
              }
            }
            return false;
          }
          adaptiveHeight() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            if (!this._options.adaptiveHeight || !slider) return false;
            this._elem.classList.add("keen--adaptive-height");
            _lib_Helpers__WEBPACK_IMPORTED_MODULE_3__["default"].nextFrame(
              () => {
                let slide = slider.track.details.rel;
                let height = 0;
                height += parseFloat(
                  getComputedStyle(this._elem).paddingBottom
                );
                height += parseFloat(getComputedStyle(this._elem).paddingTop);
                let activeSlide = this.getActiveSlideElem(slider);
                if (!activeSlide) return;
                height += activeSlide.clientHeight;
                this._elem.style.height = "".concat(height, "px");
              }
            );
          }
          updateFadeHeight() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            if (!this._options.fade || !slider) return false;
            let slide = slider.track.details.rel;
            let height = 0;
            height += parseFloat(getComputedStyle(this._elem).paddingBottom);
            height += parseFloat(getComputedStyle(this._elem).paddingTop);
            let activeSlide = this.getActiveSlideElem(slider);
            if (!activeSlide) return;
            height += activeSlide.getBoundingClientRect().height;
            this._elem.style.height = "".concat(height, "px");
            if (!this._elem.classList.contains("fade-slider")) {
              this._elem.classList.add("fade-slider");
            }
          }
          alignArrows() {
            if (!this._options.alignArrowsTo || !this._navContainer)
              return false;
            let elem = this._elem.querySelector(this._options.alignArrowsTo);
            this._navContainer.style.top = "".concat(
              elem.clientHeight / 2,
              "px"
            );
          }
          updateClasses(slider) {
            if (!slider) return false;
            let slide = slider.track.details.rel;
            let maxSlides = slider.track.details.slides.length;
            let perView = this._slidesPerView;
            let endSlide = slide + perView;
            let canSlide = perView !== maxSlides;
            if (this._prevArrow && !this._options.loop) {
              if (slide === 0 || !canSlide) {
                this._prevArrow.setAttribute("disabled", "disabled");
              } else {
                this._prevArrow.removeAttribute("disabled");
              }
            }
            if (this._nextArrow && !this._options.loop) {
              if (this.isAtEnd(slider) || !canSlide) {
                this._nextArrow.setAttribute("disabled", "disabled");
              } else {
                this._nextArrow.removeAttribute("disabled");
              }
            }
            if (this._dots) {
              let dotIndex = slide;
              for (let dot of this._dots) {
                dot.classList.remove("active");
                if (Number(dot.dataset.dot) === dotIndex) {
                  dot.classList.add("active");
                }
              }
            }
            let activeSlide = this.getActiveSlideElem(slider);
            for (let slide of this._slides) {
              slide.classList.remove("active");
            }
            if (activeSlide) {
              activeSlide.classList.add("active");
            }
            let idx = slider.track.details.maxIdx;
            let totalSlides = idx === Infinity ? maxSlides : idx + 1;
            this._elem.style.setProperty("--current-slide", slide + 1);
            this._elem.style.setProperty("--total-slides", totalSlides);
            if (this._options.progressSelector) {
              let progressElem = document.querySelector(
                this._options.progressSelector
              );
              progressElem.style.setProperty("--current-slide", slide + 1);
              progressElem.style.setProperty("--total-slides", totalSlides);
              if (totalSlides === 1) {
                progressElem.classList.add("hide");
              }
            }
          }
          isAtEnd() {
            let slider =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._slider;
            let slide = slider.track.details.rel;
            let idx = slider.track.details.maxIdx;
            let maxSlides = slider.track.details.slides.length;
            let totalSlides = idx === Infinity ? maxSlides : idx + 1;
            return slide + 1 >= totalSlides;
          }
          refresh() {
            return this._slider.refresh();
          }
          resize() {
            return this._slider.resize();
          }
          _convertOldOptions() {
            if (this._options.slidesPerView) {
              this._options.slides = this._options.slides || {};
              this._options.slides.perView = this._options.slidesPerView;
              delete this._options.slidesPerView;
            }
            if (this._options.spacing) {
              this._options.slides.spacing = this._options.spacing;
            }
          }
          _addPinchZoom() {
            let zoomImages = this._elem.querySelectorAll(".has-zoom");
            for (let zoomImage of zoomImages) {
              new pinch_zoom_js__WEBPACK_IMPORTED_MODULE_5__["default"](
                zoomImage,
                {
                  tapZoomFactor: 2,
                  maxZoom: 3,
                  draggableUnzoomed: false,
                }
              );
            }
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/Klaviyo.js":
      /*!*****************************************************!*\
  !*** ./src/resources/scripts/components/Klaviyo.js ***!
  \*****************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return Klaviyo;
          }
        );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );

        class Klaviyo extends _inherited_Component__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
          }
          mount() {
            let form = document.getElementById("klaviyo-form");
            let subscribedText = document.getElementById(
              "klaviyo__subscribed-text"
            );
            form.addEventListener("submit", function (e) {
              e.preventDefault(); //stop form from submitting

              let email = e.target[0].value;
              let variant = e.target.dataset.variant;
              fetch(
                "https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=R25LDx",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    revision: "2024-06-15",
                  },
                  body: JSON.stringify({
                    data: {
                      type: "back-in-stock-subscription",
                      attributes: {
                        profile: {
                          data: {
                            type: "profile",
                            attributes: {
                              email,
                            },
                          },
                        },
                        channels: ["EMAIL"],
                      },
                      relationships: {
                        variant: {
                          data: {
                            type: "catalog-variant",
                            id: `$shopify:::$default:::${variant}`,
                          },
                        },
                      },
                    },
                  }),
                }
              )
                .then(function (response) {
                  if (response.ok) {
                    return response.json();
                  }
                  return Promise.reject(response);
                })
                .then(function (data) {
                  console.log("success", data);
                })
                .catch(function (error) {
                  console.warn("Something went wrong.", error);
                });
              subscribedText.style.opacity = 1;
              subscribedText.style.height = "auto";
            });
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/LazyLoad.js":
      /*!******************************************************!*\
  !*** ./src/resources/scripts/components/LazyLoad.js ***!
  \******************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return LazyLoadComp;
          }
        );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! vanilla-lazyload */ "./node_modules/vanilla-lazyload/dist/lazyload.min.js"
          );
        /* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1__
          );

        class LazyLoadComp extends _inherited_Component__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
            this._options = {
              ...{
                elements_selector: "[data-lazy]",
                callback_loaded: (e) => {
                  if (e.parentNode.nodeName === "PICTURE") {
                    e.parentNode.classList.add("loaded");
                  }
                  if (e.nodeName === "VIDEO") {
                    this._ctx.emit("bb--video-loaded", null, e);
                  }
                },
                callback_error: (e) => {
                  if (e.parentNode.nodeName === "PICTURE") {
                    e.parentNode.classList.add("error");
                  }
                },
                threshold: 500,
              },
              ...this._options,
            };
            this._lazyLoad = null;
          }
          mount() {
            this._lazyLoad =
              new vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1___default.a(
                this._options
              );
            this._ctx.on("bb--lazy-load-update", (e) => {
              this._lazyLoad.update();
            });
            this._ctx.on("bb--lazy-load-elem", (state, elem) => {
              vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1___default.a.load(
                elem,
                this._options
              );
            });
            document.addEventListener("bb--lazy-load-update", (e) => {
              this._lazyLoad.update();
            });
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/LoadMore.js":
      /*!******************************************************!*\
  !*** ./src/resources/scripts/components/LoadMore.js ***!
  \******************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return LoadMoreComp;
          }
        );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );

        class LoadMoreComp extends _inherited_Component__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
          }
          mount() {
            $(this._elem).on("click", function () {
              let $this = $(this);
              let totalPages = parseInt($("[data-all-pages]").val());
              let currentPage = parseInt($("[data-this-page]").val());
              let datacollurl = $("[data-coll-url]").val();
              $this.attr("disabled", true);
              $this.find("[load-more-text]").addClass("hide");
              $this.find("[loader]").removeClass("hide");
              let nextUrl = $("[data-next-link]").val();
              let current_page_new = currentPage + 1;
              let next_coll = currentPage + 2;
              let product_per_page = $("[data-product-per-page]").val();
              let all_paginate_items = $("[data-all-paginate-items]").val();
              //alert(current_page_new)
              //return false;

              $.ajax({
                url: nextUrl,
                type: "GET",
                dataType: "html",
                success: function (responseHTML) {
                  $("[data-next-link]").val(datacollurl + "?page=" + next_coll);
                  $("[data-this-page]").val(current_page_new);
                  $(".product-grid").append(
                    $(responseHTML).find(".product-grid").html()
                  );
                  if (
                    product_per_page * current_page_new >
                    all_paginate_items
                  ) {
                    $("#viewed_items").text(all_paginate_items);
                  } else {
                    $("#viewed_items").text(
                      product_per_page * current_page_new
                    );
                  }
                },
                complete: function () {
                  if (current_page_new < totalPages) {
                    $this.attr("disabled", false);
                    $this.find("[load-more-text]").removeClass("hide");
                    $this.find("[loader]").addClass("hide");
                    var api = new Yotpo.API(yotpo);
                    api.refreshWidgets();
                  }
                  if (current_page_new >= totalPages) {
                    $this
                      .find("[load-more-text]")
                      .text("Products Finished")
                      .removeClass("hide");
                    $this.find("[loader]").addClass("hide");
                  }
                },
              });
            });

            // $('.js-load-more').on('click', function () {
            //     let $this = $(this);
            //     let totalPages = parseInt($('[data-all-pages]').val());
            //     let currentPage = parseInt($('[data-this-page]').val());
            //     let datacollurl = $('[data-coll-url]').val();
            //     $this.attr('disabled', true);
            //     $this.find('[load-more-text]').addClass('hide');
            //     $this.find('[loader]').removeClass('hide');
            //     let nextUrl = $('[data-next-link]').val();
            //     let current_page_new = currentPage + 1;
            //     let next_coll = currentPage + 2;
            //     //alert(current_page_new)
            //     //return false;

            //     $.ajax({
            //         url: nextUrl,
            //         type: 'GET',
            //         dataType: 'html',
            //         success: function (responseHTML) {
            //             $('[data-next-link]').val(
            //                 datacollurl + '?page=' + next_coll
            //             );
            //             $('[data-this-page]').val(current_page_new);
            //             $('.product-grid').append(
            //                 $(responseHTML).find('.product-grid').html()
            //             );
            //         },
            //         complete: function () {
            //             if (current_page_new < totalPages) {
            //                 $this.attr('disabled', false);
            //                 $this.find('[load-more-text]').removeClass('hide');
            //                 $this.find('[loader]').addClass('hide');
            //             }
            //             if (current_page_new >= totalPages) {
            //                 $this
            //                     .find('[load-more-text]')
            //                     .text('Products Finished')
            //                     .removeClass('hide');
            //                 $this.find('[loader]').addClass('hide');
            //             }
            //         },
            //     });
            // });
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/Marquee.js":
      /*!*****************************************************!*\
  !*** ./src/resources/scripts/components/Marquee.js ***!
  \*****************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return Marquee;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var marquee3000__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! marquee3000 */ "./node_modules/marquee3000/marquee3k.js"
          );
        /* harmony import */ var marquee3000__WEBPACK_IMPORTED_MODULE_2___default =
          /*#__PURE__*/ __webpack_require__.n(
            marquee3000__WEBPACK_IMPORTED_MODULE_2__
          );

        class Marquee extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
          }
          async mount() {
            this.Marquee3k = await Promise.resolve(/*! import() */).then(
              __webpack_require__.t.bind(
                null,
                /*! marquee3000 */ "./node_modules/marquee3000/marquee3k.js",
                7
              )
            );
            this.Marquee3k = this.Marquee3k.default;
            window.addEventListener(
              "resize",
              (e) => {
                this.Marquee3k.refreshAll();
              },
              {
                passive: true,
              }
            );
            document.addEventListener("shopify:section:load", (e) => {
              this.marqueeInit();
            });
            setTimeout(() => {
              this.marqueeInit();
              this.Marquee3k.refreshAll();
            }, 500);
          }
          marqueeInit() {
            this.Marquee3k.init({
              selector: "marquee-bar",
            });
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/Product.js":
      /*!*****************************************************!*\
  !*** ./src/resources/scripts/components/Product.js ***!
  \*****************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return Product;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );

        class Product extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            console.log("product.js");
            super(elem, theme, options, ctx);
            this._options = {
              ...{
                historyState: true,
              },
              ...this._options,
            };
            this._product = this._elem.querySelector("[data-product-json]")
              ? JSON.parse(
                this._elem.querySelector("[data-product-json]").innerHTML
              )
              : null;
            this._variantOptionTriggers = this._elem.querySelectorAll(
              "[data-variant-option-trigger]"
            );
            this._variant = null;
            this._sellingPlan = null;
            this._masterSelects = this._elem.querySelectorAll(
              "[data-master-select]"
            );
            this._priceWrappers = this._elem.querySelectorAll(
              "[data-product-prices]"
            );
            this._prices = this._elem.querySelectorAll("[data-price]");
            this._priceVaries = this._elem.querySelectorAll(
              "[data-price-varies]"
            );
            this._comparePrices = this._elem.querySelectorAll(
              "[data-compare-price]"
            );
            this._images = this._elem.querySelectorAll("[data-product-image]");
            this._addToCarts = this._elem.querySelectorAll("[data-submit]");
            this._addToCartHTML = Array.from(this._addToCarts).map(
              (elem) => elem.innerHTML
            );
            this._quantityInput = this._elem.querySelector(
              "[data-quantity-input]"
            );
            this._quantitySelects =
              this._elem.querySelectorAll("[data-quantity]");
            this._variantRadios =
              this._elem.querySelectorAll("[data-variant-id]");
            this._extraProductsInput = this._elem.querySelector(
              "[data-extra-products]"
            );
            this._extraProductRadios = this._elem.querySelectorAll(
              "[data-extra-product]"
            );
            this._sellingPlanInput = this._elem.querySelector(
              "[data-selling-plan]"
            );
            console.log("this._bundleProducts");
            this._bundleProducts = this._elem.querySelectorAll(
              "[data-bundle-product]"
            );
          }
          mount() {
            console.log("product.js mount");
            if (this._product === null) {
              return false;
            }
            this._variant = this._getVariantFromOptions();
            for (let optionSelector of this._variantOptionTriggers) {
              optionSelector.addEventListener("change", (e) => {
                this._onSelectChange();
              });
            }
            for (let optionSelector of this._variantRadios) {
              optionSelector.addEventListener("change", (e) => {
                this._onSelectChange();
              });
            }
            for (let optionSelector of this._masterSelects) {
              optionSelector.addEventListener("change", (e) => {
                this._onSelectChange();
              });
            }
            for (let optionSelector of this._extraProductRadios) {
              optionSelector.addEventListener("change", (e) => {
                this._onExtraProductRadioChange();
              });
            }
            for (let quantitySwitch of this._quantitySelects) {
              quantitySwitch.addEventListener("change", (e) => {
                if (quantitySwitch.checked) {
                  this._quantityInput.value = quantitySwitch.dataset.quantity;
                }
              });
            }
            this._onSelectChange();
          }
          _onExtraProductRadioChange() {
            let extraProducts = [];
            for (let radio of this._extraProductRadios) {
              if (radio.checked) {
                let obj = JSON.parse(radio.dataset.extraProduct);
                extraProducts.push({
                  id: obj.id,
                  quantity: obj.quantity,
                  selling_plan: obj.selling_plan,
                });
              }
            }
            if (this._extraProductsInput) {
              this._extraProductsInput.value = JSON.stringify(extraProducts);
            }
          }
          _linkedOptions(variant) {
            for (let optionSelector of this._variantOptionTriggers) {
              optionSelector.removeAttribute("disabled");
              for (let prodVariant of this._product.variants) {
                if (
                  prodVariant.option1 === variant.option1 &&
                  optionSelector.value === prodVariant.option2 &&
                  !prodVariant.available
                ) {
                  optionSelector.setAttribute("disabled", "disabled");
                }
              }
            }
          }
          _onSelectChange() {
            let variant = this._getVariantFromOptions();
            this._updateAddToCartState(variant);
            if (!variant) {
              return;
            }
            this._updateMasterSelect(variant);
            this._updateProductPrices(variant);
            this._switchToVariantImage(variant);
            this._onExtraProductRadioChange();
            this._updateSellingPlan(variant);
            this._updateBundleProducts(variant);
            // this._linkedOptions(variant)
            this._variant = variant;
            if (this._options.historyState) {
              this._updateHistoryState(variant);
            }
          }
          _updateBundleProducts(variant) {
            for (let bundleElem of this._bundleProducts) {
              let imageElem = bundleElem.querySelector(
                "[data-bundle-product-image]"
              );
              let jsonElem = bundleElem.querySelector(
                "[data-bundle-product-json]"
              );
              let priceElems = bundleElem.querySelectorAll(
                "[data-bundle-product-price]"
              );
              let comparePriceElems = bundleElem.querySelectorAll(
                "[data-bundle-product-compare-price]"
              );
              let variantIdElem = bundleElem.querySelector('[name="id"]');
              let bundleVariants = JSON.parse(jsonElem.innerHTML);
              let matchingVariant = null;
              for (let bundleVariant of bundleVariants) {
                if (
                  bundleVariant.options.every((option) =>
                    variant.options.includes(option)
                  )
                ) {
                  matchingVariant = bundleVariant;
                }
              }
              if (matchingVariant) {
                if (matchingVariant.featured_image) {
                  let imageSrc = _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__[
                    "default"
                  ].getSizedImageUrl(
                    matchingVariant.featured_image.src,
                    "240x"
                  );
                  imageElem.src = imageSrc;
                }
                for (let elem of priceElems) {
                  elem.innerHTML = this._formatMoney(matchingVariant.price);
                }
                if (matchingVariant.compare_at_price) {
                  for (let elem of comparePriceElems) {
                    elem.innerHTML = this._formatMoney(
                      matchingVariant.compare_at_price
                    );
                  }
                }
                variantIdElem.value = matchingVariant.id;
              }
              console.log(matchingVariant);
            }
          }
          _updateSellingPlan(variant) {
            if (!this._sellingPlanInput) return false;
            this._sellingPlanInput.value = "";
            this._sellingPlan = null;
            if (variant.selling_plan_allocations.length > 0) {
              this._sellingPlan =
                variant.selling_plan_allocations[0].selling_plan_id;
              this._sellingPlanInput.value = this._sellingPlan;
            }
          }
          _updateHistoryState(variant) {
            if (!history.replaceState || !variant) {
              return;
            }
            let newurl = ""
              .concat(window.location.protocol, "//")
              .concat(window.location.host)
              .concat(window.location.pathname, "?variant=")
              .concat(variant.id);
            if (this._sellingPlan) {
              newurl += "&selling_plan=".concat(this._sellingPlan);
            }
            window.history.replaceState(
              {
                path: newurl,
              },
              "",
              newurl
            );
          }
          _updateAddToCartState(variant) {
            if (!variant && this._product.available) {
              for (let addToCart of this._addToCarts) {
                addToCart.setAttribute("disabled", "disabled");
                addToCart.innerHTML =
                  this._ctx.getState().locale.makeASelection;
              }
              return;
            }
            if (!variant) {
              return;
            }
            if (variant.available) {
              for (let [i, addToCart] of this._addToCarts.entries()) {
                addToCart.removeAttribute("disabled");
                addToCart.innerHTML = this._addToCartHTML[i];
              }
            } else {
              for (let addToCart of this._addToCarts) {
                addToCart.setAttribute("disabled", "disabled");
                addToCart.innerHTML = this._ctx.getState().locale.soldOut;
              }
            }
          }
          _switchToVariantImage(variant) {
            for (let productImage of this._images) {
              if (productImage.dataset.productImage) {
                let idArray = productImage.dataset.productImage.split(",");
                if (idArray.includes(variant.id.toString())) {
                  let mainSlider =
                    this._theme.getComponent("mainProductSlider");
                  if (mainSlider) {
                    mainSlider.component.goToSlide(productImage.dataset.index);
                  }
                }
              }
            }
          }
          _updateProductPrices(variant) {
            for (let varies of this._priceVaries) {
              varies.classList.add("hide");
            }
            for (let productPrice of this._prices) {
              if (variant.compare_at_price > variant.price) {
                productPrice.classList.add("on-sale");
              } else {
                productPrice.classList.remove("on-sale");
              }
              productPrice.innerHTML = this._formatMoney(variant.price);
            }
            for (let productComparePrice of this._comparePrices) {
              if (variant.compare_at_price > variant.price) {
                productComparePrice.classList.remove("hide");
                productComparePrice.innerHTML = this._formatMoney(
                  variant.compare_at_price
                );
              } else {
                productComparePrice.classList.add("hide");
                productComparePrice.innerHTML = "";
              }
            }
            if (!variant.available) {
              for (let productPrice of this._prices) {
                productPrice.innerHTML =
                  this._ctx.getState().locale.unavailable;
              }
              for (let productComparePrice of this._comparePrices) {
                productComparePrice.classList.add("hide");
              }
            }
          }
          _formatMoney(price) {
            return _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__[
              "default"
            ].formatMoney(price, this._ctx.getState());
          }
          _updateMasterSelect(variant) {
            for (let originalSelector of this._masterSelects) {
              originalSelector.value = variant.id;
            }
          }
          _getCurrentOptions() {
            let currentOptions = [];
            for (let optionSelector of this._variantOptionTriggers) {
              let type = optionSelector.getAttribute("type");
              let currentOption = {};
              let alreadyDone = false;
              for (let option of currentOptions) {
                if (option.index === optionSelector.dataset.index) {
                  alreadyDone = true;
                }
              }
              if (alreadyDone) continue;
              if (type === "radio" || type === "checkbox") {
                if (optionSelector.checked) {
                  currentOption.value = optionSelector.value;
                  currentOption.index = optionSelector.dataset.index;
                  currentOptions.push(currentOption);
                } else {
                  currentOptions.push(false);
                }
              } else {
                currentOption.value = optionSelector.value;
                currentOption.index = optionSelector.dataset.index;
                currentOptions.push(currentOption);
              }
            }
            currentOptions =
              _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].compact(
                currentOptions
              );
            return currentOptions;
          }
          _getVariantFromOptions() {
            let selectedValues = this._getCurrentOptions();
            let variants = this._product.variants;
            let found = false;
            for (let radio of this._variantRadios) {
              if (radio.checked) {
                return this._product.variants.find(
                  (variant) => "".concat(variant.id) === radio.dataset.variantId
                );
              }
            }
            if (selectedValues.length > 0) {
              for (let variant of variants) {
                var satisfied = true;
                for (let option of selectedValues) {
                  if (satisfied) {
                    satisfied = option.value === variant[option.index];
                  }
                }
                if (satisfied) {
                  found = variant;
                }
              }
            }
            if (!found) {
              return this._product.variants.find(
                (variant) =>
                  "".concat(variant.id) ===
                  "".concat(this._masterSelects[0].value)
              );
            }
            return found || null;
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/SideCart.js":
      /*!******************************************************!*\
  !*** ./src/resources/scripts/components/SideCart.js ***!
  \******************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! core-js/modules/web.url-search-params.js */ "./node_modules/core-js/modules/web.url-search-params.js"
          );
        /* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_1__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );

        class SideCart extends _inherited_Component__WEBPACK_IMPORTED_MODULE_2__[
          "default"
        ] {
          publicRefreshSideCart() {
            const loading = document.querySelector(".side-cart.rendered");
            loading.classList.add("loading");
            setTimeout(() => {
              loading.classList.remove("loading");
            }, 1000);
            this.showSideCart();
          }

          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
            this._scrollArea = this._elem.querySelector(
              "[data-side-cart-scroll]"
            );
            this._cartTrigger = document.querySelector("[data-cart-trigger]");

            document.addEventListener("maurten:cart:add", () => {
              this.publicRefreshSideCart();
            });
            document.addEventListener("status:cart:add", (event) => {
              this.publicRefreshSideCart();
            });
            if (window.location.href.includes("wishlist")) {
              document.addEventListener("click", (event) => {
                if (event.target.matches(".wishlist-cart")) {
                  this.publicRefreshSideCart();
                }
              });
            }
          }

          async mount() {
            this._ctx.on("cart-item-added", async () => {
              this.showSideCart();
            });
            let params = new URLSearchParams(window.location.search);
            if (params.has("show-cart")) {
              this.showSideCart();
            }
          }
          showSideCart() {
            this._scrollArea = this._elem.querySelector(
              "[data-side-cart-scroll]"
            );
            this._elem.classList.add("shown");
            this._cartTrigger.classList.add("active");
            this._ctx.emit("bb--scroll-lock-elem", null, this._scrollArea);
          }
        }
        /* harmony default export */ __webpack_exports__["default"] = SideCart;

        /***/
      },

    /***/ "./src/resources/scripts/components/SlideToggleGroup.js":
      /*!**************************************************************!*\
  !*** ./src/resources/scripts/components/SlideToggleGroup.js ***!
  \**************************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return SlideToggleGroup;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );
        /* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );

        class SlideToggleGroup extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
            this._toggleItems =
              this._elem.querySelectorAll("[data-toggle-item]");
          }
          mount() {
            if (
              this._options.closeOnOutsideClick &&
              matchMedia("only screen and (min-width: 835px)").matches
            ) {
              document.addEventListener(
                "click",
                (e) => {
                  let clickIsInside =
                    this._elem.contains(e.target) || this._elem === e.target;
                  if (clickIsInside) return false;
                  for (let item of this._toggleItems) {
                    let elemToSlide = item.querySelector("[data-toggle-elem]");
                    if (item.classList.contains("open")) {
                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__[
                        "default"
                      ].slideUp(elemToSlide, item);
                    }
                  }
                },
                {
                  passive: true,
                }
              );
            }
            for (let item of this._toggleItems) {
              let trigger = item.querySelector("[data-toggle-trigger]");
              trigger.addEventListener("click", (e) => {
                e.preventDefault();
                let elemToSlide = item.querySelector("[data-toggle-elem]");
                if (elemToSlide.dataset.transitioning === "true") {
                  return false;
                }
                if (item.classList.contains("open")) {
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].slideUp(
                    elemToSlide,
                    item
                  );
                } else {
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__[
                    "default"
                  ].slideDown(elemToSlide, item);
                }
                let otherToggles =
                  item.parentNode.querySelectorAll("[data-toggle-item]");
                for (let otherItem of otherToggles) {
                  if (
                    otherItem !== item &&
                    otherItem.classList.contains("open") &&
                    otherItem.dataset.transitioning !== "true"
                  ) {
                    let elemToSlide =
                      otherItem.querySelector("[data-toggle-elem]");
                    _lib_Helpers__WEBPACK_IMPORTED_MODULE_2__[
                      "default"
                    ].slideUp(elemToSlide, otherItem);
                  }
                }
              });
            }
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/components/Tabs.js":
      /*!**************************************************!*\
  !*** ./src/resources/scripts/components/Tabs.js ***!
  \**************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return Tabs;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _inherited_Component__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../inherited/Component */ "./src/resources/scripts/inherited/Component.js"
          );

        class Tabs extends _inherited_Component__WEBPACK_IMPORTED_MODULE_1__[
          "default"
        ] {
          constructor(elem, theme, options, ctx) {
            super(elem, theme, options, ctx);
            this._tabLinks = this._elem.querySelectorAll("[data-tab-link]");
            this._tabContents =
              this._elem.querySelectorAll("[data-tab-content]");
          }
          mount() {
            for (let elem of this._tabLinks) {
              elem.addEventListener("click", (e) => {
                let tabId = elem.dataset.tabLink.toString();
                for (let elem of this._tabLinks) {
                  elem.classList.remove("active");
                }
                for (let elem of this._tabContents) {
                  elem.classList.remove("active");
                }
                elem.classList.add("active");
                document.getElementById(tabId).classList.add("active");
                if (this._options.updateKeenSlider) {
                  let slider = this._theme.getComponentByElem(
                    document
                      .getElementById(tabId)
                      .querySelector("[data-keen-slider]")
                  );
                  slider.component._slider.update();
                }
              });
            }
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/inherited/Component.js":
      /*!******************************************************!*\
  !*** ./src/resources/scripts/inherited/Component.js ***!
  \******************************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return Component;
          }
        );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js"
          );
        /* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );

        class Component {
          constructor(elem, theme, options, ctx) {
            this._theme = theme;
            this._elem = elem;
            this._ctx = ctx;
            this._options = options;
            this._originalOptions = {
              ...this._options,
            };
            this._addedResizeListener = false;
            this._optionsCheck(true);
          }
          _optionsCheck(firstRun) {
            if (Array.isArray(this._options)) return false;
            let newOptions = {
              ...this._originalOptions,
            };
            newOptions.usingSettingsFor = "desktop";
            if (
              this._originalOptions.responsive &&
              this._originalOptions.responsive.length
            ) {
              for (let optionsObj of this._originalOptions.responsive) {
                if (
                  matchMedia(
                    "only screen and (max-width: ".concat(
                      optionsObj.breakpoint,
                      ")"
                    )
                  ).matches
                ) {
                  newOptions = {
                    ...this._originalOptions,
                    ...optionsObj.settings,
                  };
                  newOptions.usingSettingsFor = "tablet";
                }
              }
            }
            if (firstRun) {
              this._options = newOptions;
            } else if (
              this._options.usingSettingsFor !== newOptions.usingSettingsFor
            ) {
              this._options = newOptions;
              return true;
            }
            return false;
          }
          reinitOnResize() {
            if (this._addedResizeListener) return;
            window.addEventListener(
              "resize",
              (e) => {
                let changed = this._optionsCheck();
                if (changed) {
                  this.unmount();
                  this.mount();
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ].nextFrame(() => {
                    if (typeof this.update === "function") {
                      this.update();
                    }
                  });
                }
              },
              {
                passive: true,
              }
            );
            this._addedResizeListener = true;
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/lib/AjaxApi.js":
      /*!**********************************************!*\
  !*** ./src/resources/scripts/lib/AjaxApi.js ***!
  \**********************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return AjaxApi;
          }
        );
        /* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js"
          );
        /* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_1__
          );
        /* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./Helpers */ "./src/resources/scripts/lib/Helpers.js"
          );

        let endpoints = {
          cart: {
            clear: "/cart/clear.json",
            get: "/cart.json",
            add: "/cart/add.js",
            change: "/cart/change.js",
            update: "/cart/update.js",
          },
          product: {
            get: "/products/[handle].json",
            getCustom: "/products/[handle]?view=json",
          },
        };
        class AjaxApi {
          static async getCart() {
            let result = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(
              _Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].getEndpoint(
                endpoints.cart.get
              )
            );
            return result.data;
          }
          static async addToCart(options) {
            let result =
              await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(
                _Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].getEndpoint(
                  endpoints.cart.add
                ),
                options
              );
            return result.data;
          }
          static async changeCart(options) {
            let result =
              await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(
                _Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].getEndpoint(
                  endpoints.cart.change
                ),
                options
              );
            return result.data;
          }
          static async updateCart(options) {
            let result =
              await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(
                _Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].getEndpoint(
                  endpoints.cart.update
                ),
                options
              );
            return result.data;
          }
          static async emptyCart(options) {
            let result =
              await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(
                _Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].getEndpoint(
                  endpoints.cart.clear
                ),
                options
              );
            return result.data;
          }
          static async updateCartItem(id, quantity, properties) {
            let props =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : {};
            return await AjaxApi.changeCart({
              line: "".concat(id),
              quantity: quantity,
              properties: props,
            });
          }
          static async removeCartItem(id) {
            return await AjaxApi.updateCartItem(id, 0);
          }
          static async updateSellingPlanItem(
            itemKey,
            itemQuantity,
            sellingPlanId
          ) {
            const updates = {
              id: itemKey,
              quantity: itemQuantity,
              selling_plan: sellingPlanId,
            };

            console.log("Updating cart with:", updates);

            try {
              const response = await AjaxApi.changeCart(updates);
              console.log("Cart updated successfully:", response);
              return response;
            } catch (err) {
              console.error("Error updating cart:", err);
              throw err;
            }
          }
          static async getProduct(handle) {
            let endpoint = endpoints.product.get.replace("[handle]", handle);
            let result = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(
              _Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].getEndpoint(
                endpoint
              )
            );
            return result.data.product;
          }
          static async getCustomProduct(handle) {
            let endpoint = endpoints.product.getCustom.replace(
              "[handle]",
              handle
            );
            let result = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(
              _Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].getEndpoint(
                endpoint
              ),
              {
                responseType: "json",
              }
            );
            return typeof result.data === "object"
              ? result.data
              : JSON.parse(result.data);
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/lib/Helpers.js":
      /*!**********************************************!*\
  !*** ./src/resources/scripts/lib/Helpers.js ***!
  \**********************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "default",
          function () {
            return Helpers;
          }
        );
        /* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js"
          );
        /* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__
          );

        class Helpers {
          static formatWithDelimiters(number, precision, thousands, decimal) {
            precision = precision || 2;
            thousands = thousands || ",";
            decimal = decimal || ".";
            if (isNaN(number) || number == null) {
              return 0;
            }
            number = (number / 100.0).toFixed(precision);
            const parts = number.split(".");
            const dollarsAmount = parts[0].replace(
              /(\d)(?=(\d\d\d)+(?!\d))/g,
              "$1" + thousands
            );
            const centsAmount = parts[1] ? decimal + parts[1] : "";
            return dollarsAmount + centsAmount;
          }
          static isInViewport(elem) {
            var distance = elem.getBoundingClientRect();
            return (
              distance.top >= 0 &&
              distance.bottom <=
              (window.innerHeight || document.documentElement.clientHeight)
            );
          }
          static hasParentWithSelector(element, selector) {
            if (element.matches(selector)) return element;
            return (
              element.parentElement &&
              Helpers.hasParentWithSelector(element.parentElement, selector)
            );
          }
          static debounce(callback, wait) {
            var _this = this;
            let timeout;
            return function () {
              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key];
              }
              const context = _this;
              clearTimeout(timeout);
              timeout = setTimeout(() => callback.apply(context, args), wait);
            };
          }
          static getParameterByName(name) {
            let url =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return decodeURIComponent(results[2].replace(/\+/g, " "));
          }
          static compact(array) {
            var index = -1;
            var length = array == null ? 0 : array.length;
            var resIndex = 0;
            var result = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result[resIndex++] = value;
              }
            }
            return result;
          }
          static isAnyPartOfElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
            const windowHeight =
              window.innerHeight || document.documentElement.clientHeight;
            const windowWidth =
              window.innerWidth || document.documentElement.clientWidth;

            // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
            const vertInView =
              rect.top <= windowHeight && rect.top + rect.height >= 0;
            const horInView =
              rect.left <= windowWidth && rect.left + rect.width >= 0;
            return vertInView && horInView;
          }
          static formatMoney(cents, state) {
            let format = state.moneyFormat;

            //if (cents === 0) return state.locale.free

            if (typeof cents === "string") {
              cents = cents.replace(".", "");
            }
            let value = "";
            const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
            switch (format.match(placeholderRegex)[1]) {
              case "amount":
                value = Helpers.formatWithDelimiters(cents, 2);
                break;
              case "amount_no_decimals":
                value = Helpers.formatWithDelimiters(cents, 0);
                break;
              case "amount_with_comma_separator":
                value = Helpers.formatWithDelimiters(cents, 2, ".", ",");
                break;
              case "amount_no_decimals_with_comma_separator":
                value = Helpers.formatWithDelimiters(cents, 0, ".", ",");
                break;
              case "amount_no_decimals_with_space_separator":
                value = Helpers.formatWithDelimiters(cents, 0, " ");
                break;
            }
            return format
              .replace(placeholderRegex, value)
              .replace(".00", "")
              .replace(",00", "");
          }
          static getSizedImageUrl(src, size) {
            if (size === null || src === null) {
              return src;
            }
            if (size === "master") {
              return Helpers.removeProtocol(src);
            }
            var match = src.match(
              /\.(webp|jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
            );
            if (match) {
              var prefix = src.split(match[0]);
              var suffix = match[0];
              return Helpers.removeProtocol(prefix[0] + "_" + size + suffix);
            } else {
              return null;
            }
          }
          static removeProtocol(path) {
            return path.replace(/http(s)?:/, "");
          }
          static getEndpoint(endpoint) {
            if (endpoint.includes("?")) {
              return "".concat(endpoint, "&v=").concat(Math.random());
            } else {
              return "".concat(endpoint, "?v=").concat(Math.random());
            }
          }
          static nextFrame(callback) {
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(callback);
            });
          }
          static slideDown(elem, mainElem) {
            elem.style.maxHeight = "none";
            let scrollHeight = elem.scrollHeight;
            elem.style.maxHeight = "0px";
            mainElem.classList.add("open");
            elem.classList.add("open");
            elem.dataset.transitioning = true;
            let openEvent = (e) => {
              if (e.propertyName === "max-height") {
                elem.dataset.transitioning = false;
                elem.style.maxHeight = "none";
                elem.removeEventListener("transitionend", openEvent, false);
              }
            };
            elem.addEventListener("transitionend", openEvent, false);
            Helpers.nextFrame(() => {
              elem.style.maxHeight = "".concat(scrollHeight, "px");
            });
          }
          static slideUp(elem, mainElem) {
            elem.style.maxHeight = "".concat(elem.scrollHeight, "px");
            mainElem.classList.remove("open");
            elem.dataset.transitioning = true;
            let closeEvent = (e) => {
              if (e.propertyName === "max-height") {
                elem.classList.remove("open");
                elem.dataset.transitioning = false;
                elem.removeEventListener("transitionend", closeEvent, false);
              }
            };
            elem.addEventListener("transitionend", closeEvent, false);
            Helpers.nextFrame(() => {
              elem.style.maxHeight = "0px";
            });
          }
          static handleize(str) {
            str = str.toLowerCase();
            var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];

            // For the old browsers
            for (var i = 0; i < toReplace.length; ++i) {
              str = str.replace(toReplace[i], "");
            }
            str = str.replace(/\W+/g, "-");
            if (str.charAt(str.length - 1) == "-") {
              str = str.replace(/-+\z/, "");
            }
            if (str.charAt(0) == "-") {
              str = str.replace(/\A-+/, "");
            }
            return str;
          }
          static copyToClipboard(str) {
            const el = document.createElement("textarea");
            el.value = str;
            el.setAttribute("readonly", "");
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
          }
        }

        /***/
      },

    /***/ "./src/resources/scripts/lib/Queue.js":
      /*!********************************************!*\
  !*** ./src/resources/scripts/lib/Queue.js ***!
  \********************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        class Queue {
          constructor() {
            this.queue = [];
            this.processing = false;
          }
          onInit() { }
          add(job) {
            this.queue.push(job);
            if (!this.processing) {
              this.process();
            }
          }
          async process() {
            this.processing = true;
            if (this.queue.length === 0) {
              this.processing = false;
              return false;
            } else {
              let job = this.queue.shift();
              await job();
              this.process();
            }
          }
        }
        /* harmony default export */ __webpack_exports__["default"] = Queue;

        /***/
      },

    /***/ "./src/resources/scripts/main.js":
      /*!***************************************!*\
  !*** ./src/resources/scripts/main.js ***!
  \***************************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../styles/main.scss */ "./src/resources/styles/main.scss"
          );
        /* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! smoothscroll-polyfill */ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js"
          );
        /* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1__
          );
        /* harmony import */ var _Theme__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./Theme */ "./src/resources/scripts/Theme.js"
          );
        __webpack_require__.p = window.__webpack_public_path__;

        smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1___default.a.polyfill();
        let theme = new _Theme__WEBPACK_IMPORTED_MODULE_2__["default"]();
        theme.mountComponents();
        document.addEventListener("shopify:section:unload", (e) => {
          theme.unmountComponents(e.target);
        });
        document.addEventListener("shopify:section:load", (e) => {
          theme.mountComponents(e.target);
          theme._ctx.emit("bb--lazy-load-update");
        });
        window.addToCart = function (product_id, id, callback) {
          if (product_id === "8556381864175" || product_id === "8460452888815") return;
          let AddToCartButton = document.getElementsByClassName(
            "addToCartFormButton"
          )[0];
          document.addToCartForm.id.value = id;
          document.addToCartForm.id.setAttribute("data-productid", product_id);
          document.addToCartForm.setAttribute("data-productid", product_id);
          document.addToCartForm.setAttribute(
            "id",
            "quick-add-".concat(product_id)
          );
          document.addToCartForm.setAttribute(
            "product-id",
            "".concat(product_id)
          );
          AddToCartButton.setAttribute(
            "id",
            "quick-add-".concat(product_id, "-submit")
          );
          AddToCartButton.setAttribute(
            "aria-labelledby",
            "quick-add-"
              .concat(product_id, "-submit title--")
              .concat(product_id)
          );
          AddToCartButton.setAttribute(
            "id",
            "quick-add-".concat(product_id, "-submit")
          );
          AddToCartButton.click();

          // Get the array of product IDs in the cart
          let cartProductIds = Array.from(
            document.querySelectorAll(".cart-item-product-title")
          ).map((element) => element.getAttribute("data-productid"));
          cartProductIds.push(product_id);
          // Call the callback function with the cartProductIds array
          if (typeof callback === "function") {
            console.log("CALLBACK:" + cartProductIds);
            callback(cartProductIds);
            this._refresh();
          }
        };

        /***/
      },

    /***/ "./src/resources/styles/main.scss":
      /*!****************************************!*\
  !*** ./src/resources/styles/main.scss ***!
  \****************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */ __webpack_exports__["default"] =
          __webpack_require__.p + "main.css.liquid";

        /***/
      },

    /******/
  }
);

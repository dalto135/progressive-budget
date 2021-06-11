/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/index.js":
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _indexedDb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexedDb */ \"./assets/js/indexedDb.js\");\n //My code\n\nfunction saveRecord(transaction) {\n  // console.log(transaction);\n  if (Object(_indexedDb__WEBPACK_IMPORTED_MODULE_0__[\"checkForIndexedDb\"])()) {\n    Object(_indexedDb__WEBPACK_IMPORTED_MODULE_0__[\"useIndexedDb\"])(\"budget\", \"transactions\", \"put\", transaction); // let data = retrieveData('budget', 'transactions')\n    // console.log('data.result');\n    // console.log(data);\n  }\n}\n\nvar transactions = [];\nvar myChart;\nfetch(\"/api/transaction\").then(function (response) {\n  return response.json();\n}).then(function (data) {\n  // save db data on global variable\n  transactions = data;\n  populateTotal();\n  populateTable();\n  populateChart();\n});\n\nfunction populateTotal() {\n  // reduce transaction amounts to a single total value\n  var total = transactions.reduce(function (total, t) {\n    return total + parseInt(t.value);\n  }, 0);\n  var totalEl = document.querySelector(\"#total\");\n  totalEl.textContent = total;\n}\n\nfunction populateTable() {\n  var tbody = document.querySelector(\"#tbody\");\n  tbody.innerHTML = \"\";\n  transactions.forEach(function (transaction) {\n    // create and populate a table row\n    var tr = document.createElement(\"tr\");\n    tr.innerHTML = \"\\n      <td>\".concat(transaction.name, \"</td>\\n      <td>\").concat(transaction.value, \"</td>\\n    \");\n    tbody.appendChild(tr);\n  });\n}\n\nfunction populateChart() {\n  // copy array and reverse it\n  var reversed = transactions.slice().reverse();\n  var sum = 0; // create date labels for chart\n\n  var labels = reversed.map(function (t) {\n    var date = new Date(t.date);\n    return \"\".concat(date.getMonth() + 1, \"/\").concat(date.getDate(), \"/\").concat(date.getFullYear());\n  }); // create incremental values for chart\n\n  var data = reversed.map(function (t) {\n    sum += parseInt(t.value);\n    return sum;\n  }); // remove old chart if it exists\n\n  if (myChart) {\n    myChart.destroy();\n  }\n\n  var ctx = document.getElementById(\"myChart\").getContext(\"2d\");\n  myChart = new Chart(ctx, {\n    type: 'line',\n    data: {\n      labels: labels,\n      datasets: [{\n        label: \"Total Over Time\",\n        fill: true,\n        backgroundColor: \"#6666ff\",\n        data: data\n      }]\n    }\n  });\n}\n\nfunction sendTransaction(isAdding) {\n  var nameEl = document.querySelector(\"#t-name\");\n  var amountEl = document.querySelector(\"#t-amount\");\n  var errorEl = document.querySelector(\".form .error\"); // validate form\n\n  if (nameEl.value === \"\" || amountEl.value === \"\") {\n    errorEl.textContent = \"Missing Information\";\n    return;\n  } else {\n    errorEl.textContent = \"\";\n  } // create record\n\n\n  var transaction = {\n    name: nameEl.value,\n    value: amountEl.value,\n    date: new Date().toISOString()\n  }; // if subtracting funds, convert amount to negative number\n\n  if (!isAdding) {\n    transaction.value *= -1;\n  } // add to beginning of current array of data\n\n\n  transactions.unshift(transaction); // re-run logic to populate ui with new record\n\n  populateChart();\n  populateTable();\n  populateTotal(); // also send to server\n  // debugger\n\n  console.log('fetch');\n  fetch(\"/api/transaction\", {\n    method: \"POST\",\n    body: JSON.stringify(transaction),\n    headers: {\n      Accept: \"application/json, text/plain, */*\",\n      \"Content-Type\": \"application/json\"\n    }\n  }).then(function (response) {\n    console.log('response');\n    return response.json();\n  }).then(function (data) {\n    //\n    //\n    console.log('data');\n\n    if (data.errors) {\n      errorEl.textContent = \"Missing Information\";\n    } else {\n      // clear form\n      nameEl.value = \"\";\n      amountEl.value = \"\";\n    }\n  })[\"catch\"](function (err) {\n    // fetch failed, so save in indexed db\n    // console.log('hello');\n    saveRecord(transaction); // clear form\n\n    nameEl.value = \"\";\n    amountEl.value = \"\";\n  });\n}\n\ndocument.querySelector(\"#add-btn\").onclick = function () {\n  sendTransaction(true);\n};\n\ndocument.querySelector(\"#sub-btn\").onclick = function () {\n  sendTransaction(false);\n};\n\n//# sourceURL=webpack:///./assets/js/index.js?");

/***/ }),

/***/ "./assets/js/indexedDb.js":
/*!********************************!*\
  !*** ./assets/js/indexedDb.js ***!
  \********************************/
/*! exports provided: checkForIndexedDb, useIndexedDb, retrieveData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkForIndexedDb\", function() { return checkForIndexedDb; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useIndexedDb\", function() { return useIndexedDb; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"retrieveData\", function() { return retrieveData; });\nfunction checkForIndexedDb() {\n  if (!window.indexedDB) {\n    console.log(\"Your browser doesn't support a stable version of IndexedDB.\");\n    return false;\n  }\n\n  return true;\n}\nfunction useIndexedDb(databaseName, storeName, method, object) {\n  // console.log(method, object);\n  return new Promise(function (resolve, reject) {\n    var request = window.indexedDB.open(databaseName, 1);\n    var db, tx, store;\n\n    request.onupgradeneeded = function (e) {\n      var db = request.result;\n      db.createObjectStore(storeName, {\n        autoIncrement: true\n      });\n    };\n\n    request.onerror = function (e) {\n      console.log(\"There was an error\");\n    };\n\n    request.onsuccess = function (e) {\n      db = request.result;\n      tx = db.transaction(storeName, \"readwrite\");\n      store = tx.objectStore(storeName);\n\n      db.onerror = function (e) {\n        console.log(\"error\");\n      };\n\n      if (method === \"put\") {\n        // store.clear();\n        store.put(object); // console.log('store.getAll().result');\n        // console.log(store.getAll().result());\n        // let allData = store.getAll().result;\n        // console.log('store.count');\n        // console.log(store.count().result);\n        // allData.forEach(i => {\n        //   console.log(i);\n        // })\n        // console.log(allData);\n        // console.log('object');\n        // console.log(object);\n        // console.log('db');\n        // console.log(db);\n        // console.log('tx');\n        // console.log(tx);\n        // console.log('store');\n        // console.log(store);\n        // console.log('store.transaction');\n        // console.log(store.transaction);\n        // console.log('window.indexedDB');\n        // console.log(window.indexedDB);\n        // console.log('request');\n        // console.log(request);\n        // console.log('e.target.result');\n        // console.log(e.target.result);\n      } else if (method === \"get\") {\n        var all = store.getAll();\n\n        all.onsuccess = function () {\n          resolve(all.result);\n        };\n      } else if (method === \"delete\") {\n        store[\"delete\"](object._id);\n      }\n\n      tx.oncomplete = function () {\n        db.close();\n      };\n    };\n  });\n}\nfunction retrieveData(databaseName, storeName) {\n  var request = window.indexedDB.open(databaseName, 1);\n  var db, tx, store; // request.onsuccess = function(e) {\n\n  db = request.result;\n  tx = db.transaction(storeName, \"readwrite\");\n  store = tx.objectStore(storeName);\n  return store.getAll(); // }\n} //1. Add event listener to online event\n//2. Check indexedDB for records\n//store.count().result\n//3. If records, retrieve records, use normal fetch to get records into API\n//store.getAll().result\n//4. Clear indexedDB once records are pushed online\n//store.clear()\n\nwindow.addEventListener(\"click\", function () {\n  return new Promise(function (resolve, reject) {\n    var request = window.indexedDB.open('budget', 1); // console.log('request');\n    // console.log(request);\n\n    var db, tx, store;\n\n    request.onupgradeneeded = function (e) {\n      console.log('onupgradeneeded');\n      var db = request.result;\n      db.createObjectStore('transactions', {\n        autoIncrement: true\n      });\n    };\n\n    request.onerror = function (e) {\n      console.log(\"There was an error\");\n    };\n\n    request.onsuccess = function (e) {\n      db = request.result;\n      tx = db.transaction('transactions', \"readwrite\");\n      store = tx.objectStore('transactions');\n\n      db.onerror = function (e) {\n        console.log(\"db.onerror\");\n      }; // code here\n      // console.log('store.count()');\n      // console.log(store.count());\n      // console.log('store.getAll()');\n      // console.log(store.getAll());\n\n\n      var all = store.getAll();\n\n      all.onsuccess = function () {\n        // resolve(all.result);\n        var indexedDBContent = all.result;\n        console.log('indexedDBContent');\n        console.log(indexedDBContent);\n        var indexedDBLength = indexedDBContent.length;\n        console.log('indexedDBLength');\n        console.log(indexedDBLength); // debugger\n\n        if (indexedDBLength) {\n          var boo = true;\n\n          for (var i = 0; i < indexedDBLength; i++) {\n            // }\n            // indexedDBContent.forEach(i => {\n            fetch(\"/api/transaction\", {\n              method: \"POST\",\n              body: JSON.stringify(indexedDBContent[i]),\n              headers: {\n                Accept: \"application/json, text/plain, */*\",\n                \"Content-Type\": \"application/json\"\n              }\n            } // boo = true\n            ).then(function (response) {\n              console.log('response');\n              return response.json();\n            }).then(function (data) {\n              console.log('data');\n\n              if (data.errors) {\n                errorEl.textContent = \"Missing Information\";\n              }\n            }) // .then(ye => {\n            //   if (i === indexedDBLength) {\n            //     boo = true;\n            //   }\n            // })\n            [\"catch\"](function (err) {\n              // fetch failed, so save in indexed db\n              // saveRecord(transaction);\n              // clear form\n              // boo = false;\n              console.log(err.message);\n              boo = false; // nameEl.value = \"\";\n              // amountEl.value = \"\";\n            });\n          }\n\n          if (boo === true) {\n            store.clear();\n          }\n        }\n      };\n    }; // request.onsuccess = function(e) {\n    //   console.log('e');\n    //   console.log(e);\n    // }\n\n  });\n});\n\n//# sourceURL=webpack:///./assets/js/indexedDb.js?");

/***/ })

/******/ });
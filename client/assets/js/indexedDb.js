export function checkForIndexedDb() {
  if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");
    return false;
  }
  return true;
}

export function useIndexedDb(databaseName, storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(databaseName, 1);
    let db,
      tx,
      store;

    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore(storeName, { autoIncrement: true });
    };

    request.onerror = function(e) {
      console.log("There was an error");
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log("error");
      };
      if (method === "put") {
        store.put(object);

      } else if (method === "get") {
        const all = store.getAll();
        all.onsuccess = function() {
          resolve(all.result);
        };
      } else if (method === "delete") {
        store.delete(object._id);
      }
      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}

window.addEventListener("click", function() {
  const request = window.indexedDB.open('budget', 1);
  let db,
    tx,
    store;

  request.onupgradeneeded = function(e) {
    console.log('onupgradeneeded');
    const db = request.result;
    db.createObjectStore('transactions', { autoIncrement: true });
  };

  request.onerror = function(e) {
    console.log("There was an error");
  };

  request.onsuccess = function(e) {
    db = request.result;
    tx = db.transaction('transactions', "readwrite");
    store = tx.objectStore('transactions');

    db.onerror = function(e) {
      console.log("db.onerror");
    };

    const all = store.getAll();
    all.onsuccess = function() {
      let indexedDBContent = all.result;
      console.log('indexedDBContent');
      console.log(indexedDBContent);

      let indexedDBLength = indexedDBContent.length;
      console.log('indexedDBLength');
      console.log(indexedDBLength);

      if(indexedDBLength) {
        for (let i = 0; i < indexedDBLength; i++) {
          fetch("/api/transaction", {
            method: "POST",
            body: JSON.stringify(indexedDBContent[i]),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            },
          })
          .then(response => {
            console.log('response');
            console.log(response);
            return response.json();
          })
          .then(data => {
            console.log('data');
            console.log(data);
            if (data.errors) {
              errorEl.textContent = "Missing Information";
            }
          })
          .catch(err => {
            console.log(err.message);
          });
          
        }
        if (navigator.onLine) {
          store.clear();
        }
      }
    };
  };
})
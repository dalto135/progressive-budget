export function checkForIndexedDb() {
  if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");
    return false;
  }
  return true;
}

export function useIndexedDb(databaseName, storeName, method, object) {
  // console.log(method, object);
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
        //console.log statement
        console.log(object);
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

//1. Add event listener to online event
//2. Check indexedDB for records
//3. If records, retrieve records, use normal fetch to get records into API
//4. Clear indexedDB once records are pushed online
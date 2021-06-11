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
        // store.clear();
        store.put(object);
        
        // console.log('store.getAll().result');
        // console.log(store.getAll().result());
        // let allData = store.getAll().result;
        // console.log('store.count');
        // console.log(store.count().result);

        // allData.forEach(i => {
        //   console.log(i);
        // })
        // console.log(allData);

        // console.log('object');
        // console.log(object);

        // console.log('db');
        // console.log(db);

        // console.log('tx');
        // console.log(tx);

        // console.log('store');
        // console.log(store);

        // console.log('store.transaction');
        // console.log(store.transaction);

        // console.log('window.indexedDB');
        // console.log(window.indexedDB);

        // console.log('request');
        // console.log(request);

        // console.log('e.target.result');
        // console.log(e.target.result);
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

export function retrieveData(databaseName, storeName) {
  const request = window.indexedDB.open(databaseName, 1);
  let db,
      tx,
      store;

  // request.onsuccess = function(e) {
    db = request.result;
    tx = db.transaction(storeName, "readwrite");
    store = tx.objectStore(storeName);

    return store.getAll();
  // }
}

//1. Add event listener to online event

//2. Check indexedDB for records
//store.count().result

//3. If records, retrieve records, use normal fetch to get records into API
//store.getAll().result

//4. Clear indexedDB once records are pushed online
//store.clear()

window.addEventListener("click", function() {

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('budget', 1);
    // console.log('request');
    // console.log(request);
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
        // code here
        // console.log('store.count()');
        // console.log(store.count());

        // console.log('store.getAll()');
        // console.log(store.getAll());

        const all = store.getAll();
        all.onsuccess = function() {
          // resolve(all.result);
          let indexedDBContent = all.result;
          console.log('indexedDBContent');
          console.log(indexedDBContent);

          let indexedDBLength = indexedDBContent.length;
          console.log('indexedDBLength');
          console.log(indexedDBLength);
          // debugger
          if(indexedDBLength) {
            let boo = false;
            for (let i = 0; i < indexedDBLength; i++) {

            // }
            // indexedDBContent.forEach(i => {
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
                return response.json();
              })
              .then(data => {
                
                console.log('data');
                if (data.errors) {
                  errorEl.textContent = "Missing Information";
                }
                else {
                  // clear form
                  // nameEl.value = "";
                  // amountEl.value = "";
                }
              })
              .then(
                boo = true  
              )
              .catch(err => {
                // fetch failed, so save in indexed db
                // saveRecord(transaction);
                // clear form
                // boo = false;
                console.log(err.message);
                // nameEl.value = "";
                // amountEl.value = "";
              });
              
            }
            if (boo === true) {
              store.clear();
            }
          }
        };
      
      
    };
    // request.onsuccess = function(e) {
    //   console.log('e');
    //   console.log(e);
    // }
    
  });
})
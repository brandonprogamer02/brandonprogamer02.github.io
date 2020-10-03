
//---EVENTOS LISTENERS-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    let f = new IndexedDB();


});


class IndexedDB {

    // --REAL FUNCTIONS-----------------------------------------------------------------------
    constructor(db) {
        // this it execute first
        let request = indexedDB.open(db, 1);
        request.onupgradeneeded = () => {
            let DB = request.result;
            DB.createObjectStore('db', { autoIncrement: true });
            console.log('Almacen creado', DB);
        }
        // if a error
        request.onerror = (error) => console.error('Was a error', error);

    }
    deleteTable = (db,table) => {
        let request = indexedDB.open(db, 1);
        request.onupgradeneeded = () => {
            let DB = request.result;
            DB.deleteObjectStore(table);
            console.log(`THE TABLE ${table} OF THE DB ${db} WAS DELETED`);
        }

    }
    createTable = (db,table) => {
        let request = indexedDB.open(db, 1);
        request.onupgradeneeded = () => {
            let DB = request.result;
            DB.createObjectStore(table, { autoIncrement: true });
            console.log(`THE TABLE ${table} WAS CREATED IN DB ${db}`);
        }
    }

    deleteData = (db, table, key) => {
        FimplementationCodeIndexedDB(db, table, (objectStorage) => {
            const requestCursor = objectStorage.openCursor();
            requestCursor.onsuccess = (e) => {
                const cursor = requestCursor.result;
                if (cursor) {
                    if (cursor.key == key) {
                        cursor.delete();
                        console.log('se ha cambiado el valor');
                        return;
                    }
                    cursor.continue();
                }
            }
        });
    }



    updateData = (db, table, key, value) => {
        implementationCodeIndexedDB(db, table, 'readwrite', (objectStorage) => {
            const requestCursor = objectStorage.openCursor();
            requestCursor.onsuccess = (e) => {
                const cursor = requestCursor.result;
                if (cursor) {
                    if (cursor.key == key) {
                        cursor.update(value);
                        return;
                    }

                    cursor.continue();
                }
            }
        });
    }

    addDataTable = (db, table, objeto) => {
        implementationCodeIndexedDB(db, table, 'readwrite', (objectStorage) => {
            objectStorage.add(objeto);
        });
    }

    readDataTable = (db, table, callback) => {
        implementationCodeIndexedDB(db, table, 'readonly', (objectStorage) => {
            const requestCursor = objectStorage.openCursor();
            const arrayData = new Array();
            requestCursor.onsuccess = (e) => {
                const cursor = requestCursor.result;
                if (cursor) {
                    arrayData.push(cursor.value);
                    cursor.continue();
                }
            }
            callback(arrayData);
        });

    }
    #implementationCodeIndexedDB = (db, table, tipoTransaccion, callback) => {
        let request = indexedDB.open(db, 1);

        request.onsuccess = () => {
            let DB = request.result;
            const transaccion = DB.transaction([db], tipoTransaccion);
            const objectStorage = transaccion.objectStore(table);
            callback(objectStorage);
        }
    }





}
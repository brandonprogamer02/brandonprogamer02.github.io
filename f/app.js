//#### encontrar un algoritmo para detectar si una database existe
//---EVENTOS LISTENERS-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    //IndexedDB.createDB('databasetres');
    //IndexedDB.createTable('database2', 'tabla 2');
    //IndexedDB.deleteDB('database1');
    //IndexedDB.databaseExists('database2');

    IndexedDB.DBExists('databaseee', (value) => {
        console.log(`la database existe? ${value}`);
    });
    console.log('y aqui?')

});


class IndexedDB {

    // --REAL FUNCTIONS-----------------------------------------------------------------------
    static createDB = (nameDB) => {
        // validaciones
        if (nameDB == undefined || nameDB.trim() == '') {
            console.error('DEBES DE PONERLE UN NOMBRE VALIDO A LA DATABASE');
            return;
        }
        IndexedDB.databaseExists(nameDB, (exists) => {
            if (exists) {
                console.error('YA EXISTE UN DATABASE LLAMADA ASI');
                return;
            }
        });
        console.log('llego aqui');
        // this it execute first
        let request = indexedDB.open(nameDB, 1);
        console.log('DATABASE CREADA SATISFACTORIAMENTE')
        // if a error
        request.onerror = (error) => console.error('Was a error', error);

    }
    static DBExists = async (nameDB, callback) => {
        let x = true;
        const request = await indexedDB.open(nameDB);
        request.onupgradeneeded = () => {
            let pp = window.indexedDB.deleteDatabase(nameDB);
            console.log('entro en false');

            x = false;
        }
        callback(x);

    }

    static deleteDB = (nameDB, callback) => {
        let DBDeleteRequest = indexedDB.deleteDatabase(nameDB);

        DBDeleteRequest.onerror = function (event) {
            console.error("I can't eliminate the database");
            callback(false);
        };

        DBDeleteRequest.onsuccess = function (event) {
            console.log("Database deleted successfully");
            callback(true);
        }
    }
    static deleteTable = (nameDB, nameTable) => {
        let request = indexedDB.open(nameDB, 1);
        request.onupgradeneeded = () => {
            let DB = request.result;
            DB.deleteObjectStore(nameTable);
            console.log(`THE TABLE ${nameTable} OF THE DB ${nameDB} WAS DELETED`);
        }

    }
    static createTable = (nameDB = createDB(), nameTable) => {
        // if la database no existe se crea automaticamente
        let request = indexedDB.open(nameDB, 1);
        request.onupgradeneeded = () => {
            let DB = request.result;
            DB.createObjectStore(nameTable, { autoIncrement: true });
            console.log(`THE TABLE ${nameTable} WAS CREATED IN DB ${nameTable}`);
        }
    }

    static deleteTableData = (nameDB, nameTable, key) => {
        FimplementationCodeIndexedDB(nameDB, nameTable, (objectStorage) => {
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
    static updateTableData = (nameDB, nameTable, key, value) => {
        implementationCodeIndexedDB(nameDB, nameTable, 'readwrite', (objectStorage) => {
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

    static addTableData = (nameDB, nameTable, objeto) => {
        implementationCodeIndexedDB(nameDB, nameTable, 'readwrite', (objectStorage) => {
            objectStorage.add(objeto);
        });
    }

    static readTableData = (nameDB, nameTable, callback) => {
        implementationCodeIndexedDB(nameDB, nameTable, 'readonly', (objectStorage) => {
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
    #implementationCodeIndexedDB = (nameTable, nameDB, tipoTransaccion, callback) => {
        let request = indexedDB.open(db, 1);

        request.onsuccess = () => {
            let DB = request.result;
            const transaccion = DB.transaction([nameDB], tipoTransaccion);
            const objectStorage = transaccion.objectStore(nameTable);
            callback(objectStorage);
        }
    }





}
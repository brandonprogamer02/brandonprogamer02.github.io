// ### validar en todos los metodos que la database exista


//---EVENTOS LISTENERS-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // IndexedDB.createDB('3database2');
    //IndexedDB.createTable('database2', 'tabla 2');
    //IndexedDB.deleteDB('database1');
    //IndexedDB.databaseExists('database2');

    // IndexedDB.DBExists("database2")
    //     .then((res) => {
    //         console.log(res);
    //     });

    // IndexedDB.deleteDB('3database22s'); 
    IndexedDB.addTableData('database','ninguna',{nombre:'brandon'});  

});


class IndexedDB {

    // --REAL FUNCTIONS-----------------------------------------------------------------------
    static createDB = (nameDB) => {
        // validaciones
        if (nameDB == undefined || nameDB.trim() == '') {
            console.error('DEBES DE PONERLE UN NOMBRE VALIDO A LA DATABASE');
            return;
        }

        IndexedDB.DBExists(nameDB).then(() => {
            // aqui entra cuando esta true
            console.error('YA EXISTE UN DATABASE LLAMADA ASI');
        }, () => {
            // aqui entra cuenta esta false
            // this it execute first
            let request = indexedDB.open(nameDB, 1);
            console.log('DATABASE CREADA SATISFACTORIAMENTE')
            // if a error
            request.onerror = (error) => console.error('Was a error', error);

        });
    }

    static DBExists = (name) => {
        return new Promise((resolve, reject) => {
            let db = indexedDB,
                req;

            try {
                // See if it exist 
                req = db.webkitGetDatabaseNames();
                req.onsuccess = function (evt) {
                    ~([].slice.call(evt.target.result)).indexOf(name) ?
                        resolve(true) :
                        reject(false);
                }
            } catch (e) {
                // Try if it exist 
                req = db.open(name);
                req.onsuccess = function () {
                    req.result.close();
                    resolve(true);
                }
                req.onupgradeneeded = function (evt) {
                    evt.target.transaction.abort();
                    reject(false);
                }
            }

        })
    }

    static deleteDB = (nameDB) => {
        IndexedDB.DBExists(nameDB)
            .then(() => {
                let DBDeleteRequest = indexedDB.deleteDatabase(nameDB);

                DBDeleteRequest.onerror = function (event) {
                    console.error("I can't eliminate the database");
                    callback(false);
                };

                DBDeleteRequest.onsuccess = function (event) {
                    console.log("Database deleted successfully");
                    callback(true);
                }

            }, () => {
                console.error(`La database ${nameDB} no existe! `);
            });
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

        IndexedDB.DBExists(nameDB)
        .then((res)=>{
            if(res){
                IndexedDB.#implementationCodeIndexedDB(nameDB, nameTable, 'readwrite', (objectStorage) => {
                    objectStorage.add(objeto);
                });

            }else { console.error(`No existe la database ${nameDb}!`);}
        })

        
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
    static #implementationCodeIndexedDB = (nameTable, nameDB, tipoTransaccion, callback) => {
        let request = indexedDB.open(nameDB, 1);

        request.onsuccess = () => {

            let DB = request.result;
            try{ const transaccion = DB.transaction([nameDB], tipoTransaccion); }
            catch(e){ console.error(`La tabla ${nameTable} no existe!`) }
            
            const objectStorage = transaccion.objectStore(nameTable);
            callback(objectStorage);
        }
    }





}
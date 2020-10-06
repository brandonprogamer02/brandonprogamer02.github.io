ya no hay nada
//---EVENTOS LISTENERS-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    //IndexedDB.addTableData('database', 'ninguna', { nombre: 'brandon' });
    //IndexedDB.createDB('ninguna');
    //IndexedDB.deleteDB('F');
    //IndexedDB.deleteTable('ninguna', 'ninguna');
    IndexedDB.createTable('database222', 'tabla1');
    // IndexedDB.deleteTable(`ninguna`,'ninguna');

});

class IndexedDB {

    // --REAL FUNCTIONS-----------------------------------------------------------------------
    static createDB = async (nameDB) => {
        // validaciones
        if (nameDB == undefined || nameDB.trim() == '') {
            console.error('DEBES DE PONERLE UN NOMBRE VALIDO A LA DATABASE');
            return;
        }
        // verificamos que sea unico el nombre de la database que se esta introduciendo
        try {
            const result = await IndexedDB.DBExists(nameDB);
            console.error(`La database ${nameBD} ya existe`);
        } catch (e) {
            console.log('todo bien');
            // aqui entra cuenta esta false
            const request = indexedDB.open(nameDB, 1);
            console.log('DATABASE CREADA SATISFACTORIAMENTE')
            request.onerror = (error) => console.error('Was a error', error);
        }

    }

    static DBExists = (name) => {
        return new Promise((resolve, reject) => {
            let db = indexedDB,
                req;

            try {
                // aqui vemos si existe
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

    static deleteDB = async (nameDB) => {

        // validaciones
        if (nameDB == undefined || nameDB.trim() == '') {
            console.error('DEBES PONER UNA DATABASE CON UN NOMBRE VALIDO!');
            return;
        }

        try {
            const res = await IndexedDB.DBExists(nameDB);
            let DBDeleteRequest = indexedDB.deleteDatabase(nameDB);
            DBDeleteRequest.onerror = function (event) {
                console.error("I can't eliminate the database");
            };
            DBDeleteRequest.onsuccess = function (event) {
                console.log("Database deleted successfully");
            }
        } catch (e) {

            console.error(`La database ${nameDB} no existe! `);
        }
    }

    static deleteTable = async (nameDB, nameTable) => {
        // validamos que que introduzca el nombre de la db correctamente
        if (nameDB == undefined || nameDB.trim() == '') {
            console.error('DEBES PONER UNA DATABASE CON UN NOMBRE VALIDO!');
            return;
        }

        // validamos que la database exista
        try {
            let res = await IndexedDB.DBExists(nameDB);
        } catch (e) {
            console.error('ESTA DATABASE NO EXISTE!');
            return;
        }
        // validamos que el nombre de la tabla sea valido
        if (nameTable.trim() == '' || nameTable == undefined) {
            console.error('DEBES INTRODUCIR UN NOMBRE PARA LA TABLA VALIDO');
            return;
        }
        let request = indexedDB.open(nameDB, 1);
        // validamos el nombre de la tabla
        request.onsuccess = () => {
            let DB = request.result;
            try {
                DB.deleteObjectStore(nameTable);
                // si llego aqui es por que paso todas las validaciones 

                console.log(`THE TABLE ${nameTable} OF THE DB ${nameDB} WAS DELETED`);
                console.log('mera');

            }
            catch (e) {
                console.error(` ${nameTable} NO EXISTE EN LA DATABASE ${nameDB}`)
            }
        }

    }



    static createTable = (nameDB, nameTable) => {
        // if la database no existe se crea automaticamente
        const request = indexedDB.open(nameDB,1);
        request.onsuccess = (e) => {
            const result = e.target.result;
            result.createObjectStore('s1', {autoIncrement: true});
        }


    }

    static deleteTableData = (nameDB, nameTable, key) => {
        implementationCodeIndexedDB(nameDB, nameTable, (objectStorage) => {
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
            .then((res) => {
                if (res) {
                    IndexedDB.#implementationCodeIndexedDB(nameDB, nameTable, 'readwrite', (objectStorage) => {
                        objectStorage.add(objeto);
                    });

                } else { console.error(`No existe la database ${nameDb}!`); }
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
            try{
            let DB = request.result;
            const transaccion = DB.transaction([nameDB], tipoTransaccion);
            const objectStorage = transaccion.objectStore(nameTable);
            callback(objectStorage);
            }catch(e){ }


        }
    }





}
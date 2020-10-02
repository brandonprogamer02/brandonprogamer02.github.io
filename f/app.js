
//---EVENTOS LISTENERS-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    loadIndexedBD();
    // esta es la real
    readData((arrayData)=>
    {
        console.log(arrayData);
    });
    addData( {nombre:'jose',apellido:"Urbaez Sanchez"} );
    
});

// --REAL FUNCTIONS-----------------------------------------------------------------------
const loadIndexedBD = () => {
    // esto se ejecuta cuando se crea por primera vez la db
    let request = indexedDB.open('db', 1);
    request.onupgradeneeded = (evt) => {
        let DB = request.result;
        DB.createObjectStore('db', { autoIncrement: true });
        console.log('Almacen creado', DB);
    }
    //si hay error
    request.onerror = (error) => console.log('hubo un error', error);

}
const updateData = () => {

}

const addData = (objeto) => {
    implementarCodigoIndexedDB('db', 'readwrite', (objectStorage) => {
        objectStorage.add(objeto);
    });
}

const readData = (callback) => {
    implementarCodigoIndexedDB('db', 'readonly', (objectStorage) => {
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
const implementarCodigoIndexedDB = (db, tipoTransaccion, callback) => {
    let request = indexedDB.open(db, 1);

    request.onsuccess = () => {
        let DB = request.result;
        const transaccion = DB.transaction([db], tipoTransaccion);
        const objectStorage = transaccion.objectStore('db');
        callback(objectStorage);
    }
}




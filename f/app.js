
//---EVENTOS LISTENERS-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    loadIndexedBD();
    let f = readData();
    //console.log(f);
    addData();
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

const addData = async () => {
    implementarCodigoIndexedDB('db', 'readwrite', (transaccion) => {
        const objectStorage = transaccion.objectStore('db');
        const newClient = {
            nombre: 'San Juan',
            email: 'sanjuan0100@gmail.com'
        }
        let array = new Array();
        array.push(newClient);
        objectStorage.add(array);
    });
}

const readData = () => {
    implementarCodigoIndexedDB('db', 'readonly', (transaccion) => {
        const objectStorage = transaccion.objectStore('db');
        const requestCursor = objectStorage.openCursor();
        requestCursor.onsuccess = () => {
            const cursor = requestCursor.result;
            console.log('lectura de la database:');
            if (cursor)  // real sintaxis js
            {
                console.log(cursor.continue());
            } else { console.log('no hay mas registros') }
            
        }
    });
}
const implementarCodigoIndexedDB = (db, tipoTransaccion, callback) => {
    let request = indexedDB.open(db, 1);
    request.onsuccess = () => {
        let DB = request.result;
        const transaccion = DB.transaction([db], tipoTransaccion);
        callback(transaccion);
    }
}
let request;
//---EVENTOS LISTENERS-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    request = indexedDB.open('db', 1);
    loadIndexedBD();
    readData();
    addData();
});

// --REAL FUNCTIONS-----------------------------------------------------------------------
const loadIndexedBD = () => {
    // esto se ejecuta cuando se crea por primera vez la db
    request.onupgradeneeded = (evt) => {
        let DB = request.result;
        DB.createObjectStore('db', { autoIncrement: true });
        console.log('Almacen creado', DB);
    }
    request.onsuccess = () => { }
    //si hay error
    request.onerror = (error) => console.log('hubo un error', error);

}

const addData = async() => {
    let request =   indexedDB.open('db', 1);
    request.onsuccess =  () => {
        let DB =  request.result;
        const transaccion =  DB.transaction(['db'], 'readwrite');
        const objectStorage = transaccion.objectStore('db');
        const newClient = {
            nombre: 'San Juan',
            email: 'sanjuan0100@gmail.com'
        }
        const peticion = objectStorage.add(newClient);
        console.log('Se realizo la peticion',  peticion);
    }
}

const readData = () => {
        let request = indexedDB.open('db', 1);
        request.onsuccess = () => {
            let DB = request.result;
            const transaccion = DB.transaction(['db'], 'readonly');
            const objectStorage = transaccion.objectStore('db');
            const request2 = objectStorage.openCursor();

            request2.onsuccess = () => {
                const cursor = request2.result;
                if(cursor)  // real sintaxis js
                {   console.log(cursor.value);
                    return cursor.continue()
                } else{ console.log('no hay mas registros') } 
            }
    }
}
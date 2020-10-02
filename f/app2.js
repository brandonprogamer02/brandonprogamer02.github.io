//Especificación oficial: https://developer.mozilla.org/es/docs/IndexedDB-840092-dup

const indexedDB = window.indexedDB
const form = document.getElementById('form')

if (indexedDB ) {
    let db
    const request = indexedDB.open('tasksList', 1)

    request.onsuccess = () => {
        db = request.result
        console.log('OPEN', db)

    }
    console.log('ahora db',db);
    request.onupgradeneeded = (e) => {
        db = e.target.result
        console.log('Create', db)
        const objectStore = db.createObjectStore('tasks', {
            autoIncrement: true
        })
    }

    request.onerror = (error) => {
        console.log('Error', error)
    }

    const addData = (data) => {
        const transaction = db.transaction(['tasks'], 'readwrite')
        const objectStore = transaction.objectStore('tasks')
        const request = objectStore.add(data)
    }

    
}
// BLOQUE DE FECHAS
export const PI = 3.1416;   

export const validarFecha = (fecha: Date): boolean => {
    if (isNaN(fecha.valueOf())) {
        return false;
    }
    return true;
}






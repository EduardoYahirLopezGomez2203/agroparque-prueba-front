// Transforma la fecha con formato ISO 8601 a YYYY/MM/DD
export const toLocalDate = (date) => {
    if (typeof date !== "string")
        return date

    return new Date(date.replaceAll('-', '/'))
}

export const toISO8601 = (date) => {
    const [d, m, y] = date.split("/");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export const weekDays = [
    { id: 0, nombre: "Domingo" },
    { id: 1, nombre: "Lunes" },
    { id: 2, nombre: "Martes" },
    { id: 3, nombre: "Miercoles" },
    { id: 4, nombre: "Jueves" },
    { id: 5, nombre: "Viernes" },
    { id: 6, nombre: "Sabado" },
];

export const months = [
    { id: 0, nombre: "Enero" },
    { id: 1, nombre: "Febrero" },
    { id: 2, nombre: "Marzo" },
    { id: 3, nombre: "Abril" },
    { id: 4, nombre: "Mayo" },
    { id: 5, nombre: "Junio" },
    { id: 6, nombre: "Julio" },
    { id: 7, nombre: "Agosto" },
    { id: 8, nombre: "Septiembre" },
    { id: 9, nombre: "Octubre" },
    { id: 10, nombre: "Noviembre" },
    { id: 11, nombre: "Diciembre" }
];

export const searchDayforName = (nameDay) => {
    return weekDays
        .find((day) => (
            day.nombre.toLowerCase() === nameDay.toLowerCase()
        ))
}

export const searchDayforNumber = (numberDay) => {
    return weekDays
        .find((day) => day.id === numberDay)
}
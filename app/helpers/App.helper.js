// Use ES6 module syntax

export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

export function generateResponse(status, message, data = null) {
    return {
        status: status,
        message: message,
        data: data
    };
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}
module.exports = {
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    },

    generateResponse: function(status, message, data = null) {
        return {
            status: status,
            message: message,
            data: data
        };
    },

    isEmpty: function(obj) {
        return Object.keys(obj).length === 0;
    },

    paginate: function(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
};
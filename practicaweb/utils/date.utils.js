module.exports = {
    formatDate: (date) => {
        return date.toISOString().replace('T', ' ').substring(0, 10)
    },

}
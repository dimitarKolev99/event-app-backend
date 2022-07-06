function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function encodeImageFileAsURL(element) {
    var file = element;
    var reader = new FileReader();
    reader.onloadend = function() {
        console.log('RESULT', reader.result);
    }
    reader.readAsDataURL(file);
    return (reader.result);
}

module.exports = {
    getOffset,
    emptyOrRows,
    encodeImageFileAsURL
};
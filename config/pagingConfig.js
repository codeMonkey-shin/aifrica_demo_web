module.exports = {
    pagingSize: 10,
    paging(pageNum,pagingSize) {
        if (pageNum === undefined || pageNum === 1) {
            return 0
        }
        if (pageNum > 1) {
            return pagingSize * (pageNum - 1);
        }
    }
};
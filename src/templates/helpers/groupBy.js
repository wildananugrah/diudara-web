const groupBy = (array, size) => {
    const groups = [];
    for (let i = 0; i < array.length; i += size) {
        groups.push(array.slice(i, i + size));
    }
    return groups;
};

export default groupBy

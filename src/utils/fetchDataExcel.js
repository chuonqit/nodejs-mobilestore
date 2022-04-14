import XLSX from "xlsx";

const FetchExcelData = (file) => {
    const _read = XLSX.readFile(file);
    let _sheets = _read.Sheets[_read.SheetNames[0]];
    delete _sheets["!ref"];
    delete _sheets["!margins"];

    let _index = 0;
    let columnKey = [];
    let defaultColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let _alphabetLoop = defaultColumns.length + 5;

    do {
        if (_index < defaultColumns.length) {
            columnKey.push(defaultColumns[_index]);
        } else {
            for (let i = 0; i < defaultColumns.length; i++) {
                columnKey.push(`${defaultColumns[_index - defaultColumns.length]}${defaultColumns[i]}`);
            }
        }
        _index++;
    } while (_index < _alphabetLoop);

    let _datas = [];

    for (let index = 1; index < Object.keys(_sheets).length; index++) {
        for (let columnIndex = 0; columnIndex < columnKey.length; columnIndex++) {
            if (_sheets[`${columnKey[columnIndex]}${index}`]) {
                if (index) {
                    let _object = {
                        index: index,
                        column: columnKey[columnIndex],
                        value: _sheets[`${columnKey[columnIndex]}${index}`].v,
                    };
                    _datas.push(_object);
                }
            }
        }
    }

    const group_to_values = _datas.reduce(function (obj, item) {
        obj[item.index] = obj[item.index] || [];
        obj[item.index].push(item.value);
        return obj;
    }, {});

    const groups = Object.keys(group_to_values).map(function (key) {
        return group_to_values[key];
    });

    return groups;
};

export default FetchExcelData;

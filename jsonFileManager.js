import fs from 'fs';
import path from 'path';

// JSONファイルを読み込む関数
function loadJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}: ${error}`);
        return null;
    }
}

// JSONファイルを書き込む関数
function writeJsonFile(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
        console.error(`Error writing file ${filePath}: ${error}`);
    }
}

// 指定されたディレクトリ内のすべてのJSONファイルを読み込む関数
function loadAllJsonFiles(dirPath) {
    let results = [];
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isFile() && path.extname(file) === '.json') {
            const data = loadJsonFile(fullPath);
            if (data) results.push(data);
        }
    });

    return results;
}

// JSONファイルを更新する関数
function updateJsonFile(filePath, updateCallback) {
    const data = loadJsonFile(filePath);
    if (data) {
        const updatedData = updateCallback(data);
        writeJsonFile(filePath, updatedData);
    }
}

// JSONファイルを削除する関数
function deleteJsonFile(filePath) {
    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(`Error deleting file ${filePath}: ${error}`);
    }
}

export { loadJsonFile, writeJsonFile, loadAllJsonFiles, updateJsonFile, deleteJsonFile };

import express from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // UUIDを生成するために追加
import { writeJsonFile, loadAllJsonFiles, loadJsonFile } from '../jsonFileManager.js';

const router = express.Router();

const directoryPath = 'data';
const jsonData = loadAllJsonFiles(directoryPath);
const members = jsonData.flatMap(item => item);

router.get('/', (req, res) => {
    res.json(members);
});

router.get('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const member = members.find(member => member.id === targetId);
    if (member) {
        res.json(member);
    } else {
        res.status(404).send({ message: 'Member not found' });
    }
});

router.post('/', (req, res) => {
    const { fileName, ...newMember } = req.body;
    if (!fileName) {
        return res.status(400).send({ message: 'File name is required.' });
    }

    const filePath = path.join(directoryPath, `${fileName}.json`);
    let members = loadJsonFile(filePath);

    if (members) {
        newMember.id = uuidv4(); // IDをUUIDで設定
        members.push(newMember);
        writeJsonFile(filePath, members);
        res.status(201).json(newMember);
    } else {
        res.status(500).send({ message: 'Failed to load or create members data.' });
    }
});

router.patch('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const { fileName, ...updatedMember } = req.body;

    if (!fileName) {
        return res.status(400).send({ message: 'File name is required.' });
    }

    const filePath = path.join(directoryPath, `${fileName}.json`);
    let members = loadJsonFile(filePath);

    const index = members.findIndex(member => member.id === targetId);
    if (index !== -1) {
        members[index] = { ...members[index], ...updatedMember };
        writeJsonFile(filePath, members);
        res.json(members[index]);
    } else {
        res.status(404).send({ message: 'Member not found' });
    }
});

router.delete('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const fileName = req.query.fileName;

    if (!fileName) {
        return res.status(400).send({ message: 'File name is required.' });
    }

    const filePath = path.join(directoryPath, `${fileName}.json`);
    let members = loadJsonFile(filePath);

    const index = members.findIndex(member => member.id === targetId);
    if (index !== -1) {
        members.splice(index, 1);
        writeJsonFile(filePath, members);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Member not found' });
    }
});

export default router;
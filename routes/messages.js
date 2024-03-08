import express from 'express'; // ESM形式でインポート
import { loadAllJsonFiles } from '../jsonFileManager.js';

const router = express.Router();

router.get('/', (req, res) => {
    const directoryPath = 'data'; // JSONファイルが保存されているディレクトリのパス
    const jsonData = loadAllJsonFiles(directoryPath);

    // すべてのメッセージを含む新しい配列を作成
    const messages = jsonData.flatMap(item => item.map(messageObj => messageObj.message));

    // メッセージのみを含む配列をレスポンスとして返す
    res.json(messages);
});

// router.get('/:id', (req, res) => {
//     const targetId = parseInt(req.params.id); // 文字列から数値に変換
//     const product = products[targetId];
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).send({ message: 'Product not found' });
//     }
// });

// router.post('/', (req, res) => {
//     const newProduct = req.body;
//     products.push(newProduct);
//     res.json(newProduct);
// });

// router.delete('/:id', (req, res) => {
//     const deleteId = parseInt(req.params.id);
//     if (deleteId >= 0 && deleteId < products.length) {
//         const deletedProducts = products.splice(deleteId, 1);
//         res.status(200).send(deletedProducts[0]);
//     } else {
//         res.status(404).send({ message: "Product not found" });
//     }
// });

// router.patch('/:id', (req, res) => {
//     const targetId = parseInt(req.params.id);
//     const targetProduct = products[targetId];
//     if (targetProduct) {
//         if (req.body.hasOwnProperty('name')) {
//             targetProduct.name = req.body.name;
//         }
//         if (req.body.hasOwnProperty('price')) {
//             targetProduct.price = req.body.price;
//         }
//         res.json(targetProduct);
//     } else {
//         res.status(404).send({ message: "Product not found" });
//     }
// });

export default router; // ESM形式でエクスポート

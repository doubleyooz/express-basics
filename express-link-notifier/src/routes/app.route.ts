import express, { RequestHandler } from 'express';
import { getMessage } from '../utils/message.util';

const router = express.Router();


const handler: RequestHandler = (_req, _res): any => {
    const message = getMessage('default.return');
    return _res.json({ message });
};

router.get('/', handler);

export default router;
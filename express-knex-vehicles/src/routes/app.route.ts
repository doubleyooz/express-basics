import express, { Request, Response } from 'express';
import { getMessage } from '../utils/message.util';

const router = express.Router();

router.get('/', (_req: Request, _res: Response) => {
    const message = getMessage('default.return');
    return _res.json({ message });
});

export default router;
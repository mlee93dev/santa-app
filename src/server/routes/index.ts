import { Router } from 'express';
import { validate } from '../controllers/validate';
const router = Router();

router.post('/validate', validate);

export default router;
import { Request, Response } from 'express';
import { JSONResponse } from '../../../../models/response';

export * from './urls';
export * from './shortener';

const urlsRoot = (req: Request, res: Response) => {
  res.json(JSONResponse.from(200));
};

export default urlsRoot;

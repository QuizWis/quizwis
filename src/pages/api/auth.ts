import { setCookie } from 'nookies';

import firebaseAdmin from '../../features/auth/firebaseAdmin'; // 上記で実装したファイル

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

export default async function sessionApi(req: Req, res: Res) {
  if (req.method !== 'POST') return res.status(404).send('Not Found');
  const auth = firebaseAdmin.auth();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日
  const id = (JSON.parse(req.body).id || '').toString();
  const sessionCookie = await auth.createSessionCookie(id, { expiresIn });

  // Cookieのオプション
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: '/',
  };

  // セッションIDをCookieに設定する
  setCookie({ res }, 'session', sessionCookie, options);

  return res.send(JSON.stringify({ status: 'success' }));
}

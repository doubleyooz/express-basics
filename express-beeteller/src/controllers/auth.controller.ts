import { Request, Response } from "express";

import jwt, { Payload } from "../utils/jwt.util";
import User from "../models/user.model";
import { getMessage } from "../utils/message.util";
import { matchPassword } from "../utils/password.util";

async function refreshAccessToken(req: Request, res: Response) {
  const refreshToken = req.cookies.jid;

  if (!refreshToken) {
    return res.status(401).json({
      message: getMessage("unauthorized.refresh.token.missing"),
    });
  }

  let payload: Payload | null = null;
  try {
    payload = (await jwt.verifyJwt(refreshToken, 2)) as Payload;
    if (!payload) {
      return res.status(401).json({
        message: getMessage("default.unauthorized"),
      });
    }
    const result = await User.exists({
      _id: payload._id,
      tokenVersion: payload.tokenVersion,
    });

    if (!result) {
      return res.status(401).json({
        message: getMessage("default.unauthorized"),
      });
    }

    const accessToken = await jwt.generateJwt(
      {
        _id: payload._id,
        tokenVersion: payload.tokenVersion,
      },
      1
    );

    return res.status(200).json({
      accessToken,
      message: getMessage("default.success"),
    });
  } catch (err) {
    return res.status(401).json({
      message: getMessage("default.unauthorized"),
    });
  }
}

async function revokeRefreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies.jid;

  if (!refreshToken) {
    return res.status(401).json({
      message: getMessage("unauthorized.refresh.token.missing"),
    });
  }

  try {
    const payload = jwt.verifyJwt(refreshToken, 2) as Payload;
    await User.findByIdAndUpdate(payload._id, {
      $inc: { tokenVersion: 1 },
    });
    return res.status(200).json({
      message: getMessage("default.success"),
    });
  } catch (err) {
    return res.status(401).json({
      message: getMessage("default.unauthorized"),
    });
  }
}

const signIn = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Basic ")) {
    return res.status(401).json({
      message: getMessage("default.unauthorized"),
    });
  }

  const [email, supposedPassword] = Buffer.from(
    authorization.slice(6),
    "base64"
  )
    .toString()
    .split(":");

  const user = await User.findOne({ email }, { password: 1, tokenVersion: 1 })
    .select("tokenVersion")
    .lean();

  if (!user) {
    return res.status(401).json({
      message: getMessage("default.unauthorized"),
    });
  }

  if (!(await matchPassword(user?.password, supposedPassword))) {
    return res.status(401).json({
      message: getMessage("default.unauthorized"),
    });
  }

  const tokens = {
    accessToken: jwt.generateJwt(
      { _id: user?._id, tokenVersion: user?.tokenVersion } as Payload,
      1
    ),
    refreshToken: jwt.generateJwt(
      { _id: user?._id, tokenVersion: user?.tokenVersion } as Payload,
      2
    ),
  };

  res.cookie("jid", tokens.refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({
    data: user ? { _id: user._id } : null,
    message: user ? getMessage("user.valid.sign_in.success") : null,
    metadata: user ? { accessToken: tokens.accessToken } : null,
  });
};

export default { signIn, revokeRefreshToken, refreshAccessToken };

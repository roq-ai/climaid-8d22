import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { publicUserValidationSchema } from 'validationSchema/public-users';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.public_user
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPublicUserById();
    case 'PUT':
      return updatePublicUserById();
    case 'DELETE':
      return deletePublicUserById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPublicUserById() {
    const data = await prisma.public_user.findFirst(convertQueryToPrismaUtil(req.query, 'public_user'));
    return res.status(200).json(data);
  }

  async function updatePublicUserById() {
    await publicUserValidationSchema.validate(req.body);
    const data = await prisma.public_user.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePublicUserById() {
    const data = await prisma.public_user.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

import { eventHandler, setHeader } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }
  const data = `
  {
    "code": 0,
    "message": "success",
    "data": [
              {
                "id": 123456789012345678901234567890123456789012345678901234567890,
                "name": "Test User 1",
                "age": 30,
                "email": "user1@demo.com"
                },
                {
                "id": 987654321098765432109876543210987654321098765432109876543210,
                "name": "Test User 2",
                "age": 25,
                "email": "user2@demo.com"
                }
            ]
  }
  `;
  setHeader(event, 'Content-Type', 'application/json');
  return data;
});

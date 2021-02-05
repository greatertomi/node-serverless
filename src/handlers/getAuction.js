import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getAuction = async (event, context) => {
  let auctions;
  const { id } = event.pathParameters;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id }
      })
      .promise();

    auction = result.Item;
  } catch (err) {
    console.error(error);
    throw new createError.InternalServerError(err);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with id "${id}" not found`);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auctions)
  };
};

export const handler = commonMiddleware(getAuction);

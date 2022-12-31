import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

const defaultResponse = ({
  statusCode,
  body,
}: {
  statusCode: number;
  body?: string;
}): APIGatewayProxyStructuredResultV2 => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Headers': '*', // Required for CORS support to work
    'Access-Control-Allow-Methods': 'OPTIONS,PATCH,POST,PUT,DELETE,GET',
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
  },
  body: JSON.stringify(body),
});

export const ok = (body?: any): APIGatewayProxyStructuredResultV2 =>
  defaultResponse({ statusCode: 200, body });

export const created = (body?: any): APIGatewayProxyStructuredResultV2 =>
  defaultResponse({ statusCode: 201, body });

export const badRequest = (body: any): APIGatewayProxyStructuredResultV2 =>
  defaultResponse({ statusCode: 400, body });

export const notFound = (body: any): APIGatewayProxyStructuredResultV2 =>
  defaultResponse({ statusCode: 404, body });

export const internalServerError = (body: any): APIGatewayProxyStructuredResultV2 =>
  defaultResponse({ statusCode: 500, body });

export const redirect = (url: string): APIGatewayProxyStructuredResultV2 => {
  const response = defaultResponse({ statusCode: 302 });
  return {
    ...response,
    headers: {
      ...response.headers,
      Location: url,
    },
  };
};

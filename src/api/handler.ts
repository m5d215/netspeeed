import { APIGatewayProxyHandler } from 'aws-lambda'
import dayjs from 'dayjs'
import 'source-map-support/register'
import NetworkSpeed from '../entities/NetworkSpeed'
import dynamoDB from './dynamoDB'

export const register: APIGatewayProxyHandler = async event => {
  if (event.pathParameters === null) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'path params is null'
    }
  }
  const { user } = event.pathParameters
  if (user == null || user === '') {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'missing user'
    }
  }

  if (event.body === null) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'body is null'
    }
  }

  type Body = Partial<Record<keyof NetworkSpeed, unknown>>
  const body = JSON.parse(event.body) as unknown
  const { timestamp, download, upload, ping } = body as Body
  if (typeof timestamp !== 'string') {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'timestamp property should be string'
    }
  }
  const d = dayjs(timestamp)
  if (!d.isValid()) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'timestamp is not valid date string'
    }
  }

  if (typeof upload !== 'number') {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'upload property should be number'
    }
  }

  if (typeof download !== 'number') {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'download property should be number'
    }
  }

  if (typeof ping !== 'number') {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'ping property should be number'
    }
  }

  const payload: NetworkSpeed = {
    timestamp: d.valueOf(),
    upload,
    download,
    ping
  }

  await dynamoDB
    .putItem({
      TableName: 'netspeeed',
      Item: {
        user: { S: user },
        timestamp: { N: `${payload.timestamp}` },
        upload: { N: `${payload.upload}` },
        download: { N: `${payload.download}` },
        ping: { N: `${payload.ping}` }
      }
    })
    .promise()

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(payload)
  }
}

export const read: APIGatewayProxyHandler = async event => {
  if (event.pathParameters === null) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'path params is null'
    }
  }
  const { user } = event.pathParameters
  if (user == null || user === '') {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'missing user'
    }
  }

  if (event.queryStringParameters === null) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'query params is null'
    }
  }
  const { begin, end } = event.queryStringParameters
  if (begin == null) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'missing begin'
    }
  }

  if (end == null) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'missing end'
    }
  }

  const { Items = [] } = await dynamoDB
    .query({
      TableName: 'netspeeed',
      KeyConditionExpression:
        '#user = :user AND #timestamp BETWEEN :begin AND :end',
      ExpressionAttributeNames: {
        '#user': 'user',
        '#timestamp': 'timestamp'
      },
      ExpressionAttributeValues: {
        ':user': { S: user },
        ':begin': { N: begin },
        ':end': { N: end }
      }
    })
    .promise()

  const items = Items.map<NetworkSpeed>(item => ({
    timestamp: parseInt(item.timestamp.N!, 10),
    upload: parseInt(item.upload.N!, 10),
    download: parseInt(item.download.N!, 10),
    ping: parseInt(item.ping.N!, 10)
  }))

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(items)
  }
}

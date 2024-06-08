
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDB = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDB);

export const handler = async (event, context) => {
  try {
    const tableName = process.env.Table_Name; 
          const requestBody=event;
          console.log(requestBody);
    const id = requestBody.id; 
    const u1 = requestBody.userDetails;

           console.log(u1);

    const updateParams = new UpdateCommand({
      TableName: tableName,
      Key: {
        id: id
      },
      UpdateExpression: 'SET userDetails = :userD',
      ExpressionAttributeValues: {
        ':userD': u1,
      },
      ReturnValues: 'UPDATED_NEW'
    });

    await docClient.send(updateParams);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "PUT" 
      },
      body: JSON.stringify('Data updated successfully!')
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "PUT"
      },
      body: JSON.stringify('An error occurred while updating data.')
    };
  }
};

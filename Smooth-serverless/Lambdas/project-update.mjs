
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDB = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDB);

export const handler = async (event, context) => {
  try {
    const tableName = process.env.Table_Name; 
    const requestBody=JSON.parse(event.body);

    const id = requestBody.id; 

    const details = requestBody.projectDetails;
    console.log("Details === ",details);
    
    const updateParams = new UpdateCommand({
      TableName: tableName,
      Key: {
        id: id
      },
      UpdateExpression: 'SET projectDetails = :details',
      ExpressionAttributeValues: {
        ':details': details,
        
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

 
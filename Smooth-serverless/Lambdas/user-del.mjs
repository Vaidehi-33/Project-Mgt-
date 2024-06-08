import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDB = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDB);

export const handler = async (event, context) => {
  try {
    const tableName = process.env.Table_Name;
    const requestBody = JSON.parse(event.body); // changed
    const id = requestBody.id;
    console.log("This is requestBody", requestBody);

    const deleteParams = new DeleteCommand({
      TableName: tableName,
      Key: {
        id: id,
      },
    });

    await docClient.send(deleteParams);

    return {
      statusCode: 200, // No content
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4200",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "DELETE",
      },
      body: JSON.stringify("Data deleted successfully"),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "DELETE",
      },
      body: JSON.stringify("An error occurred when deleting data."),
    };
  }
};
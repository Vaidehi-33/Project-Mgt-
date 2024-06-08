import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,ScanCommand } from "@aws-sdk/lib-dynamodb";
const dynamoDB = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDB);

export const handler = async (event, context) => {
    console.log("event ",event);
    try {
        const tableName = process.env.Table_Name;
        // const requestBody = JSON.parse(event.body);
        
        const scanParams = new ScanCommand({
            TableName: tableName,
            
  });
    const response = await docClient.send(scanParams);
        return {
            
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify(response)
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify('An error occurred while getting data.')
        };
    }
};
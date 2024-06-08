import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from 'crypto';

const dynamoDB = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDB);

export const handler = async(event) =>{
    
    const tableName = process.env.Table_Name;
    

    console.log("event is",event);
    
    const rid = crypto.randomUUID();
    const p1 = event.projectDetails;
    
    
    const command = new PutCommand({
        
        TableName:tableName,
        Item:{
            id:rid,
            projectDetails:p1
        }
    });
    
    const response = await docClient.send(command);
    console.log("response ",response);
    return response;
}
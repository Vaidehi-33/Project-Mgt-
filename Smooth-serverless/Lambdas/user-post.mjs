import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from 'crypto';
const dynamoDB = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDB);
const s3 = new S3Client();
const bucket = 'smooth-operators-user-dir-img';


const saveImagetoS3 = async (image,imageName)=>{
    const base64Data = image;
    const buffer = Buffer.from(base64Data,"base64");
    const name = imageName;
    const param = new PutObjectCommand({
        Bucket:bucket,
        Key:name,
        Body:buffer,
        ContentType:'image/jpeg',
        ACL:'public-read'
    })
    await s3.send(param);
    let imageUrl = `https://${bucket}.s3.ca-central-1.amazonaws.com/${name}`;
    return imageUrl;
}

export const handler = async (event, context) => {
    try {
        const tableName = process.env.Table_Name;
        
        const requestBody = JSON.parse(event.body);
        console.log("this is requestBody",JSON.parse(event.body));
        
        const id = crypto.randomUUID();
        console.log("ID == "+requestBody.userDetails);
        const image = requestBody.userDetails.imageUrl;
        const imageName = requestBody.userDetails.imageName;
        const url = await saveImagetoS3(image,imageName);
        requestBody.userDetails.imageUrl = url;
        const p1 = requestBody.userDetails;
        
        
        console.log("image is ",p1);

        const putParams = new PutCommand({
            TableName: tableName,
            Item: {
                id: id,
                userDetails: p1,
                
            }
        });

        await docClient.send(putParams);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            body: JSON.stringify('Data posted successfully!')
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            body: JSON.stringify('An error occurred while posting data.')
        };
    }
};

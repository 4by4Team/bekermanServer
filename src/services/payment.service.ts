import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYPAL_API_URL = process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;

// פונקציה ליצירת Access Token
async function generateAccessToken(): Promise<string> {

    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const response = await axios.post(
        `${PAYPAL_API_URL}/v1/oauth2/token`,
        "grant_type=client_credentials",
        {
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data.access_token;
}

// שירות להפקת הזמנה
export async function createOrder(amount: string): Promise<any> {
    try {
        const accessToken = await generateAccessToken();
        const response = await axios.post(
            `${PAYPAL_API_URL}/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: amount,
                        },
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("PayPal error:", error?.response?.data || error.message);
        throw new Error(`PayPal error: ${error?.response?.data || error.message}`);

    }
}

// שירות לאישור תשלום
// export async function captureOrder(orderID: string): Promise<any> {
//     try {
//         const accessToken = await generateAccessToken();
//         const response = await axios.post(
//             `${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         throw new Error("Error capturing order with PayPal");
//     }
// }
export async function captureOrder(orderID: string): Promise<any> {
    try {
        const accessToken = await generateAccessToken();
        const response = await axios.post(
            `${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // הפקת מידע חשוב ללקוח
        const captureData = response.data;
        const status = captureData.status; // לדוגמה: 'COMPLETED'
        const payer = captureData.payer; // כולל payer_id, email, name וכו'

        return {
            status,
            payer,
            details: captureData.purchase_units, // מידע נוסף על ההזמנה
        };
    } catch (error: any) {
        // החזרת השגיאה המלאה מה-API במקום הודעה כללית
        const errData = error?.response?.data || error.message;
        console.error("PayPal capture error:", errData);
        throw new Error(`Error capturing order with PayPal: ${JSON.stringify(errData)}`);
    }
}
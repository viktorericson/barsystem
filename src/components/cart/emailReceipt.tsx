import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { sendEmail } from "./sendEmail"; // Assume this is a utility function for sending emails

interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface NewOrderForEmail {
  id: string;
  products: Product[];
  total: number;
  email: string;
  date: string;
  isCompleted: boolean;
}

interface EmailReceiptProps {
  newOrderForEmail: NewOrderForEmail;
}

const EmailReceipt: React.FC<EmailReceiptProps> = ({ newOrderForEmail }) => {
  const { id, products, total, email, date } = newOrderForEmail;

  const generateReceiptHtml = () => {
    const productRows = products
      .map(
        (product) => `
          <tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price.toFixed(2)} KR</td>
            <td>${(product.quantity * product.price).toFixed(2)} KR</td>
          </tr>
        `
      )
      .join("");

    return `
      <html>
        <body>
          <h1>Order Receipt</h1>
          <p><strong>Order ID:</strong> ${id}</p>
          <p><strong>Date:</strong> ${date}</p>
          <table border="1" cellspacing="0" cellpadding="5">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="text-align:right;"><strong>Total:</strong></td>
                <td>${total.toFixed(2)} KR</td>
              </tr>
            </tfoot>
          </table>
          <p>Thank you for your purchase!</p>
        </body>
      </html>
    `;
  };

  const handleSendEmail = async () => {
    const receiptHtml = generateReceiptHtml();

    try {
      await sendEmail({
        to: email,
        subject: "Your Order Receipt",
        html: receiptHtml,
      });
      alert("Receipt sent successfully!");
    } catch (error) {
      console.error("Failed to send receipt:", error);
      alert("Failed to send the receipt. Please try again.");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Send Receipt to Email</Typography>
      <Typography>Email: {email}</Typography>
      <Button variant="contained" color="primary" onClick={handleSendEmail}>
        Send Receipt
      </Button>
    </Box>
  );
};

export default EmailReceipt;

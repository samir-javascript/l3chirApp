import nodemailer from 'nodemailer'
export const sendResetMail = async(email,subject,text)=> {
    const htmlTemplate = `
    <html>
    <head>
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                text-align: center;
            }
            .container {
               
                 gap: 10px;
                width: 400px;
                border: 1px solid #f5f5f5;
                border-radius: 0.75rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                padding: 0.75rem 1.25rem;
                background: white;
            }
            h2 {
                color: #333;
                font-weight: bold;
                 margin: 0.5rem 0;
                font-size: 1.5rem;
               
            }
            
            .ptag {
                line-height: 1.7;
                font-size: 13px;
                font-weight: 500;
                color: #c0c0c0;
            }
            .email {
                text: blue;
                font-weight: 600;
                line-height: 1.7;
                text-decoration: underline;
            }
            a {
                display: inline-block;
              
               
                color: #fff;
                text-decoration: none;
                margin-top: 12px;
                font-weight: 700;
                border-radius: 5px;
            }
            .btn {
                padding: 8px 15px;
                background: green;
                color: white!important;
                font-size: 15px;
                border: none;
                cursor: pointer;
                outline: none;
                border-radius: 5px;
            }
            .btn a  {
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
           
            <h2>Password reset for your account with:</h2>
             <p class="email">${email}</p>
             <p class='ptag'> We registered your password reset request.</p>
             <p class="ptag"> To be able to choose a new password for your l3chir account please click below.</p>
             
             
                
                 <a class='btn' href="${text}" target="_blank" >Password reset</a>
                <p class="ptag">If you didn’t ask for a new password or it was a mistake, ignore this e-mail and the password of your account will not change.</p>
            
            
        </div>
    </body>
    </html>
`;
    try {
        const transporter = nodemailer.createTransport({
            port:587,
            host: 'smtp.gmail.com',
            secure: false,
            service: "gmail",
            auth: {
                user: "soufianehmamou92@gmail.com",
                pass: "hmzivlerbulgzsyu",  
            },
        })
        await transporter.sendMail({
            from: 'soufianehmamou92@gmail.com',
            to: email,
            subject: subject,
            text: text,
            html: htmlTemplate
        })
        console.log(`email password reset was sent successfult to ${email}`)
    } catch (error) {
        console.error(error)
        console.log('failed to send email reset')

    }
}
export const sendOrderConfirmationEmail = async(email,subject,cartItems)=> {
    const htmlOrderTemplate = `
    <div style="max-width: 700px; margin: auto; background: #f5f5f5;  align-items: center; justify-content: center; border-radius: 5px; margin-top: 1rem;  padding: 16px;">
    <img style="width: 100px; height: 100px; object-fit: contain;" src="https://l3chirapp.onrender.com/assets/logol3chir2-Bfmvtyz4.jpg" alt="l3chir" />
    <h2 style="font-weight: bold; text-decoration: underline; font-size: 30px; color: #000; text-transform: capitalize; margin-top: 20px;">Order confirmation</h2>
    <p style="color: #333; font-weight: 500; font-size: 1rem; line-height: 1.5rem; margin-top: 20px;">We got your order (thank you). This is your receipt and confirmation that everything is going according to plan. So just sit back and relax; your order is on its way to you.</p>
    <div style=" margin: 0px 20px; flex: 1; margin-top: 40px;">
        ${cartItems.map(item => `
            <div style="border: 1px solid #999; background-color: #f5f5f5; border-radius: 10px; padding: 10px; margin-bottom: 20px;" key="${item._id}">
                <div style="display: flex; gap: 10px; align-items: start;">
                    <div style="background-color: white; width: 100px; height: 100px;  border-radius: 10px; display: flex; justify-content: center; align-items: center;">
                        <img src="${item.images[0]}" alt="${item.name}" style="object-fit: cover; border-radius: 10px; width: 100%; height: 100%;" />
                    </div>
                    <div style="display: flex; flex-direction: column; flex: 1 ; margin-left: "5px"; ">
                        <div>
                            <p style="color: #121212; font-weight: bold; text-align: left; font-size: 14px;">${item.name}</p>
                            ${item.type === "food" ? `<p style="color: #808080; font-size: 13px;">size: <span style="color: #0aafaa; font-weight: bold; text-decoration: underline;">${item.sizeState}</span></p>` : ''}
                            <p style="color: #808080; font-size: 13px;">Qty: ${item.quantity}</p>
                        </div>
                        <div>
                            <p style="color: #121212; font-weight: bold; font-size: 16px; margin-top: 10px;">Dh${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
        <div style="background-color: #f5f5f5; padding: 10px; border-radius: 10px;">
            <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; display: flex; justify-content: space-between;">
                <p style="font-weight: bold; color: #333; font-size: 16px;">Sous-total:</p>
                <p style="font-weight: bold; color: black; font-size: 16px;">Dh${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
            <div style="border-bottom: 1px solid #ccc; padding-top: 10px; padding-bottom: 10px; display: flex; justify-content: space-between;">
                <p style="font-weight: bold; color: #333; font-size: 16px;">Total:</p>
                <p style="font-weight: bold; color: black; font-size: 16px;">Dh${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
            <p style="font-weight: bold; color: #121212; font-size: 16px; margin-top: 10px;">Paiement à la livraison.</p>
            <div style="background-color: #4CAF50; padding: 15px; color: white; margin-top: 10px; border-radius: 4px;">
                <p style="font-size: 15px; margin-bottom: 0;">Nous livrons actuellement sur Meknès exclusivement et Gratuitement, merci de votre compréhension.</p>
            </div>
        </div>
    </div>
</div>
`;
// >


    try {
        const transporter = nodemailer.createTransport({
            port:587,
            host: 'smtp.gmail.com',
            secure: false,
            service: "gmail",
            auth: {
                user: "soufianehmamou92@gmail.com",
                pass: "hmzivlerbulgzsyu",  
            },
        })
        await transporter.sendMail({
            from: 'soufianehmamou92@gmail.com',
            to: email,
            subject: subject,
            text: null,
            html: htmlOrderTemplate
        })
        console.log(`email for order confirmation was sent successfuly to ${email}`)
    } catch (error) {
        console.error(error)
        console.log('failed to send email reset')

    }
}
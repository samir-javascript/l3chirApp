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
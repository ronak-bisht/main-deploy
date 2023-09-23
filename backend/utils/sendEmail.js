const nodeMailer=require('nodemailer')

const sendEmail=async(option)=>{
    const transporter=nodeMailer.createTransport({
        host:"smtp.ethereal.com", //save as env
        // port:465,
        port:587,
        secure:false,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:option.email,
        subject:option.subject,
        text:option.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports=sendEmail
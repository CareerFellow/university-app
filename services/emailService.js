import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : process.env.SENDER_EMAIL,
    pass : process.env.SENDER_PASSWORD
  }
})

export let sendWelcomeEmail = async ( to, verificationCode ) => {

  let welcomeHtml  = `<h3> Welcome to University App. </h3> </br>` + 
  `<p> Please, click the url below to verify your account.</p> </br>` +
  `<p> http://localhost:3000/verify_account/${verificationCode} </p>`;

  let mailOptions = {
    from : process.env.SENDER_EMAIL,
    to : to,
    subject : 'Welcome to University App',
    html : welcomeHtml
  }
  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log('inside internal catfch');
    throw e;
  }
}

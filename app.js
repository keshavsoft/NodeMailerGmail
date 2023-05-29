const nodemailer = require("nodemailer");
let path = require("path");

require("dotenv").config();

var mailOptions = {
    from: "nknnkumar@gmail.com",
    to: "",
    subject: "Test from Nodejs",
    text: "",
};

let LocalSendEmailFunc = async ({ inToEmail }) => {
    // Generate SMTP service account from ethereal.email
    //   let account = await nodemailer.createTestAccount();

    console.log('Credentials obtained, sending message...');

    var transportLive = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "nknnkumar@gmail.com",
            pass: process.env.KS_EMAIL_PASS
        }
    });

    const LocalRootPath = path.resolve("./");
    const pathParts = LocalRootPath.split(path.sep);
    console.log("pathParts : ", pathParts);
    mailOptions.to = inToEmail;

    mailOptions.text = "My first email";


    let info = await transportLive.sendMail(mailOptions);

    console.log('Message sent successfully!');
    console.log(nodemailer.getTestMessageUrl(info));
    transportLive.close();

    if (info.response) {
        return await { KTF: true };
        //  reject({ KError: error });
    } else {
        return await { KTF: false };
        // resolve({ KTF: true });
    };

    // only needed when using pooled connections

};

LocalSendEmailFunc({ inToEmail:"msdbalu4@gmail.com" }).then(PromiseData => {
    console.log("PromiseData : ", PromiseData);
});

// main().catch(err => {
//     console.error(err.message);
//     process.exit(1);
// });
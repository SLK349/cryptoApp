const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log("apiKey", process.env.SENDGRID_API_KEY);

exports.sendWelcomeMail = function (to, name) {
    const msg = {
        to: to,
        from: "assetly.management@gmail.com",
        subject: "Bienvenue chez Assetly",
        text: `Bonjour ${name}, bienvenue chez Assetly! Nous sommes ravis de vous avoir parmi nous. `,
    };

    sgMail
        .send(msg)
        .then(() => console.log("Mail de bienvenue envoyé"))
        .catch((error) => console.error("erreur mail:", error.toString()));
};

exports.sendPaymentMail = async function (to, name, productDate) {
    const msg = {
        to: to,
        from: "assetly.management@gmail.com",
        subject: "Assetly - Paiement effectué avec succes",
        text: `Bonjour ${name}, votre paiement ${productDate} a été effectué avec succès. `,
    };
    try {
        await sgMail.send(msg);
        console.log("Mail de paiement envoyé");
    } catch (error) {
        console.error("Erreur mail:", error.toString());
        throw error;
    }
};

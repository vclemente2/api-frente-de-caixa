const handlebars = require('handlebars');
const fs = require('fs/promises');

const generateStringHtml = async (file, context) => {
    const fileContent = await fs.readFile(file);
    const compiler = handlebars.compile(fileContent.toString());
    const mailContent = compiler(context);

    return mailContent;
};

module.exports = generateStringHtml;

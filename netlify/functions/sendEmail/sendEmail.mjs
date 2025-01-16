// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
require('dotenv').config();
const nodemailer = require("nodemailer");

exports.handler = async function (event, context, callback) {
  try {
    // Парсим полученные данные из формы
    const body = JSON.parse(event.body);

    // Собираем HTML-форму для письма
    const htmlContent = `
      <div style="margin: 20px auto;">
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> ${body.name}</p>
        <p><strong>Телефон/Телеграм:</strong> ${body.phone}</p>
        <p><strong>Сообщение:</strong><br> ${body.message}</p>
      </div>
    `;

    // Создаем объект для отправки email через SMTP
    let transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru', // Для тестирования через ethereal
      port: 465,
      secure: false, // true для порта 465, false для других
      auth: {
        user: 'SvetlanaVorobueva@yandex.ru', // генерируемый ethereal user
        pass: process.env.SMTP_PASS, // генерируемый ethereal password
      },
    });

    // Отправляем email
    let info = await transporter.sendMail({
      from: '"Светлана Воробьева" <SvetlanaVorobueva@yandex.ru>', // От кого
      to: "SvetlanaVorobueva@yandex.ru", // Замените на email получателя
      subject: "Новый заказ на дизайн проект", // Тема письма
      text: body.message, // Текст письма
      html: htmlContent, // HTML формат письма
    });

    // Логируем результат
    console.log(info);

    // Возвращаем успешный статус
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: "Email успешно отправлен!", info }),
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
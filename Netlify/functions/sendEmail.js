require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  console.log('Тело запроса:', event.body);

  // Проверка HTTP метода
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Метод не поддерживается' }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Тело запроса отсутствует' }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    console.error('Ошибка парсинга JSON:', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Некорректный JSON в теле запроса' }),
    };
  }

  const { name, phone, message } = data;
  console.log('Полученные данные:', { name, phone, message });

  // Валидация данных
  if (!name || name.length < 2) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Имя должно быть не короче 2 символов' }),
    };
  }
  if (!phone || !/^\+?\d{10,15}$/.test(phone)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Телефон должен быть валидным номером' }),
    };
  }
  if (!message || message.trim().length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Сообщение не может быть пустым' }),
    };
  }

  // Настройка транспортера для отправки письма через SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'SvetlanaVorobueva@yandex.ru',
      pass: process.env.SMTP_PASS, // Пароль приложения
    },
  });

  const mailOptions = {
    from: '"Светлана Воробьева" <SvetlanaVorobueva@yandex.ru>',
    to: 'SvetlanaVorobueva@yandex.ru', // Адрес получателя
    subject: 'Заявка на дизайн проект',
    text: `Сообщение от ${name} (Телефон: ${phone}):\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Письмо успешно отправлено!' }),
    };
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Не удалось отправить письмо. Проверьте настройки сервера SMTP.',
      }),
    };
  }
};
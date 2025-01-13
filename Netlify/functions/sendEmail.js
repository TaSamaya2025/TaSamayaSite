console.log('Запуск скрипта...');

const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  // Проверяем, что это POST-запрос
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Метод не поддерживается' }),
    };
  }

  try {
    // Парсим данные из тела запроса
    const { name, phone, message } = JSON.parse(event.body);

    // Создаем транспортер для отправки почты через SMTP-сервер Яндекса
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,  // Порт для SSL
      secure: true,  // Используем SSL-соединение
      auth: {
        user: 'SvetlanaVorobueva@yandex.ru',  // Почта Яндекс
        pass: 'cmhxpjvqhufxbver',             // Пароль от приложения
      },
    });

    // Настройка письма
    const mailOptions = {
      from: '"Светлана Воробьева" <SvetlanaVorobueva@yandex.ru>',  // От кого
      to: 'SvetlanaVorobueva@yandex.ru',                          // Кому (можно тестировать на тот же адрес)
      subject: 'Заявка на дизайн проект',                          // Тема письма
      text: `Сообщение от ${name} (Телефон: ${phone}):\n\n${message}`,  // Текст письма
    };

    // Отправка письма
    await transporter.sendMail(mailOptions);

    // Ответ об успешной отправке
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Письмо успешно отправлено!' }),
    };
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);

    // Ответ в случае ошибки
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Произошла ошибка при отправке письма' }),
    };
  }
};

console.log('Скрипт завершен.');
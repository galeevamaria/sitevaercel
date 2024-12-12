let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
let menuItem = document.querySelectorAll('.menu_item');

menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
});


menuItem.forEach(function (menuItem) {
  menuItem.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  })
});



document.getElementById('send-message-telegram').addEventListener('submit', async (event) => {
  event.preventDefault();

  const botToken = "8083541540:AAELMQWAM06xG-N_0F0ggs-VoAtr7lJ5Pnk"; // Укажите токен вашего бота
  const chatId = "327589683"; // Укажите ваш Chat ID

  const formData = new FormData();
  formData.append('chat_id', chatId);

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const file = document.getElementById('file').files[0];

  const text = `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;
  formData.append('caption', text);

  if (file) {
    formData.append('document', file);
  } else {
    formData.append('text', text);
  }

  const url = file
    ? `https://api.telegram.org/bot${botToken}/sendDocument`
    : `https://api.telegram.org/bot${botToken}/sendMessage`;

  const notification = document.getElementById('information');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      showNotification('Сообщение успешно отправлено!', 'success');
      document.getElementById('send-message-telegram').reset();
    } else {
      showNotification('Ошибка отправки сообщения.', 'error');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    showNotification('Ошибка при отправке.', 'error');
  }
});

function showNotification(message, type) {
  const notification = document.getElementById('information');
  notification.textContent = message;
  notification.className = type;
  if (notification.className == 'success') {
    notification.style.background = 'green';
  }
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);

}

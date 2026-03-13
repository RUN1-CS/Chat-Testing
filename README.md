# Chat Testing

**THIS CHAT** is your new template for chat platforms.
It's designed to be ez to modify and take you through your chat making journey.

---

## Features

- **Sending messages** - That's right, you can send messages in this message web app.
- **Saving messages** - Every message is saved and encrypted in the db (NOT YET, JUST WAIT).
- **Everything is real time!** - That's the point of chatting, it's not email, duh.
- **You can chat with your self** - Yes, you can chat with your self because I had to test dms.

---

## How to use

1. Load `http://localhost`
2. Choose your room or dm. (You can add friends)
3. Chat

---

## Development & Set-up

Everything runs on Docker.

```bash
git clone https://github.com/RUN1-CS/Dashboard.git
cd Chat-Testing
cp .env.example .env
# Enter credentials
docker compose up -d --build
```

- **www** - This is your exposed container. It includes front-end.
- **noder_server** - This is where your back-end is.
- **postgres** -- This is where your db is created. (Db content is saved in pgdata)
- **apache** - settings for Apache and root with **www**.

---

## 💖 Support / Patreon

If you enjoy this project and want to support development, check out my Patreon: [https://www.patreon.com/cw/RUN1_IT](https://www.patreon.com/cw/RUN1_IT)

---

## License

Open-source under the [GNU GENERAL PUBLIC LICENSE Version 3](LICENSE)
© 2026 **RUN1** (GitHub: [RUN1-CS](https://github.com/RUN1-CS))

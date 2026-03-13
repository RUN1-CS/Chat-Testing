<?php
/*
 * This is the chat it self.
 * It is WIP, GUI ain't good yet.
 * Please report any bugs you find on GitHub.
 */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="tab-title">Chat App - Chat</title>
</head>
<body>
    <header>
        <span id="connection">Offline</span>
    </header>
    <aside id="chats">
        <h3>Chats</h3>
    </aside>
    <div id="chat-header"></div>
    <div id="chat-history">
    </div>
    <form id="message-form">
        <input type="hidden" name="action" value="send_message">
        <input type="hidden" name="from" value="/chat.php">
        <input type="hidden" name="to" id="to-field" value="<?= htmlspecialchars($_GET['chat'] ?? '') ?>">
        <textarea name="message" id="message-input" placeholder="Type your message here..." required></textarea>
        <button type="submit">Send</button>
    </form>
    <script src="/js/index.js" type="module"></script>
    <script src="/js/chat.js" type="module"></script>
</body>
</html>
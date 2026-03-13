<?php
/*
 * Welcome to this chatting app!
 * It doesn't have a name yet.
 * Please report any bugs you find on GitHub.
 */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatting App</title>
</head>
<body>
    <header>
        <span id="connection">Offline</span>
    </header>
    <main>
        <h2>Global Chat</h2>
        <button id="gc">Join Global Chat</button>
        <script>
            document.getElementById("gc").addEventListener("click", function() {
                window.location.href = "/chat.php?chat=global";
            });
        </script>
        <h2>Direct Messages</h2>
        <button class="user yourself" id="placeholder">YOU</button>
        <h2>Rooms</h2>
        <!-- To be integrated -->
        <h2>Add Friends</h2>
        <form>
            <input type="hidden" name="action" value="add_friend">
            <input type="hidden" name="from" value="/index.php">
            <label for="friend_username">Friend's Username:</label>
            <input type="text" id="friend_username" name="friend_username" required>
            <button type="submit">Add Friend</button>
        </form>
        </main>
    <script src="/js/index.js" type="module"></script>
</body>
</html>
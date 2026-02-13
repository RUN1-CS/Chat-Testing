<?php
/*
 * Login form
 */ 

/*if($_COOKIE['access_token']) {
    header("Location: /");
    exit();
}*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App - Login</title>
</head>
<body>
    <header>
        <span id="connection">Offline</span>
    </header>
    <main>
        <p>Login here!</p>
        <form name="login_form" id="login_form" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account?</p>
        <form name="register_form" id="reg_form" method="post">
            <label for="reg_username">Username:</label>
            <input type="text" id="reg_username" name="username" required>
            <br>
            <label for="reg_password">Password:</label>
            <input type="password" id="reg_password" name="password" required>
            <br>
            <label for="reg_confirm_password">Confirm Password:</label>
            <input type="password" id="reg_confirm_password" name="confirm_password" required>
            <br>
            <button type="submit">Register</button>
        </form>
    </main>
    <script src="/api/auth.js"></script>
</body>
</html>
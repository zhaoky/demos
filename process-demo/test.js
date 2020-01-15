let users = {
    "admin": "123",
    "user1": "321",
    "user2": "213"
};
let username = "";


process.stdout.write("请输入用户名:");
process.stdin.on('data', (input) => {
    console.log(11);
    input = input.toString().trim();
    if (!username) {
        if (Object.keys(users).indexOf(input) === -1) {
            process.stdout.write('用户名不存在' + '\n');
            process.stdout.write("请输入用户名:");
            username = "";
        }
        else {
            process.stdout.write("请输入密码:");
            username = input;
        }
    }
    //输入密码
    else {
        if (input === users[username]) {
            console.log("登陆成功");
        }
        else {
            process.stdout.write("请输入密码" + "\n");
        }

    }
});
process.stdin.on('end', () => {
    process.stdout.write('end');
});
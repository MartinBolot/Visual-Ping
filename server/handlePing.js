module.exports = function handlePing(error, stdout, stderr) {
    if (error) {
        console.error(`exec error: ${error}`);
        return 1;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return 1;
    }

    const time = stdout.substring(stdout.indexOf('temps='), stdout.indexOf(' ms '));
    const ms = time.replace('temps=', '');
    console.log(ms);

    return 0;
};

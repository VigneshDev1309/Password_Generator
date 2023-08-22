generate_pass();
function clipboardCopy() {
    const textValue = document.getElementById("textField");
    let clipData = textValue.value;
    if (clipData.trim() !== "") {
        navigator.clipboard.writeText(clipData);
        textValue.value = "COPIED !";
        let time = setInterval(() => {
            textValue.value = clipData;
            clearInterval(time);
        }, 2000); 
    }
}
function generate_pass()
{
    let word = "";
    let len = document.getElementById("rangeBar").value;
    let l = document.getElementById("lowerCase").checked;
    let u = document.getElementById("upperCase").checked;
    let n = document.getElementById("numeric").checked;
    let s = document.getElementById("symbols").checked;
    if(l)
        word += "l"
    if(u)
        word += "u"
    if(n)
        word += "n" 
    if(s)
        word += "s"

    if(word === "") return;
    let text = document.getElementById("textField");
    text.value = generateRandomPassword(word, len);
    getPasswordStrength(text.value);    
}
function generateRandomPassword(type, len)
{
    let words = "";
    let result = "";
    if(type.includes("l"))
        words += "qwertyuiopasdfghjklzxcvbnm";
    if(type.includes("u"))
        words += "QWERTYUIOPASDFGHJKLZXCVBNM";
    if(type.includes("n"))
        words += "0123456789";
    if(type.includes("s"))
        words += "!#$%^&*()_-+={[}]\"'?/.,<>|\\;:`~";
    let splitedWord = words.split('');
    for(let i=0; i< len;i++)
    {
        result += splitedWord[Math.floor(Math.random() * words.length)];
    }
    return result;
}
function rangeValueChange()
{
    const rangeValue = document.getElementById("rangeBar");
    const lengthValue = document.getElementById("lengthValue");
    lengthValue.textContent = rangeValue.value;
    generate_pass();
}
function getPasswordStrength(password) {
    let text = document.getElementById("passStrength");
    const score = calculatePasswordScore(password);
    if (score >= 80) {
        text.textContent = "STRONG";
        text.style.color = "limegreen";
    } else if (score >= 50) {
        text.textContent = "MEDIUM";
        text.style.color = "orange";
    } else {
        text.textContent = "WEAK";
        text.style.color = "yellow";
    }
}
function calculatePasswordScore(password) {
    let score = 0;
    score += password.length * 4;
    if (/[A-Z]/.test(password)) {
        score += 10;
    }
    if (/[a-z]/.test(password)) {
        score += 10;
    }
    if (/[0-9]/.test(password)) {
        score += 10;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
        score += 10;
    }
    const uniqueCharacters = new Set(password);
    const repetitiveCount = password.length - uniqueCharacters.size;
    score -= repetitiveCount * 1;
    score -= calculateConsecutivePenalty(password);
    return score;
}
function calculateConsecutivePenalty(password) {
    let score = 0;
    for (let i = 0; i < password.length - 2; i++) {
        const charCode1 = password.charCodeAt(i);
        const charCode2 = password.charCodeAt(i + 1);
        const charCode3 = password.charCodeAt(i + 2); 

        if (charCode2 - charCode1 === 1 && charCode3 - charCode2 === 1) {
            score += 5;
        }
    }
    return score;
}
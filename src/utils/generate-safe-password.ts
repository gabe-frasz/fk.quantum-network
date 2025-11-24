export function generateSafePassword() {
	let passwordArr: string[] = [];

  for (let i = 0; i < 4; i++) {
    let digit = "";

    do {
      digit = Math.floor(Math.random() * 10).toString();
    } while (passwordArr.includes(digit));

    passwordArr.push(digit);
  }

  return passwordArr.join("");
}

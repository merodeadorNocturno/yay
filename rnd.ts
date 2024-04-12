const rnd_str = (): string => {
  let my_pwd = "";
  for (let j = 0; j < 256; j++) {
    let rnd_letter = 0;
    for (let i = 33; i < 127; i++) {
        const partial_result = Math.round(126 - Math.random() * i) + 33;
        rnd_letter = partial_result < 127
            ? partial_result
            : Math.round(Math.random() * 126);
        rnd_letter = rnd_letter < 33
            ? rnd_letter + (33 - rnd_letter)
            : rnd_letter;
    }
    // console.log(rnd_letter);
    my_pwd = `${my_pwd}${String.fromCharCode(rnd_letter)}`;
  }

  return my_pwd.replace(/"|'|`|\\/g, '')
};

console.log(rnd_str());
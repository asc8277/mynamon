window.startApp = (root) => {
  const socket = io({ path: `${root}/socket.io` });
  const view = document.getElementById('view');

  const alignString = (str = '', length = 15) => {
    return (str.length > length)
      ? `${str.substr(0, length - 1)}…`
      : str.padEnd(length);
  };

  socket.on('connect', () => { view.style.borderColor = 'green'; });
  socket.on('disconnect', () => { view.style.border = 'red'; });

  socket.on('state', (state) => {
    const allIps = Object.keys(
      state.reduce((acc, cur) => ({ ...acc, ...cur.results }), {})
    ).sort((a, b) => {
      const [n1, n2] = [a, b].map(i => Number(i.split('.').map((num) => (`000${num}`).slice(-3)).join('')));
      return n1 - n2;
    });
    const headerRow = allIps.reduce((acc, cur) => `${acc} ${alignString(cur)}`, alignString('', 25));
    const dataRows = state.map(s =>
      allIps.reduce((acc, cur) => `${acc} ${alignString(s.results[cur])}`, alignString(s.time, 25))
    );
    view.innerHTML = [headerRow, ...dataRows].join('\n');
  });
};

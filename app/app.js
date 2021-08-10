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
    const allIps = Object.keys([...state].reverse().reduce((acc, cur) => ({ ...acc, ...cur.results }), {}));
    const headerRow = allIps.reduce((acc, cur) => `${acc} ${alignString(cur)}`, alignString('', 25));
    const dataRows = state.map(s =>
      allIps.reduce((acc, cur) => `${acc} ${alignString(s.results[cur])}`, alignString(s.time, 25))
    );
    view.innerHTML = [headerRow, ...dataRows].join('\n');
  });
};

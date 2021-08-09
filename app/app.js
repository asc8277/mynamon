window.startApp = (root) => {
  const socket = io({ path: `${root}/socket.io` });
  const view = document.getElementById('view');

  const alignString = (str = '', length = 20) => {
    return (str.length > length)
      ? `${str.substr(0, length - 1)}…`
      : str.padEnd(length);
  };

  socket.on('connect', () => { view.style.borderColor = 'green'; });
  socket.on('disconnect', () => { view.style.border = 'red'; });

  socket.on('state', (state) => {
    const allDevices = [...state].reverse().reduce((acc, cur) => ({ ...acc, ...cur.results }), {});
    const headerRows = ['name', 'mac'].map(item =>
      Object.values(allDevices).reduce((acc, cur) => `${acc} ${alignString(cur[item])}`, alignString('', 25))
    );
    const dataRows = state.map(s =>
      Object.keys(allDevices).reduce((acc, cur) => `${acc} ${alignString(s.results[cur]?.ip)}`, alignString(s.time, 25))
    );
    view.innerHTML = [...headerRows, ...dataRows].join('\n');
  });
};

window.startApp = (root) => {
  const socket = io({ path: `${root}/socket.io` });
  const view = document.getElementById('view');

  const alignString = (str = '', length = 15) => {
    return (str.length > length)
      ? `${str.substr(0, length - 1)}…`
      : str.padEnd(length);
  };

  const dateOptions = ['year', 'month', 'day', 'hour', 'minute', 'second'].reduce(
    (acc, cur) => ({ ...acc, [cur]: '2-digit' }),
    { hourCycle: 'h24' }
  );

  socket.on('connect', () => { view.style.backgroundColor = '#aaffee'; });
  socket.on('disconnect', () => { view.style.backgroundColor = '#ffdddd'; });

  socket.on('state', (state) => {
    const allIps = Object.keys(
      state.reduce((acc, cur) => ({ ...acc, ...cur.results }), {})
    ).sort((a, b) => {
      const [n1, n2] = [a, b].map(i =>
        Number(i.split('.').map((num) => (`000${num}`).slice(-3)).join(''))
      );
      return n1 - n2;
    });
    const headerRow = allIps.reduce(
      (acc, cur) => `${acc} ${alignString(cur)}`,
      alignString('', 20)
    );
    const dataRows = state.map(s =>
      allIps.reduce(
        (acc, cur) => `${acc} ${alignString(s.results[cur])}`,
        alignString(new Date(s.time).toLocaleString(undefined, dateOptions), 20)
      )
    );
    view.innerHTML = [headerRow, ...dataRows].join('\n');
  });
};

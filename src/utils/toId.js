const toId = (id) => {
    return parseInt(id.split('0x')[1], 16)
  };
  export default toId;
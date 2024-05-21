function generateRandomGuid() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let guid = "";

  for (let i = 0; i < 6; i++) {
    const randomIdex = Math.floor(Math.random() * characters.length);
    guid += characters[randomIdex];
  }
  console.log("guid", guid);

  return guid;
}

export default generateRandomGuid;

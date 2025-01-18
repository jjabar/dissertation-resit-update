export const genSensorNumber = async () => {
  const randomNumbers = Math.floor(1000 + Math.random() * 90000);
  
  return "SEN" + randomNumbers;
};


export const genAnimalNumber = async () => {
 
  const randomNumbers = Math.floor(1000 + Math.random() * 90000);

  return "ANI" + randomNumbers;
};
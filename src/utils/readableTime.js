
const lastTime = (timestamp) =>{
    // const time = date.getHours() + ":" + date.getMinutes();
    const currentDate = Date.now() - timestamp;
    const date = new Date(currentDate *1000);
    const hour =  date.getHours();
    const minutes = date.getMinutes();
    const time = `${hour}: ${minutes} hrs ago`

    return time;
}

export default lastTime;
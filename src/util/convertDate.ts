export const convertDate = () => {
    const today = new Date();
  
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let weekLabel = today.getDay();
    const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let todayLabel = weekDay[weekLabel];
  
    let dateString = year + "-" + month + "-" + day + " " + todayLabel;
  
    return dateString;
  };
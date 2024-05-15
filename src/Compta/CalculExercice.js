
const CalculExercice=()=>{
    let newDate = new Date()
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let exercice='';
    
    if (month<7){
        exercice= String(year-1).substring(2, 4)+String(year).substring(2, 4);
    }else{
        exercice= String(year).substring(2, 4)+String(year+1).substring(2, 4);
    }
    return exercice
}
export default CalculExercice;
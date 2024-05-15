function st_date(daty){
  const DateV = new Date(daty)
  // DateV.toLocaleString('fr-FR', { month: 'long', day: 'numeric' })
  // const adjustedDate = new Date(DateV.getTime() + DateV.getTimezoneOffset() * 60000);
  // const formatedDate = adjustedDate.toLocaleString();
    // if(daty.length === 24){

    //   const dt = new Date(daty)
    //   const st_year = dt.getUTCFullYear()
    //   let st_mois=''
    //   switch(dt.getUTCMonth()) {
    //     case  0: st_mois = 'janv.'; break;
    //     case  1: st_mois = 'fev.' ; break;
    //     case  2: st_mois = 'mars.'; break;
    //     case  3: st_mois = 'avr.' ; break;
    //     case  4: st_mois = 'mai.' ; break;
    //     case  5: st_mois = 'juin.'; break;
    //     case  6: st_mois = 'juil.' ; break;
    //     case  7: st_mois = 'aout'; break;
    //     case  8: st_mois = 'sept' ; break;
    //     case 9: st_mois = 'oct.' ; break;
    //     case 10: st_mois = 'nov.'; break;
    //     case 11: st_mois = 'dec.' ; break;
    //     default :;
    //   }
    //   let jour =dt.getUTCDate()
    //   let st_jour =''
    //   if (jour<10) 
    //       st_jour = '0' + jour
    //   else 
    //       st_jour = jour
    //   return  st_jour + ' ' +st_mois+ ' ' +st_year
    // }
    // else{
      // return formatedDate
      return  DateV.toLocaleString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric'})
    // }
  }

  function toDate (stDate){
    let annee = stDate.substring(stDate.length-4,stDate.length)
    let jour = stDate.substring(0,2)
    let mois = stDate.substring(3,stDate.length-5)
    let st_mois=''
    switch(mois) {
      case 'janv.': st_mois = '01'; break;
      case 'fev.' : st_mois = '02'; break;
      case 'mars.': st_mois = '03'; break;
      case 'avr.' : st_mois = '04'; break;
      case 'mai.' : st_mois = '05'; break;
      case 'juin.': st_mois = '06'; break;
      case 'juil.': st_mois = '07'; break;
      case 'aout' : st_mois = '08'; break;
      case 'sept' : st_mois = '09'; break;
      case 'oct.' : st_mois = '10'; break;
      case 'nov.' : st_mois = '11'; break;
      case 'dec.' : st_mois = '12'; break;
      default :st_mois='err.';
    }
    return annee+'-'+st_mois+'-'+jour
  }
  
  export {st_date,toDate}
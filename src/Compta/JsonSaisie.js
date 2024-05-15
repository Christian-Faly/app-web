function RecupJSonDetail(col_detail){
    let first=false
    let ligneNonVide=0
    for (let i=0;i<20;i++){
      if (first===false && document.getElementById('detail-tr-'+i).hidden===true){
        ligneNonVide=i-1
        first = true
      }
    }
    let d=[]
    for (let i=0;i<ligneNonVide;i++){
        let js={}
        col_detail.forEach(element=>{
            try{
            let value = document.getElementById('detail-'+i+'-'+element.column_name).value
            let name = document.getElementById('detail-'+i+'-'+element.column_name).name
            js={...js,[name]: value}
            }catch(err){
            console.error(err.message)
            }
        })
        d = [...d,js]
    }
    return d
}

function debitEgaleCredit(detail){
let debit=0
let credit=0
for(let i = 0;i < detail.length;i++){
    debit = debit + Number(detail[i].m_debit)
    credit = credit + Number(detail[i].m_credit)
}  
document.getElementById('tot-debit-saisie').textContent = debit
document.getElementById('tot-credit-saisie').textContent = credit

return debit === credit
}

export {RecupJSonDetail,debitEgaleCredit}
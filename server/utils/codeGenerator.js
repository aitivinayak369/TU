const arrayCode = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let code="";
let index;

function codeGenerator()
{

    code="";
    for(i=0;i<4;i++)
    {
       index=Math.round((Math.random()*100))%62;
       console.log("index:",index)
       console.log("code:",arrayCode[i])
       code = code+ arrayCode[index]
  
    }

    return code;

}
module.exports = codeGenerator;
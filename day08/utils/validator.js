
function validateUser(data) {

    

      const mandatoryField = ["name","age","passward"]
      const isValid = mandatoryField.every((field)=>Object.keys(data).includes(field))
      
    
    
     if(!isValid){
       throw new Error("please provide all mandatory fields")
    }
  }

module.exports =  validateUser
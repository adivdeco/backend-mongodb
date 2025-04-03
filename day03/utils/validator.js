
function validateUser(data) {

    // if(!req.body.name){
        //     return res.status(400).send({message:"please provide name"})
        // }

      const mandatoryField = ["name","age","gender"]
      const isValid = mandatoryField.every((field)=>Object.keys(data).includes(field))
      
    
    //   const isValid = mandatoryField.every((field) => {
    //     return data[field] !== undefined
    //   })
    
     if(!isValid){
       throw new Error("please provide all mandatory fields")
    }
    //     // const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.email)
        // if(!isValidEmail){
        //     return res.status(400).send({message:"please provide valid email"})
        // } 
}
// }

module.exports =  validateUser
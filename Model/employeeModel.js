const mongoose=require('mongoose')
// - First Name
// - Last Name
// - Email
// - Department (Select Tag with Tech, Marketing, and Operations as options)
// - Salary

const employeeSchema=mongoose.Schema({
     first_name:{type:String,required:true},
     last_name:{type:String,required:true},
     email:{type:String,required:true},
     depart:{type:String,required:true,enum:['Tech','Marketing','Operations']},
     salary:{type:Number,required:true}
})

const EmployeeModel=mongoose.model('employee',employeeSchema)

module.exports={
  EmployeeModel
}
const express=require('express')
const { EmployeeModel } = require('../Model/employeeModel')
const employeeRouter=express.Router()
const {auth}=require('../middleware/authmiddleware')

employeeRouter.post('/',auth,async(req,res)=>{
    console.log(req.body)
    try{
        const employee=new EmployeeModel(req.body)
        await employee.save()
        res.status(200).send({"msg":"New Employee Created Successfully!"})
    }catch(err){
        res.status(400).send({'msg':"err"})
    }
})

employeeRouter.get('/',auth,async(req,res)=>{
    let filter={}
    let Sort={}
    let limit=parseInt(req.query.limit)
    let page=parseInt(req.query.page) || 1
    if(req.query.filter){
        filter.depart=req.query.filter
    }
    if(req.query.sort){
       if(req.query.sort==='asc'){
        Sort.salary=1
       }
       else if(req.query.sort==='desc'){
        Sort.salary=-1
       }
    }
    if(req.query.search){
        filter.first_name={ $regex: `${req.query.search}`, $options: 'i' }
    }
    try{
        const employees=await EmployeeModel.find(filter).sort(Sort).skip((page-1)*limit).limit(limit)
        res.status(200).send(employees)
    }
    catch(err){
        res.status(400).send({'msg':"err"})
    }
})

employeeRouter.delete('/:id',auth,async(req,res)=>{
    const {id}=req.params
    try{
        const Employee=await EmployeeModel.findById(id)
        if(Employee){
            await EmployeeModel.findByIdAndDelete(id)
            res.status(200).send({"msg":"New Employee Deleted Successfully!"})
        }else{
            res.status(200).send({'msg':"Employee Not Found!"})
        }
    }
    catch(err){
        res.status(400).send({'msg':"Error Deleting"})
    }
})

employeeRouter.patch('/:id',auth,async(req,res)=>{
    const {id}=req.params
    try{
        const Employee=await EmployeeModel.findById(id)
        if(Employee){
            await EmployeeModel.findByIdAndUpdate(id,req.body)
            res.status(200).send({"msg":"New Employee Updated Successfully!"})
        }else{
            res.status(200).send({'msg':"Employee Not Found!"})
        }
    }
    catch(err){
        res.status(400).send({'msg':"Error Updating"})
    }
})


module.exports={
    employeeRouter
}
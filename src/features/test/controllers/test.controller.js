// raw text response in get request
exports.textResponse = (req,res)=>{
    res.send('Hello World');
}


// json response in get request
exports.jsonResponse = (req,res)=>{
    res.status(200).json({message:'Hello World'});
}
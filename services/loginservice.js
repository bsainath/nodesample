var db = require('./config');

exports.login=(req,res)=>{
   // console.log(req);

   // res.status(200).send({message:'hello'});
data = {message:'hello'};

respond(data).then(dataresp=>{
    res.json({ resdata:dataresp , length: 2 });
})

};

function respond(name){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(name);},1000);
    });
}

exports.logincheck=(req,res)=>{
    try {
        db.connect().then(conn=>{
            var sql='select * from tbl_prt_admin_users';
            return db.query(conn,sql,[]);
        }).then(([conn,data])=>{
                res.json(data);
                con.destroy();
        }).catch(err=>{ con.destroy(); console.log(err);});
    } catch (error) {
        con.destroy();
        console.log(error);
    }
    
}
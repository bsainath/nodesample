var mysql = require('mysql');

 var config={'localDB': {
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'parti'
  } };

  function connection(){
      this.pool=null;

      this.init=()=>{
          this.pool=mysql.createPool(config.localDB);
      }

      this.connect = ()=>{
          
          return new Promise((resolve,reject)=>{
            this.init();

            this.pool.getConnection(function(err,connection){

                if(err){
                    var e = new Error(err);
                    reject(e);
                }

                if(connection){
                    connection.on('end',function(){
                        connection.release();
                    })
                    resolve(connection);
                }

            });

          });
          
      }


      this.query=function(connection,sql,params){
          return new Promise((resolve,reject)=>{

            connection.query(sql,params,(error,results)=>{
                if(error){
                    var e= new Error(error);
                    reject(e);
                }
                resolve([connection,results]);
            });
          });
      }
  }

  module.exports = new connection();
var db = require('./sqlite_connection');
var UserDAO = function(){

    /**
     * values : Tableau de valeur a inserer
     * callback : Message d'erreur
     */
    this.insert = function(values, callback){
        let stmt = db.prepare("INSERT INTO user VALUES(?,?,?,?)");
        stmt.run([values[0], values[1], values[2], values[3]], callback);
    };

    /**
     * key : Cle d'identification
     * values : Tableau de valeur a modifier
     * callback : Message d'erreur
     */
    this.update = function(key, values, callback){
        let stmt = db.prepare("UPDATE user SET pseudo = ?, email = ?, password = ? WHERE id=?");
        stmt.run([values[1], values[2], values[3], values[4],key],callback);
    };

    /**
     * key : Cle d'identification
     * callback : Message d'erreur
     */
     this.delete = function(key, callback){
        db.run("DELETE FROM user WHERE id=?",key,callback);
    };

    /**
     * callback : Message d'erreur
     */
     this.findAll = function(callback){
        db.all("SELECT * FROM user",callback);
    };

    /**
     * key : Cle d'identification
     * callback : Message d'erreur
     */
	this.findByKey = function(key, callback){
        db.all("SELECT * FROM user WHERE id =?",key, function(err,rows){
            if(err){
                console.log(err.message);
            }else{
                callback(rows);
            }
        });
    };

    /**
     * key : Cle d'identification
     * callback : Message d'erreur
     */
    this.findByMail = function(key, callback){
        db.all("SELECT * FROM user WHERE email =?",key, callback);
    };
};

var dao = new UserDAO();
module.exports = dao;
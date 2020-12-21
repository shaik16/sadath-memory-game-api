const queryList = {
	selectAllQuery: (tableName) => {
		return `SELECT name,level,MAX(score) as highscore 
        FROM ${tableName} 
        GROUP BY level,name ORDER BY level;`;
	},
	insertQuery: (tableName) => {
		return `INSERT INTO ${tableName}(name,level,score) VALUES(?)`;
	},
};

module.exports = queryList;

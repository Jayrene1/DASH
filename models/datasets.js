module.exports = function(sequelize, DataTypes) {
	return sequelize.define('datasets', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		}
	});
};

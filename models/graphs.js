module.exports = function(sequelize, DataTypes) {
	return sequelize.define('graphs', {
		graph_name: {
			type: DataTypes.STRING(24),
			allowNull: false
		},
        graph_values: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	});
};

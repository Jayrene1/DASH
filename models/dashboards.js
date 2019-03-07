module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dashboards', {
		name: {
			type: DataTypes.STRING(24),
			allowNull: false
		},
		graph_ids: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	});
};

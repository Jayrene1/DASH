module.exports = function(sequelize, DataTypes) {
	var Graph = sequelize.define('graphs', {
		graph_name: {
			type: DataTypes.STRING(24),
			allowNull: false
		},
        graph_values: {
			type: DataTypes.JSON,
			allowNull: false
		}
	});

	Graph.associate = function(models) {
		Graph.belongsTo(models.dashboards, {
		  foreignKey: {
			allowNull: false
		  }
		});
	};

	return Graph;
};

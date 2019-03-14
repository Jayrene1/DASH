module.exports = function(sequelize, DataTypes) {
	var graph = sequelize.define('graph', {
		graph_name: {
			type: DataTypes.STRING(24),
			allowNull: false
		},
      graph_values: {
			type: DataTypes.JSON,
			allowNull: false
		}
	});

	graph.associate = function(models) {

		graph.belongsTo(models.dashboard, {
		  foreignKey: {
			allowNull: false
		  }
		});

	};

	return graph;
};

module.exports = function(sequelize, DataTypes) {
	var Graph = sequelize.define('Graph', {
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

		Graph.belongsTo(models.Dashboard, {
		  foreignKey: {
			allowNull: false
		  }
		});

	};

	return Graph;
};
